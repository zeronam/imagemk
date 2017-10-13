var _ = require("underscore");
var dummyLivepassSetting = {
	apiKey: "xxxx",
	apiSecret: "xxxx",
	notificationEnabled: false,
	locationEnabled: false,
};
// アプリカンAPIのWRAPPERメソッドの集合体
module.exports = (function () {

	var ApplicanEx = function(options){
	};

	ApplicanEx.prototype = {
		alert: function(){
		},
		getCurrentPositionPromiss: function(options){
			var options = options || {};
			options.timeout = AppConf.core.geolocationTimeout;
			var dfd = $.Deferred();
			var success = function( result ){
				dfd.resolve( result );
			};
			var error = function( err ){
				dfd.reject( err );
			};
			applican.geolocation.getCurrentPosition( success, error, options );
			return dfd.promise();
		},
		// Livepass 管理画面に端末を登録し、RegistrationIDを取得する
		getBtPushTokenPromise: function(){
			var dfd = $.Deferred();
			var success = function(result){
				console.log("push registration success:" + result.registrationId );
				dfd.resolve( result );
			};
			var error = function(error){
				dfd.reject( error );
			};

			var livepassConfig = AppConf.livePass[applican.device.platform] || dummyLivepassSetting;
			var apiKey = livepassConfig.apiKey;
			var apiSecret = livepassConfig.apiSecret;
			var apiSenderId = livepassConfig.senderId;

			applican.livepass.start( apiKey, apiSecret, success, error, apiSenderId);
			

			return dfd.promise();
		},
		// Livepass に PushのOn/off、ロケーション利用のOn/Offの設定を反映させる
		livepassSetSettingsPromise: function(){
			var dfd = $.Deferred();
			var success = function(result){
				dfd.resolve( result );
			};
			var error = function(error){
				dfd.reject( error );
			};
			var livepassConfig = AppConf.livePass[applican.device.platform] || dummyLivepassSetting;
			var options = {
				locationEnabled: livepassConfig.locationEnabled,
				notificationEnabled: livepassConfig.notificationEnabled,
			};
			applican.livepass.setSettings(options, success, error);
			return dfd.promise();
		},
	};

	ApplicanEx.consts = {
		device: {
			iOS: "iOS",
			android: "Android",
		},
	};
	return ApplicanEx;

})();
