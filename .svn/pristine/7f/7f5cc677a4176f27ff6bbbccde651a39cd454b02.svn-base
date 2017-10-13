var Backbone = require('backbone');

module.exports = (function () {
	var AppDesignItemView = Backbone.Marionette.ItemView.extend({
		template: function (modelSerializedData){
			switch ( modelSerializedData.type ) {
				case "default":
					return require('./app_design_tile_template.html')(modelSerializedData);
					break;
				case "row2col2":
					return require('./app_design_2col_template.html')(modelSerializedData);
					break;
				case "row2col3":
					return require('./app_design_2row3col_template.html')(modelSerializedData);
					break;
				case "row3col2":
					return require('./app_design_3row2col_template.html')(modelSerializedData);
					break;
				case "row3col3":
					return require('./app_design_3row3col_template.html')(modelSerializedData);
					break;
//				case "tile3":
//					return require('./app_design_1row3col_template.html')(modelSerializedData);
//					break;
//				case "tile4":
//					return require('./app_design_1row4col_template.html')(modelSerializedData);
//					break;
//				case "tile5":
//					return require('./app_design_1row5col_template.html')(modelSerializedData);
//					break;
//				case "tile6":
//					return require('./app_design_2col_template.html')(modelSerializedData);
//					break;
//				case "tile8":
//					return require('./app_design_3col_template.html')(modelSerializedData);
//					break;
//				case "tile9":
//					return require('./app_design_4col_template.html')(modelSerializedData);
//					break;
//				case "tile10":
//					return require('./app_design_3col2_template.html')(modelSerializedData);
//					break;
			};
		}
	});

	return AppDesignItemView;

})();