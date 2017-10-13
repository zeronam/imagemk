// アプリケーション設定を記述
// browserifyでビルドした後でも変更可能なように、純粋なjsファイルとして記述
// window直下のグローバルオブジェクトとして AppConf を定義し、その下に設定を記述する。
// 雛形アプリ上では、実行時にwindow.AppConfが定義されているかどうかをチェックすること。
window.AppConf = {};

AppConf.core = {
	// applicationId: "ucxpkhxmygdjtqhh",          // ApplicationId jrwxejxpy4c1yelo
	// localStorageKey: "ucxpkhxmygdjtqhh",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し
	applicationId: "jw2Mim8s4iB9FicA",          // ApplicationId jrwxejxpy4c1yelo
	localStorageKey: "jw2Mim8s4iB9FicA",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し
	debug: false,                               //
	defaultPerPage: 100,                         // NOTE: under development
	geolocationTimeout: 5000,                   // 位置情報取得のタイムアウト時間を設定
};

// sms、valuecard用
//AppConf.core = {
//	applicationId: "QufVSOh5uCazJWqf",          // ApplicationId jrwxejxpy4c1yelo
//	localStorageKey: "QufVSOh5uCazJWqf",        // ローカルストレージに保存する際のKey:通常はapplicationIdと同様で問題無し
//	debug: false,                               //
//	defaultPerPage: 100,                         // NOTE: under development
//	geolocationTimeout: 5000,                   // 位置情報取得のタイムアウト時間を設定
//};

AppConf.url = {
	// appRoot: 'https://mdh.fm/btapi',            // APIのルートURL ex::https://mdh.fm/dtapi
	// appRoot: 'http://bt01.betrend.com/btapi',            // APIのルートURL for device(staging)
	appRoot: 'http://sgpweb.betrend.com/btapi',            // APIのルートURL for device(staging)
	// appRoot: 'http://dev.bemss.jp/btapi',            // APIのルートURL for local
	// appRoot: 'http://dev.bemss.jp/btapisgp',            // APIのルートURL for local
	registerUser: 'http://bemss.jp/tigerdemo1/cont109.php',    // 会員登録URL
	modifyUserInfo: 'http://google.co.jp',        // 会員情報変更URL
	term: 'http://google.co.jp',                  // 利用規約URL
	privacyPolicy: 'http://google.co.jp',         // プライバシーポリシーURL
	forgetPassword: 'https://bemss.jp/tigerdemo1/mpc_forgot.php',        // パスワードを忘れた方はコチラのURL
	registerForm: 'https://mdh.fm/e?kZ1032HKFL&blmid=%34%39%37%38',    // 空メールからの戻りが一つの場合、通常はこちらを使う
	registerFormCard: 'https://mdh.fm/e?kXXXXXXXX&smstid=xxx',    // sms認証の場合のみで使用、カード番号あり用のフォーム
	registerForms : {    // 空メールからの戻りが複数の場合(ftypeでの出しわけ時)でのみ使用
		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&blmid=xxxx",
		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&blmid=xxxx",
	},
};

// sms、valuecard用
//AppConf.url = {
//	appRoot: 'http://bt01.betrend.com/btapi',            // APIのルートURL for device(staging)
////	appRoot: 'https://mdh.fm/btapi',            // APIのルートURL ex::https://mdh.fm/dtapi
//	registerUser: 'http://google.co.jp',    // 会員登録URL
//	modifyUserInfo: 'https://bt01.betrend.com/e?kN102UDXbnj',        // 会員情報変更URL
//	term: 'http://google.co.jp',                  // 利用規約URL
//	privacyPolicy: 'http://google.co.jp',         // プライバシーポリシーURL
//	forgetPassword: 'http://google.co.jp',        // パスワードを忘れた方はコチラのURL
//	registerForm: 'https://bt01.betrend.com/e?kN102UDXbox&smstid=2993',    // 空メールからの戻りが一つの場合、通常はこちらを使う
//	registerFormCard: 'https://bt01.betrend.com/e?kN102UDXbni&smstid=2993',    // sms認証の場合のみで使用、カード番号あり用のフォーム
//	registerForms : {    // 空メールからの戻りが複数の場合(ftypeでの出しわけ時)でのみ使用
//		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&blmid=xxxx",
//		'kXXXXXXXX': "https://mdh.fm/e?kXXXXXXXX&blmid=xxxx",
//	},
//};

AppConf.text = {
	shopName: "Porto",
};

/**
 * レイアウト関連の設定
 */
AppConf.layout = {
	navColumns : 3, // トップページのレイアウト 2カラムか3カラムか
	stamp: {
		initialStampCount: 10 // スタンプのカウント
	},
};

/**
 * 各種機能のON/OFF
 * NOTE: 現状はUIには反映されない（機能の読み込みのみ抑制:ボタン押しても動かない）
 * sms:sms認証
 * smart:valuecard
 */
AppConf.features = {
	config: false,
	coupon: false,
	stamp: false,
	shop: false,
	point: false,
	information: false,
	history: false,
	chirashi: false,
	scratch: false,
	autologin: false,
	slideshow: false,
	sms: false,
	smart: false,
	autoregist: false,
	appDesign: true
};

/**
 * livepass用
 */
AppConf.livePass = {
	"iOS" : {
		apiKey: "7uxoivlwg0thav3673fm7jvggi43i304i2g24j9g50q7laz4",
		apiSecret: "ii7ovamd7r7i14ea2gtmcpg3ck1fgj7p",
		locationEnabled: true,
		notificationEnabled: true,
		senderId: "",
	},
	"Android" : {
		apiKey: "nth67waju2l7caumevpur0xamubmdrdc8sb568fhrlu8txgu",
		apiSecret: "iyma5kcrbro54spa406ijyowhbplrxcu",
		locationEnabled: true,
		notificationEnabled: true,
		senderId: "1039588964803",
	},
}

/**
 * valuecardの履歴に表示する取引種別コード
 */
AppConf.valuecard = {
	reqClassValues: {
		"4002": "入金",
		"4003": "利用",
		"4005": "入金取消",
		"4006": "利用取消",
		"4012": "クーポン入金",
		"4015": "クーポン取消",
		"4022": "ポイント加算",
		"4023": "ポイント利用",
		"4025": "ポイント加算取消",
		"4026": "ポイント利用取消",
		"4801": "入金(web)",
		"4802": "クーポン入金(web)",
		"4803": "利用(web)",
		"4805": "入金取消(web)",
		"4806": "利用取消(web)",
		"4809": "ボーナス入金(web)",
		"4899": "アクティベート",
		"9806": "合算(合算元)",
		"9807": "合算(合算先)",
	},
};

/**
 * DEMO用の設定
 */
AppConf.demo = {
	// チラシ機能の設定
	chirashi: {
		viewer: "http://bt11.betrend.com/chirashi/index.php",

		chirashi1: {
			imageUrl: "http://bt21.betrend.com/test/chirashi/mrk09/flyer_1.jpg",
			thumbnailUrl: "http://bt21.betrend.com/test/chirashi/mrk09/thumb_1.jpg",
			title: "チラシサンプル 7/14〜7/17 1",
		},
		chirashi2: {
			imageUrl: "http://bt21.betrend.com/test/chirashi/mrk09/flyer_2.jpg",
			thumbnailUrl: "http://bt21.betrend.com/test/chirashi/mrk09/thumb_2.jpg",
			title: "チラシサンプル 7/14〜7/17 2",
		},
	},
};

/**
クーポン一覧の設定
**/
AppConf.couponList = {
	// 利用不可クーポンも含め全て表示する
	showAll: true,
};

AppConf.slideshow = {
	autoplaySpeed: 1500,
	speed: 700,
	slideshowContentsList: [
		{
			linkUrl: "",
			webviewFlag: "0",
			imageUrl: "./image/top/img_logo_bg.jpg"
		}
	]
};
