var Backbone = require('backbone');

module.exports = (function () {
	var SelectIconItemView = Backbone.Marionette.ItemView.extend({
		template: require('./app_select_icon_item_view.html'),
	});
	
	return SelectIconItemView;

})();