package net.activitywatch.android.watcher;

import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v7.media.MediaControlIntent;
import android.support.v7.media.MediaRouteSelector;
import android.support.v7.media.MediaRouter;
import android.util.Log;

import com.google.android.gms.cast.ApplicationMetadata;
import com.google.android.gms.cast.Cast;
import com.google.android.gms.cast.CastDevice;
import com.google.android.gms.cast.LaunchOptions;
import com.google.android.gms.cast.MediaInfo;
import com.google.android.gms.cast.MediaMetadata;
import com.google.android.gms.cast.MediaStatus;
import com.google.android.gms.cast.MediaTrack;
import com.google.android.gms.cast.RemoteMediaPlayer;
import com.google.android.gms.cast.framework.CastContext;
import com.google.android.gms.cast.framework.CastSession;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ResultCallback;

import net.activitywatch.android.RustInterface;

import org.json.JSONObject;
import org.threeten.bp.Instant;
import org.threeten.bp.Duration;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class CastWatcher {
    private String TAG = "CastWatcher";

    private RustInterface ri = null;

    MediaMetadata currentMetadata = null;
    Instant currentStart = null;
    int currentHash = 0;









    public static final String CHROMECAST_SIGNATURE = "cast.media.CastMediaRouteProviderService";

    private MediaRouteSelector mSelector;
    private MediaRouter mMediaRouter;
    //private CastDevice mSelectedDevice;
    //private Cast.Listener mCastClientListener;
    //private RemoteMediaPlayer mRemoteMediaPlayer;

    //private GoogleApiClient mApiClient;
    private Context context;

    public CastWatcher(Context context) {
        this.context = context;
    }

    public void onCreate() {

        ri = new RustInterface(this.context);


        mMediaRouter = MediaRouter.getInstance(context);

        mSelector = new MediaRouteSelector.Builder()
                // These are the framework-supported intents
                .addControlCategory(MediaControlIntent.CATEGORY_LIVE_AUDIO)
                .addControlCategory(MediaControlIntent.CATEGORY_LIVE_VIDEO)
                .addControlCategory(MediaControlIntent.CATEGORY_REMOTE_PLAYBACK)
                .build();

        mMediaRouter.addCallback(mSelector, mMediaRouterCallback, MediaRouter.CALLBACK_FLAG_REQUEST_DISCOVERY | MediaRouter.CALLBACK_FLAG_UNFILTERED_EVENTS | MediaRouter.CALLBACK_FLAG_PERFORM_ACTIVE_SCAN); // | MediaRouter.CALLBACK_FLAG_FORCE_DISCOVERY);
    }

    public void onDestroy() {
        mMediaRouter.removeCallback(mMediaRouterCallback);
    }

    private boolean isCastDevice(MediaRouter.RouteInfo routeInfo) {
        return routeInfo.getId().contains(CHROMECAST_SIGNATURE); // TODO: Phone?
    }

    private MediaRouter.Callback mMediaRouterCallback = new MediaRouter.Callback() {
        @Override
        public void onRouteAdded(MediaRouter router, final MediaRouter.RouteInfo route) {
            if (isCastDevice(route)) {
                Log.i("MediaRouter", "Chromecast route added: " + route);

                final CastDevice mSelectedDevice = CastDevice.getFromBundle(route.getExtras());
                String deviceId = null;
                try {
                    Field field = mSelectedDevice.getClass().getDeclaredField("gS");
                    field.setAccessible(true);
                    deviceId = (String)field.get(mSelectedDevice);

                } catch (NoSuchFieldException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }

                final String bucket_id = "aw-watcher-android-casts_" + deviceId;
                //final String bucket_id = "aw-watcher-android-casts_" + mSelectedDevice.getModelName().replaceAll(" ", "-") + "-" + mSelectedDevice.getDeviceId();

                ri.createBucketHelper(bucket_id, "cast", "unknown", "aw-android"); // TODO: Change event type

                final List<GoogleApiClient> mApiClients = new ArrayList<>();

                Cast.Listener mCastClientListener = new Cast.Listener() {
                    boolean initialized = false;

                    MediaMetadata currentMetadata = null;
                    Instant currentStart = null;
                    int currentHash = 0;



                    @Override
                    public void onApplicationStatusChanged() {
                        Log.i("MediaRouter", "Cast.Listener.onApplicationStatusChanged()");
                    }

                    @Override
                    public void onApplicationMetadataChanged(ApplicationMetadata applicationMetadata) {

                        // Ensure we only subscribe once (not sure if it's the right level)
                        if (initialized) {
                            return;
                        }
                        initialized = true;


                        Log.i("MediaRouter", "Cast.Listener.onApplicationMetadataChanged(" + applicationMetadata + ")");

                        final GoogleApiClient mApiClient = mApiClients.get(0);

                        if (applicationMetadata != null) {
                            // HERE GOES STUFF
                            // TODO: Wait to connect to CastAPI?
                            LaunchOptions launchOptions = new LaunchOptions.Builder().setRelaunchIfRunning(false).build();
                            Cast.CastApi.launchApplication(mApiClient, applicationMetadata.getApplicationId(), launchOptions).setResultCallback(new ResultCallback<Cast.ApplicationConnectionResult>() {
                                @Override
                                public void onResult(@NonNull Cast.ApplicationConnectionResult applicationConnectionResult) {
                                    Log.i("MediaRouter", "Cast.CastApi.joinApplication.onResult() " + applicationConnectionResult.getSessionId());
                                    Log.i("MediaRouter", "connectionResult " + applicationConnectionResult.getStatus());
                                    final RemoteMediaPlayer mRemoteMediaPlayer = new RemoteMediaPlayer();
                                    mRemoteMediaPlayer.setOnStatusUpdatedListener(new RemoteMediaPlayer.OnStatusUpdatedListener() {
                                        @RequiresApi(api = Build.VERSION_CODES.O)
                                        @Override
                                        public void onStatusUpdated() {

                                            try {

                                                MediaStatus mediaStatus = mRemoteMediaPlayer.getMediaStatus();
                                                int playerState = mediaStatus.getPlayerState();
                                                boolean isPlaying = playerState == MediaStatus.PLAYER_STATE_PLAYING;

                                                Instant now = Instant.ofEpochMilli(System.currentTimeMillis());

                                                MediaInfo mediaInfo = mRemoteMediaPlayer.getMediaInfo();
                                                MediaMetadata metadata = mediaInfo.getMetadata();

                                                // TODO: Switching app (i.e., YouTube to Netflix) doesn't complete the current event.
                                                // TODO: Make sure the metadata didn't change'

                                                MediaWatcher.Metadata newMetadata = parseMetadata(metadata);
                                                long mediaDuration = mediaInfo.getStreamDuration();

                                                int newHash = newMetadata.getArtist().hashCode() + newMetadata.hashCode();
                                                boolean startNew = newHash != currentHash && isPlaying;
                                                boolean endCurrent = currentHash != 0 && (startNew || (newHash == currentHash && !isPlaying));

                                                if (endCurrent) {
                                                    // track
                                                    Instant start = currentStart;
                                                    Instant end = now; // TODO
                                                    Duration duration = Duration.between(start, end);

                                                    MediaWatcher.Metadata metadata2 = parseMetadata(currentMetadata);
                                                    JSONObject data = new JSONObject();
                                                    data.put("artist", metadata2.getArtist());
                                                    data.put("album", metadata2.getAlbum());
                                                    data.put("title", metadata2.getTitle());
                                                    data.put("duration", mediaDuration);
//                                                    data.put("app", packageName);
                                                    // TODO: More!!

                                                    ri.heartbeatHelper(bucket_id, start, (double)duration.getSeconds(), data, 1.0);

                                                    currentHash = 0;
                                                    currentMetadata = null;
                                                    currentStart = null;
                                                }

                                                if (startNew) {
                                                    currentHash = newHash;
                                                    currentMetadata = metadata;
                                                    currentStart = now;
                                                }



//
//
//                                                if (!wasPlaying && isPlaying) {
//                                                    currentStart = now;
//                                                }
//
//                                                if (isPlaying || wasPlaying) {
//
//                                                    MediaInfo mediaInfo = mRemoteMediaPlayer.getMediaInfo();
//                                                    MediaMetadata metadata = mediaInfo.getMetadata();
//                                                    // TODO: KEY_ALBUM_ARTIST?
//                                                    String artist = metadata.getString(MediaMetadata.KEY_ARTIST); // TODO
//                                                    if (artist == null) {
//                                                        artist = metadata.getString(MediaMetadata.KEY_SUBTITLE);
//                                                    }
//                                                    String title = metadata.getString(MediaMetadata.KEY_TITLE);
//                                                    String album = metadata.getString(MediaMetadata.KEY_ALBUM_TITLE);
//                                                    String packageName = "";
//
//                                                    Instant start = currentStart;
//                                                    Instant end = now;
//                                                    Duration duration = Duration.between(start, end);
//
//                                                    JSONObject data = new JSONObject();
//                                                    data.put("artist", artist);
//                                                    data.put("album", album);
//                                                    data.put("title", title);
////                                                data.put("duration", mediaDuration);
//                                                    data.put("app", packageName);
//                                                    // TODO: More!!
//
//                                                    ri.heartbeatHelper(bucket_id, start, (double)duration.getSeconds(), data, 1.0);
//                                                }
//
//                                                if (wasPlaying && !isPlaying) {
//                                                    currentStart = null;
//                                                }




                                            }
                                            catch(Exception ex) {

                                            }



//
//
//
//
//
//
//
//
//                                            Log.i("MediaRouter", "Device " + mSelectedDevice);
//                                            MediaInfo mediaInfo = mRemoteMediaPlayer.getMediaInfo();
//                                            if (mediaInfo == null) {
//                                                return;
//                                            }
//                                            List<MediaTrack> tracks = mediaInfo.getMediaTracks();
//                                            long mediaStreamDuration = mediaInfo.getStreamDuration();
//                                            Object textTrackStyle = mediaInfo.getTextTrackStyle();
//                                            MediaMetadata metadata = mediaInfo.getMetadata();
//                                            if (metadata == null) {
//                                                return;
//                                            }
//                                            String toString = metadata.toString();
//                                            String namespace = mRemoteMediaPlayer.getNamespace();
//                                            long streamPosition = mRemoteMediaPlayer.getApproximateStreamPosition();
//                                            long streamDuration = mRemoteMediaPlayer.getStreamDuration();
//                                            MediaStatus mediaStatus = mRemoteMediaPlayer.getMediaStatus();
//                                            int playerState = mediaStatus.getPlayerState();
//                                            Object a = mediaStatus.getActiveTrackIds();
//                                            Object b = mediaStatus.getCustomData();
//                                            Object c = mediaStatus.getIdleReason();
//                                            Object d = mediaStatus.getPlaybackRate();
//                                            Object e = mediaStatus.getStreamPosition();
//                                            Object f = mediaStatus.getStreamVolume();
//                                            try {
//                                                String artist = metadata.getString(MediaMetadata.KEY_ALBUM_ARTIST);
//                                                String title = metadata.getString(MediaMetadata.KEY_TITLE);
//                                                Log.i("MediaRouter", artist + " - " + title);
//                                            } catch (Exception ex) {
//
//                                            }
//                                            // TODO: you can call isChromecastPlaying() now
                                        }
                                    });

                                    try {
                                        Cast.CastApi.setMessageReceivedCallbacks(mApiClient, mRemoteMediaPlayer.getNamespace(), mRemoteMediaPlayer);
                                    } catch (IOException e) {
                                        Log.e("MediaRouter", "Exception while creating media channel ", e);
                                    } catch (NullPointerException e) {
                                        Log.e("MediaRouter", "Something wasn't reinitialized for reconnectChannels", e);
                                    }

                                    mRemoteMediaPlayer.requestStatus(mApiClient).setResultCallback(new ResultCallback<RemoteMediaPlayer.MediaChannelResult>() {
                                        @Override
                                        public void onResult(@NonNull RemoteMediaPlayer.MediaChannelResult mediaChannelResult) {
                                            Log.i("MediaRouter", "requestStatus() " + mediaChannelResult);
                                        }
                                    });

                                    try {
                                        Cast.CastApi.requestStatus(mApiClient);
                                    } catch (IOException e) {
                                        Log.e("MediaRouter", "Couldn't request status", e);
                                    }
                                }
                            });
                        }
                    }

                    @Override
                    public void onApplicationDisconnected(int i) {
                        Log.i("MediaRouter", "Cast.Listener.onApplicationDisconnected(" + i + ")");
                    }

                    @Override
                    public void onActiveInputStateChanged(int i) {
                        Log.i("MediaRouter", "Cast.Listener.onActiveInputStateChanged(" + i + ")");
                    }

                    @Override
                    public void onStandbyStateChanged(int i) {
                        Log.i("MediaRouter", "Cast.Listener.onStandbyStateChanged(" + i + ")");
                    }

                    @Override
                    public void onVolumeChanged() {
                        Log.i("MediaRouter", "Cast.Listener.onVolumeChanged()");
                    }
                };

                Cast.CastOptions.Builder apiOptionsBuilder = new Cast.CastOptions.Builder(mSelectedDevice, mCastClientListener);

                GoogleApiClient mApiClient = new GoogleApiClient.Builder(context)
                        .addApi(Cast.API, apiOptionsBuilder.build())
                        .addConnectionCallbacks(new GoogleApiClient.ConnectionCallbacks() {
                            @Override
                            public void onConnected(@Nullable Bundle bundle) {
                                Log.i("MediaRouter", "GoogleApiClient.onConnected()");
                                Log.i("MediaRouter", "Bundle " + bundle);
                            }

                            @Override
                            public void onConnectionSuspended(int i) {
                                Log.i("MediaRouter", "GoogleApiClient.onConnectionSuspended(" + i + ")");
                            }
                        })
                        .addOnConnectionFailedListener(new GoogleApiClient.OnConnectionFailedListener() {
                            @Override
                            public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {
                                Log.i("MediaRouter", "GoogleApiClient.onConnectionFailed()");
                            }
                        })
                        .build();

                mApiClients.add(mApiClient); // TODO: Hack/workaround for closures

                mApiClient.connect();


            }
        }

        @Override
        public void onRouteRemoved(MediaRouter router, MediaRouter.RouteInfo route) {
            if (isCastDevice(route)) {
                Log.i("MediaRouter", "Chromecast lost: " + route);
            }
        }

        private MediaWatcher.Metadata parseMetadata(MediaMetadata metadata) {

            String albumArtist = metadata.getString(MediaMetadata.KEY_ALBUM_ARTIST);
            String artist = metadata.getString(MediaMetadata.KEY_ARTIST);
            if (artist == null) {
                artist = albumArtist;
            }
            String subtitle = metadata.getString(MediaMetadata.KEY_SUBTITLE);
            if (artist == null) {
                artist = subtitle;
            }
            if (artist == null) {
                artist = "";
            }
            String album = metadata.getString(MediaMetadata.KEY_ALBUM_TITLE);
            if (album == null) {
                album = "";
            }
            String title = metadata.getString(MediaMetadata.KEY_TITLE);
            if (title == null) {
                title = "Hello world!";
            }
            title.toString();
            return new MediaWatcher.Metadata(artist, album, title, 0);
        }

//        @Override
//        public void onRouteChanged(MediaRouter router, MediaRouter.RouteInfo route) {
//            if (isCastDevice(route)) {
//                Log.i("MediaRouter", "Chromecast changed: " + route);
//            }
//        }

//        @Override
//        public void onRouteSelected(MediaRouter router, MediaRouter.RouteInfo route) {
//        }
    };
}
