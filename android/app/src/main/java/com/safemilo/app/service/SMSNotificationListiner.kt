package com.safemilo.app.service

import android.app.Notification
import android.os.Build
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.Log
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import org.json.JSONObject
import java.util.Base64


class SMSNotificationListiner : NotificationListenerService() {

    override fun onBind(intent: android.content.Intent): android.os.IBinder? {
        return super.onBind(intent)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onNotificationPosted(sbn: StatusBarNotification) {
        Log.d("Package Name", sbn.packageName)
        val packageName = sbn.packageName

        // Check if the notification is from the default SMS app
        if (packageName == "com.android.mms" || packageName == "com.google.android.apps.messaging") {
            // Extract the notification extras
            val extras = sbn.notification.extras
            val sender = extras.getString(Notification.EXTRA_TITLE)
            val message = extras.getString(Notification.EXTRA_TEXT, "")

            val regex = """\b(?:https?)://(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(?:/[^\s]*)?\b""".toRegex()

            var urls = regex.findAll(message)
                .map { it.value }
                .toList()


            for (url in urls) {
                Toast.makeText(applicationContext, url, Toast.LENGTH_LONG).show()
                val urlBytes = url.toByteArray(Charsets.UTF_8)
                verifyLink(Base64.getEncoder().encodeToString(urlBytes))
            }
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification) {
        super.onNotificationRemoved(sbn)
    }

    private fun verifyLink(url: String) {
        // This is where you would make a network call to your backend API to validate the phone number
        Thread{
            try {
                val client = OkHttpClient()

                val request = Request.Builder()
                    .url("http://34.235.29.56:8080/verifylink/$url")
                    .build()

                val response: Response = client.newCall(request).execute()
                val responseBody = response.body?.string()
                if (response.isSuccessful && responseBody!=null){
                    try {
                        val res = JSONObject(responseBody)
                        Log.d("Status", res.getString("status"))
                        runOnUiThread{
                            Toast.makeText(applicationContext, res.getString("status"), Toast.LENGTH_LONG).show()
                        }
                    }catch (e : Exception){
                        Log.d("Error", e.message.toString())
                        runOnUiThread{
                            Toast.makeText(applicationContext, e.message.toString(), Toast.LENGTH_LONG).show()
                        }
                    }
                }
            }catch (e : Exception){
                Log.d("Error", e.message.toString())
                runOnUiThread {
                    Toast.makeText(applicationContext, e.message.toString(), Toast.LENGTH_LONG)
                        .show()
                }
            }
        }.start()


    }
}