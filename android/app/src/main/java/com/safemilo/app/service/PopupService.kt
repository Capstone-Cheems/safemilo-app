import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import com.safemilo.app.R

class PopupService : Service() {

    private lateinit var windowManager: WindowManager
    private lateinit var popupView: View

    override fun onCreate() {
        super.onCreate()

        // Initialize WindowManager
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager

        // Inflate your popup layout
        popupView = LayoutInflater.from(this).inflate(R.layout.popup_layout, null)

        // WindowManager layout params
        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            else
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )

        // Positioning (e.g., top-right corner)
        params.gravity = Gravity.TOP or Gravity.END
        params.x = 10
        params.y = 100

        // Add view to window
        windowManager.addView(popupView, params)
    }

    override fun onDestroy() {
        super.onDestroy()
        if (::popupView.isInitialized) {
            windowManager.removeView(popupView)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
