var Backbone = require('backbone');
var CommonEmptyView = require('./common_empty_view.js');
module.exports = (function () {
	var BaseCollectionView = Backbone.Marionette.CollectionView.extend({
		emptyView: CommonEmptyView
	});
	return BaseCollectionView;
})();
