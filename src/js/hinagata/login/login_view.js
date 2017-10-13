var Backbone = require('backbone');
module.exports = (function () {
	var LoginView = Backbone.Marionette.ItemView.extend({
		template: require('./login_template.html'),
		events: {
			"click .login-btn" : "execLogin",
			"click @ui.cancelBtn" : "execCancel"
		},
		ui: {
			"inputId" : "[name=user-id]",
			"inputPassword" : "[name=password]",
			"cancelBtn" : ".cancel-btn"
		},
		onRender: function(){
			var auth = App.getAuthInfo(); 
			this.ui.inputId.val( auth.userid );
			this.ui.inputPassword.val( auth.password );
		},
		execLogin: function(){
			var userid = this.ui.inputId.val();
			var password = this.ui.inputPassword.val();
			var loginRequest = function(){
				return App.util.bindCommonErrorHandling(
					App.btApi.login( userid, password),
					{ ignoreStatuses: [404] }
				);
			};

			// ログインリクエストを実行
			App.util.execWithProgressScreen( loginRequest )
			.done( function(data){
				// ログインが成功したら、ID/PASSを永続化して以前の画面に戻る
				App.appModel.setAuthAndSave( { userid: userid, password: password, token: data.accessToken } );
				App.pageSlider.back();
				App.vent.trigger( 'app-login' , { userid: userid, password: password, token: data.accessToken });
			}).fail(function(err){
				if(err.status === 404){
					applican.notification.alert("ユーザ名とパスワードの組み合わせが間違っています", App.doNothing, "", "OK");
				}else{
					// その他のエラーは bindCommonErrorHandling でハンドル済み
				}
			});
		},
		execCancel: function(){
			App.pageSlider.backAndRestartHistory();
		},
	});

	return LoginView;

})();
