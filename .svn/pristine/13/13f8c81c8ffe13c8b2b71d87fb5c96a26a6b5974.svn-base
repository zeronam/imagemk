var Backbone = require('backbone');
var LoginView = require('./login_sms_pass_view.js');
module.exports = (function () {

	var LoginLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./login_sms_pass_layout_template.html'),
		regions: {
			"loginMainRegion": "#login-main-region"
		},
		initialize: function(options){
			this.smstel  = options.smstel;
			this.userId  = options.userId;
			console.log('initialize done userId:' + this.userId);
		},
		onRender: function(){
			this._renderLoginMain();
			App.util.hideProgressScreen();
		},
		headerConf: {
			title: "ログイン",
			showBackButton: true,
			customeBackAction: function(){
				App.pageSlider.backAndRestartHistory();
			}
		},
		_renderLoginMain: function(){
//			console.log('_renderLoginMain smstel:' + this.smstel);
			console.log('_renderLoginMain done userId:' + this.userId);
			this.loginMainRegion.show( new LoginView({smstel: this.smstel, userId: this.userId}) );
		}
	});

	return LoginLayout;
})();
