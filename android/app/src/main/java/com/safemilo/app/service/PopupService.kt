package com.safemilo.app.service

import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import android.widget.ImageView
import android.widget.TextView
import com.safemilo.app.R

class PopupService : Service() {

    private lateinit var windowManager: WindowManager
    private lateinit var popupView: View

    override fun onCreate() {
        super.onCreate()

        // Initialize WindowManager
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // Re-initialize the popup view every time the service is started
        if (!this::popupView.isInitialized) {
            // Inflate your popup layout
            popupView = LayoutInflater.from(this).inflate(R.layout.popup_layout, null)

            // WindowManager layout params
            val params = WindowManager.LayoutParams(
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                    WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                else
                    WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT
            )

            params.gravity = Gravity.CENTER or Gravity.START
            params.x = 10
            params.y = 100

            // Add view to window
            windowManager.addView(popupView, params)

            // Set up the close button to stop the service
            val stopServiceBtn = popupView.findViewById<ImageView>(R.id.imageView4)
            stopServiceBtn?.setOnClickListener {
                stopSelf()  // This will stop the service when the button is clicked
            }
        }

        // Update the phone number in the popup
        val textView = popupView.findViewById<TextView>(R.id.textView4)
        val phoneNumber = intent?.getStringExtra("PHONE_NUMBER") ?: "Unknown"
        textView.text = phoneNumber

        // Return START_REDELIVER_INTENT to keep the service alive and handle re-starts if needed
        return START_REDELIVER_INTENT
    }

    override fun onDestroy() {
        super.onDestroy()
        // Remove the popup view from the window when the service is destroyed
        if (this::popupView.isInitialized) {
            windowManager.removeView(popupView)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
