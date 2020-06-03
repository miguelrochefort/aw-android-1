package net.activitywatch.android.watcher

import android.app.Notification
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.media.session.MediaController
import android.media.session.MediaSessionManager
import android.os.Build
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.support.annotation.RequiresApi
import android.util.Log
import net.activitywatch.android.RustInterface
import org.json.JSONObject
import org.threeten.bp.Instant

class NotificationWatcher : NotificationListenerService() {
    private val TAG = this.javaClass.simpleName
    private val bucket_id = "aw-watcher-android-notifications"

    private var ri : RustInterface? = null

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate() {
        super.onCreate()
        ri = RustInterface(applicationContext)
        ri?.createBucketHelper(bucket_id, "notification") // TODO: Change event type

        MediaWatcher(this).onCreate() // TODO: Workaround until we understand why MediaWatcher's NotificationListenerService doesn't get started
    }

    override fun onDestroy() {
        super.onDestroy()
        ri = null
    }

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        onNotification(sbn)
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification) {
        onNotification(sbn)
    }

    fun onNotification(sbn: StatusBarNotification) {
        val notification = sbn.notification;
        val title = notification.extras.get(Notification.EXTRA_TITLE);
        val text = notification.extras.get(Notification.EXTRA_TEXT)
        if (title != null) {
            val timestamp = Instant.ofEpochMilli(System.currentTimeMillis())
            val duration = 1.0 // TODO
            val data = JSONObject()
            data.put("package", sbn.packageName)
            data.put("title", title)
            data.put("text", text)
            ri?.heartbeatHelper(bucket_id, timestamp, duration, data)
        }
    }
}