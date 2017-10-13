var Backbone = require('backbone');

module.exports = (function(){
	var HeaderModel = Backbone.Model.extend({
		defaults: {
			title: "Applican Sample",
			showBackButton: true,
		},
		applyViewHeaderConf: function( headerConf ){
			if( !headerConf ) return;

			headerConf.customeBackAction = headerConf.customeBackAction || void(0);
			headerConf.hideHeader = headerConf.hideHeader || false;
			this.set( headerConf );
		},
	});

	return HeaderModel;


})();
