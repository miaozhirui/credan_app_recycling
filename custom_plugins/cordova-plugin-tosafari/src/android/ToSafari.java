package com.hand.tosafari;

import android.content.Intent;
import android.net.Uri;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class ToSafari extends CordovaPlugin{

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {


        if("toSafari".equals(action)) {

            String url = args.getString(0);
            Uri uri = Uri.parse(url);
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);

            cordova.getActivity().startActivity(intent);
        }
        return false;
    }

}