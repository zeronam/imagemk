var Backbone = require('backbone');

module.exports = (function () {
	var AppDesignSelectItemView = Backbone.Marionette.ItemView.extend({
		template: function (modelSerializedData){
			switch ( modelSerializedData.type ) {
				case "default":
					return require('./app_design_fixed_template.html')(modelSerializedData);
					break;
				case "fixed4":
					return require('./app_design_select_4icon_template.html')(modelSerializedData);
					break;
				case "fixed5":
					return require('./app_design_select_5icon_template.html')(modelSerializedData);
					break;
				case "fixed3":
					return require('./app_design_select_3icon_template.html')(modelSerializedData);
					break;
			};
		}
	});

	return AppDesignSelectItemView;

})();