var Backbone = require('backbone');
var HeaderView = require('./header/header_view');
module.exports = (function () {

	var MainLayout = Backbone.Marionette.LayoutView.extend({

		template: require('./main_layout.html'),
		regions: {
			"headerRegion" : ".app-header",
		},
		ui: {
			"masterContainer" : "#master-container"
		},
		initialize: function(){
			this.headerView = new HeaderView({
				headerModel: App.headerModel
			});
		},
		onRender: function(){
			// var appHeaderHeight = 44;
			// this.ui.masterContainer.css({"height": window.innerHeight + "px"});
			this.headerRegion.show( this.headerView );
		}
	});

	return MainLayout;
})();
