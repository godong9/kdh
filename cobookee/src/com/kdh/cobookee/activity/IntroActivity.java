package com.kdh.cobookee.activity;

public class IntroActivity extends Activity {

	public static final int INTRO_DELAY_TIME = 3000;
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
