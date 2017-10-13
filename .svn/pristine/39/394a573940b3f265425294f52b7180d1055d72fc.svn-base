var moment = require('moment');

module.exports = (function () {

	var TextUtil = {
		nl2br: function(str){
			if(!str) return "";
			return str.replace(/[\n\r]/g, "<br />");
		}, 
		numberWithDelimiter: function( number ){
			return String(number).toString().replace(/(\d)(?=(\d\d\d)+$)/g , '$1,');
		},
		cardnumWithDelimiter: function( cardnum ){
			if (!_.isString(cardnum)) {
				return '登録されていません';
			}

			return String(cardnum).toString().replace(/(\d)(?=(\d\d\d\d)+$)/g , '$1 ');
		},
		formatDate: function(dateTime){
			return moment(dateTime).format('YYYY/MM/DD');
		},
		formatExpireDate: function(number, dateTime){
			if (number == 0 || !_.isNumber(dateTime)) {
				return '';
			}
			return '(有効期限：' + this.formatDate(dateTime) + ')';
		},
		addUrlParameters: function(url, params){
			if (params instanceof Array) {
				url += (url.indexOf('?') == -1) ? '?':'&';
				url += params.join('&');
			}
			return url;
		}
	};
	return TextUtil;

})();
