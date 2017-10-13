var Backbone = require('backbone');
module.exports = (function () {
	var HeaderView = Backbone.Marionette.ItemView.extend({
		template: require('./header_view.html'),
		ui: {
			"title" : ".title",
			"back" : ".back-button",
		},
		events: {
			"touchend @ui.back" : "_doBack"
		},
		initialize: function( options ){
			this.headerModel = options.headerModel;
			this.listenTo( this.headerModel, 'change', this.refresh );
		},
		onRender: function(){
			this.refresh();
		},
		refresh: function(){
			this.ui.title.html( this.headerModel.get("title") );

			// ヘッダの表示/非表示
			if( this.headerModel.get( 'hideHeader' ) ){
				this.$el.parent().addClass( 'HIDE' );
			}else{
				this.$el.parent().removeClass( 'HIDE' );
			}

			// 戻るボタン
			if( this.headerModel.get( 'showBackButton' ) ){
				this.ui.back.removeClass( 'hide' );
			}else{
				this.ui.back.addClass( 'hide' );
			}


		},
		_doBack: function(e){
			e.preventDefault();

			if( this.headerModel.get("customeBackAction") ){
				this.headerModel.get("customeBackAction")();
			}else{
				App.pageSlider.back();
			}
		}

	});
	return HeaderView;
})();
