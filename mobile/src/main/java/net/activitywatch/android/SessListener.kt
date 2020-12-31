package com.arn.scrobble

import android.content.SharedPreferences
import android.media.MediaMetadata
import android.media.session.MediaController
import android.media.session.MediaController.Callback
import android.media.session.MediaSession
import android.media.session.MediaSessionManager.OnActiveSessionsChangedListener
import android.media.session.PlaybackState
import android.os.*
import android.support.annotation.RequiresApi
import android.util.Log
import android.util.Pair
//import java.time.Instant
import org.threeten.bp.Instant


// TODO: This code is copy-pasted directly (and modified) from PanoScrobbler: https://github.com/kawaiiDango/pScrobbler

@RequiresApi(Build.VERSION_CODES.O)
public class SessListener(private val callback: (instant: Instant, packageName: String, metadata: MediaMetadata, playbackState: PlaybackState) -> Unit):
    OnActiveSessionsChangedListener {

    private val controllersMap = mutableMapOf<MediaSession.Token, Pair<MediaController, MyCallback>>()
    private var controllers : List<MediaController>? = null

    override fun onActiveSessionsChanged(controllers: List<MediaController>?) {
        this.controllers = controllers
        val tokens = mutableSetOf<MediaSession.Token>()
        if (controllers != null) {
            for (controller in controllers) {
//                controller.
                tokens.add(controller.sessionToken) // Only add tokens that we don't already have.
                if (!controllersMap.containsKey(controller.sessionToken)) {
                    Log.i("SessListener", "onActiveSessionsChanged [" + controllers.size + "] : " + controller.packageName)
                    val cb = MyCallback(controller.packageName, this.callback)
                    controller.registerCallback(cb)
                    val ps = controller.playbackState
                    if (ps != null)
                        cb.onPlaybackStateChanged(ps) //Melody needs this
                    val md = controller.metadata
                    if (md != null)
                        cb.onMetadataChanged(md)

                    val pair = Pair.create(controller, cb)
                    synchronized(controllersMap) {
                        controllersMap.put(controller.sessionToken, pair)
                    }
                }
            }
        }
        // Now remove old sessions that are not longer active.
        removeSessions(tokens)
    }

    fun removeSessions(tokens: MutableSet<*>? = null, packageNames: Set<String>? = null) {
        val it = controllersMap.iterator()
        while (it.hasNext()) {
            val (token, pair) = it.next()
            if (((tokens != null && !tokens.contains(token)) ||
                        (packageNames != null && packageNames.contains(pair.first.packageName)))) {
                pair.second.stop()
                pair.first.unregisterCallback(pair.second)
                synchronized(controllersMap) {
                    it.remove()
                }
            }
        }
        numSessions = controllersMap.size
    }

    class MyCallback(private val packageName: String, private val callback: (Instant, String, MediaMetadata, PlaybackState) -> Unit) : Callback() {

        var metadata: MediaMetadata? = null
        var playbackState: PlaybackState? = null

        @Synchronized
        override fun onMetadataChanged(metadata: MediaMetadata?) {
            this.metadata = metadata;
            onChanged();
        }

        override fun onPlaybackStateChanged(state: PlaybackState?) {
            this.playbackState = state;
            onChanged();
        }

        fun onChanged() {
            if (metadata != null && playbackState != null) {
                this.callback(Instant.now(), packageName, metadata!!, playbackState!!);
            }
        }

        override fun onSessionDestroyed() {
        }

        fun stop() {
        }
    }

    companion object {
        var numSessions = 0
        var lastSessEventTime:Long = 0
        var lastHash = 0
    }
}