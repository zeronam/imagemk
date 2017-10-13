window.App = {};

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackButton, false);

function onDeviceReady(){

	if( !window.AppConf ){
		applican.notification.alert("アプリ設定が読み込まれていません", function(){ return false; }, "title", "OK");
		return;
	} 

	App = require('./app.js');
	App.start();
};

// Android戻るボタンサポート(TOPで終了)
function onBackButton(){
	var url = document.location.href;
	if (url.match("(.+/index.html$|.+/index.html#$)")) {
	    applican.notification.confirm(
		"アプリを終了しますか？", onFinish, "終了", "終了する,キャンセル");
	} else {
		history.back();
	}
}

function onFinish(num) {
	if (num == 1) {
		applican.finish();
	}
}
