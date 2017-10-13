var Backbone = require('backbone');

module.exports = (function () {
	var DialogueItemView = Backbone.Marionette.ItemView.extend({
		template: require('./dialogue_item_template.html'),
	});
	
	return DialogueItemView;

})();