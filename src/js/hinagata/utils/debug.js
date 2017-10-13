/**
 * 雛形アプリにおけるでバッグ用メソッド郡を提供
 */
module.exports = (function () {

	var DebugUtil = {
		log: function( arg ){
			if( !AppConf.core.debug ) return;
			console.log( arg );
		},
	}; 

	return DebugUtil;

})();
