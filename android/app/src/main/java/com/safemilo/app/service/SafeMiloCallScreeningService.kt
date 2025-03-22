package com.safemilo.app.service

import android.content.ClipDescription
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.telecom.Call
import android.telecom.CallScreeningService
import android.widget.Toast
import com.facebook.react.bridge.UiThreadUtil.runOnUiThread
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import org.json.JSONObject
import java.util.Date
import kotlin.concurrent.thread

class SafeMiloCallScreeningService : CallScreeningService() {

    private val gson = Gson()

    private fun getPreferences(): SharedPreferences {
        return applicationContext.getSharedPreferences(applicationContext.packageName + ".settings", Context.MODE_PRIVATE)
    }

    data class SpamNumber(
        val number: String,
        val description: String,
        val timestamp: String
    )

    override fun onScreenCall(callDetails: Call.Details) {
        val incomingNumber = callDetails.handle.schemeSpecificPart

        val response = CallResponse.Builder()

        // Validate the number asynchronously
        if(incomingNumber != null && incomingNumber.isNotEmpty()){
            validateNumberWithApi(incomingNumber) { isSpam ->
                if (isSpam) {

                    try{
                        val intent = Intent(this, PopupService::class.java)
                        intent.putExtra("PHONE_NUMBER", incomingNumber)
                        val existing = getPreferences().getString("SPAM_NUMBERS","[]")?:"[]"

                        val spamNumbers: MutableList<SpamNumber> = gson.fromJson(existing, object : TypeToken<MutableList<SpamNumber>>() {}.type)

                        spamNumbers.add(SpamNumber(
                            number=incomingNumber,
                            description = "",
                            timestamp = Date().toString()

                        ))

                        getPreferences().edit().putString("SPAM_NUMBERS", gson.toJson(spamNumbers)).apply()

                        startService(intent)

                    }catch (e: Exception){
                        Toast.makeText(applicationContext, e.message, Toast.LENGTH_LONG).show()
                    }

                }
            }
        }

        // Respond to the call after validation
        respondToCall(callDetails, response.build())
    }

    private fun validateNumberWithApi(phoneNumber: String, callback: (Boolean) -> Unit) {
        // Perform the network request in a background thread

        thread {
            val client = OkHttpClient()
            val token = getPreferences().getString("token","")
            val request = Request.Builder()
                .url("http://34.235.29.56:8080/verifynumber/$phoneNumber")
                .addHeader("Authorization", "Bearer $token")
                .build()

            try {
                val response: Response = client.newCall(request).execute()

                if (response.isSuccessful) {
                    // Get the response body as a string
                    val responseBody = response.body?.string()

                    // Parse the response as JSON and check if it's a spam number
                    val isSpam = if (responseBody != null) {
                        val res = JSONObject(responseBody)
                        res.getBoolean("IsSpam")
                    } else {
                        false
                    }

                    // Callback with the result (main thread-safe)
                    runOnUiThread {
                        callback(isSpam)
                    }
                } else {
                    // In case of network failure, consider the number as not spam
                    runOnUiThread {
                        callback(false)
                    }
                }
            } catch (e: Exception) {
                // Handle exceptions (e.g., no network, invalid response)
                runOnUiThread {
                    callback(false)
                }
            }
        }
    }
}
