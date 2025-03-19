package com.safemilo.app.module

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class CustomModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "CustomModule"
    }

    @ReactMethod
    fun setToken(token:String){
        getPreferences().edit().putString("token", token).apply()
    }

    @ReactMethod
    fun getMessages(callback: Callback){
        callback.invoke(getPreferences().getString("MESSAGES","[]"))
    }

    @ReactMethod
    fun getSpamNumbers(callback: Callback){
        callback.invoke(getPreferences().getString("SPAM_NUMBERS","[]"))
    }
    private fun getPreferences(): SharedPreferences {
        return reactApplicationContext.applicationContext.getSharedPreferences(reactApplicationContext.applicationContext.packageName + ".settings", Context.MODE_PRIVATE)
    }
}