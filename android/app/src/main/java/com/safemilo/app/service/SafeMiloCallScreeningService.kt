package com.safemilo.app.service

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.telecom.Call
import android.telecom.CallScreeningService
import android.util.Log
import android.widget.Toast

class SafeMiloCallScreeningService : CallScreeningService() {

    override fun onScreenCall(callDetails: Call.Details) {
        val incomingNumber = callDetails.handle.schemeSpecificPart

        Toast.makeText(applicationContext, incomingNumber, Toast.LENGTH_LONG).show()
        Log.d("CallScreening", "Incoming Call: $incomingNumber")

        val response = CallResponse.Builder().build()
        // Respond to the call
        respondToCall(callDetails, response)
    }
}