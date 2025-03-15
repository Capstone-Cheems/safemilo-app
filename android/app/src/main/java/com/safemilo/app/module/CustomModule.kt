package com.safemilo.app.module

import android.content.Context
import android.content.SharedPreferences
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CustomModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "CustomModule"
    }

    @ReactMethod
    fun setToken(token:String){
        Toast.makeText(reactApplicationContext.applicationContext, "$token is Spam", Toast.LENGTH_LONG).show()
        getPreferences().edit().putString("token", token).apply()
    }
    private fun getPreferences(): SharedPreferences {
        return reactApplicationContext.applicationContext.getSharedPreferences(reactApplicationContext.applicationContext.packageName + ".settings", Context.MODE_PRIVATE)
    }
}