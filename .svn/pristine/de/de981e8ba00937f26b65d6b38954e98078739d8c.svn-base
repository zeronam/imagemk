var Backbone = require('backbone');

module.exports = (function () {
	var MainView = Backbone.Marionette.ItemView.extend({
		template: function (modelSerializedData){
			switch ( modelSerializedData.type ) {
				case "default":
					return require('./my_page.html')(modelSerializedData);
					break;
				case "myPage":
					return require('./my_page.html')(modelSerializedData);
					break;
			};
		}
	});

	return MainView;

})();