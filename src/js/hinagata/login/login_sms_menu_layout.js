var Backbone = require('backbone');
module.exports = (function () {
	var ConfigTopLayoutView = Backbone.Marionette.LayoutView.extend({

		template: require('./login_sms_menu_layout_template.html'),
		regions: {
		},
		ui: {
			"registCardUserBtn" : "#regist-carduser-btn",
			"registUserBtn" : "#regist-user-btn"
		},
		events: {
			"click @ui.registCardUserBtn" : "openRegistCardUserWindow",
			"click @ui.registUserBtn" : "openRegistUserWindow"
		},
		initialize: function(options){
			this.userId = options.userId;

			var auth = App.getAuthInfo();
			this.smstel = auth.smstel;
			console.log("userId:" + this.userId );
			console.log("smstel:" + this.smstel );
		},
		headerConf: {
			title: "メニュー",
			showBackButton: true,

		},
		onRender: function(){
			App.util.hideProgressScreen();
		},
		openRegistCardUserWindow: function(){
			var sid = this.userId + this.smstel.substr(-4);
			var url = AppConf.url.registerFormCard + '&SID=' + sid;
			console.log("sid:" + sid );

			location.href = url + '&launch_webview=yes';
//			location.href = url;
		},
		openRegistUserWindow: function(){
			var sid = this.userId + this.smstel.substr(-4);
			var url = AppConf.url.registerForm + '&SID=' + sid;
			console.log("sid:" + sid );

			location.href = url + '&launch_webview=yes';
//			location.href = url;
		}
	});

	return ConfigTopLayoutView;
})();
