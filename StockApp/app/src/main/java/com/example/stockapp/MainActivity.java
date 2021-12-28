package com.example.stockapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    Button stockPriceButton;
    TextView textView;
    EditText userText;
    String stockName;
    TextView resultTextView;




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //textView = (textView) findViewById(R.id.StockNameInput);
        userText = (EditText) findViewById(R.id.StockNameText);
        stockPriceButton = (Button) findViewById(R.id.getPriceButton);
        resultTextView = (TextView) findViewById(R.id.responsTextView);


        stockPriceButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                stockName = (String) userText.getText().toString();
                /*
                log.i("Main Activity Got Stock Name", stockName);
                resultTextView.setText(stockName);
                */
              fetchStockPrice(v);
            }
        });

    }


    public void fetchStockPrice(final View view) {
        final StockPriceFetcher fetcher = new StockPriceFetcher(view.getContext());

        //Loading Box
        final ProgressDialog progressDialog = new ProgressDialog(this);
        progressDialog.setMessage("Fetching Stock...");
        progressDialog.show();


        fetcher.dispatchRequest(new StockPriceFetcher.StockPriceResponseListener() {
            @Override
            public void onResponse(StockFetcher.StockResponse response) {
                progressDialog.hide();

                if (response.isError) {
                    Toast.makeText(view.getContext(), "Error while fetching Stock", Toast.LENGTH_LONG);
                    return;
                }
                resultTextView.setText(response["price"]);
}