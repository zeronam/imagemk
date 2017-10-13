var MainNavView = require('./main_nav/main_nav_view');
var LoginLayout = require('./login/login_layout');
var LoginSmsTelLayout = require('./login/login_sms_tel_layout');
var LoginSmsPassLayout = require('./login/login_sms_pass_layout');
var LoginSmsMenuLayout = require('./login/login_sms_menu_layout');
var MainNavCollection = require('./main_nav/main_nav_collection.js');
var Backbone = require('backbone');
var querystring = require('querystring');

module.exports = (function(){

	var Router = Backbone.Router.extend({

		routes:{
			"" : "showMenue",
			"login" : "showLogin",
			"loginSms" : "showLoginSms",
			"loginSmsPass(?:query)" : "showLoginSmsPass",
			"loginSmsMenu(?:query)" : "showLoginSmsMenu",
			"clear" : "clearLoacalStorage",
		},

		showLogin: function(){
			var loginLayout = new LoginLayout();
			loginLayout.render();
			App.pageSlider.slidePage( loginLayout);
			App.headerModel.applyViewHeaderConf( loginLayout.headerConf );
		},
		showLoginSms: function(){
			var loginLayout = new LoginSmsTelLayout();
			loginLayout.render();
			App.pageSlider.slidePage( loginLayout);
			App.headerModel.applyViewHeaderConf( loginLayout.headerConf );
		},
		showLoginSmsPass: function(query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			console.log('showLoginSmsPass smstel:' + queryObj.smstel);
			var loginPassLayout = new LoginSmsPassLayout(
				{smstel: queryObj.smstel, userId: queryObj.userId}
			);
			loginPassLayout.render();
			App.pageSlider.slidePage( loginPassLayout);
			App.headerModel.applyViewHeaderConf( loginPassLayout.headerConf );
		},
		showLoginSmsMenu: function(query){
			var _query = query || {};
			var queryObj = querystring.parse(query);
			console.log('showLoginSmsPass smstel:' + queryObj.smstel);
			var loginMenuLayout = new LoginSmsMenuLayout(
				{smstel: queryObj.smstel, userId: queryObj.userId}
			);
			loginMenuLayout.render();
			App.pageSlider.slidePage( loginMenuLayout);
			App.headerModel.applyViewHeaderConf( loginMenuLayout.headerConf );
		},

		showMenue: function(){
			var collection = new MainNavCollection([
				{ href: "#login", text: "ログイン"},
				{ href: "#clear", text: "クリアStorage"},
			]);
			var mainNavView = new MainNavView({ navCollection: collection });

			mainNavView.render();
			App.pageSlider.slidePage( mainNavView );
			App.headerModel.applyViewHeaderConf( mainNavView.headerConf );
			mainNavView.trigger("load:sync");
		},
		clearLoacalStorage: function(){
			localStorage.clear();
		}

	});

	return Router;


})();
