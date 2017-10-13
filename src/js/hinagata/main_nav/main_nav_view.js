var Backbone = require('backbone');
var MainNavModel = require('./main_nav_model.js');
var MainNavCollectionView = require('./main_nav_collection_view.js');
var AppDesignItemView = require('../features/app_design/app_design_item_view.js');
var AppDesignSelectItemView = require('../features/app_design/app_design_select_item_view.js');
var ChangeLayoutItemView = require('../features/app_design/app_change_layout_item_view.js');
var DataSaveLayoutItemView = require('../features/app_design/data_save_item_view.js');
var SvgModel = require('../models/svg_model.js');
var DialogueItemView = require('../features/app_design/dialogue/dialogue_item_view.js');
var MainView = require('../features/app_design/main_view.js');

// Plugin
require("../../../../lib/components/loadImages/load-image.all.min.js");
require("../../../../lib/components/jquery/spectrum.js");
require("../../../../lib/components/jquery/html2canvas.js");
require("../../../../lib/components/jquery/jquery-ui.js");

module.exports = (function () {
		var flag = 0;
		var MainNavView = Backbone.Marionette.LayoutView.extend({
		template: function(){
			return (AppConf.layout.navColumns === 2)?  require('./main_nav_2col.html') : require('./main_nav.html');
		},
		headerConf: {
			title: "Applican Sample",
			showBackButton: false,
			hideHeader: true,
		},
		ui: {
			"uploadBg" : "#uploadbg",
			"uploadLogo" : "#uploadlogo",
			"uploadIconSvg" : "#upload_svg",
			//"exportImage" : "#exportbtn",
			"exportImage" : "#btnDownload",
			"changeIconSvg" : ".change_icon"
		},
		events: {
			"change @ui.uploadBg"   : "showImage",
			"change @ui.uploadLogo"   : "showImageLogo",
			"change @ui.uploadIconSvg"   : "uploadIcon",
			"click @ui.exportImage" : "exportToImage",
			"click @ui.changeIconSvg" : "changeIconSvg",
			"click .layout_3row" : "showLayout3Row",
			"click .layout_1row" : "showLayout1Row",
			"change input#select_column": "checkRadio",
			"change input#select_icon": "checkIcon",
			// "click #APP-TOP .menuContainer a" : "changeColorIconLayout1",
			// "click .bottom_menu li a" : "changeColorIconLayout2",
			"click #escape_layout input" : "escapeLayout",
			"change #senario" : "showBtnUploadLogo",
			"click #show_point_box" : "showPointBox",
			"keyup .change_title_txt" : "changeTitlePoint",
			"keyup .change_head_txt": "changeHeadTxtPoint",
			"paste .change_title_txt" : "actionPasteCut",
        	"cut .change_title_txt" : "actionPasteCut",
        	"paste .change_head_txt" : "actionPasteCut",
        	"cut .change_head_txt" : "actionPasteCut",
			"click #barcode_display": "showBarcode",
			"click #card_display" : "showCardDisplay",
			"keyup #input_new_title" : "changeTitleEachIcon",
			// "paste #input_new_title" : "actionPasteCut",
   //      	"cut #input_new_title" : "actionPasteCut",
			"click #dialogue_changeicn .svgContainer" : "selectSVG",
			"click .mobile_type_select li" : "changeDevice",
			"click .bg_screen" : "closeDialogue",
			// "blur #input_new_title, .change_title_txt": "changeTitleBlur",
			//"click p.box-title" : "toggleBoxContent",
			// "click #close_box_change_title" : "closeBoxChangeTitle",
			"click #reset_color" : "resetColor",
			"click #reset_image" : "resetImage",
			"click #reset_color_row" : "resetColorRow",
			"click .agree" : "uploadAgree",
			"click .cancel" : "cancelUploadIconNoSvg",
			"change #notshowdialogue" : "notShowDialogue",
			"click .box_component" : "closePopupChangeIcon",
			"click #reset_point" : "resetPoint",
			"change #get_notify" : "getNotify",
			"click .block-point" : "showPointRegion",
			"click #txtLogin" : "showLogin",
			"click #txtLogout" : "Logout",
			"click #menuTab1" : "selectTab1",
			"click #menuTab2" : "selectTab2",
			"change #row1Menu" : "changeRow1Menu",
			"change #row2Menu" : "changeRow2Menu",
			"change #row1MenuSub" : "changeRow1MenuSub",
			"change #row2MenuSub" : "changeRow2MenuSub",
			"change #row3Menu" : "changeRow3Menu",
			"click #footerHeight" : "changeFooterHeight",
			"change #numberMenuFixed" : "selectNumberMenuFixed",
			"click #btnLogin" : "Login",
			"keyup #loginID" : "enterLogin",
			"keyup #password" : "enterLogin",
			"click .slidebtn" : "slideItem",
			"click .div_menu_btn" : "modifyComponent",
			"click #btnMyPage" : "showMyPage",
			"click #btnSettingPage" : "showSettingPage"
		},		
		regions: {
			"navRegion": "#main-nav-region",
			"appDesignRegion": "#appdesign-threerow-region",
      		"changeLayoutRegion": "#change-layout-region",
      		"appDesignSelectRegion": "#appdesign-onerow-region",
      		"appSelectIconRegion" : "#app-select-icon",
      		"dialogueRegion": "#dialogue-region",
      		"dataSaveRegion": "#data-save-region",
      		"myPage": "#myPageContents"
		},
		initialize: function(options) {
			this.navCollection = options.navCollection;
			this.svgModel = new SvgModel();
			this.mainNavModel = new MainNavModel();

			this.listenTo(this.svgModel, 'sync', this._renderSvg);
			App.util.bindProgressScreen(this, this.mainNavModel);
			this.listenTo(this.mainNavModel, 'sync', this.localNotification);
			//this.listenTo(this.mainNavModel, 'sync', this.onLoad);
			this.listenTo(this, 'load:sync', this.onLoad);

		},
		onLoad: function() {
			var _sid = localStorage.getItem("_sid");
			if (_sid != null) {
	    		$(".top_menu_login").attr("id", "txtLogout").text("ログアウト");
	    		$("<div class=\"top_menu_mypage\" id=\"btnMyPage\"><span>マイページ</span></div>").insertAfter("#txtLogout");
	    		$(".top_menu_right").prepend("<input type=\"button\" class=\"btn_blue\" id=\"btnSave\" value=\"保存する\" />");
			}
			this.RemainSID(_sid);
			$('.divinner').css({'left': 0});

		},
		onRender: function(){
			var collectionView = new MainNavCollectionView({ collection: this.navCollection });
			this.svgModel.setType("default");
			this.svgModel.fetchWithoutAuthInfo();
			if(AppConf.core.debug){
				this.navRegion.show( collectionView );
			}

		},
		fetchInfo: function() {
			if( App.getAuthInfo().token ) {
				this.mainNavModel.fetchWithAuthInfo();
			} else {
				this.mainNavModel.fetchWithoutLogin( App.appModel.getPushToken() );
			}
		},
		_renderSaveIcon: function(){

		},
    	_renderSvg: function() {    		
    		this.showChangeLayout();
    		this.showDataSaveLayout();
    		this.showFormCol();
    		this.showFormIcon("1");
    		this.showAppDesignDialogue();
    		this.loadTitlePoint();
    		this.showPointBox();
    		this.dragResizeBackground();    		   		
    		this.changeIcon();
    		this.savePositionNotify3Row();
    		this.loadIconDataSave();
    		this.loadPage();
    	},
		onloadNotification:function(){
			var notifyLoad = this.svgModel.get('notification');
			var indexLoad = notifyLoad.substring(6, 4);
			var parentSelected = $('.selectedIcon').parent().attr('id');
			if (indexLoad < 5){
				$('.menu_row_1 #row1_' + indexLoad + ' a:nth-child(' + indexLoad + ') .svgContainer').append("<em class='badge-number'>130</em>");
				$('.menu_row_1_fixed #row1_' + indexLoad + ' a:nth-child(' + indexLoad + ') .svgContainer').append("<em class='badge-number'>130</em>");
			} else if (indexLoad > 5) {
				indexLoad = indexLoad - 4;
				$('.menu_row_2 #row2_' + indexLoad + ' a:nth-child(' + indexLoad + ') .svgContainer').append("<em class='badge-number'>130</em>");
				$('.menu_row_2_fixed #row2_' + indexLoad + ' a:nth-child(' + indexLoad + ') .svgContainer').append("<em class='badge-number'>130</em>");
			}
		
   // 			var badgeColor = $('.badge_color').text();
			// $('#appdesign-onerow-region .badge-number').css({'background': badgeColor});
 		// 	$('#appdesign-threerow-region .badge-number').css({'background': badgeColor});
		},
		loadIconDataSave: function(){
			var dataIcon=[];
			var dataTitle=[];
			var listButton = this.svgModel.get('listIcon');
			var listTitle = this.svgModel.get('listTitle');
      		for(var key in listButton) {
    			var value = listButton[key];
    			dataIcon.push(value);
			}
			for(var key in listTitle) {
    			var title = listTitle[key];
    			dataTitle.push(title);
			}
      		for(var i=0; i < dataIcon.length; i++){
      			var index = i+ 1;
      			$('.value_board').append("<p class='icon"+ index +"'>"+ dataIcon[i] +"</p>");
      			$('.value_board').append("<p class='titleicon"+ index +"'>"+ dataTitle[i] +"</p>");
      		}
      		$(".value_board p:contains('icon_stamp')").html( $('.icon_stamp_lib').html() );
      		$(".value_board p:contains('icon_coupon')").html( $('.icon_coupon_lib').html() );
      		$(".value_board p:contains('icon_information')").html( $('.icon_information_lib').html() );
      		$(".value_board p:contains('icon_scratch')").html( $('.icon_scratch_lib').html() );
      		$(".value_board p:contains('icon_chirashi')").html( $('.icon_chirashi_lib').html() );
      		$(".value_board p:contains('icon_shop')").html( $('.icon_shop_lib').html() );
      		$(".value_board p:contains('icon_booking')").html( $('.icon_booking_lib').html() );
      		$(".value_board p:contains('icon_program')").html( $('.icon_program_lib').html() );      		
      		$(".value_board p:contains('icon_history')").html( $('.icon_history_lib').html() );
      		$(".value_board p:contains('icon_line')").html( $('.icon_line_lib').html() );
      		$(".value_board p:contains('icon_twitter')").html( $('.icon_twitter_lib').html() );
      		$(".value_board p:contains('icon_home_small')").html( $('.icon_home_small_lib').html() );
      		$(".value_board p:contains('icon_config_new')").html( $('.icon_config_new_lib').html() );
      		$(".value_board p:contains('icon_config')").html( $('.icon_config_lib').html() );

      		var numIcon = $('#dialogue_changeicn .svgContainer').length;
			for(var i = 1; i <= numIcon; i++ ){
				var iconLoad = $('#dialogue_changeicn .svgContainer:nth-child(' + i + ')').text();
				$('#dialogue_changeicn .svgContainer:nth-child(' + i + '):contains('+ iconLoad + ')').html( $('.' + iconLoad + '_lib').html() );
			}
      		
		},
		loadPage: function(){
			$('.divinner .div_menu_btn p').text('');
			var selectTab = $('.layout_select_type .select').index();
			switch(selectTab){
				case 0:
			var menu1 = parseInt($("#row1Menu").val());
			var menu2 = parseInt($("#row2Menu").val());
			var menu3 = parseInt($("#row3Menu").val());
			for (var i = 0; i <= menu1; i++) {
				if (i>0){
					$('#menu1').append("<div class='div_menu_btn'></div>");

					$('.menu_row_1 #row1_' + menu1 + ' a:nth-child(' + i + ') .menuBlock .svgContainer span').html( $('.value_board .icon' + i).html());
					$('.menu_row_1 #row1_' + menu1 + ' a:nth-child(' + i + ') .menuBlock p').text( $('.value_board .titleicon' + i).text());
					var iconLoad = $('.menu_row_1 #row1_' + menu1 + ' a:nth-child(' + i + ')').html();
					var textLoad = $('.menu_row_1 #row1_' + menu1 + ' a:nth-child(' + i + ') .menuBlock p').text();
					$('#menu1 .div_menu_btn:nth-child(' + i + ')').html(iconLoad);
					$('#menu1 .div_menu_btn:nth-child(' + i + ') .menuBlock p').text(textLoad);
					$('#menu1 .div_menu_btn:nth-child(' + i + ')').append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");	
				} else {
					$('#menu1').html('');
				}			
			}
			for (var i = 0; i <= menu2; i++) {
				if (i>0){
					var index = i + 4;
					$('#menu2').append("<div class='div_menu_btn'></div>");
					$('.menu_row_2 #row2_' + menu2 + ' a:nth-child(' + i + ') .menuBlock .svgContainer span').html( $('.value_board .icon' + index).html());
					$('.menu_row_2 #row2_' + menu2 + ' a:nth-child(' + i + ') .menuBlock p').text( $('.value_board .titleicon' + index).text());
					var iconLoad = $('.menu_row_2 #row2_' + menu2 + ' a:nth-child(' + i).html();
					var textLoad = $('.menu_row_2 #row2_' + menu2 + ' a:nth-child(' + i + ') .menuBlock p').text();
					$('#menu2 .div_menu_btn:nth-child(' + i + ')').html(iconLoad);
					$('#menu2 .div_menu_btn:nth-child(' + i + ') .menuBlock p').text(textLoad);
					$('#menu2 .div_menu_btn:nth-child(' + i + ')').append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");
				} else {
					$('#menu2').html('');
				}			
			}
			for (var i = 0; i <= menu3; i++) {
				if (i>0){
					var index = i + 8;
					$('#menu3').append("<div class='div_menu_btn'></div>");
					$('#menu3 .div_menu_btn').addClass('footer_menu_icon');
					$('#footer' + menu3 + ' a:nth-child(' + i + ') .menuBlock .svgContainer span' ).html( $('.value_board .icon' + index).html());
					$('#footer' + menu3 + ' a:nth-child(' + i + ') .menuBlock p').text( $('.value_board .titleicon' + index).text());
					var iconLoad = $('#footer' + menu3 + ' a:nth-child(' + i + ')').html();
					var textLoad = $('#footer' + menu3 + ' a:nth-child(' + i + ') .menuBlock p').text();
					$('#menu3 .div_menu_btn:nth-child(' + i + ')').html(iconLoad);
					$('#menu3 .div_menu_btn:nth-child(' + i + ') .menuBlock p').text(textLoad);
					$('#menu3 .div_menu_btn:nth-child(' + i + ')').append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");
				} else {
					$('#menu3').html('');
				}			
			}
			break;
				case 1:
			var menu4 = parseInt($("#row1MenuSub").val());
			var menu5 = parseInt($("#row2MenuSub").val());
			var menu6 = parseInt($("#numberMenuFixed").val());
			for (var i = 0; i <= menu4; i++) {
				if (i>0){
					$('#menu1').append("<div class='div_menu_btn'></div>");
					$('.menu_row_1_fixed #row1_' + menu4 + ' a:nth-child(' + i + ') .menuBlock .svgContainer span').html( $('.value_board .icon' + i).html());
					$('.menu_row_1_fixed #row1_' + menu4 + ' a:nth-child(' + i + ') .menuBlock p').text( $('.value_board .titleicon' + i).text());
					var iconLoad = $('.menu_row_1_fixed #row1_' + menu4 + ' a:nth-child(' + i + ')').html();
					var textLoad = $('.menu_row_1_fixed #row1_' + menu4 + ' a:nth-child(' + i + ') .menuBlock p').text();
					$('#menu1 .div_menu_btn:nth-child(' + i + ')').html(iconLoad);
					$('#menu1 .div_menu_btn:nth-child(' + i + ') .menuBlock p').text(textLoad);
					$('#menu1 .div_menu_btn:nth-child(' + i + ')').append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");	
				} else {
					$('#menu1').html('');
				}			
			}
			for (var i = 0; i <= menu5; i++) {
				if (i>0){
					var index = i + 4;
					$('#menu2').append("<div class='div_menu_btn'></div>");
					$('.menu_row_2_fixed #row2_' + menu5 + ' a:nth-child(' + i + ') .menuBlock .svgContainer span').html( $('.value_board .icon' + index).html());
					$('.menu_row_2_fixed #row2_' + menu5 + ' a:nth-child(' + i + ') .menuBlock p').text( $('.value_board .titleicon' + index).text());
					var iconLoad = $('.menu_row_2_fixed #row2_' + menu5 + ' a:nth-child(' + i).html();
					var textLoad = $('.menu_row_2_fixed #row2_' + menu5 + ' a:nth-child(' + i + ') .menuBlock p').text();
					$('#menu2 .div_menu_btn:nth-child(' + i + ')').html(iconLoad);
					$('#menu2 .div_menu_btn:nth-child(' + i + ') .menuBlock p').text(textLoad);
					$('#menu2 .div_menu_btn:nth-child(' + i + ')').append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");
				} else {
					$('#menu2').html('');
				}			
			}
			for (var i = 0; i <= menu6; i++) {
				if (i>0){
					var index = i + 8;
					$('#menu3').append("<div class='div_menu_btn'></div>");
					$('#footer_' + menu6 + 'icon li:nth-child(' + i + ') .menuBlock .svgContainer span').html( $('.value_board .icon' + index).html());
					$('#footer_' + menu6 + 'icon li:nth-child(' + i + ') .menuBlock p').text( $('.value_board .titleicon' + index).text());
					$('#menu3 .div_menu_btn').addClass('footer_menu_icon');
					var iconLoad = $('#footer_' + menu6 + 'icon li:nth-child(' + i + ') a').html();
					var textLoad = $('#footer_' + menu6 + 'icon li:nth-child(' + i + ') .menuBlock p').html();
					$('#menu3 .div_menu_btn:nth-child(' + i + ')').html(iconLoad);
					$('#menu3 .div_menu_btn:nth-child(' + i + ') .menuBlock p').text(textLoad);

					$('#menu3 .div_menu_btn:nth-child(' + i + ')').append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");
				} else {
					$('#menu3').html('');
				}			
			}
				break;
			}			
			var menuLength = $('.divinner .div_menu_btn').length;
    		var widthList = menuLength*110;
    		$('.divinner').css({'width': widthList});
    		$('.leftarr').addClass('disable');
    		$('.divinner #menu1 .div_menu_btn:first-child').addClass('selectedIcon');
    		$('.preview_icon_select').html( $('.selectedIcon').html() ).find('.toparr').remove();
    		if( $('.selectedIcon .svgContainer em').hasClass('badge-number') ){
    			$('#get_notify').prop('checked', true);
    		} else {
    			$('#get_notify').prop('checked', false);
    		}
    		$('#input_new_title').val('');
    		var loadTitle = $('.selectedIcon .menuBlock p').text();
    		$('#input_new_title').val(loadTitle);
    		//$('#get_notify').attr('checked', false);
    		//this.getNotify();
		},
		getNotify:function(e){
			var seft = $(e.currentTarget);
			var saveNotify = this.svgModel.get('notification');
    		var parentSelected = $('.selectedIcon').parent().attr('id');
    		var numSelected = parentSelected.substr(parentSelected.length - 1);
    		var lengthSelected = $('#' + parentSelected + ' .div_menu_btn').length;
    		var indexSelected = $('.selectedIcon').index() + 1;
    		var selectTab = $('.layout_select_type .select').index();

    		if (seft.is(':checked')) {
    			$('.divinner .badge-number').remove();
    			$('.menuBody .badge-number').remove();
    			$('.selectedIcon .menuBlock .svgContainer').append("<em class='badge-number'>130</em>");
    			$('.preview_icon_select .menuBlock .svgContainer').append("<em class='badge-number'>130</em>");
    			$('#row'+ numSelected + '_' + lengthSelected + ' a:nth-child(' + indexSelected + ') .svgContainer').append("<em class='badge-number'>130</em>");
    			if( numSelected === '1'){
    				this.svgModel.set('notification','icon' + indexSelected);
    			} else if ( numSelected === '2'){
    				indexSelected = indexSelected + 4;
    				this.svgModel.set('notification','icon' + indexSelected);
    			}
    		} else {
    			$('.selectedIcon .menuBlock .svgContainer .badge-number').remove();
    			$('.preview_icon_select .menuBlock .svgContainer .badge-number').remove();
    			$('#row'+ numSelected + '_' + lengthSelected + ' a:nth-child(' + indexSelected + ') .svgContainer .badge-number').remove();
    		}			
		},
		clearNotify3Row: function(){
			// $('#appdesign-threerow-region .badge-number').remove();
			// $('#appdesign-threerow-region a').removeClass('notify');
		},
		clearNotify1Row: function(){
			// $('#appdesign-onerow-region .badge-number').remove();
			// $('#appdesign-onerow-region a').removeClass('notify');
		},
		savePositionNotify3Row: function(){
			var positionNotify = $('.notify_position_3row').text();
			this.clearNotify3Row();
    		// $('#appdesign-threerow-region #' + positionNotify + ' .svgContainer').prepend('<em class="badge-number">99</em>');
    		this.localNotification();
    		//$('#appdesign-threerow-region #' + positionNotify).addClass('notify');    		
		},
		savePositionNotify1Row: function(){
			var positionNotify = $('.notify_position_1row').text();
			this.clearNotify1Row();
    		// $('#appdesign-onerow-region #' + positionNotify + ' .svgContainer').prepend('<em class="badge-number">99</em>');
    		this.localNotification();
    		$('#appdesign-onerow-region #' + positionNotify).addClass('notify');    		
		},
		showAppDesign: function() {
			this.appDesignRegion.show( new AppDesignItemView({model: this.svgModel}) );
		},
		showMyPage: function(e) {
			$("#btnSettingPage span").removeClass("selected_menu");
			$("#btnMyPage span").addClass("selected_menu");
			$("#settingContents").hide();
			this.svgModel.setType("myPage");
			this.myPage.show( new MainView({model: this.svgModel}) );
			$("#myPageContents").show();
		},
		showSettingPage: function(e) {
			$("#btnMyPage span").removeClass("selected_menu");
			$("#btnSettingPage span").addClass("selected_menu");
			$("#myPageContents").hide();
			$("#settingContents").show();
		},
		showAppDesignSelect: function() {
			this.appDesignSelectRegion.show( new AppDesignSelectItemView({model: this.svgModel}) );
		},
		showChangeLayout: function() {
			this.changeLayoutRegion.show( new ChangeLayoutItemView() );
		},
		showAppDesignDialogue: function() {
			this.dialogueRegion.show( new DialogueItemView( { model: this.svgModel } ) );
		},
		showDataSaveLayout: function() {
			this.dataSaveRegion.show( new DataSaveLayoutItemView( { model: this.svgModel } ) )
		},
		showFormCol: function(selection) {
			// Set template
			var appcol = this.svgModel.getSvgApp();
			var app3Col = this.svgModel.getSvgApp3Col();
			var app4Col = this.svgModel.getSvgApp4Col();
			var app5Col = this.svgModel.getSvgApp5Col();
			var app6Col = this.svgModel.getSvgApp6Col();
			var app8Col = this.svgModel.getSvgApp8Col();
			var app9Col = this.svgModel.getSvgApp9Col();
			var app10Col = this.svgModel.getSvgApp10Col();
			var boxTitleDefault = this.svgModel.getBoxTitle();
			this.showAppDesign();

			// Set other and point
			if ( !isNaN(selection) ) {
				if ( appcol ) {
					// Phu Comment
					//$('#box-title-region').html(appcol.other.boxTitle);
					App.util.style.setCheckBox(appcol);
					App.util.style.setPoint(appcol);
				} else {
					// Phu Comment
					//$('#box-title-region').html(boxTitleDefault);
					App.util.style.setCheckBoxDefault();
					App.util.style.setPointDefault();
				}
				
			}

			// Set color
			if ( !isNaN(selection) ) {
				if ( appcol ) {
					for ( var i = 1; i <= 7; i++ ) {
						App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorSave(i, "layout1", appcol.color));
					}
					App.util.style.setColor("togglePaletteOnly13", App.util.style.setColorSave(13, "layout1", appcol.color));

				} else {
					for ( var i = 1; i <= 7; i++ ) {
						App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorDefault(i, "layout1"));
					}
					App.util.style.setColor("togglePaletteOnly13", App.util.style.setColorDefault(13, "layout1"));
				}				
			} else {
				for ( var i = 1; i <= 7; i++ ) {
					App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorDefault(i, "layout1"));
				}
				App.util.style.setColor("togglePaletteOnly13", App.util.style.setColorDefault(13, "layout1"));
			}
			
			//this.fetchInfo();
    	},
    	showFormIcon: function(flg, selection) {
    		// Set template
			var footer5icon = this.svgModel.getFooter5Icon();
			var footer4icon = this.svgModel.getFooter4Icon();
			var footer3icon = this.svgModel.getFooter3Icon();
			var boxTitleDefault = this.svgModel.getBoxTitle();
			if ( !isNaN(selection) ) {
				var template;
				switch ( selection ) {
					case 0:
						if ( footer5icon ) {
							template = footer5icon.template;
						}
						break;
					case 1:
						if ( footer4icon ) {
							template = footer4icon.template;
						}
						break;
					case 2:
						if ( footer3icon ) {
							template = footer3icon.template;
						}
						break;
				};
				if ( template ) {
					$("#appdesign-onerow-region").html(template);
				} else {
					this.showAppDesignSelect();
				}
			} else {
				this.showAppDesignSelect();
			}

			// Set other and point
			

			var index = 6;
			if ( flg ) {
				index = 8;
			}

			// Set color
			if ( !isNaN(selection) ) {
				switch ( selection ) {
					case 0:
						if ( footer5icon ) {
							for ( var i = index; i <= 12; i++ ) {
								App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorSave(i, "layout2", footer5icon.color));
							}
						} else {
							for ( var i = index; i <= 12; i++ ) {
								App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorDefault(i, "layout2"));
							}
							for ( var i = 24; i <= 28; i++ ) {
								this.setColorSvg("icon_lt" + i, App.util.style.setColorSvgDefault(i, "layout2"));
							}
						}
						break;
					case 1:
						if ( footer4icon ) {
							for ( var i = index; i <= 12; i++ ) {
								App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorSave(i, "layout2", footer4icon.color));
							}
						} else {
							for ( var i = index; i <= 12; i++ ) {
								App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorDefault(i, "layout2"));
							}
							for ( var i = 29; i <= 32; i++ ) {
								this.setColorSvg("icon_lt" + i, App.util.style.setColorSvgDefault(i, "layout2"));
							}
						}
						break;
					case 2:
						if ( footer3icon ) {
							for ( var i = index; i <= 12; i++ ) {
								App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorSave(i, "layout2", footer3icon.color));
							}
						} else {
							for ( var i = index; i <= 12; i++ ) {
								App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorDefault(i, "layout2"));
							}
							for ( var i = 33; i <= 35; i++ ) {
								this.setColorSvg("icon_lt" + i, App.util.style.setColorSvgDefault(i, "layout2"));
							}
						}
						break;
				};
			} else {
				for ( var i = index; i <= 12; i++ ) {
					App.util.style.setColor("togglePaletteOnly" + i, App.util.style.setColorDefault(i, "layout2"));
				}
				for ( var i = 24; i <= 28; i++ ) {
					this.setColorSvg("icon_lt" + i, App.util.style.setColorSvgDefault(i, "layout2"));
				}
			}

			if ( !flg ) {
				//this.fetchInfo();
			}
    	},
    	setColorSvg: function(element, color) {
    		$("#" + element + " svg").css({"fill": color});
    	},
    	slideItem: function(e){
    		var seft = $(e.currentTarget);
    		//var lastLeft = parseInt($('.divinner').css('left').slice(0,-2));
    		var currentWidth = parseInt($('.divinner').css('width').slice(0,-2));
    		var lastLeft = $(".div_menu_setting .divinner").offset().left - $(".div_menu_setting").offset().left + $(".div_menu_setting").scrollLeft();
    		$('.box-content button').removeClass('disable');
    		var currentLeft = 0;
    		
    		var index = $(seft).index();
    		var leftPos = $(".div_menu_setting").scrollLeft();
    		switch (index){
    			case 0: // scroll left
    				currentLeft = leftPos - 110;
    				//setTimeout(function(){$('.divinner').css({'left': parseInt(currentLeft)}); }, 150);
    				$(".div_menu_setting").animate({scrollLeft: currentLeft}, 150);
    			break;
    			case 1: // scroll right
    				currentLeft = leftPos + 110;
    				//setTimeout(function(){$('.divinner').css({'left': parseInt(currentLeft)}) }, 150);
    				$(".div_menu_setting").animate({scrollLeft: currentLeft}, 150);
    				//alert($(".div_menu_setting .divinner").offset().left - $(".div_menu_setting").offset().left + $(".div_menu_setting").scrollLeft());
    				
    			break;
    		}
    		//leftPos = $(".div_menu_setting").scrollLeft();
    		var poss = currentWidth - leftPos;
    		//leftPos = $(".div_menu_setting").scrollLeft();
    		if (leftPos == 0){
    			//$('.leftarr').addClass('disable');
    		}
    		else {
    			//$('.leftarr').addClass('disable');
	    		//if (leftPos >= 770)
	    			//$('.rightarr').addClass('disable');
    		}
			//if (currentWidth <= 770)
    			//$('.rightarr').addClass('disable');
			//else 
    			//$('.rightarr').removeClass('disable');
    		
    	},
		showImage: function(e) {
			e.preventDefault();
			var result = $('#preview1'),
				currentFile;
			e = e.originalEvent;
			var target = e.dataTransfer || e.target,
			file = target && target.files && target.files[0],
			options = {
				// maxWidth: result.width(),
				canvas: true
			};
			if (!file) {
				return;
			}
			this.displayImage(file, options);        	 		    				        
		},
		displayImage: function (file, options) {
			currentFile = file;
			this.resetBackground();			
			if (!loadImage( file, this.replaceResults, options )) {
				result.children().replaceWith($('<span>Your browser does not support the URL or FileReader API.</span>'));
			}
    	},
		replaceResults: function (img) {
			var _this = this;
			var content;
			if (!(img.src || img instanceof HTMLCanvasElement)) {
				content = $('<span>Loading image file failed</span>');
			} else {
				content = $('<a target="_blank">').append(img)
				.attr('download', currentFile.name)
				.attr('href', img.src || img.toDataURL());
			}
			var dataBase64 = content.attr("href");
			$(".bgupload").attr({"src": dataBase64});
			$(".bgcontainer").draggable();
			$('.bgupload').resizable({handles: 'all', aspectRatio: true});
			
			$("#uploadbg").val("");
			var bgImage = $(".bgupload").attr('src');
        	$('.pathimg').text(bgImage);
		},
		showImageLogo: function(e) {
			e.preventDefault();			
			var result = $('#preview2'),
				currentFile;
			e = e.originalEvent;
			var target = e.dataTransfer || e.target,
			file = target && target.files && target.files[0],
			options = {
				maxWidth: result.width(),
				canvas: true
			};
			if (!file) {
				return;
			}
			this.displayImageLogo(file, options);

		},
		displayImageLogo: function (file, options) {
			currentFile = file;
			this.resetLogo();
			if (!loadImage( file, this.replaceResultsLogo, options )) {
				result.children().replaceWith($('<span>Your browser does not support the URL or FileReader API.</span>'));
			}			
    	},
		replaceResultsLogo: function (img) {
			var _this = this;
			var content;			
			App.util.showProgressScreen();
			$('.spaceinner').css({'width':'100%', 'height':'545px'});
			if (!(img.src || img instanceof HTMLCanvasElement)) {
				content = $('<span>Loading image file failed</span>');
			} else {
				content = $('<a target="_blank">').append(img)
				.attr('download', currentFile.name)
				.attr('href', img.src || img.toDataURL());
			}
			var dataBase64 = content.attr("href");
			$('.logoupload').attr({"src": dataBase64});
			$('.logouploadtxt').text(dataBase64);
			$('.logo_space').css({'z-index':30});
			$('#preview2').draggable();
			var h_logo = $('.logoupload').height();
			var w_logo = $('.logoupload').width();		
			$('.spaceinner').css({'width':'auto', 'height':'auto'});
			$('.logoupload').css({'opacity': 1});
			
			setTimeout(function(){
  			$('.logoupload').resizable({handles: 'all', aspectRatio: true});
			}, 300);			
			$("#uploadlogo").val("");					
			App.util.hideProgressScreen();		
		},
		closePopupChangeIcon: function(){
			$('#dialogue_changeicn').hide();
		},
		exportToImage: function(e){
			e.preventDefault();
			this.closePopupChangeIcon();
			App.util.showProgressScreen();
			var liIndex = $('.layout_select_type li.select').index();
      		switch(liIndex){
				case 0:
					$('#appdesign-threerow-region .icon_twitter').css({'fill': '#2f9fd1'});
					$('#appdesign-threerow-region .icon_facebook').css({'fill': '#3C5998'});
					$('#appdesign-threerow-region .icon_line').css({'fill': '#14BB04'});
					break;
    			case 1:
					$('#appdesign-onerow-region .icon_twitter').css({'fill': '#2f9fd1'});
					$('#appdesign-onerow-region .icon_facebook').css({'fill': '#3C5998'});
					$('#appdesign-onerow-region .icon_line').css({'fill': '#14BB04'});
        			break;
   			};
			var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			var ua = navigator.userAgent.toLowerCase();
			$('svg').css({'opacity': '1'});
			if (ua.indexOf('safari') != -1) { 
			  if (ua.indexOf('chrome') > -1) {
			  $('.newUpload').css({'opacity': '1'});  
			  } else {
			  	$('.svgUpload.icon').attr('width','40px');
			   $('.svgUpload.icon').attr('height','25px');
			  }
			}			
			if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
				var radioButtons = $("input#select_column");
				var selection = radioButtons.index(radioButtons.filter(':checked'));
				switch(selection){
			    case 3:	
			    	$('#icon_lt42 .imageSVG, #icon_lt43 .imageSVG').css({'opacity': '1'});
			    break;
				};			
				$('.svgUpload.icon').parent().parent().find('.imageSVG').css({'opacity': '0'});
			   	$('.svgUpload.icon').attr('width','40px');
			   	$('.svgUpload.icon').attr('height','40px');
			}
			var liIndex = $('.layout_select_type li.select').index();
			switch(liIndex){
				case 0:
					this.convertSVG();
					break;
    			case 1:
					this.convertSvgOneRow();
        			break;
   			};	
			$('.leftside .tutorial_tips').hide();
			$('.ui-resizable-handle').hide();       		
			var element = $(".mobile_frame");
			var imageData;
			// html2canvas(element, {
			// 	useCORS: true,
			//    onrendered: function (canvas) {
			//           $("#showimage").append(canvas);
			//           imageData = canvas.toDataURL('image/png');
			//           var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
			//           $('#exportbtn').attr("download", "layout.png").attr("href", newData);
			//        }
			//    });
			// };
			// $('.ui-icon-gripsmall-diagonal-se, .ui-icon-gripsmall-diagonal-se-top, .ui-icon-gripsmall-diagonal-se-left-top, .ui-icon-gripsmall-diagonal-se-left-bottom').hide();
				// setTimeout(funsction(){
			
			html2canvas([$('.mobile_frame')[0]], {
			useCORS: true
			}).then(function (canvas) {
				if (navigator.msSaveBlob) {
					var URL=window.URL;
					var BlobBuilder = window.MSBlobBuilder;
					navigator.saveBlob=navigator.msSaveBlob;
					var imgBlob = canvas.msToBlob();
				if (BlobBuilder && navigator.saveBlob) {
					var showSave =  function (data, name, mimetype) {
						var builder = new BlobBuilder();
						builder.append(data);
						var blob = builder.getBlob(mimetype||"application/octet-stream");
						if (!name)
							name = "Download.bin";
							navigator.saveBlob(blob, name);
						};
						showSave(imgBlob, 'layout.png',"image/png");
						App.util.hideProgressScreen();
					}
				} else {
					if ($('#export-image-container').length == 0)
					$('body').append('<a id="export-image-container" download="layout.png">');
					img = canvas.toDataURL("image/png");
					img = img.replace('data:image/png;base64,', '');
					finalImageSrc = 'data:image/png;base64,' + img;

					$('#export-image-container').attr('href', finalImageSrc);
					$('#export-image-container')[0].click();
					$('#export-image-container').remove();
					App.util.hideProgressScreen();
				}
			});
			// }, 300);
			// $('.ui-icon-gripsmall-diagonal-se, .ui-icon-gripsmall-diagonal-se-top, .ui-icon-gripsmall-diagonal-se-left-top, .ui-icon-gripsmall-diagonal-se-left-bottom').show();
			$('.newUpload').css({'opacity': '0'});
			$('.imageSVG').css({'opacity': '0'});
			$('.ui-resizable-handle').show();
			// App.util.hideProgressScreen();

		},    	
    	localNotification: function() {
			this.onloadNotification();

			if ( applican.config.device_os === "ANDROID" ) {
				$(".badge-number").css("line-height","22px");
			}
		},
    	showLayout3Row:function(){
    		this.clearAll();
    		$('.layout_3row').addClass('select');
    		$('#appdesign-threerow-region').show();
    		this.loadAll();
    		this.loadCol();
    		$('#three_row').show();
    		$('#menu1, #menu2, #menu3').html('');
    		this.loadPage();
    		var bgPoint = $('.background_point').text();
    		var colorPoint = $('.color_point').text();
    		App.util.style.setColor("togglePaletteOnly6", bgPoint);
			App.util.style.setColor("togglePaletteOnly7", colorPoint);
			//this.fetchInfo();
			this.savePositionNotify3Row();
			var loadCom = $('.selectedIcon').html();
			$('.preview_icon_select').html(loadCom);
			$('.preview_icon_select .toparr').remove();
			$("#divFixedMenu").hide();
			$("#divTileMenu").show();
    	},
    	showLayout1Row:function(){
    		this.clearAll();
    		this.loadAll();
    		$("#input_new_title").prop('disabled', false);
    		$('.layout_1row').addClass('select');
    		$('#appdesign-onerow-region').show();
    		this.loadRow();
    		$('#menu1, #menu2, #menu3').html('');
    		this.loadPage();
    		$('#one_row').show();
    		var footer5icon = this.svgModel.getFooter5Icon();
    		this.svgModel.set("bg3row", $('#appdesign-threerow-region #preview1').html());
    		$('#appdesign-threerow-region #preview1').html('');
    		var bgPoint = $('.background_point').text();
    		var colorPoint = $('.color_point').text();
    		App.util.style.setColor("togglePaletteOnly6", bgPoint);
			App.util.style.setColor("togglePaletteOnly7", colorPoint);

			
			//this.fetchInfo();
			this.savePositionNotify1Row();
			
			var loadCom = $('.selectedIcon').html();
			$('.preview_icon_select').html(loadCom);
			$('.preview_icon_select .toparr').remove();
			$("#divTileMenu").hide();
			$("#divFixedMenu").show();
    	},
    	clearAll:function(){
    		$('.layout_select_type li').removeClass('select');
    		$('#appdesign-threerow-region, #appdesign-onerow-region').hide();
    		$('#three_row, #one_row').hide();
    	},
    	resetAll: function(){
    		$('.rightside input[type=checkbox]').attr('checked', false);
    		$('#change_content input').prop('checked', true);
    		$('.show_change_color_layout, #barcodebox').hide();
    	},
    	checkRadio:function(e){
			var _this = $(e.currentTarget);
    		$('input#select_column').prop('checked', false);
    		_this.prop('checked', true);
    		var radioButtons = $("input#select_column");
			var selection = radioButtons.index(radioButtons.filter(':checked'));
			var objColor = {
				"iconColor":$("#togglePaletteOnly1").val(),
				"bderColor":$("#togglePaletteOnly2").val(),
				"textColor":$("#togglePaletteOnly3").val(),
				"bgroundColor":$("#togglePaletteOnly4").val(),
				"bgroundMenu":$("#togglePaletteOnly5").val(),
				"pointBgColor":$("#togglePaletteOnly6").val(),
				"pointTextColor":$("#togglePaletteOnly7").val(),
				"infoColor":$("#togglePaletteOnly12").val()
			};
			var objPoint = {
				"pointCheck": $('#change_content input').is(':checked'),
				"text1": $(".change_head_txt").val(),
				"text2": $(".change_title_txt").val(),
				"barcodeCheck": $('#barcode_display').is(':checked'),
				"cardCheck": $('#card_display').is(':checked')
			};
			
			var objOther = {
				"roundCorner": $('#escape_layout input').is(':checked'),
				"boxTitle": $('#box-title-region').html(),
				// "titleText": $('#input_new_title').val(),
				"senario": $('#senario').is(':checked')
			};
			var objSave = {
				"template": $("#appdesign-threerow-region").html(),
				"color": App.util.style.setColorArr(objColor, "layout1"),
				"point": objPoint,
				"other": objOther
			};
			this.svgModel.set("appcol", objSave);
			switch(selection){
			    case 0:
			    	this.svgModel.setType("3");
				    this.showFormCol(selection);
				    $(".layout_3row img").attr("src","./image/mobile_332.png");
				    this.changeIcon();				    				    				    
				    this.loadAll();
				    this.loadCol();
				    this.fillColorSvg();
				    this.showPointBox();
				    this.changeHeadTxtPoint();
				    this.savePositionNotify3Row();		    
				    break;
				case 1:
					this.svgModel.setType("4");
					this.showFormCol(selection);					
					$(".layout_3row img").attr("src","./image/mobile_333.png");	
					this.changeIcon();					
					this.loadAll();
					this.loadCol();
					this.fillColorSvg();
					this.showPointBox();
					this.changeHeadTxtPoint();
					this.savePositionNotify3Row();		   				
			    	break;
			    case 2:
					this.svgModel.setType("2");
					this.showFormCol(selection);					
					$(".layout_3row img").attr("src","./image/mobile_222.png");
					this.changeIcon();					
					this.loadAll();
					this.loadCol();
					this.fillColorSvg();
					this.showPointBox();
					this.changeHeadTxtPoint();
					this.savePositionNotify3Row();			
			    	break;
			    case 3:
			    	this.svgModel.setType("5");
			    	this.showFormCol(selection);					
					$(".layout_3row img").attr("src","./image/mobile_334icn.png");
					this.changeIcon();
					this.loadAll();
					this.loadCol();
					this.fillColorSvg();
					this.showPointBox();
					this.changeHeadTxtPoint();
					this.savePositionNotify3Row();				
			    	break;
			};
    	},
    	loadAll:function(){
    		var badgeColor = $('.badge_color').text();
    		var checkBarcode = $('.check_box_barcode').text();
    		var checkCard = $('.check_box_card').text(); 		
    		var borderColor = $('.border_color').text();
    		var bgColor = $('.background_color').text();    		
    		var backgroundPoint = $('.background_point').text();
    		var colorPoint = $('.color_point').text();
    		var changeHeadtxt = $('.change_head_txt_point').text();
    		var changeTitletxt = $('.change_title_txt_point').text();
    		$('#APP-TOP .menuContainer #area-menu, #APP-TOP #area-menu a,#APP-TOP .inner-menuContainer .menuBody, .menuFooter, .menuFooter .menuBlock').css({'border-color': borderColor});
			$('.bottom_menu').css({'background-color': bgColor, 'border-color': borderColor});
            $('.bottom_menu li ').css({'border-color': borderColor});
            $('.block-point').css({'background-color': backgroundPoint});
            $('.block-point p').css({'color': colorPoint});
   			$('#appdesign-onerow-region .bottom_menu li a, #appdesign-onerow-region .app-footer').css({'background-color': bgColor});
			$('#appdesign-threerow-region .menuContainer #area-menu a, #appdesign-threerow-region .menuContainer #area-menu').css({'background-color': bgColor});
    		
    		$('#appdesign-onerow-region #headtxt, #appdesign-threerow-region #headtxt').text(changeHeadtxt);
    		$('.pointUse p').text(changeTitletxt);

    		var elementName = App.util.style.getElementName();
    		if (checkCard == 'checked') {
    			$(elementName + ' #cardType').show();
    			$(elementName + ' .menuColumn1').addClass('card');
    		} else {
    			$(elementName + ' #cardType').hide();
    			$('.change_icon_act.card').hide();
    			$(elementName + ' .menuColumn1').removeClass('card');
    		}

    		if (checkBarcode == 'checked') {
    			$('#appdesign-onerow-region #barcodebox , #appdesign-threerow-region #barcodebox').show();
    		} else {
    			$('#appdesign-onerow-region #barcodebox , #appdesign-threerow-region #barcodebox').hide();
    		}
    		
    		App.util.style.setColor("togglePaletteOnly2", borderColor);
    		App.util.style.setColor("togglePaletteOnly9", borderColor);
    		App.util.style.setColor("togglePaletteOnly4", bgColor);
    		App.util.style.setColor("togglePaletteOnly11", bgColor);
    		App.util.style.setColor("togglePaletteOnly12", badgeColor);
    		App.util.style.setColor("togglePaletteOnly13", badgeColor);
    		App.util.style.setColor("togglePaletteOnly6", backgroundPoint);
    		App.util.style.setColor("togglePaletteOnly7", colorPoint);
    	},
    	loadCol:function(){
    		var checkEscape = $('.check_box_escape').text();
    		var iconColor = $('.icon_color').text();
   			var titleColor = $('.title_color_col').text();
   			$('#appdesign-threerow-region .menuBody p, #appdesign-threerow-region .menuFooter p').css({'color': titleColor});
    		$('#appdesign-threerow-region .menuBody svg.icon, #appdesign-threerow-region .menuFooter svg.icon').css({'fill': iconColor});
    		if ( checkEscape === 'checked' ) {
    			$('.show_change_color_layout').show();
    			$("#appdesign-threerow-region .menuContainer[id!='oneRow']").addClass('escape');
    			$("#appdesign-threerow-region .menuContainer[id!='oneRow'].escape #area-menu").css({'background-color': $('#togglePaletteOnly5').val()});
    			App.util.style.setMaxLengthInput("layout1", "", "1");
    		} else {
    			$('.show_change_color_layout').hide();
    			$('#appdesign-threerow-region .menuContainer').removeClass('escape');
    			App.util.style.setMaxLengthInput("layout1", "", "");
    		}
    	},
    	loadRow:function() {
    		// set active
    		var activeColor = $('.active_color_icon').text();
    		var inActiveColor = $('.inavtive_color_icon').text();
   			$("#appdesign-onerow-region .bottom_menu li").removeClass("active");
			$("#appdesign-onerow-region .bottom_menu li a").removeClass("active");
			$("#appdesign-onerow-region .bottom_menu li a").removeClass("selected");
   			App.util.style.setColor("togglePaletteOnly8", activeColor);
    		App.util.style.setColor("togglePaletteOnly10", inActiveColor);
    		//var radioButtons = $("input#select_icon");
			//var selection = radioButtons.index(radioButtons.filter(':checked'));
    		var selection = parseInt($("#numberMenuFixed").val());
			var activeIndex;
			switch ( selection ) {
				case 5:
					activeIndex = $(".onerow5footer").text();
					break;
				case 4:
					activeIndex = $(".onerow4footer").text();
					break;
				case 3:
					activeIndex = $(".onerow3footer").text();
					break;
			};
			
			$("#appdesign-onerow-region .bottom_menu li:eq(" + activeIndex + ")").addClass("active");
			$("#appdesign-onerow-region .bottom_menu li:eq(" + activeIndex + ") a").addClass("selected active");

			// set color
    		// $('#appdesign-onerow-region .bottom_menu li svg.icon').css({'fill': inActiveColor});
   			// $('#appdesign-onerow-region .bottom_menu li .textinf').css({'color': inActiveColor});	
    		// $('#appdesign-onerow-region .selected.active svg.icon').css({'fill': activeColor});
   			// $('#appdesign-onerow-region .selected.active .textinf').css({'color': activeColor});
    	},
    	checkIcon:function(e){
			var _this = $(e.currentTarget);
    		$('input#select_icon').prop('checked', false);
    		_this.prop('checked', true);
    		var radioButtons = $("input#select_icon");
			var selection = radioButtons.index(radioButtons.filter(':checked'));
			switch(selection){
			    case 0:
			    	this.svgModel.setType("3");
				    this.showFormIcon("", selection);
				    $(".layout_1row img").attr("src","./image/mobile_5icn.png");
				    this.changeIconRow();
				    this.loadAll();
				    this.loadRow();
				    this.showPointBox();
				    this.changeHeadTxtPoint();
				    this.savePositionNotify1Row();
				    break;
				case 1:
					this.svgModel.setType("2");
					this.showFormIcon("", selection);
					$(".layout_1row img").attr("src","./image/mobile_4icn.png");
					this.changeIconRow();
					this.loadAll();
					this.loadRow();
					this.showPointBox();
					this.changeHeadTxtPoint();
					this.savePositionNotify1Row();
			    	break;
			    case 2:
					this.svgModel.setType("4");
					this.showFormIcon("", selection);
					$(".layout_1row img").attr("src","./image/mobile_3icn.png");
					this.changeIconRow();
					this.loadAll();
					this.showPointBox();
					this.loadRow();
					this.changeHeadTxtPoint();
					this.savePositionNotify1Row();
			    	break;
			};
    	},    	
    	// changeColorIconLayout1:function(e){
    	// 	var _this = $(e.currentTarget);
    	// 	var className = $(_this).parent().attr("class").split(" ")[0];
    	// 	var selectIcon = _this.find('.svgContainer').attr('id');
    	// 	var lastNumId = selectIcon.substr(7);
    	// 	var titleContent = $('.title_' + lastNumId).text();
    	// 	$('#input_new_title').val(titleContent);
    	// 	// $('#input_new_title').attr('placeholder', titleContent);
    	// 	// enable/disable input
    	// 	if ( className === "menuColumn4" ) {
    	// 		$("#input_new_title").prop('disabled', true);
    	// 	} else {
    	// 		$("#input_new_title").prop('disabled', false);
    	// 	}
			// if ( titleContent ) {
			// 	$("#input_new_title").prop('disabled', false);
   //  		} else {
   //  			$("#input_new_title").prop('disabled', true);
   //  		}
    		// $('#appdesign-threerow-region .menuContainer a').removeClass('selected');
    		// $(_this).addClass('selected');
			
			// hide tooltips
			// $('.leftside .tutorial_tips').hide();

			// if ( lastNumId === '7' || lastNumId === '8' || lastNumId === '13' || lastNumId === '14') {
			// 	$('#get_notify').parent().hide();
			// } else {
			// 	$('#get_notify').parent().show();
			// }
			// show box change title
			// $('.box_change_title').show();
			// var select = _this.attr('id');
			// var checkNotify = $('#appdesign-threerow-region #' + select).hasClass('notify');
			// if ( checkNotify ) {
			// 	$('#get_notify').prop('checked', true);
			// } else {
			// 	$('#get_notify').prop('checked', false);
			// }
			// setTimeout(function(){
		 //    	$("#input_new_title").focus();
		 //    },1);
   //  	},
    	// changeColorIconLayout2:function(e){
    	// 	var _this = $(e.currentTarget);
    	// 	var selectIcon = _this.find('.svgContainer').attr('id');
    	// 	var lastNumId = selectIcon.substr(7);
    	// 	var titleContent = $('.title_' + lastNumId).text();
    	// 	var iconColor = $('.inavtive_color_icon').text();
     // 		var iconActiveColor = $('.active_color_icon').text();
    	// 	$('#input_new_title').val(titleContent);
    		// $('#input_new_title').attr('placeholder', titleContent);
    		// $('#appdesign-onerow-region .bottom_menu li a,#appdesign-onerow-region .bottom_menu li').removeClass('selected active');
    		// $(_this).parent().addClass("active");
    		// $(_this).addClass('selected active');
    		 // set inactive color
            // $('#appdesign-onerow-region .bottom_menu li svg.icon').css({'fill': iconColor});
            // $('#appdesign-onerow-region .bottom_menu li .textinf').css({'color': iconColor});

            // set active color
            // $('#appdesign-onerow-region .selected svg.icon').css({'fill': iconActiveColor});
            // $('#appdesign-onerow-region .selected p').css({'color': iconActiveColor});

			// tooltips
			// $('.leftside .tutorial_tips').hide();

			// show box title
			// $(".box_change_title").show();

			// var select = _this.attr('id');
			// var checkNotify = $('#appdesign-onerow-region #' + select).hasClass('notify');
			// if ( checkNotify ) {
			// 	$('#get_notify').prop('checked', true);
			// } else {
			// 	$('#get_notify').prop('checked', false);
			// }

			// var radioButtons = $("input#select_icon");
			// var selection = radioButtons.index(radioButtons.filter(':checked'));
			// var activeIndex = $("#appdesign-onerow-region .bottom_menu li.active").index();
			// switch ( selection ) {
			// 	case 0:
			// 		$(".onerow5footer").text(activeIndex);
			// 		break;
			// 	case 1:
			// 		$(".onerow4footer").text(activeIndex);
			// 		break;
			// 	case 2:
			// 		$(".onerow3footer").text(activeIndex);
			// 		break;
			// };
			// setTimeout(function(){
		 //    	$("#input_new_title").focus();
		 //    },1);
   //  	},
    	changeTextColor:function(){
    		var textColor = $('#togglePaletteOnly3').val();
    		$('#appdesign-threerow-region .menuContainer .btnM,#appdesign-threerow-region .menuFooter .btnS').css({'color': textColor});
   			$('.title_color_col').text(textColor);
    	},
    	changeBackgroundColor:function(){
    		var bgColor = $('#togglePaletteOnly4').val();
    		$('#appdesign-threerow-region .menuContainer #area-menu a').css({'background-color': bgColor});
    		$('.background_color').text(bgColor);
    	},
    	escapeLayout:function(){
    		var bgColor = $('.background_color').text();
    		var escapeColor = $('.escape_color').text();
    		var radioButtons = $("input#select_column");
    		var selection = radioButtons.index(radioButtons.filter(':checked'));
    		if ($('#escape_layout input').is(':checked')) {
    			$('.show_change_color_layout').show();
    			$("#appdesign-threerow-region .menuContainer[id!='oneRow']").addClass('escape');

				switch(selection){
				    case 0:
				      	$('#appdesign-threerow-region #l3col #area-menu, #appdesign-threerow-region #f3col #area-menu').css({'background-color': escapeColor});  

					    break;
					case 1:
						$('#appdesign-threerow-region #l4col #area-menu').css({'background-color': escapeColor});  
			   				
				    	break;
				    case 2:
						$('#appdesign-threerow-region #l2col #area-menu, #appdesign-threerow-region #f2col #area-menu').css({'background-color': escapeColor});  

				    	break;
				    case 3:
				    	$('#appdesign-threerow-region  #l3col2 #area-menu, #appdesign-threerow-region #f3col2 #area-menu').css({'background-color': escapeColor});  
				
				    	break;
				};
    			$('.check_box_escape').text('checked');
    			App.util.style.setMaxLengthInput("layout1", "", "1");
    		} else {
    			$('.show_change_color_layout').hide();
    			$('#appdesign-threerow-region .menuContainer').removeClass('escape');
    			$('.check_box_escape').text('unchecked');
    			App.util.style.setMaxLengthInput("layout1", "", "");
    			$('#appdesign-threerow-region .menuContainer #area-menu a').css({'background-color': bgColor});
    		}
    	},
    	showPointBox: function() {
    		$('.change_head_txt').val($("#headtxt").text());
    		$('.change_title_txt').val($(".pointUse:eq(0) p").text());
    		if ($('#show_point_box').is(':checked')) {
    			$('#pointSettingContent').show();
    			if ($("#barcode_display").is(":checked")) {
        			$("#barcodebox").show();
    			} else {
        			$("#barcodebox").hide();
    			}
    			$('#appdesign-onerow-region .block-point, #appdesign-threerow-region .block-point').show();
    		} else {
    			$('#pointSettingContent').hide();
    			$("#barcodebox").hide();
    			$('#appdesign-onerow-region .block-point, #appdesign-threerow-region .block-point').hide();
    		}
    	},
    	showPointRegion: function(e) {
    		this.closePopupChangeIcon();
    		this.showPointBox();
    		var textheadPoint = $('.change_head_txt_point').text();
    		var texttitlePoint = $('.change_title_txt_point').text();
		    $('html, body').animate({
		        scrollTop: $("#myDiv").offset().top
		    }, 1);
		    $("#myBox").show();
		    $('.change_head_txt').val(textheadPoint);
		    $('.change_title_txt').val(texttitlePoint);
		    setTimeout(function(){
		     	$(".change_head_txt").focus();
		    },1);
    	},
    	loadTitlePoint:function() {
    		var titleText = $('.selectedIcon p').text();
    		// $('#input_new_title').val(titleText);
    	},
    	changeTitlePoint: function(){
    		var textInput = $('.change_title_txt').val();
			var elementName = App.util.style.getElementName();
			$(elementName + ' .pointUse p').text(textInput);
			$('.change_title_txt_point').text(textInput);
    	},
    	changeHeadTxtPoint: function(){
    		var textInput = $('.change_head_txt').val();
    		var elementName = App.util.style.getElementName();
    		$(elementName + ' #headtxt').text(textInput);
    		$('.change_head_txt_point').text(textInput);
    		if (textInput == '') {
    			$('#appdesign-threerow-region #headtxt , #appdesign-onerow-region #headtxt').css({'margin-bottom': 0});
    		} else {
    			$('#appdesign-threerow-region .menuColumn1.card #headtxt , #appdesign-onerow-region .menuColumn1.card #headtxt').css({'margin-bottom': '5px'});
    		}
    	},
    	showCardDisplay:function() {
    		var elementName = App.util.style.getElementName();
    		if ($('#card_display').is(':checked')) {
    			$(elementName + ' #cardType').show();
    			$(elementName + ' .menuColumn1').addClass('card');
    			$('.check_box_card').text('checked');
    			$('#appdesign-threerow-region #headtxt , #appdesign-onerow-region #headtxt').css({'margin-bottom': '5px'});
    		} else {
    			$(elementName + ' #cardType').hide();
    			$('.change_icon_act.card').hide();
    			$(elementName + ' .menuColumn1').removeClass('card');
    			$('.check_box_card').text('unchecked');
    			$('#appdesign-threerow-region #headtxt , #appdesign-onerow-region #headtxt').css({'margin-bottom': 0});
    		}
    	},
    	showBarcode:function() {
    		if ($('#barcode_display').is(':checked')) {
    			$('#appdesign-onerow-region #barcodebox , #appdesign-threerow-region #barcodebox').show();
    			$('.check_box_barcode').text('checked');
    		} else {
    			$('#appdesign-onerow-region #barcodebox , #appdesign-threerow-region #barcodebox').hide();
    			$('.check_box_barcode').text('unchecked');
    		}
    	},
    	changeTitleEachIcon: function(e) {
    		var _this = $(e.currentTarget);
    		var changeTitle = _this.val();
    		$('.selectedIcon .menuBlock p').text(changeTitle);
    		$('.preview_icon_select .menuBlock p').text(changeTitle);
    		var parentSelected = $('.selectedIcon').parent().attr('id');
    		var numSelected = parentSelected.substr(parentSelected.length - 1);
    		var lengthSelected = $('#' + parentSelected + ' .div_menu_btn').length;
    		var indexSelected = $('.selectedIcon').index() + 1;
    		var selectTab = $('.layout_select_type .select').index();
    		var saveTitle = this.svgModel.get('listTitle');
    		switch(selectTab){
    			case 0:
    			if (numSelected === '3'){
    				var indexTitle = 8 + indexSelected;
    				$('#footer'+ lengthSelected + ' a:nth-child(' + indexSelected + ') p').text(changeTitle);
    				saveTitle['icon' + indexTitle] = changeTitle;
    				$('.titleicon' + indexTitle).text(changeTitle);
	    		} else if (numSelected === '2') {
	    			var indexTitle = 4 + indexSelected;
	    			$('#row'+ numSelected + '_' + lengthSelected + ' a:nth-child(' + indexSelected + ') p').text(changeTitle);
	    			saveTitle['icon' + indexTitle] = changeTitle;
    				$('.titleicon' + indexTitle).text(changeTitle);
	    		} else {
	    			$('#row'+ numSelected + '_' + lengthSelected + ' a:nth-child(' + indexSelected + ') p').text(changeTitle);
	    			saveTitle['icon' + indexSelected] = changeTitle;
    				$('.titleicon' + indexSelected).text(changeTitle);
	    		}
    			break;
    			case 1:
    				if (numSelected === '3'){
    					var indexTitle = 8 + indexSelected;
    					$('#footer_'+ lengthSelected + 'icon li:nth-child(' + indexSelected + ') .menuBlock p').text(changeTitle);
    					saveTitle['icon' + indexTitle] = changeTitle;
    					$('.titleicon' + indexTitle).text(changeTitle);

    				} else if (numSelected === '2'){
    					var indexTitle = 4 + indexSelected;
    					$('.menu_row_2_fixed #row'+ numSelected + '_' + lengthSelected + ' a:nth-child(' + indexSelected + ') p').text(changeTitle);
    					saveTitle['icon' + indexTitle] = changeTitle;
    					$('.titleicon' + indexTitle).text(changeTitle);

    				} else {
    					$('.menu_row_2_fixed #row'+ numSelected + '_' + lengthSelected + ' a:nth-child(' + indexSelected + ') p').text(changeTitle);
    					saveTitle['icon' + indexSelected] = changeTitle;
    				$('.titleicon' + indexSelected).text(changeTitle);

    				}
    			break;
    		}		
    		
    		
    		// $('.selected .menuBlock p').text(changeTitle);
		},	
    	changeIconSvg:function(e){
			var _this = $(e.currentTarget);
			$('#dialogue-region').show();
			$('#dialogue_changeicn').show();
		},
		selectSVG:function(e){
   			e.preventDefault();
			var _this = $(e.currentTarget);
			var svgContent = _this.html();
			var className = _this.children().attr('class').split(' ').pop();
    		var parentSelected = $('.selectedIcon').parent().attr('id');
    		var numSelected = parentSelected.substr(parentSelected.length - 1);
    		var lengthSelected = $('#' + parentSelected + ' .div_menu_btn').length;
    		var indexSelected = $('.selectedIcon').index() + 1;
    		var saveIcon = this.svgModel.get('listIcon');
    		$('.selectedIcon .menuBlock span').html(svgContent);
    		$('.preview_icon_select .menuBlock span').html(svgContent);
    		var selectTab = $('.layout_select_type .select').index();
    		switch(selectTab){
    			case 0:
    			if (numSelected === '3'){
    				var indexIcon = 8 + indexSelected;
    				$('.menu_row_1 #footer'+ lengthSelected + ' a:nth-child(' + indexSelected + ') span').html(svgContent);
    				saveIcon['icon' + indexIcon] = className;
    				$('.icon' + indexIcon).html(svgContent);
		    	} else {
		    		var indexIcon;
		    		if (numSelected === '1'){
		    			indexIcon = indexSelected;
		    		} else if (numSelected === '2') {
		    			indexIcon = 4 + indexSelected;
		    		}
		    		
		    		$('.menu_row_1 #row'+ numSelected + '_' + lengthSelected + ' a:nth-child(' + indexSelected + ') span').html(svgContent);
		    		saveIcon['icon' + indexIcon] = className;
    				$('.icon' + indexIcon).html(svgContent);
		    		}
    			break;
    			case 1:
    				var indexIcon = 13 + indexSelected;
    				if (numSelected === '3'){
    					$('#footer_'+ lengthSelected + 'icon li:nth-child(' + indexSelected + ') .menuBlock span').html(svgContent);
    					saveIcon['icon' + indexIcon] = className;
    					$('.icon' + indexIcon).html(svgContent);
    				} else {
    					$('#row'+ numSelected + '_' + lengthSelected + ' a:nth-child(' + indexSelected + ') span').html(svgContent);
    				}
    			break;
    		}	
    		var iconColor = $('.icon_color').text();
    		$('.preview_icon_select svg').css({'fill': iconColor});
    		$('#dialogue_changeicn, #dialogue-region').hide();
   		
     	},
    	uploadIcon: function(e) {
    		e.preventDefault();
    		var _this = $(e.currentTarget);
    		var e = e.originalEvent;
				target = e.dataTransfer || e.target,
				file = target && target.files && target.files[0]
				url = URL.createObjectURL(file);
			var imageName = _this.val().split('.').pop();
			this.urlIconImage = url;
			
			if ( imageName !== 'svg' ) {
				if (flag == 0){
				$('#dialogue-region').show();
				$('#dialogue_changeicn').hide();
				$('#dialogue_confirm').show();
				} else {
					this.uploadAgree();
				}
			} else {
				var img = "<img class='svgUpload' src='" + url + "' width='40px' height='40px' />";
				// Get extension			
				var elementName = App.util.style.getElementName();
				var selectTitle = $(elementName + ' .selected .svgContainer').attr('id');
				var lastNumId = selectTitle.substr(7);
				var loadIcon = $(elementName + ' .selected').attr('id');
				var lastIdLoadIcon = loadIcon.substr(3);
				if ( lastNumId === '42' || lastNumId === '43' || lastNumId === '44' || lastNumId === '45' ) {
					img = "<img class='svgUpload' src='" + url + "' width='35px' height='35px' />";
				}
				$("#icon_lt" + lastNumId + ' span').html(img);
				App.util.style.replaceSvg("img.svgUpload", "#icon_lt" + lastNumId + " svg");
				$('.selected .svgUpload').parent().parent().find('#canvas').addClass('newUpload');
			}
		
			_this.val("");
    	},
    	notShowDialogue: function(){
    		if ($('#notshowdialogue').is(':checked')) {
    			flag = 1;
    		} else {
    			flag = 0;
    		}
    	},
    	uploadAgree: function(e) {
    		var img = "<img class='svgUpload' src='" + this.urlIconImage + "' width='40px' height='40px' />";
			// Get extension			
			var elementName = App.util.style.getElementName();
			var selectTitle = $(elementName + ' .selected .svgContainer').attr('id');
			var lastNumId = selectTitle.substr(7);
			var loadIcon = $(elementName + ' .selected').attr('id');
			var lastIdLoadIcon = loadIcon.substr(3);
			if ( lastNumId === '42' || lastNumId === '43' || lastNumId === '44' || lastNumId === '45' ) {
				img = "<img class='svgUpload' src='" + url + "' width='35px' height='35px' />";
			}
			$("#icon_lt" + lastNumId + ' span').html(img);
			this.cancelUploadIconNoSvg();
    	},
    	cancelUploadIconNoSvg: function(e) {
  			$('#dialogue-region').hide();
			$('#dialogue_confirm').hide();
    	},
    	changeDevice: function(e){
    		var _this = $(e.currentTarget);
    		$('.mobile_type_select li').removeClass('select');
    		_this.addClass('select');
    		var liIndex = $('.mobile_type_select li.select').index();
    		switch(liIndex){
			    case 0:
			    	$('#mobile_wrap').addClass('iphone');
			    	$('#mobile_wrap').removeClass('android');
			    	$('.leftside .tutorial_tips').css({"top": "518px"});
				    break;
				case 1:
					$('#mobile_wrap').addClass('android');
			    	$('#mobile_wrap').removeClass('iphone');
			    	$('.leftside .tutorial_tips').css({"top": "500px"});
			    	break;
			};
    	},
    	dragResizeBackground: function() {
    		$(".bgcontainer").draggable(); 
    		$( ".bgupload" ).resizable({handles: 'all', aspectRatio: true});
    	},
    	closeDialogue: function() {
    		$("#dialogue-region").hide();
    	},
    	changeTitleBlur: function(e) {
    		// var _this = $(e.currentTarget);
    		// var className = _this.attr('class');
    		// var elementName;
    		// if ( className ) {
    		// 	elementName = ".change_title_txt";
    		// } else {
    		// 	elementName = "#input_new_title";
    		// }
    		// var textInput = $(elementName).val();
    		// if ( !textInput ) {
    		// 	var textInputDefault = $(elementName).attr('placeholder');
    		// 	$(elementName).val(textInputDefault);
    		// 	var elementName1 = App.util.style.getElementName();
    		// 	if ( elementName === '.change_title_txt' ) {
    		// 		$(elementName1 + ' .pointUse p').text(textInputDefault);
    		// 		$('.change_title_txt_point').text(textInputDefault);
    		// 	} else {
    		// 		var selectTitle = $(elementName1 + ' .selected .svgContainer').attr('id');
	    	// 		var lastNumId = selectTitle.substr(7);
	    	// 		$('.title_' + lastNumId).text(textInputDefault);
	    	// 		var titleIndex = $(elementName1 + ' .selected').attr('id');
	    	// 		var lastTitleId = titleIndex.substr(3);
	    	// 		if ( elementName1 === "#appdesign-threerow-region" ) {
		    // 			$('.titlesvg' + lastTitleId).text(textInputDefault);
		    // 		} else {
		    // 			$('.rowtitlesvg' + lastTitleId).text(textInputDefault);
		    // 		}
    		// 	}
    		// }
    	},
//    	toggleBoxContent: function(e){
//    		var _this = this;
//    		var completeSlideTooge = function() {
//    			// _this.setHeightBg();
//    		};
//    		$(e.currentTarget).next().slideToggle("medium", "swing", completeSlideTooge);
//    	},
   //  	setHeightBg: function() {
   //    		var h_window = $(window).height();
			// var h_rightside = $('.rightside').height() + 40;
			// var mobileWrap = $("#mobile_wrap").attr("class").split(" ")[1];
			//   	if ( h_rightside > h_window ) {
			//     $("#APP-TOP .topBg").css({"width": 254});
			//    	} else {
			//     $("#APP-TOP .topBg").css({"width": 255});
			//   	}
   //  	},
    	checkLength: function(e) {
    		var _this = $(e.currentTarget);
    		var maxLength = $(_this).attr( "maxlength" );
    		var valueLength = $(_this).val().length;
    		if (valueLength >= maxLength) {
        		return false;
    		}
    	},
    	showBtnUploadLogo:function(){
    		if ($('#senario').is(':checked')) {
    			$('.change_icon_act').addClass('show');
    			$('#upload_svg').show();
    		} else {
    			$('.change_icon_act').removeClass('show');
    			$('#upload_svg').hide();
    		}
    	},
    	resetColor:function(){
    		$('.icon_color').text('#673a3a');
    		$('.escape_color').text('#ffffff');
    		$('#appdesign-threerow-region svg.icon').css({'fill': '#673a3a'});
    		$('#appdesign-threerow-region .menuContainer p').css({'color': '#673a3a'});
    		$('#togglePaletteOnly1').val('#673a3a');
    		$('#escape_layout input').attr('checked', false);
    		$('#appdesign-threerow-region .menuContainer').removeClass('escape');
    		$('.check_box_escape').text('unchecked');
    		$('.show_change_color_layout').hide();
    		$('.border_color').text('#673a3a');
    		$('#APP-TOP .menuContainer #area-menu, #APP-TOP #area-menu a,#APP-TOP .inner-menuContainer .menuBody, .menuFooter, .menuFooter .menuBlock').css({'border-color': '#673a3a'});
    		$('.title_color_col').text('#673a3a');
    		$('.background_color').text('#ffffff');
    		$('#appdesign-threerow-region .menuContainer #area-menu a, #appdesign-threerow-region .menuContainer #area-menu').css({'background-color': '#ffffff'});
    		$('.badge_color').text('#ff0000');
    		$('#appdesign-threerow-region .badge-number').css({'background': '#ff0000'});
    		$('#togglePaletteOnly12').val('#ff0000');
			App.util.style.setColor("togglePaletteOnly1", '#673a3a');
			App.util.style.setColor("togglePaletteOnly2", '#673a3a');
			App.util.style.setColor("togglePaletteOnly3", '#673a3a');
			App.util.style.setColor("togglePaletteOnly4", '#ffffff');
			App.util.style.setColor("togglePaletteOnly5", '#ffffff');
			App.util.style.setColor("togglePaletteOnly12", '#ff0000');
			App.util.style.setColor("togglePaletteOnly13", '#ff0000');
			App.util.style.setMaxLengthInput("layout1", "", "");
    	},
    	resetColorRow:function(){
    		$('.active_color_icon').text('#d05670');
            $('.inavtive_color_icon').text('#b4b2b4');
            $('.badge_color').text('#ff0000');  
            $('#appdesign-onerow-region .badge-number').css({'background': '#ff0000'});
            $('#togglePaletteOnly13').val('#ff0000');
            $('.title_color_col').text('#673a3a');
    		$('.background_color').text('#ffffff');
    		$('.border_color').text('#673a3a');
            $('.bottom_menu').css({'background-color': '#ffffff', 'border-color': '#673a3a'});
            $('.bottom_menu li ').css({'border-color': '#673a3a'});
            $('#appdesign-onerow-region .bottom_menu li a, #appdesign-onerow-region .app-footer').css({'background-color': '#ffffff'});
            $('#appdesign-onerow-region .bottom_menu li svg.icon').css({'fill': '#b4b2b4'});
   			$('#appdesign-onerow-region .bottom_menu li .textinf').css({'color': '#b4b2b4'});	
    		$('#appdesign-onerow-region .selected.active svg.icon').css({'fill': '#d05670'});
   			$('#appdesign-onerow-region .selected.active .textinf').css({'color': '#d05670'});
   			App.util.style.setColor("togglePaletteOnly8", '#d05670');
			App.util.style.setColor("togglePaletteOnly10", '#b4b2b4');
			App.util.style.setColor("togglePaletteOnly12", '#ff0000');
			App.util.style.setColor("togglePaletteOnly9", '#673a3a');
			App.util.style.setColor("togglePaletteOnly11", '#ffffff');
			App.util.style.setColor("togglePaletteOnly2", '#673a3a');
			App.util.style.setColor("togglePaletteOnly4", '#ffffff');
    	},
    	resetImage: function(){
    		$(".bgupload").attr({"src": "./image/top_image_long.jpg"});
    		$(".bgupload").css({"top":0, "left":0,"width":"100%"});
    		$(".bgcontainer .ui-wrapper").css({"width":"100%","top":0, "left":0});
    		$('.bgcontainer').css({'top': 0, 'left': 0});
    		$(".spaceinner").html('<span id="preview2"><div class="ui-wrapper"><img src="" class="logoupload"></div></span>');
    		$('.pathimg').text('./image/top_image_long.jpg');
    		$('.logo_space').css({'z-index':10});	
    	},
    	resetPoint: function(){
   			$('.change_head_txt_point').text('現在のポイント数');
    		$('.change_title_txt_point').text('ポイントを使う');
    		$('.change_head_txt').val('現在のポイント数');
    		$('.change_title_txt').val('ポイントを使う');
    		$('#appdesign-onerow-region #headtxt, #appdesign-threerow-region #headtxt').text('現在のポイント数');
    		$('#appdesign-onerow-region .pointUse p, #appdesign-threerow-region .pointUse p').text('ポイントを使う');
    		$('.block-point').css({'background-color': '#f7cbd3'});
    		$('.block-point p').css({'color': '#673a3a'});
    		$('.background_point').text('#f7cbd3');
    		$('.color_point').text('#673a3a');
    		$('.checkbarcode').text('unchecked');
    		$('.checkcard').text('unchecked');
    		$('#barcode_display').attr('checked', false);
    		$('#card_display').attr('checked', false);
    		$('#cardType').hide();
    		$('#appdesign-onerow-region #barcodebox , #appdesign-threerow-region #barcodebox').hide();
    		$('.check_box_barcode').text('unchecked');
    		$('#appdesign-threerow-region #headtxt , #appdesign-onerow-region #headtxt').css({'margin-bottom': 0});
    		var elementName = App.util.style.getElementName();
    		if ($('#card_display').is(':checked')) {
    			$(elementName + ' #cardType').show();
    			$(elementName + ' .menuColumn1').addClass('card');
    			$('.check_box_card').text('checked');
    		} else {
    			$(elementName + ' #cardType').hide();
    			$('.change_icon_act.card').hide();
    			$(elementName + ' .menuColumn1').removeClass('card');
    			$('.check_box_card').text('unchecked');
    		}
    		App.util.style.setColor("togglePaletteOnly6", '#f7cbd3');
			App.util.style.setColor("togglePaletteOnly7", '#673a3a');
    	},
    	changeIcon:function(){
    		// var icon1 = $('.icon1').html();
    		// var icon2 = $('.icon2').html();
    		// var icon3 = $('.icon3').html();
    		// var icon4 = $('.icon4').html();
    		// var icon5 = $('.icon5').html();
    		// var icon6 = $('.icon6').html();
    		// var icon7 = $('.icon7').html();
    		// var icon8 = $('.icon8').html();
    		// var icon9 = $('.icon9').html();
    		// var icon10 = $('.icon10').html();
    		// var ico11 = $('.icon11').html();
    		// var icon12 = $('.icon12').html();
    		// var icon13 = $('.icon13').html();
    		// var icon14 = $('.icon14').html();
    		// var titlesvg1 = $('.titlesvg1').text();
    		// var titlesvg2 = $('.titlesvg2').text();
    		// var titlesvg3 = $('.titlesvg3').text();
    		// var titlesvg4 = $('.titlesvg4').text();
    		// var titlesvg5 = $('.titlesvg5').text();
    		// var titlesvg6 = $('.titlesvg6').text();
    		// var titlesvg7 = $('.titlesvg7').text();
    		// var titlesvg8 = $('.titlesvg8').text();
    		// var titlesvg9 = $('.titlesvg9').text();
    		// var titlesvg9 = $('.titlesvg10').text();
    		// var titlesvg9 = $('.titlesvg11').text();
    		// for (var i=1; i<=14; i++ ){
    		// 	$('#appdesign-threerow-region #svg' + i + ' .svgContainer span').html($('.icon' + i).html());
    		// 	$('#appdesign-threerow-region #svg' + i + ' p').html($('.titlesvg' + i).text());
    		// }    	 		
    	},
    	ChangeIconFooter:function() {
    		// var iconFooter1 = $('.footericon1').html();
    		// var iconFooter2 = $('.footericon2').html();
    		// for (var i=1; i<=2; i++ ){
    		// 	$('#appdesign-threerow-region #svg' + i + ' .svgContainer span').html($('.icon' + i).html());
    		// 	$('#l3col2 #svg' + i + ' .svgContainer span').html($('.icon' + i).html());
    		// 	$('#l2col #svg' + i + ' p').html($('.titlesvg' + i).text());
    		// 	$('#l3col2 #svg' + i + ' p').html($('.titlesvg' + i).text());
    		// } 
    	},
    	changeIconRow:function(){
    		// var icon1 = $('.rowicon1').html();
    		// var icon2 = $('.rowicon2').html();
    		// var icon3 = $('.rowicon3').html();
    		// var icon4 = $('.rowicon4').html();
    		// var icon5 = $('.rowicon5').html();
    		// var titlesvg1 = $('.rowtitlesvg1').text();
    		// var titlesvg2 = $('.rowtitlesvg2').text();
    		// var titlesvg3 = $('.rowtitlesvg3').text();
    		// var titlesvg4 = $('.rowtitlesvg4').text();
    		// var titlesvg5 = $('.rowtitlesvg5').text();
    		// for (var i=1; i<=5; i++ ){
    		// 	$('#footer_5icon #svg' + i + ' .svgContainer span').html($('.rowicon' + i).html());			
    		// 	$('#footer_4icon #svg' + i + ' .svgContainer span').html($('.rowicon' + i).html());
    		// 	$('#footer_3icon #svg' + i + ' .svgContainer span').html($('.rowicon' + i).html());
    		// 	$('#footer_5icon #svg' + i + ' p').html($('.rowtitlesvg' + i).text());
    		// 	$('#footer_4icon #svg' + i + ' p').html($('.rowtitlesvg' + i).text());
    		// 	$('#footer_3icon #svg' + i + ' p').html($('.rowtitlesvg' + i).text());
    		// }    		
    	},
    	resetLogo:function() {
      		$(".spaceinner").html('<span id="preview2"><img src="" class="logoupload"></span>');
     	},
     	resetBackground:function() {
     		$(".bgcontainer").css({'top': 0, 'left': 0});
      		$(".bgcontainer").html('<img src="" class="bgupload">');
     	},
     	fillColorSvg:function(){
     		var iconColor = $('.icon_color').text();
     		$('#appdesign-threerow-region svg.icon').css({'fill': iconColor});
     	},
     	convertBeforeExport: function() {
     		var elementName = App.util.style.getElementName();
     		if ( elementName === "#appdesign-threerow-region" ) {
     			var radioButtons = $("input#select_column");
				var selection = radioButtons.index(radioButtons.filter(':checked'));
				switch ( selection ) {
					case 0:
						for ( var i = 1; i <= 8; i++ ) {
							this.generateImgeSVG(i);
						}
						break;
				};
     		}
     	},
     	convertSVG: function(){
     		var iconColor = $('.icon_color').text();
     		var radioButtons = $("input#select_column");
     		var selection = radioButtons.index(radioButtons.filter(':checked'));
     		var minValue;
     		var maxValue;
     		switch(selection){
			    case 0:
		    		minValue = 1;
		    		maxValue = 8;
					break;
				case 1:
					
			   		minValue = 15;
		    		maxValue = 23;
			    	break;
			    case 2:
					minValue = 9;
		    		maxValue = 14;
			    	break;
			    case 3:
					minValue = 36;
		    		maxValue = 45;
			    	break;
			};
			var s = new XMLSerializer();
			var str = s.serializeToString(document);
			for ( var i = minValue; i <= maxValue; i++ ) {
				var svg = document.querySelector('#icon_lt' + i + ' .icon');
				var img = document.querySelector('#icon_lt' + i + ' .imageSVG' );
				var canvas = document.querySelector('#icon_lt' + i + ' #canvas');
				
				canvas.width  = 100;
				canvas.height = 100;
				if ( svg !== null ) {
					// get svg data
				var xml = new XMLSerializer().serializeToString(svg);

				// make it base64
				var svg64 = btoa(xml);
				var b64Start = 'data:image/svg+xml;base64,';

				// prepend a "header"
				var image64 = b64Start + svg64;

				// set it as the source of the img element
				img.src = image64;

				// draw the image onto the canvas
				canvas.fillStyle = iconColor;
				canvas.getContext('2d').drawImage(img, 0, 0);
				// canvas.fillStyle = iconColor;
				  var dt = canvas.toDataURL('image/png'); // << this fails in IE/Edge...

				  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
				  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
				}
			}
		},
		convertSvgOneRow: function(){
			var radioButtons = $("input#select_icon");
			var iconColor = $('.icon_color').text();
			var selection = radioButtons.index(radioButtons.filter(':checked'));
			var minValue;
     		var maxValue;
			switch(selection){
			    case 0:
			 		minValue = 24;
		    		maxValue = 28;
				    break;
				case 1:
					minValue = 29;
		    		maxValue = 32;
			    	break;
			    case 2:
					minValue = 33;
		    		maxValue = 35;
			    	break;
			    };
			    for ( var i = minValue; i <= maxValue; i++ ) {
				var svg = document.querySelector('#icon_lt' + i + ' .icon');
				var img = document.querySelector('#icon_lt' + i + ' .imageSVG' );
				var canvas = document.querySelector('#icon_lt' + i + ' #canvas');
				 canvas.width  = 100;
				 canvas.height = 100;
				 if ( svg !== null ) {
				// get svg data
				var xml = new XMLSerializer().serializeToString(svg);

				// make it base64
				var svg64 = btoa(xml);
				var b64Start = 'data:image/svg+xml;base64,';

				// prepend a "header"
				var image64 = b64Start + svg64;

				// set it as the source of the img element
				img.src = image64;

				// draw the image onto the canvas
				canvas.fillStyle = iconColor;
				canvas.getContext('2d').drawImage(img, 0, 0);
				// canvas.fillStyle = iconColor;
				  var dt = canvas.toDataURL('image/png'); // << this fails in IE/Edge...
				  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
				  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
				}
			}
		},
		actionPasteCut: function(e) {
			var field = $(e.currentTarget);
			setTimeout(function() {
				$(field).trigger("keyup");
			}, 0);
		},
		
		showLogin: function(e) {
			$("#divMask").fadeIn('fast');
		},
		selectTab1 : function() {
			//$("#menuTabSlider").animate({'margin-left':'0px'},300);
			$("#menuTabSlider").animate({left: "0px"}, 150);
			$("#box-title-region").animate({scrollLeft: "0px"}, 150);
		},
		selectTab2 : function() {
			//$("#menuTabSlider").animate({'margin-left': ($("#menuTab1").width() + 5) +  'px'},300);
			$("#menuTabSlider").animate({left: ($("#menuTab1").width() + 5) +  "px"}, 150);
			$("#box-title-region").animate({scrollLeft: ($("#tabMenuStyle").width() + 5) +  "px"}, 150);
		},
		checkIconLayout: function(){
			var menuLength = $('.divinner .div_menu_btn').length;
    		var widthList = menuLength*110;
    		$('.divinner').css({'width': widthList});
    		if (widthList <= 770) {
    			//$('.leftarr').addClass('disable');
    			//$('.rightarr').addClass('disable');
    		} else if (widthList > 770) {
    			//$('.leftarr').addClass('disable');
    			//$('.rightarr').removeClass('disable');
    		}
    		var menu1Length = $('#menu1 .div_menu_btn').length;
    		var menu2Length = $('#menu2 .div_menu_btn').length;
    		var menu3Length = $('#menu3 .div_menu_btn').length;
    		$('.divinner').find('.selectedIcon').removeClass('selectedIcon');
    		if (menu1Length === 0) {
    			$('.divinner #menu2 .div_menu_btn:first-child').addClass('selectedIcon');
    		} else if (menu1Length > 0){
    			$('.divinner #menu1 .div_menu_btn:first-child').addClass('selectedIcon');
    		}
    		if (menu2Length === 0) {
    			$('.divinner #menu3 .div_menu_btn:first-child').addClass('selectedIcon');
    		}
		},
		changeRow1Menu: function() {
			var menu = $("#row1Menu").val();
			var objColor = {
					"iconColor":$("#togglePaletteOnly1").val(),
					"bderColor":$("#togglePaletteOnly2").val(),
					"textColor":$("#togglePaletteOnly3").val(),
					"bgroundColor":$("#togglePaletteOnly4").val(),
					"bgroundMenu":$("#togglePaletteOnly5").val(),
					"pointBgColor":$("#togglePaletteOnly6").val(),
					"pointTextColor":$("#togglePaletteOnly7").val(),
					"infoColor":$("#togglePaletteOnly12").val()
				};
			var objPoint = {
				"pointCheck": $('#change_content input').is(':checked'),
				"text1": $(".change_head_txt").val(),
				"text2": $(".change_title_txt").val(),
				"barcodeCheck": $('#barcode_display').is(':checked'),
				"cardCheck": $('#card_display').is(':checked')
			};
			
			var objOther = {
				"roundCorner": $('#escape_layout input').is(':checked'),
				"boxTitle": $('#box-title-region').html(),
				// "titleText": $('#input_new_title').val(),
				"senario": $('#senario').is(':checked')
			};
			var objSave = {
				"template": $("#appdesign-threerow-region").html(),
				"color": App.util.style.setColorArr(objColor, "layout1"),
				"point": objPoint,
				"other": objOther
			};
			this.svgModel.set("appcol", objSave);
			for (var i = 0; i <= menu; i++) {
				if (i>0){
					$('#menu1').append("<div class='div_menu_btn'></div>");
					var iconLoad = $('#row1_' + i + ' a:nth-child(' + i).html();
					$('#menu1 .div_menu_btn:nth-child(' + i).html(iconLoad);
					$('#menu1 .div_menu_btn:nth-child(' + i).append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");
				} else {
					$('#menu1').html('');
				}			
			}
			this.loadPage();
			this.checkIconLayout();
			$('.divinner').css({'left': 0});
			switch(menu){
				case "0":
					$(".menu_row_1").hide();
					//$(".menuFooter").removeClass("no_show_footer").addClass("no_show_footer");
					break;
				case "1":
					$(".menu_row_1").show();
					$(".menu_row_1 #row1_2").hide();
					$(".menu_row_1 #row1_3").hide();
					$(".menu_row_1 #row1_4").hide();
					$(".menu_row_1").removeClass("menuColumn2").removeClass("menuColumn3").removeClass("menuColumn4").addClass("menuColumn1");
					$(".menu_row_1 #row1_1").show();
					break;
				case "2":
					$(".menu_row_1").show();
					$(".menu_row_1 #row1_1").hide();
					$(".menu_row_1 #row1_3").hide();
					$(".menu_row_1 #row1_4").hide();
					$(".menu_row_1").removeClass("menuColumn1").removeClass("menuColumn3").removeClass("menuColumn4").addClass("menuColumn2");
					$(".menu_row_1 #row1_2").show();
					break;
				case "3":
					$(".menu_row_1").show();
					$(".menu_row_1 #row1_1").hide();
					$(".menu_row_1 #row1_2").hide();
					$(".menu_row_1 #row1_4").hide();
					$(".menu_row_1").removeClass("menuColumn1").removeClass("menuColumn2").removeClass("menuColumn4").addClass("menuColumn3");
					$(".menu_row_1 #row1_3").show();
					break;
				case "4":
					$(".menu_row_1").show();
					$(".menu_row_1 #row1_1").hide();
					$(".menu_row_1 #row1_2").hide();
					$(".menu_row_1 #row1_3").hide();
					$(".menu_row_1").removeClass("menuColumn1").removeClass("menuColumn2").removeClass("menuColumn3").addClass("menuColumn4");
					$(".menu_row_1 #row1_4").show();
					break;
			}
			
		},
		changeRow2Menu: function() {
			var menu = $("#row2Menu").val();
			var objColor = {
					"iconColor":$("#togglePaletteOnly1").val(),
					"bderColor":$("#togglePaletteOnly2").val(),
					"textColor":$("#togglePaletteOnly3").val(),
					"bgroundColor":$("#togglePaletteOnly4").val(),
					"bgroundMenu":$("#togglePaletteOnly5").val(),
					"pointBgColor":$("#togglePaletteOnly6").val(),
					"pointTextColor":$("#togglePaletteOnly7").val(),
					"infoColor":$("#togglePaletteOnly12").val()
				};
			var objPoint = {
				"pointCheck": $('#change_content input').is(':checked'),
				"text1": $(".change_head_txt").val(),
				"text2": $(".change_title_txt").val(),
				"barcodeCheck": $('#barcode_display').is(':checked'),
				"cardCheck": $('#card_display').is(':checked')
			};
			
			var objOther = {
				"roundCorner": $('#escape_layout input').is(':checked'),
				"boxTitle": $('#box-title-region').html(),
				// "titleText": $('#input_new_title').val(),
				"senario": $('#senario').is(':checked')
			};
			var objSave = {
				"template": $("#appdesign-threerow-region").html(),
				"color": App.util.style.setColorArr(objColor, "layout1"),
				"point": objPoint,
				"other": objOther
			};
			this.svgModel.set("appcol", objSave);
			for (var i = 0; i <= menu; i++) {
				if (i>0){
					$('#menu2').append("<div class='div_menu_btn'></div>");
					var iconLoad = $('#row2_' + i + ' a:nth-child(' + i).html();
					$('#menu2 .div_menu_btn:nth-child(' + i).html(iconLoad);
					$('#menu2 .div_menu_btn:nth-child(' + i).append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");
				} else {
					$('#menu2').html('');
				}			
			}
			this.loadPage();
			this.checkIconLayout();
			$('.divinner').css({'left': 0});
			switch(menu){
				case "0":
					$(".menu_row_2").hide();
					break;
				case "1":
					$(".menu_row_2").show();
					$(".menu_row_2 #row2_2").hide();
					$(".menu_row_2 #row2_3").hide();
					$(".menu_row_2 #row2_4").hide();
					$(".menu_row_2").removeClass("menuColumn2").removeClass("menuColumn3").removeClass("menuColumn4").addClass("menuColumn1");
					$(".menu_row_2 #row2_1").show();
					break;
				case "2":
					$(".menu_row_2").show();
					$(".menu_row_2 #row2_1").hide();
					$(".menu_row_2 #row2_3").hide();
					$(".menu_row_2 #row2_4").hide();
					$(".menu_row_2").removeClass("menuColumn1").removeClass("menuColumn3").removeClass("menuColumn4").addClass("menuColumn2");
					$(".menu_row_2 #row2_2").show();
					break;
				case "3":
					$(".menu_row_2").show();
					$(".menu_row_2 #row2_1").hide();
					$(".menu_row_2 #row2_2").hide();
					$(".menu_row_2 #row2_4").hide();
					$(".menu_row_2").removeClass("menuColumn1").removeClass("menuColumn2").removeClass("menuColumn4").addClass("menuColumn3");
					$(".menu_row_2 #row2_3").show();
					break;
				case "4":
					$(".menu_row_2").show();
					$(".menu_row_2 #row2_1").hide();
					$(".menu_row_2 #row2_2").hide();
					$(".menu_row_2 #row2_3").hide();
					$(".menu_row_2").removeClass("menuColumn1").removeClass("menuColumn2").removeClass("menuColumn3").addClass("menuColumn4");
					$(".menu_row_2 #row2_4").show();
					break;
			}
			
		},
		changeRow3Menu: function() {
			var menu = $("#row3Menu").val();
			var objColor = {
					"iconColor":$("#togglePaletteOnly1").val(),
					"bderColor":$("#togglePaletteOnly2").val(),
					"textColor":$("#togglePaletteOnly3").val(),
					"bgroundColor":$("#togglePaletteOnly4").val(),
					"bgroundMenu":$("#togglePaletteOnly5").val(),
					"pointBgColor":$("#togglePaletteOnly6").val(),
					"pointTextColor":$("#togglePaletteOnly7").val(),
					"infoColor":$("#togglePaletteOnly12").val()
				};
			var objPoint = {
				"pointCheck": $('#change_content input').is(':checked'),
				"text1": $(".change_head_txt").val(),
				"text2": $(".change_title_txt").val(),
				"barcodeCheck": $('#barcode_display').is(':checked'),
				"cardCheck": $('#card_display').is(':checked')
			};
			
			var objOther = {
				"roundCorner": $('#escape_layout input').is(':checked'),
				"boxTitle": $('#box-title-region').html(),
				// "titleText": $('#input_new_title').val(),
				"senario": $('#senario').is(':checked')
			};
			var objSave = {
				"template": $("#appdesign-threerow-region").html(),
				"color": App.util.style.setColorArr(objColor, "layout1"),
				"point": objPoint,
				"other": objOther
			};
			this.svgModel.set("appcol", objSave);
			for (var i = 0; i <= menu; i++) {
				if (i>0){
					$('#menu3').append("<div class='div_menu_btn'></div>");
					$('#menu3 .div_menu_btn').addClass('footer_menu_icon');
					var iconLoad = $('#footer' + menu + ' a:nth-child(' + i).html();
					$('#menu3 .div_menu_btn:nth-child(' + i).html(iconLoad);
					$('#menu3 .div_menu_btn:nth-child(' + i).append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");
				} else {
					$('#menu3').html('');
				}			
			}
			this.loadPage();
			this.checkIconLayout();
			$('.divinner').css({'left': 0});
			switch(menu){
				case "0":
					$(".footer_menu_content").removeClass("hidden_class");
					$(".footer_menu_content").hide();
					$(".menuFooter").removeClass("no_show_footer").addClass("no_show_footer");
					break;
				case "1":
					$(".footer_menu_content").removeClass("hidden_class");
					$(".menuFooter").removeClass("no_show_footer");
					$(".footer_menu_content").hide();
					$("#footer" + menu).show();
					$(".menuFooter #area-menu").show();
					break;
				case "2":
					$(".footer_menu_content").removeClass("hidden_class");
					$(".menuFooter").removeClass("no_show_footer");
					$(".footer_menu_content").hide();
					$("#footer" + menu).show();
					$(".menuFooter #area-menu").show();
					break;
				case "3":
					$(".footer_menu_content").removeClass("hidden_class");
					$(".menuFooter").removeClass("no_show_footer");
					$(".footer_menu_content").hide();
					$("#footer" + menu).show();
					$(".menuFooter #area-menu").show();
					break;
				case "4":
					$(".footer_menu_content").removeClass("hidden_class");
					$(".menuFooter").removeClass("no_show_footer");
					$(".footer_menu_content").hide();
					$("#footer" + menu).show();
					$(".menuFooter #area-menu").show();
					break;
				case "5":
					$(".footer_menu_content").removeClass("hidden_class");
					$(".menuFooter").removeClass("no_show_footer");
					$(".footer_menu_content").hide();
					$("#footer" + menu).show();
					$(".menuFooter #area-menu").show();
					break;
			}
		},
		changeFooterHeight: function(e) {
			var _this = $(e.currentTarget);
			if (_this.is(":checked")) {
				$(".footer_menu_content").removeClass("thick_footer");
				$(".footer_menu_content").addClass("thick_footer");
				$(".footer_menu_content a").removeClass("thick_footer");
				$(".footer_menu_content a").addClass("thick_footer");
				$(".footer_menu_content a p").removeClass("footer_text_line");
				$(".footer_menu_content a p").addClass("footer_text_line");
			} else {
				$(".footer_menu_content").removeClass("thick_footer");
				$(".footer_menu_content a").removeClass("thick_footer");
				$(".footer_menu_content a p").removeClass("footer_text_line");
			}
		},
		changeRow1MenuSub: function() {
			var menu = $("#row1MenuSub").val();
			var objColor = {
					"iconColor":$("#togglePaletteOnly1").val(),
					"bderColor":$("#togglePaletteOnly2").val(),
					"textColor":$("#togglePaletteOnly3").val(),
					"bgroundColor":$("#togglePaletteOnly4").val(),
					"bgroundMenu":$("#togglePaletteOnly5").val(),
					"pointBgColor":$("#togglePaletteOnly6").val(),
					"pointTextColor":$("#togglePaletteOnly7").val(),
					"infoColor":$("#togglePaletteOnly12").val()
				};
			var objPoint = {
				"pointCheck": $('#change_content input').is(':checked'),
				"text1": $(".change_head_txt").val(),
				"text2": $(".change_title_txt").val(),
				"barcodeCheck": $('#barcode_display').is(':checked'),
				"cardCheck": $('#card_display').is(':checked')
			};
			
			var objOther = {
				"roundCorner": $('#escape_layout input').is(':checked'),
				"boxTitle": $('#box-title-region').html(),
				// "titleText": $('#input_new_title').val(),
				"senario": $('#senario').is(':checked')
			};
			var objSave = {
				"template": $("#appdesign-threerow-region").html(),
				"color": App.util.style.setColorArr(objColor, "layout1"),
				"point": objPoint,
				"other": objOther
			};
			this.svgModel.set("appcol", objSave);
			for (var i = 0; i <= menu; i++) {
				if (i>0){
					$('#menu1').append("<div class='div_menu_btn'></div>");
					var iconLoad = $('#row1_' + i + ' a:nth-child(' + i).html();
					$('#menu1 .div_menu_btn:nth-child(' + i + ')').html(iconLoad);
					$('#menu1 .div_menu_btn:nth-child(' + i + ')').append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");	
				} else {
					$('#menu1').html('');
				}			
			}
			this.loadPage();
			this.checkIconLayout();
			$('.divinner').css({'left': 0});
			switch(menu){
				case "0":
					$("#appdesign-onerow-region .menu_row_1_fixed").hide();
					//$(".menuFooter").removeClass("no_show_footer").addClass("no_show_footer");
					break;
				case "1":
					$("#appdesign-onerow-region .menu_row_1_fixed").show();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_2").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_3").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_4").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed").removeClass("menuColumn2").removeClass("menuColumn3").removeClass("menuColumn4").addClass("menuColumn1");
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_1").show();
					break;
				case "2":
					$("#appdesign-onerow-region .menu_row_1_fixed").show();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_1").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_3").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_4").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed").removeClass("menuColumn1").removeClass("menuColumn3").removeClass("menuColumn4").addClass("menuColumn2");
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_2").show();
					break;
				case "3":
					$("#appdesign-onerow-region .menu_row_1_fixed").show();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_1").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_2").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_4").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed").removeClass("menuColumn2").removeClass("menuColumn4").addClass("menuColumn3");
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_3").show();
					break;
				case "4":
					$("#appdesign-onerow-region .menu_row_1_fixed").show();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_1").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_2").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_3").hide();
					$("#appdesign-onerow-region .menu_row_1_fixed").removeClass("menuColumn2").removeClass("menuColumn3").addClass("menuColumn4");
					$("#appdesign-onerow-region .menu_row_1_fixed #row1_4").show();
					break;
			}
			
		},
		changeRow2MenuSub: function() {
			var menu = $("#row2MenuSub").val();
			var objColor = {
					"iconColor":$("#togglePaletteOnly1").val(),
					"bderColor":$("#togglePaletteOnly2").val(),
					"textColor":$("#togglePaletteOnly3").val(),
					"bgroundColor":$("#togglePaletteOnly4").val(),
					"bgroundMenu":$("#togglePaletteOnly5").val(),
					"pointBgColor":$("#togglePaletteOnly6").val(),
					"pointTextColor":$("#togglePaletteOnly7").val(),
					"infoColor":$("#togglePaletteOnly12").val()
				};
			var objPoint = {
				"pointCheck": $('#change_content input').is(':checked'),
				"text1": $(".change_head_txt").val(),
				"text2": $(".change_title_txt").val(),
				"barcodeCheck": $('#barcode_display').is(':checked'),
				"cardCheck": $('#card_display').is(':checked')
			};
			
			var objOther = {
				"roundCorner": $('#escape_layout input').is(':checked'),
				"boxTitle": $('#box-title-region').html(),
				// "titleText": $('#input_new_title').val(),
				"senario": $('#senario').is(':checked')
			};
			var objSave = {
				"template": $("#appdesign-threerow-region").html(),
				"color": App.util.style.setColorArr(objColor, "layout1"),
				"point": objPoint,
				"other": objOther
			};
			this.svgModel.set("appcol", objSave);
			for (var i = 0; i <= menu; i++) {
				if (i>0){
					$('#menu2').append("<div class='div_menu_btn'></div>");
					var iconLoad = $('#row2_' + i + ' a:nth-child(' + i).html();
					$('#menu2 .div_menu_btn:nth-child(' + i + ')').html(iconLoad);
					$('#menu2 .div_menu_btn:nth-child(' + i + ')').append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");
				} else {
					$('#menu2').html('');
				}			
			}
			this.loadPage();
			this.checkIconLayout();
			$('.divinner').css({'left': 0});
			switch(menu){
				case "0":
					$("#appdesign-onerow-region .menu_row_2_fixed").hide();
					//$(".menuFooter").removeClass("no_show_footer").addClass("no_show_footer");
					break;
				case "1":
					$("#appdesign-onerow-region .menu_row_2_fixed").show();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_2").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_3").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_4").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed").removeClass("menuColumn2").removeClass("menuColumn3").removeClass("menuColumn4").addClass("menuColumn1");
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_1").show();
					break;
				case "2":
					$("#appdesign-onerow-region .menu_row_2_fixed").show();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_1").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_3").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_4").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed").removeClass("menuColumn1").removeClass("menuColumn3").removeClass("menuColumn4").addClass("menuColumn2");
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_2").show();
					break;
				case "3":
					$("#appdesign-onerow-region .menu_row_2_fixed").show();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_1").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_2").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_4").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed").removeClass("menuColumn2").removeClass("menuColumn4").addClass("menuColumn3");
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_3").show();
					break;
				case "4":
					$("#appdesign-onerow-region .menu_row_2_fixed").show();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_1").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_2").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_3").hide();
					$("#appdesign-onerow-region .menu_row_2_fixed").removeClass("menuColumn2").removeClass("menuColumn3").addClass("menuColumn4");
					$("#appdesign-onerow-region .menu_row_2_fixed #row2_4").show();
					break;
			}
			
		},
		selectNumberMenuFixed : function(e) {
			var menu = $("#numberMenuFixed").val();
			var objColor = {
					"iconColor":$("#togglePaletteOnly1").val(),
					"bderColor":$("#togglePaletteOnly2").val(),
					"textColor":$("#togglePaletteOnly3").val(),
					"bgroundColor":$("#togglePaletteOnly4").val(),
					"bgroundMenu":$("#togglePaletteOnly5").val(),
					"pointBgColor":$("#togglePaletteOnly6").val(),
					"pointTextColor":$("#togglePaletteOnly7").val(),
					"infoColor":$("#togglePaletteOnly12").val()
				};
			var objPoint = {
				"pointCheck": $('#change_content input').is(':checked'),
				"text1": $(".change_head_txt").val(),
				"text2": $(".change_title_txt").val(),
				"barcodeCheck": $('#barcode_display').is(':checked'),
				"cardCheck": $('#card_display').is(':checked')
			};
			
			var objOther = {
				"roundCorner": $('#escape_layout input').is(':checked'),
				"boxTitle": $('#box-title-region').html(),
				// "titleText": $('#input_new_title').val(),
				"senario": $('#senario').is(':checked')
			};
			var objSave = {
				"template": $("#appdesign-threerow-region").html(),
				"color": App.util.style.setColorArr(objColor, "layout1"),
				"point": objPoint,
				"other": objOther
			};
			this.svgModel.set("appcol", objSave);
			for (var i = 0; i <= menu; i++) {
				if (i>0){
					$('#menu3').append("<div class='div_menu_btn'></div>");
					$('#menu3 .div_menu_btn').addClass('footer_menu_icon');
					var iconLoad = $('#footer_' + menu + 'icon li:nth-child(' + i + ') a').html();
					$('#menu3 .div_menu_btn:nth-child(' + i + ')').html(iconLoad);
					$('#menu3 .div_menu_btn:nth-child(' + i + ')').append("<span class='toparr'><i class='fa fa-caret-up' aria-hidden='true'></i></span>");
				} else {
					$('#menu3').html('');
				}			
			}
			this.loadPage();
			this.checkIconLayout();
			$('.divinner').css({'left': 0});
			switch(menu){
				case "1":
					$("#appdesign-onerow-region #footer_2icon").hide();
					$("#appdesign-onerow-region #footer_3icon").hide();
					$("#appdesign-onerow-region #footer_4icon").hide();
					$("#appdesign-onerow-region #footer_5icon").hide();
					$("#appdesign-onerow-region #footer_1icon").show();
					break;
				case "2":
					$("#appdesign-onerow-region #footer_1icon").hide();
					$("#appdesign-onerow-region #footer_3icon").hide();
					$("#appdesign-onerow-region #footer_4icon").hide();
					$("#appdesign-onerow-region #footer_5icon").hide();
					$("#appdesign-onerow-region #footer_2icon").show();
					break;
				case "3":
					$("#appdesign-onerow-region #footer_1icon").hide();
					$("#appdesign-onerow-region #footer_2icon").hide();
					$("#appdesign-onerow-region #footer_4icon").hide();
					$("#appdesign-onerow-region #footer_5icon").hide();
					$("#appdesign-onerow-region #footer_3icon").show();
					break;
				case "4":
					$("#appdesign-onerow-region #footer_1icon").hide();
					$("#appdesign-onerow-region #footer_2icon").hide();
					$("#appdesign-onerow-region #footer_3icon").hide();
					$("#appdesign-onerow-region #footer_5icon").hide();
					$("#appdesign-onerow-region #footer_4icon").show();
					break;
				case "5":
					$("#appdesign-onerow-region #footer_1icon").hide();
					$("#appdesign-onerow-region #footer_2icon").hide();
					$("#appdesign-onerow-region #footer_3icon").hide();
					$("#appdesign-onerow-region #footer_4icon").hide();
					$("#appdesign-onerow-region #footer_5icon").show();
					break;
			}
		},
		Login: function() {
			var loginID = $("#loginID").val();
			var password = $("#password").val();
			var that = this;
			if (loginID == "" || password == "") {
				$("#loginMsg").text("ログインIDとパスワードを入力ください。");
				return false;
			}
			
			$.ajax({
			    type: "POST",
			    url: "http://sgpweb.betrend.com/btapi/admin/imgmaker/login",
			    data: '{"userId":"' + loginID + '","password":"' + password + '"}',
			    contentType: "application/json; charset=utf-8",
			    dataType: "json",
			    success: function(data) {
			    	if (data != null) {
			    		var errCode = data.errorCode;
			    		var sid = data.sessionId;
			    		if (errCode == "0000" && sid != null) {
			    			//that.fetchInfo();
			    			localStorage.setItem("_sid",  sid );
			    			location.reload();
//			    			$(".top_menu_login").attr("id", "txtLogout").text("ログアウト");
			    			//$("#divMask").fadeOut('fast');
				    		//$(".top_menu_login").attr("id", "txtLogout").text("ログアウト");
			    			//$(".top_menu_right").prepend("<input type=\"button\" class=\"btn_blue\" id=\"btnSave\" value=\"保存する\" />");
			    		} else {
							$("#loginMsg").text("ログインIDとパスワードを入力ください。");
							return false;
			    		}
			    	}
			    },
			    error: function(XMLHttpRequest, textStatus, errorThrown){
	    			alert("ログインエラー");
			    }
			});
		},
		Logout: function() {
			if (confirm("ログアウトしますか？")) {
				var _sid = this.getSID();
				$.ajax({
				    type: "POST",
				    url: "http://sgpweb.betrend.com/btapi/admin/imgmaker/logoff",
				    data: '{"status":"destroy","p":"' + _sid + '"}',
				    contentType: "application/json; charset=utf-8",
				    dataType: "json",
				    success: function(data) {
				    	if (data != null) {
				    		var errCode = data.errorCode;
				    		if (errCode == "0000") {
				    			localStorage.removeItem("_sid");
				    			location.reload();
				    		} else {
				    			alert("ログアウトエラー : ERROR_CODE " + errCode);
				    		}
				    	}
				    },
				    error: function(XMLHttpRequest, textStatus, errorThrown){
		    			alert("ログアウトエラー");
				    }
				});
			}
		},
		enterLogin: function(e) {
			if (e.keyCode == 13) {
				this.Login();
			}
		},
		getSID: function() {
			return localStorage.getItem("_sid");
		},
		RemainSID: function(sid) {
			if (sid != null) {
				setInterval(function() {
			    	console.log("REMAIN_SID : " + sid);
			    	$.ajax({
					    type: "POST",
					    url: "http://sgpweb.betrend.com/btapi/admin/imgmaker/logoff",
					    data: '{"p":"' + sid + '"}',
					    contentType: "application/json; charset=utf-8",
					    dataType: "json",
					    success: function(data) {
					    	console.log("REMAIN_SID_SUCCESS");
					    },
					    error: function(XMLHttpRequest, textStatus, errorThrown){
			    			alert("エラー");
					    }
					});
				} , 45000);
			};
		},
		modifyComponent: function(e) {
			var seft = $(e.currentTarget);			
			$('.divinner .div_menu_btn').removeClass('selectedIcon');
			seft.addClass('selectedIcon');
			$('#get_notify').attr('checked', false);
			var loadCom = seft.html();
			$('.preview_icon_select').html(loadCom);
			$('.preview_icon_select .toparr').remove();
			var txt = $('.preview_icon_select .menuBlock p').text();		
			$('#input_new_title').val(txt);
			var iconColor = $('.icon_color').text();
			var textColor = $('.title_color_col').text();
			$('.preview_icon_select svg').css({'fill': iconColor});
			$('.preview_icon_select .menuBlock p').css({'color': textColor});
			var parentSelected = $('.selectedIcon').parent().attr('id');
    		var numSelected = parentSelected.substr(parentSelected.length - 1);
    		if (numSelected === '3'){
    			$('#get_notify').prop('disabled', true);
    			$('#get_notify').parent().css({'opacity': 0.5});
    		} else {
    			$('#get_notify').prop('disabled', false);
    			$('#get_notify').parent().css({'opacity': 1});
    		}
    		if( $('.selectedIcon .svgContainer em').hasClass('badge-number') ){
    			$('#get_notify').prop('checked', true);
    		}
		},
	});
	return MainNavView;
})();
