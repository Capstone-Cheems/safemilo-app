package com.safemilo.app.service

import android.app.Notification
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.Log


class SMSNotificationListiner : NotificationListenerService() {

    override fun onBind(intent: android.content.Intent): android.os.IBinder? {
        return super.onBind(intent)
    }

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        Log.d("Package Name", sbn.packageName)
        val packageName = sbn.packageName

        // Check if the notification is from the default SMS app
        if (packageName == "com.android.mms" || packageName == "com.google.android.apps.messaging") {
            // Extract the notification extras
            val extras = sbn.notification.extras
            val sender = extras.getString(Notification.EXTRA_TITLE)
            val message = extras.getString(Notification.EXTRA_TEXT)

            // Log the sender and message
            Log.d("TAG", "Sender: $sender")
            Log.d("TAG", "Message: $message")
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification) {
        super.onNotificationRemoved(sbn)
    }
}