package net.activitywatch.android.watcher

import android.content.ComponentName
import android.content.Context
import android.media.MediaMetadata
import android.media.session.MediaSessionManager
import android.media.session.PlaybackState
import android.os.Build
import android.service.notification.NotificationListenerService
import android.support.annotation.RequiresApi
import android.util.Log
import com.arn.scrobble.SessListener
import net.activitywatch.android.RustInterface
import org.json.JSONObject
import org.threeten.bp.Duration
import org.threeten.bp.Instant

class MediaWatcher(private val notificationListener: NotificationListenerService) { //: NotificationListenerService() {
    private val TAG = this.javaClass.simpleName
    private val bucket_id = "aw-watcher-android-media"

    private var ri : RustInterface? = null

    var currentMetadata: MediaMetadata? = null
    var currentStart: Instant? = null
    var currentHash = 0

    @RequiresApi(Build.VERSION_CODES.O)
    /*override*/ fun onCreate() {
        //super.onCreate()
        ri = RustInterface(notificationListener.applicationContext)
        ri?.createBucketHelper(bucket_id, "media") // TODO: Change event type

        val sessManager = notificationListener.applicationContext.getSystemService(Context.MEDIA_SESSION_SERVICE) as MediaSessionManager
        var sessListener = SessListener(::onMediaChanged)
        try {
            sessManager.addOnActiveSessionsChangedListener(sessListener!!, ComponentName(notificationListener, notificationListener::class.java))
            //scrobble after the app is updated
            sessListener?.onActiveSessionsChanged(sessManager.getActiveSessions(ComponentName(notificationListener, notificationListener::class.java)))
            Log.i(TAG, "onListenerConnected")
        } catch (exception: SecurityException) {
            Log.i(TAG, "Failed to start media controller: " + exception.message)
            // Try to unregister it, just in case.
            try {
                sessManager.removeOnActiveSessionsChangedListener(sessListener!!)
            } catch (e: Exception) {
                e.printStackTrace()
            }
            // Media controller needs notification listener service
            // permissions to be granted.
        }
    }

    fun onMediaChanged(instant: Instant, packageName: String, metadata: MediaMetadata, playbackState: PlaybackState) {

        try {
            var newMetadata = parseMetadata(metadata)

            var newHash = newMetadata.artist.hashCode() + newMetadata.hashCode()
            var startNew = newHash != currentHash && playbackState.state == PlaybackState.STATE_PLAYING;
            var endCurrent = currentHash != 0 && (startNew || (newHash == currentHash && playbackState.state != PlaybackState.STATE_PLAYING));

            if (endCurrent) {
                // track
                val now = Instant.ofEpochMilli(System.currentTimeMillis())
                val start = currentStart!!
                val end = instant
                val duration = Duration.between(start, end)

                val metadata2 = parseMetadata(currentMetadata!!)
                val data = JSONObject()
                data.put("artist", metadata2.artist)
                data.put("album", metadata2.album)
                data.put("title", metadata2.title)
                data.put("duration", metadata2.duration)
                data.put("app", packageName)
                // TODO: More!!

                ri?.heartbeatHelper(bucket_id, start, duration.seconds.toDouble(), data, 1.0)

                currentHash = 0
                currentMetadata = null
                currentStart = null
            }

            if (startNew) {
                this.currentHash = newHash
                this.currentMetadata = metadata
                this.currentStart = instant
            }
        }
        catch(ex: Exception) {
            Log.e(TAG, ex.toString())
        }
    }

    data class Metadata(val artist: String, val album: String, val title: String, val duration: Long)

    fun parseMetadata(metadata: MediaMetadata): Metadata {

        var albumArtist = metadata?.getString(MediaMetadata.METADATA_KEY_ALBUM_ARTIST)?.trim() ?: ""
        var artist = metadata?.getString(MediaMetadata.METADATA_KEY_ARTIST)?.trim() ?: albumArtist
        val album = metadata?.getString(MediaMetadata.METADATA_KEY_ALBUM)?.trim() ?: ""
        val title = metadata?.getString(MediaMetadata.METADATA_KEY_TITLE)?.trim() ?: ""
        var duration = metadata?.getLong(MediaMetadata.METADATA_KEY_DURATION) ?: -1
        if (duration < -1)
            duration = -1

        return Metadata(artist, album, title, duration)
    }

    /*override*/ fun onDestroy() {
        //super.onDestroy()
        ri = null
    }
}