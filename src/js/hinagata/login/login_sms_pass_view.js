var Backbone = require('backbone');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_sms_pass_template.html'),
		events: {
			"click .login-btn" : "execLogin",
			"click @ui.cancelBtn" : "execCancel"
		},
		initialize: function(options){
			this.smstel = options.smstel;
			this.userId = options.userId;
		},
		ui: {
//			"inputId" : "[name=user-id]",
			"inputPassword" : "[name=password]",
			"cancelBtn" : ".cancel-btn"
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
//			this.ui.inputId.val( auth.userid );
//			this.ui.inputPassword.val( auth.password );
		},
		execLogin: function(){
			console.log('execLogin smstel:' + this.smstel);
			var smstel = this.smstel;
			var userId = this.userId;
			console.log('execLogin done userId:' + userId);
			var password = this.ui.inputPassword.val();
			if (password == "") {
				applican.notification.alert("パスワードを入力してください。", App.doNothing, "", "OK");
			} else {
				var loginRequest = function(){
					return App.util.bindCommonErrorHandling(
						App.btApi.loginSms( smstel, password),
						{ ignoreStatuses: [401,404] }
					);
				};

				// ログインリクエストを実行
				App.util.execWithProgressScreen( loginRequest )
				.done( function(data){
					// ログインが成功したら、smstelのみ保存
					App.appModel.setAuthAndSave( { smstel: smstel, password: password, tokentemp: data.accessToken, token: "" } );
//					var sid = userId + smstel.substr(-4);
//					var url = AppConf.url.registerForm + '&SID=' + sid;
//					location.href = url;

					var url = '#loginSmsMenu?userId=' + userId;
//					location.hash = url + '&launch_webview=yes';
					location.hash = url;
				}).fail(function(err){
					if(err.status === 401){
						applican.notification.alert("認証に失敗しました。番号認証に戻ってやり直してください", App.doNothing, "", "OK");
					} else if (err.status === 404){
						applican.notification.alert("ユーザ名とパスワードの組み合わせが間違っています", App.doNothing, "", "OK");
					}else{
						// その他のエラーは bindCommonErrorHandling でハンドル済み
					}
				});
			}
		},
		execCancel: function(){
			App.pageSlider.backAndRestartHistory();
		},
	});

	return LoginView;

})();
