package com.example.stockapp;
import android.content.Context;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;


public class StockPriceFetcher {

    private RequestQueue _queue;
    private final static String REQUEST_URL = "http://127.0.0.1:8080/stock?symbol=AAPL";

    public StockPriceFetcher(Context context) {
        _queue = Volley.newRequestQueue(context);
    }



    public class PriceResponse {

        public boolean isError;
        public String symbol;
        public String price;

        public PriceResponse(boolean isError, String symbol,  String price) {
            this.isError = isError;
            this.symbol = symbol;
            this.price = price;
        }
    }

    public interface StockPriceResponseListener {
        public void onResponse(PriceResponse response);

    }


    private PriceResponse createErrorResponse() {
        Log.i("In fetcher", "In Creat arror response");
        return new PriceResponse(true, null, "0");
    }

    public void dispatchRequest(final StockPriceResponseListener listener) {
        Log.i("In fetcher", "In fetcher");
        //JSONObject response = new JSONObject();
        JsonObjectRequest req = new JsonObjectRequest(Request.Method.GET, REQUEST_URL  , null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
//                        Log.i("In fetcher", "On Response");
                        try {
                            //never gets here - doesnt connect to server.
                            Log.i("In fetcher", "In Try");
                            PriceResponse res = new PriceResponse(false,
                                    response.getJSONObject("Global Quote").getString("01. symbol"),
                                    response.getJSONObject("Global Quote").getString("05. price"));
                            listener.onResponse(res);
                        }
                        catch (JSONException e) {
                            Log.i("catch", "in jason exception");
                            String error = "The error is : "+ e;
                            Log.i("exception" , error);
                            listener.onResponse(createErrorResponse());
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse (VolleyError error) {
                Log.i("In fetcher", "In Error Response");

                listener.onResponse(createErrorResponse());
            }
        });

        _queue.add(req);
    }
}
