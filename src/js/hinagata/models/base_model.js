var Backbone = require('backbone');
module.exports = (function () {
	var BaseModel = Backbone.Model.extend({
		fetchWithAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addAuthenticationHeaderToXHR }); 

			var on401 = _options.on401 || function(){
				/*
				var showLogin = function(){
					location.hash = "login";
				};
				applican.notification.alert('ログインしていません', showLogin, "","OK");
				*/
				// #7146 対応
				applican.notification.alert('ログインしていません', App.doNothing, "","OK");
				if( AppConf.features.sms ){
					location.hash = "loginSms";
				} else {
					location.hash = "login";
				}
			};

			return this.fetch(_options)
			.fail(function(res){
				if( res.status === 401 ){
					on401();
				}
			});
		},
		fetchWithoutAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addApplicationHeaderToXHR }); 
			return this.fetch(_options);
		},
	});
	return BaseModel;
})();
