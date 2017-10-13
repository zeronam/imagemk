/**
 * 雛形アプリにおけるでバッジ設定用メソッド郡を提供
 */
module.exports = (function () {

	var BadgeUtil = {
		setBadgeAppIcon: function( unReadCounts ){
			if ( unReadCounts >= 1 ) {
				applican.localNotification.setBadgeNum(1);
			}else {
				applican.localNotification.setBadgeNum(0);
			}
		},
	}; 

	return BadgeUtil;

})();
