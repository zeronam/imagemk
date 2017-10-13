var Backbone = require('backbone');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_sms_tel_template.html'),
		events: {
			"click .login-btn" : "sendSms",
			"click @ui.cancelBtn" : "execCancel"
		},
		ui: {
			"inputSmstel" : "[name=smstel]",
			"inputPassword" : "[name=password]",
			"cancelBtn" : ".cancel-btn"
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
			this.ui.inputSmstel.val( auth.smstel );
//			this.ui.inputPassword.val( auth.password );
		},
		sendSms: function(){
			var smstel = this.ui.inputSmstel.val();
			if (smstel == "") {
				applican.notification.alert("電話番号を入力してください。", App.doNothing, "", "OK");
			} else {
				var loginRequest = function(){
					return App.util.bindCommonErrorHandling(
						App.btApi.sendsms(smstel),
						{ ignoreStatuses: [400] }
					);
				};

				// ログインリクエストを実行
				App.util.execWithProgressScreen( loginRequest )
				.done( function(data){
					var userId = data.userId;
//					var passwordOne = data.passwordOne;
					console.log('sendsms done userId:' + userId);
//					console.log('sendsms done passwordOne:' + passwordOne);
					if (userId) {
//						console.log('sendsms done smstel:' + smstel);
						location.hash = '#loginSmsPass?userId=' + userId + '&smstel=' + smstel;
					}
				}).fail(function(err){
					if(err.status === 400){
						applican.notification.alert("電話番号を確認してください", App.doNothing, "", "OK");
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
