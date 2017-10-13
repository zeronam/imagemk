var Backbone = require('backbone');
var LoginView = require('./login_view.js');
module.exports = (function () {

	var LoginLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./login_layout_template.html'),
		regions: {
			"loginMainRegion": "#login-main-region"
		},
		initialize: function(){
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
			this.loginMainRegion.show( new LoginView() );
		}
	});

	return LoginLayout;
})();
