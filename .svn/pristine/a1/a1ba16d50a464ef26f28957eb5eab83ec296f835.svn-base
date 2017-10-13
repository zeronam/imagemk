// データが存在しない場合に表示する共通のViewクラス
// See emptyView options of Marionette.CollectionView  
// https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.collectionview.md#collectionviews-emptyview
var Backbone = require('backbone');
module.exports = (function () {
	var CommonEmptyView = Backbone.Marionette.ItemView.extend({
		template: require("./common_empty_view_template.html"),
		initialize: function(options){
		},
	});
	return CommonEmptyView;
})();
