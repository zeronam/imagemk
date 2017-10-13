var Backbone = require('backbone');
var BaseModel = require('../models/base_model.js');
module.exports = (function () {
	var MainNavModel = BaseModel.extend({
		url: AppConf.url.appRoot + "/information/list",
		parse: function(response) {
			return response;
		},
		fetchWithoutLogin: function( registrationId , options){
			var _options = _.extend( options || {}, { url: this.url + "?registrationId=" + registrationId } );
			return this.fetchWithoutAuthInfo( _options );
		}
	});

	return MainNavModel;
})();
