/**
 * 雛形アプリにおける日付操作を共通かしたメソッド群を提供
 */

var moment = require("moment");
module.exports = (function () {

	var DateUtil = {
		isToday: function( date ){
			return DateUtil.atSameDate( date, new Date() );
		},
		atSameDate: function(date1, date2){
			var format = "YYYYMMDD";
			return moment(date1).format(format) === moment(date2).format(format);
		}
	};
	return DateUtil;
})();
