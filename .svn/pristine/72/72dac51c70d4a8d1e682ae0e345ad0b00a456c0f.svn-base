// Libraries
// 
window.$ = require('jquery');
window._ = require('underscore');
var Backbone = require('backbone');

// App Core
var Router = require('./router');
var AppModel = require('./models/app_model');
var MainLayout = require('./main_layout.js');
var HeaderModel = require('./header/header_model.js');
var PageSlider = require('../../../lib/components/pageslider/pageslider')($);

// Features

// UTILS
var TextUtil = require('./utils/text');
var StyleUtil = require('./utils/style.js');
var DebugUtil = require('./utils/debug.js');
var DateUtil = require('./utils/date.js');
var BadgeUtil = require('./utils/badge');
var BtApi = require('./utils/bt_api');
var ApplicanEx = require('./utils/applican_ex');

/**
 * 雛形アプリのメインオブジェクト
 * グローバルにインスタンスを配置する想定
 * Backbone.Marionette.Application
 */
module.exports = (function () {
	var mainApp = new Backbone.Marionette.Application();

	// util メソッド定義
	mainApp.util = {};
	// Text 
	mainApp.util.text = TextUtil;
	// Style
	mainApp.util.style = StyleUtil;
	// Debug
	mainApp.util.debug = DebugUtil;
  	// Date
	mainApp.util.date = DateUtil;
	// Badge
	mainApp.util.badge = BadgeUtil;
	// Applican
	mainApp.applican = new ApplicanEx();
	// BT API
	mainApp.btApi = new BtApi( {
		ApplicationId : AppConf.core.applicationId,
		rootUrl: AppConf.url.appRoot
	});

	// ヘッダの内容はAppで管理
	mainApp.headerModel = new HeaderModel();

	// Appスタート
	// onDeviceReadyにてapp.startされる
	mainApp.onStart = function(){

		this.appModel = new AppModel(); 
		mainApp.listenTo( this.appModel, 'ready', function(model){

      // registration id 関連の処理
      // 
      mainApp.applican.getBtPushTokenPromise().done(function(result){
      			var old = model.getPushToken(); 
				var registrationId = result.registrationId;

				// LivepassのRegistrationIDをCRMに登録
				// mainApp.btApi.insert({
				// 	registrationId: registrationId,
				// 	old: old
				// })
				// .fail(function(){
				// 	applican.notification.alert("registration id の登録に失敗しました。", function(){}, "", "OK");
				// });

				model.set("pushToken", result.registrationId );
				model.save();
				// Livepassのセッティングを適用
				mainApp.applican.livepassSetSettingsPromise()
				.fail(function(d){ console.log("Livepass 設定情報反映エラー"); console.log(d);})
				.done(function(d){ console.log("Livepass 設定情報反映成功"); console.log(d);}) 
			});

		});

		this.appModel.safeFetch();

		this.mainLayout = new MainLayout( {el: $('#main-layout')} );
		this.mainLayout.render();
		this.pageSlider = new PageSlider({
			container: $('#master-container'),
			initialHistory: [""]
		});

		// features
		var router = new Router();
		Backbone.history.start();



		$(window).on("scroll" , function(e)
								 {
									 var bottomPos = 100;

									 var scrollHeight = $(document).height();
									 var scrollPosition = $(window).height() + $(window).scrollTop();

									 //スクロールが下に行った時の処理
									 if (scrollPosition > scrollHeight - bottomPos)
										 {
											 App.vent.trigger("reach:bottom");
                       //TODO: debug
										 }
								 });



	};



	mainApp.addAuthenticationHeaderToXHR = function(xhr){
		var auth = mainApp.getAuthInfo();
		xhr.setRequestHeader('Authorization', auth.token || "dummy" );
		mainApp.addApplicationHeaderToXHR(xhr);
	};
	mainApp.addApplicationHeaderToXHR = function(xhr){
		xhr.setRequestHeader('ApplicationId', AppConf.core.applicationId );
	};

	mainApp.vent.on('app-login', function( data ){
		// do nothing for now
	});

	mainApp.getAuthInfo = function(){
		return mainApp.appModel.get("auth");
	};



	// ローディング表示用のDOMをSTRINGで返す
	mainApp.util.injectProgressScreenDom = function(){
		return require('./progress_screen.html')();
	};

	// ローディングを表示する
	mainApp.util.showProgressScreen = function(){
		mainApp.mainLayout.$('.progress-screen').addClass('show').addClass('visible');
		mainApp.mainLayout.$('.progress-image').css({"margin-top" : (100 + window.scrollY) + "px"});
	};
	// ローディングを非表示にする
	mainApp.util.hideProgressScreen = function(){
		mainApp.mainLayout.$('.progress-screen').removeClass('visible');
		setTimeout(function(){
			mainApp.mainLayout.$('.progress-screen').removeClass('show');
		}, 220);
	};
	// リクエストの前にLoadingスクリーンを表示し、エラーまたは正常終了で消してくれる
	// 引数 : jqXHRオブジェクトを返す関数オブジェクト
	mainApp.util.execWithProgressScreen = function( reqFunction ){
		// Execution
		mainApp.util.showProgressScreen();
		return reqFunction()
		.done(function(){
			mainApp.util.hideProgressScreen();
		}).fail(function(){
			mainApp.util.hideProgressScreen();
		});
	};
	// model/collectionのリクエスト発行時にローディングスクリーンを表示し、
	// 正常、異常終了時に非表示にする
	mainApp.util.bindProgressScreen = function( view, modelOrCollection ){
		view.listenTo( modelOrCollection, 'request' , mainApp.util.showProgressScreen );
		view.listenTo( modelOrCollection, 'sync' , mainApp.util.hideProgressScreen );
		view.listenTo( modelOrCollection, 'error' , mainApp.util.hideProgressScreen );
	};

	// ajaxリクエストを返す処理に、デフォルトのエラーハンドリングを付与する
	// 引数 
	// jqXHR : jqXHRオブジェクト
	// options: ignoreStatuses - ex. [ 401, 402, 403 ]
	//          afterHandling - function which you wish to execute after common err handling
	mainApp.util.bindCommonErrorHandling =  function(jqXHR, options){
		var options = options || {};
		var ignoreStatuses = options.ignoreStatuses || [];
		var afterAlertCallback = options.afterAlertCallback || App.doNothing;

		return jqXHR.fail( function(err){
			// err.status が ignoreStatusesに含まれている場合は何もしない
			if( ignoreStatuses.indexOf(err.status) === -1){
				applican.notification.alert("エラーが発生しました。", afterAlertCallback, "", "OK");
			}
			if( options.afterHandling ){ options.afterHandling(); }
		});
	};

	mainApp.util.number = {
		roundEx: function( number, digitsAfterDecimalPoint ){
			var offset = Math.pow(10, digitsAfterDecimalPoint);
			return Math.round( number * offset  ) / offset
		},
	};

  mainApp.doNothing = function(){};

	return mainApp;

})();
