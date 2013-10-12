package com.kdh.cobookee.activity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;

import com.kdh.cobookee.R;

public class IntroActivity extends Activity {

	public static final int INTRO_DELAY_TIME = 1500;
	Context context;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.intro_activity);
		context = this;
		Handler handler = new Handler() {
			@Override
			public void handleMessage(Message msg) {
				super.handleMessage(msg);
				startActivity(new Intent(context, LoginActivity.class));
				finish();
			}
		};
		handler.sendEmptyMessageDelayed(0, INTRO_DELAY_TIME);

	}

}
