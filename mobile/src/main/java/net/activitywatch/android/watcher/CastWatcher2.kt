package com.miguelrochefort.chromecastwatcher

//import androidx.annotation.UiThread
//import androidx.mediarouter.media.MediaControlIntent
//import androidx.mediarouter.media.MediaRouteSelector
//import androidx.mediarouter.media.MediaRouter
import android.content.Context
import android.os.Bundle
import android.support.annotation.NonNull
import android.support.v7.media.MediaControlIntent
import android.support.v7.media.MediaRouteSelector
import android.support.v7.media.MediaRouter
import android.util.Log
import com.google.android.gms.cast.*
import com.google.android.gms.cast.Cast.CastApi
import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.api.GoogleApiClient
import com.google.android.gms.common.api.ResultCallback
import java.io.IOException
import java.util.*

class CastWatcher2 internal constructor(//private CastDevice mSelectedDevice;
//private Cast.Listener mCastClientListener;
//private RemoteMediaPlayer mRemoteMediaPlayer;
//private GoogleApiClient mApiClient;
    private val context: Context
) {
    private val mCastApi = Cast.CastApi.zza();
    private var mSelector: MediaRouteSelector? = null
    private var mMediaRouter: MediaRouter? = null

    fun onCreate() {
        mMediaRouter = android.support.v7.media.MediaRouter.getInstance(context)
        mSelector = android.support.v7.media.MediaRouteSelector.Builder() // These are the framework-supported intents
            .addControlCategory(MediaControlIntent.CATEGORY_LIVE_AUDIO)
            .addControlCategory(MediaControlIntent.CATEGORY_LIVE_VIDEO)
            .addControlCategory(MediaControlIntent.CATEGORY_REMOTE_PLAYBACK)
            .build()
        mMediaRouter?.addCallback(
            mSelector!!,
            mMediaRouterCallback,
            MediaRouter.CALLBACK_FLAG_REQUEST_DISCOVERY or MediaRouter.CALLBACK_FLAG_UNFILTERED_EVENTS or MediaRouter.CALLBACK_FLAG_PERFORM_ACTIVE_SCAN
        ) // | MediaRouter.CALLBACK_FLAG_FORCE_DISCOVERY);
    }

    fun onDestroy() {
        mMediaRouter?.removeCallback(mMediaRouterCallback)
    }

    private fun isCastDevice(routeInfo: MediaRouter.RouteInfo): Boolean {
        return routeInfo.getId()
            .contains(CHROMECAST_SIGNATURE) // TODO: Phone?
    }

    private val mMediaRouterCallback: MediaRouter.Callback = object : MediaRouter.Callback() {
        override fun onRouteAdded(router: MediaRouter?, route: MediaRouter.RouteInfo) {
            if (isCastDevice(route)) {
                Log.i("MediaRouter", "Chromecast route added: $route")
                val mSelectedDevice: CastDevice = CastDevice.getFromBundle(route.extras)
                val mApiClients: MutableList<GoogleApiClient> =
                    ArrayList<GoogleApiClient>()
                val mCastClientListener: Cast.Listener = object : Cast.Listener() {
                    var initialized = false
                    override fun onApplicationStatusChanged() {
                        Log.i(
                            "MediaRouter",
                            "Cast.Listener.onApplicationStatusChanged()"
                        )
                    }

                    override fun onApplicationMetadataChanged(applicationMetadata: ApplicationMetadata?) { // Ensure we only subscribe once (not sure if it's the right level)
                        if (initialized) {
                            return
                        }
                        initialized = true
                        Log.i(
                            "MediaRouter",
                            "Cast.Listener.onApplicationMetadataChanged($applicationMetadata)"
                        )
                        val mApiClient: GoogleApiClient = mApiClients[0]
                        if (applicationMetadata != null) { // HERE GOES STUFF
// TODO: Wait to connect to CastAPI?
                            val launchOptions: LaunchOptions =
                                LaunchOptions.Builder().setRelaunchIfRunning(false).build()
                            mCastApi.launchApplication(
                                mApiClient,
                                applicationMetadata.getApplicationId(),
                                launchOptions
                            ).setResultCallback(object :
                                ResultCallback<Cast.ApplicationConnectionResult?> {
                                override fun onResult(@NonNull applicationConnectionResult: Cast.ApplicationConnectionResult) {
                                    Log.i(
                                        "MediaRouter",
                                        "Cast.CastApi.joinApplication.onResult() " + applicationConnectionResult.getSessionId()
                                    )
                                    Log.i(
                                        "MediaRouter",
                                        "connectionResult " + applicationConnectionResult.getStatus()
                                    )
                                    val mRemoteMediaPlayer = RemoteMediaPlayer()
                                    mRemoteMediaPlayer.setOnStatusUpdatedListener(object :
                                        RemoteMediaPlayer.OnStatusUpdatedListener {
                                        override fun onStatusUpdated() {
                                            Log.i(
                                                "MediaRouter",
                                                "Device $mSelectedDevice"
                                            )
                                            val mediaInfo: MediaInfo =
                                                mRemoteMediaPlayer.getMediaInfo()
                                                    ?: return
                                            val tracks: List<MediaTrack> =
                                                mediaInfo.getMediaTracks()
                                            val mediaStreamDuration: Long =
                                                mediaInfo.getStreamDuration()
                                            val textTrackStyle: Any =
                                                mediaInfo.getTextTrackStyle()
                                            val metadata: MediaMetadata = mediaInfo.getMetadata()
                                                ?: return
                                            val toString: String = metadata.toString()
                                            val namespace: String =
                                                mRemoteMediaPlayer.getNamespace()
                                            val streamPosition: Long =
                                                mRemoteMediaPlayer.getApproximateStreamPosition()
                                            val streamDuration: Long =
                                                mRemoteMediaPlayer.getStreamDuration()
                                            val mediaStatus: MediaStatus =
                                                mRemoteMediaPlayer.getMediaStatus()
                                            val playerState: Int = mediaStatus.getPlayerState()
                                            val a: Any = mediaStatus.getActiveTrackIds()
                                            val b: Any = mediaStatus.getCustomData()
                                            val c: Any = mediaStatus.getIdleReason()
                                            val d: Any = mediaStatus.getPlaybackRate()
                                            val e: Any = mediaStatus.getStreamPosition()
                                            val f: Any = mediaStatus.getStreamVolume()
                                            //                                            Log.i("MediaRouter", "Remote media player status " + playerState);
//                                            Log.i("MediaRouter", "Remote media player mediaInfo " + mediaStatus.getPlayerState());
//                                            Log.i("MediaRouter", "Remote media player namespace " + mediaStatus.getPlayerState());
//                                            Log.i("MediaRouter", "Remote media player streamPosition " + mediaStatus.getPlayerState());
//                                            Log.i("MediaRouter", "Remote media player streamDuration " + mediaStatus.getPlayerState());
                                            try {
                                                val artist: String =
                                                    metadata.getString(MediaMetadata.KEY_ALBUM_ARTIST)
                                                val title: String =
                                                    metadata.getString(MediaMetadata.KEY_TITLE)
                                                Log.i(
                                                    "MediaRouter",
                                                    "$artist - $title"
                                                )
                                            } catch (ex: Exception) {
                                            }
                                            // TODO: you can call isChromecastPlaying() now
                                        }
                                    })
                                    try {
                                        mCastApi.setMessageReceivedCallbacks(
                                            mApiClient,
                                            mRemoteMediaPlayer.getNamespace(),
                                            mRemoteMediaPlayer
                                        )
                                    } catch (e: IOException) {
                                        Log.e(
                                            "MediaRouter",
                                            "Exception while creating media channel ",
                                            e
                                        )
                                    } catch (e: NullPointerException) {
                                        Log.e(
                                            "MediaRouter",
                                            "Something wasn't reinitialized for reconnectChannels",
                                            e
                                        )
                                    }
                                    mRemoteMediaPlayer.requestStatus(mApiClient)
                                        .setResultCallback(object :
                                            ResultCallback<RemoteMediaPlayer.MediaChannelResult?> {
                                            override fun onResult(@NonNull mediaChannelResult: RemoteMediaPlayer.MediaChannelResult) {
                                                Log.i(
                                                    "MediaRouter",
                                                    "requestStatus() $mediaChannelResult"
                                                )
                                            }
                                        })
                                    try {
                                        mCastApi.requestStatus(mApiClient)
                                    } catch (e: IOException) {
                                        Log.e(
                                            "MediaRouter",
                                            "Couldn't request status",
                                            e
                                        )
                                    }
                                }
                            })
                        }
                    }

                    override fun onApplicationDisconnected(i: Int) {
                        Log.i(
                            "MediaRouter",
                            "Cast.Listener.onApplicationDisconnected($i)"
                        )
                    }

                    override fun onActiveInputStateChanged(i: Int) {
                        Log.i(
                            "MediaRouter",
                            "Cast.Listener.onActiveInputStateChanged($i)"
                        )
                    }

                    override fun onStandbyStateChanged(i: Int) {
                        Log.i(
                            "MediaRouter",
                            "Cast.Listener.onStandbyStateChanged($i)"
                        )
                    }

                    override fun onVolumeChanged() {
                        Log.i("MediaRouter", "Cast.Listener.onVolumeChanged()")
                    }
                }
                val apiOptionsBuilder: Cast.CastOptions.Builder =
                    Cast.CastOptions.Builder(mSelectedDevice, mCastClientListener)
                val mApiClient: GoogleApiClient = GoogleApiClient.Builder(context)
                    .addApi(Cast.API, apiOptionsBuilder.build())
                    .addConnectionCallbacks(object : GoogleApiClient.ConnectionCallbacks {
                        override fun onConnected(bundle: Bundle?) {
                            Log.i("MediaRouter", "GoogleApiClient.onConnected()")
                            Log.i("MediaRouter", "Bundle $bundle")
                        }

                        override fun onConnectionSuspended(i: Int) {
                            Log.i(
                                "MediaRouter",
                                "GoogleApiClient.onConnectionSuspended($i)"
                            )
                        }
                    })
                    .addOnConnectionFailedListener(object : GoogleApiClient.OnConnectionFailedListener {
                        override fun onConnectionFailed(connectionResult: ConnectionResult) {
                            Log.i(
                                "MediaRouter",
                                "GoogleApiClient.onConnectionFailed()"
                            )
                        }
                    })
                    .build()
                mApiClients.add(mApiClient) // TODO: Hack/workaround for closures
                mApiClient.connect()
            }
        }

        override fun onRouteRemoved(router: MediaRouter?, route: MediaRouter.RouteInfo) {
            if (isCastDevice(route)) {
                Log.i("MediaRouter", "Chromecast lost: $route")
            }
        } //        @Override
//        public void onRouteChanged(MediaRouter router, MediaRouter.RouteInfo route) {
//            if (isCastDevice(route)) {
//                Log.i("MediaRouter", "Chromecast changed: " + route);
//            }
//        }
//        @Override
//        public void onRouteSelected(MediaRouter router, MediaRouter.RouteInfo route) {
//        }
    }

    companion object {
        const val CHROMECAST_SIGNATURE = "cast.media.CastMediaRouteProviderService"
    }

}