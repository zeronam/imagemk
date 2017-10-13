var Backbone = require('backbone');
var querystring = require('querystring');
module.exports = (function () {

	/**
	 * APPの基底Backbone.Collectionクラス
	 * options
	 *  pagination: ページングするか否か
	 */
	var BaseCollection = Backbone.Collection.extend({
		initialize: function(options){
			var options = options || {};
			this.pagination = options.pagination || false;
			this.maxPage = 1;
			this.currentPage = 0;
		},
		/**
		 * Backbone.Collection#fetchのWrapper
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetch のオプション
		 *           getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		_fetch: function( options ){
			var options = options || {};
			if( options.remove !== false ){
				this._resetPaging();
			}
			var getParams  = _.extend( options.getParams || {} , this._getOptionsForPagination() );

			if( options.url ){
				options.url = options.url +  "&" + querystring.encode( getParams );
			}else{
				options.url = this.url + "?" + querystring.encode( getParams );
			}

			var _this = this;
			return this.fetch(options)
			.done(function(data){
				_this.currentPage = data.page;
				_this.maxPage = data.maxPage;
				_this.trigger("page-info-has-been-set");
			});
		},
		/**
		 * ヘッダに認証情報を付与した後にajaxを発行(Backbone.Collection#fetch)
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetchのoptions
		 *        : on401 - トークンが無効の場合の動作(デフォルト: alert->ログイン画面へ遷移)
		 *          getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
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

			return this._fetch(_options)
			.fail(function(res){
				if( res.status === 401 ){
					on401();
				}
			});
		},
		/**
		 * ヘッダにApplicationIdを付与してajaxを発行(Backbone.Collection#fetch)
		 * returns jqXHR : Backbone.Collection#fetch と同様
		 * options : Backbone.Collection#fetchのoptions
		 *          getParams: URLに含めたいパラメータ ex{id: 1, name: "a"} #=> id=1&name=a 
		 */
		fetchWithoutAuthInfo: function(options){
			var _options = _.extend(options || {}, { beforeSend: App.addApplicationHeaderToXHR }); 
			return this._fetch(_options);
		},
		/**
		 * returns boolean:ページングの最終ページまで読み込んだか否かを戻す
		 *                 ページングしていない場合は最後まで読み込んだと判定
		 */
		isAtLastPage: function(){
			return !this.pagination || this.maxPage <= this.currentPage;
		},
		/**
		 * ページ情報をリセットする
		 */
		_resetPaging: function(){
			this.maxPage = 0;
			this.currentPage = 0;
		},
		// 現在のページングに応じた、ページネーション用のURLパラメータ
		_getOptionsForPagination: function(){
			if( this.pagination ){
				return { page: (this.currentPage || 0) + 1, perPage: AppConf.core.defaultPerPage };
			}else{
				return {};
			}
		},
	});
	return BaseCollection;
})();
