/**
 * 雛形アプリにおけるスタイル操作を共通かしたメソッド群を提供
 * 主に template.css に対応したスタイルを付与するメソッドで構成
 */
var $ = require('jquery');
module.exports = (function () {

	var StyleUtil = {
		toActive: function( $target ){
			$target.removeClass("btftcolor1").removeClass("btbgcolor1");
			$target.addClass("btftcolor2").addClass("btbgcolor2");
		},
		toInactive: function( $target ){
			$target.removeClass("btftcolor2").removeClass("btbgcolor2");
			$target.addClass("btftcolor1").addClass("btbgcolor1");
		},
        setColor: function(element, color) {
            $("#" + element).spectrum("set", color);
            var updateColor = function(color) {
                var hexColor = "transparent";
                if ( color ) {
                    hexColor = color.toHexString();
                }
                switch ( element ) {
                    case "togglePaletteOnly1":
                        $('#appdesign-threerow-region svg.icon').css({'fill': hexColor});
                        $('.icon_color').text(hexColor);
                        $('.preview_icon_select svg').css({'fill': hexColor});
                        break;
                    case "togglePaletteOnly2":
                        $('#APP-TOP .menuContainer #area-menu, #APP-TOP #area-menu a,#APP-TOP .inner-menuContainer .menuBody, .menuFooter, .menuFooter .menuBlock').css({'border-color': hexColor});
                        $('.border_color').text(hexColor);
                        break;
                    case "togglePaletteOnly3":
                        $('#appdesign-threerow-region .menuContainer .btnM,#appdesign-threerow-region .menuFooter .btnS').css({'color': hexColor});
                        $('.title_color_col').text(hexColor);
                        $('.preview_icon_select .menuBlock p').css({'color': hexColor});
                        break;
                    case "togglePaletteOnly4":
                        $('#appdesign-threerow-region .menuContainer #area-menu a').css({'background-color': hexColor});
                        $('.background_color').text(hexColor);
                        break;
                    case "togglePaletteOnly5":                        
                        $('#appdesign-threerow-region .menuContainer.escape #area-menu').css({'background-color': hexColor});
                        $('.escape_color').text(hexColor);
                        break;
                    case "togglePaletteOnly6":
                        $('.block-point').css({'background-color': hexColor});
                        $('.background_point').text(hexColor);
                        break;
                    case "togglePaletteOnly7":
                        $('.block-point p').css({'color': hexColor});
                        $('.color_point').text(hexColor);
                        break;
                    case "togglePaletteOnly8":
                        $('#appdesign-onerow-region .selected.active svg.icon').css({'fill': hexColor});
                        $('#appdesign-onerow-region .selected.active .textinf').css({'color': hexColor});
                        $('.active_color_icon').text(hexColor);
                        break;
                    case "togglePaletteOnly9":
                        $('.bottom_menu').css({'background-color': hexColor, 'border-color': hexColor});
                        $('.bottom_menu li ').css({'border-color': hexColor});
                        $('.border_color').text(hexColor);
                        break;
                    case "togglePaletteOnly10":
                        // set inactive color
                        $('#appdesign-onerow-region .bottom_menu li svg.icon').css({'fill': hexColor});
                        $('#appdesign-onerow-region .bottom_menu li .textinf').css({'color': hexColor});
                        $('.inavtive_color_icon').text(hexColor);

                        // set active color
                        var activeColor = $('#togglePaletteOnly8').val();
                        $('#appdesign-onerow-region .selected svg.icon').css({'fill': activeColor});
                        $('#appdesign-onerow-region .selected p').css({'color': activeColor});
                        break;
                    case "togglePaletteOnly11":
                        $('#appdesign-onerow-region .bottom_menu li a, #appdesign-onerow-region .app-footer').css({'background-color': hexColor});
                        $('.background_color').text(hexColor);
                        break;
                    case "togglePaletteOnly12":
                        $('#appdesign-onerow-region .badge-number').css({'background': hexColor});
                        $('.badge_color').text(hexColor);
                        break;
                    case "togglePaletteOnly13":                        
                        $('#appdesign-threerow-region .badge-number').css({'background': hexColor});
                        $('.badge_color').text(hexColor);
                        break;      
                };
            };
            $("#" + element).spectrum({
                showPalette: true,
                showSelectionPalette: true,
                showButtons: true,
                togglePaletteMoreText: '拡張',
                togglePaletteLessText: 'キャンセル',
                chooseText: "選択",
                cancelText: "キャンセル",
                color: color,
                showInput: true,
                move: function (color) {
                    updateColor(color);
                },
                show: function () {                
                },
                beforeShow: function () {                
                },
                hide: function () {
                },
                change: function() {                 
                },
                palette: [
                    ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                    ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                    ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                    ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                    ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                    ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                    ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                    ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
                ]
            });
            $("#" + element).val(color);
        },

		setColorArr: function(objColor, type) {
    		var arr = [];
            if ( type === "layout2" ) {
                arr.push(objColor.activeColor);
                arr.push(objColor.bderColor);
                arr.push(objColor.inActiveColor);
                arr.push(objColor.bgroundColor);
                arr.push(objColor.pointBgColor);
                arr.push(objColor.pointTextColor);
                arr.push(objColor.infoColor);
            } else {
                arr.push(objColor.iconColor);
                arr.push(objColor.bderColor);
                arr.push(objColor.textColor);
                arr.push(objColor.bgroundColor);
                arr.push(objColor.bgroundMenu);
                arr.push(objColor.pointBgColor);
                arr.push(objColor.pointTextColor);
                arr.push(objColor.infoColor);
            }
    		return arr;
    	},
    	setColorDefault: function(index, type) {
    		var color = "#673a3a";
    		if ( type === "layout2" ) {
    			switch ( index ) {
                    case 6:
                        color = "#f7cbd3";
                        break;
                    case 9:
                    case 11:
                        color = "#fff";
                        break;
                    case 8:
                        color = "#d05670";
                        break;
                    case 10:
                        color = "#b4b2b4";
                        break;
                    case 12:
                        color = "#ff0000";
                        break;
    			};
    		} else {
    			switch ( index ) {
	    			case 4:
                    case 5:
	    				color = "#fff";
	    				break;
	    			case 6:
	    				color = "#f7cbd3";
	    				break;
                    case 13:
                        color = "#ff0000";
                        break;
    			};
    		}
    		return color;
    	},
    	setColorSave: function(index, type, colorArr) {
    		var color;
    		if ( type === "layout2" ) {
                switch ( index ) {
                    case 8:
                        color = colorArr[0];
                        break;
                    case 9:
                        color = colorArr[1];
                        break;
                    case 10:
                        color = colorArr[2];
                        break;
                    case 11:
                        color = colorArr[3];
                        break;
                    case 6:
                        color = colorArr[4];
                        break;
                    case 7:
                        color = colorArr[5];
                        break;
                    case 12:
                        color = colorArr[6];
                        break;
                };
    		} else {
    			switch ( index ) {
    				case 1:
    					color = colorArr[0];
    					break;
    				case 2:
    					color = colorArr[1];
    					break;
    				case 3:
    					color = colorArr[2];
    					break;
    				case 4:
    					color = colorArr[3];
    					break;
    				case 5:
    					color = colorArr[4];
    					break;
    				case 6:
    					color = colorArr[5];
    					break;
    				case 7:
    					color = colorArr[6];
    					break;
                    case 13:
                        color = colorArr[6];
                        break;
    			}
    		}
    		return color;
    	},
        setColorSvgDefault: function(index, type) {
            var color = "#b4b2b4";
            if ( type === "layout2" ) {
                switch ( index ) {
                    case 24:
                    case 29:
                    case 33:
                        color = "#d05670";
                        break;
                }
            }
            return color;
        },
    	setCheckBox: function(obj) {
    		// sameColor
    		// if ( obj.other.sameColor === true ) {
    		// 	$('#same_color input').prop('checked', true);
    		// } else {
    		// 	$('#same_color input').prop('checked', false);
    		// }

    		// roundCorner
			if ( obj.other.roundCorner === true ) {
    			$('#escape_layout input').prop('checked', true);
    			$('.show_change_color_layout').show();
    		} else {
    			$('#escape_layout input').prop('checked', false);
    			$('.show_change_color_layout').hide();
    		}

            // title
            // $('#input_new_title').val(obj.other.titleText);
            // $('#input_new_title').attr("placeholder", obj.other.titleText);

            // senario
            if ( obj.other.senario === true ) {
                $('#senario').prop('checked', true);
            } else {
                $('#senario').prop('checked', false);
            }
    	},
    	setCheckBoxDefault: function(selection) {
    		// sameColor
    		// $('#same_color input').prop('checked', false);

    		// roundCorner
    		$('#escape_layout input').prop('checked', false);
    		$('.show_change_color_layout').hide();

            // box change title
            $('.box_change_title').hide();
            $('#senario').prop('checked', false);
    	},
        setCheckBoxFooterLayout: function(obj) {
            // title
            // $('#input_new_title').val(obj.other.titleText);
            // $('#input_new_title').attr("placeholder", obj.other.titleText);

            // senario
            if ( obj.other.senario === true ) {
                $('#senario').prop('checked', true);
            } else {
                $('#senario').prop('checked', false);
            }
        },
        setCheckboxFooterLayoutDefault: function() {
            // box change title
            $('.box_change_title').hide();
            $('#senario').prop('checked', false);
        },
    	setPoint: function(obj) {
    		// point
    		if ( obj.point.pointCheck === true ) {
    			$('#change_content input').prop('checked', true);
    			$('.box_edit_content').show();
    		} else {
    			$('#change_content input').prop('checked', false);
    			$('.box_edit_content').hide();
    		}

    		// set text
    		$(".change_head_txt").val(obj.point.text1);
    		$(".change_title_txt").val(obj.point.text2);
            // $(".change_title_txt").attr("placeholder", obj.point.text2);

    		// barcode
    		if ( obj.point.barcodeCheck === true ) {
    			$('#barcode_display').prop('checked', true);
    		} else {
    			$('#barcode_display').prop('checked', false);
    		}

    		// card
    		if ( obj.point.cardCheck === true ) {
    			$('#card_display').prop('checked', true);
                $('.change_icon_act.card').show();
    		} else {
    			$('#card_display').prop('checked', false);
                $('.change_icon_act.card').hide();
    		}
    	},
    	setPointDefault: function() {
    		// point
    		$('#change_content input').prop('checked', true);
    		$('.box_edit_content').show();

            // set text
            $(".change_head_txt").val('現在のポイント数');
            $(".change_title_txt").val('ポイントを使う');
            // $(".change_title_txt").attr("placeholder", 'ポイントを使う');

    		// barcode
    		$('#barcode_display').prop('checked', false);

    		// card
    		$('#card_display').prop('checked', false);
            $('.change_icon_act.card').hide();
    	},
        setBoxTitleChangeLayoutDefault: function(type, selection) {
            var titleText;
            if ( type === "layout2" ) {
                titleText = 'ホーム';
            } else {
                switch ( selection ) {
                    case 0:
                    case 1:
                        titleText = '来店スタンプ';
                        break;
                    case 2:
                        titleText = 'クーポン一覧';
                        break;
                };
            }
            // $('#input_new_title').val(titleText);
            // $('#input_new_title').attr("placeholder", titleText);
            $('#senario').prop('checked', false);
            $('.box_change_title').hide();
        },
        setBoxTitleChangeLayout: function(type, model) {
            var objBoxTitle = {
                'boxTitle': $("#box-title-region").html(),
                // 'titleText': $("#input_new_title").val(),
                'senario': $('#senario').is(':checked')
            };
            var boxTitleLayout;
            var radioButtons;
            if ( type === "layout1" ) {
                model.set("boxTitleChangeLayout2", objBoxTitle);
                boxTitleLayout = model.getBoxTitleChangeLayout1();
                radioButtons = $("input#select_column");
            } else {
                model.set("boxTitleChangeLayout1", objBoxTitle);
                boxTitleLayout = model.getBoxTitleChangeLayout2();
                radioButtons = $("input#select_icon");
            }
            var selection = radioButtons.index(radioButtons.filter(':checked'));
            if ( boxTitleLayout ) {
                $("#box-title-region").html(boxTitleLayout.boxTitle);
                // $('#input_new_title').val(boxTitleLayout.titleText);
                // $('#input_new_title').attr("placeholder", boxTitleLayout.titleText);
                $('#senario').prop('checked', boxTitleLayout.senario);
            } else {
                this.setBoxTitleChangeLayoutDefault(type, selection);
            }
            this.setMaxLengthInput(type, selection);
        },
        setBoxPointChangeLayout: function(type, model) {
            var objPoint = {
                "pointCheck": $('#change_content input').is(':checked'),
                "text1": $(".change_head_txt").val(),
                "text2": $(".change_title_txt").val(),
                "barcodeCheck": $('#barcode_display').is(':checked'),
                "cardCheck": $('#card_display').is(':checked'),
                "pointBgColor":$("#togglePaletteOnly6").val(),
                "pointTextColor":$("#togglePaletteOnly7").val()
            };
            var objPointSave = {
                "point": objPoint
            };
            var boxPointLayout;
            var pointBgColor;
            var pointTextColor;
            if ( type === "layout1" ) {
                model.set("boxPointChangeLayout2", objPointSave);
                boxPointLayout = model.getBoxPointChangeLayout1();
            } else {
                model.set("boxPointChangeLayout1", objPointSave);
                boxPointLayout = model.getBoxPointChangeLayout2();
            }
            
            if ( boxPointLayout ) {
                this.setPoint(boxPointLayout);
                pointBgColor = boxPointLayout.point.pointBgColor;
                pointTextColor = boxPointLayout.point.pointTextColor;
            } else {
                this.setPointDefault();
                pointBgColor = "#f7cbd3";
                pointTextColor = "#673a3a";
            }
            this.setColor("togglePaletteOnly6", pointBgColor);
            this.setColor("togglePaletteOnly7", pointTextColor);
        },
        setMaxLengthInput: function(type, selection, escape) {
            // var maxlength;
            // if ( type === "layout1" ) {
            //     if ( escape ) {
            //         maxlength = 6;
            //     } else {
            //         maxlength = 8;
            //     }
            // } else {
            //     switch ( selection ) {
            //         case 0:
            //             maxlength = 5;
            //             break;
            //         case 1:
            //             maxlength = 6;
            //             break;
            //         case 2:
            //             maxlength = 8;
            //             break;
            //     }
            // }
            // $('#input_new_title').attr('maxlength', maxlength);
        },
        replaceSvg: function(elementImg, elementTarget) {
            $(elementImg).each(function() {
                var $img = $(this);
                var imgID = $img.attr('id');
                var imgClass = $img.attr('class');
                var imgURL = $img.attr('src');
                $.get(imgURL, function(data) {
                    // Get the SVG tag, ignore the rest
                    var $svg = $(data).find('svg');
            
                    // Add replaced image's ID to the new SVG
                    if(typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                    }
                    // Add replaced image's classes to the new SVG
                    if(typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass+' icon');
                    }
            
                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns');
                    $svg = $svg.removeAttr('xmlns:a');
                    $svg = $svg.removeAttr('xml:space');
                    $svg = $svg.removeAttr('x');
                    $svg = $svg.removeAttr('y');
                    $svg = $svg.removeAttr('id');
                    
                    // Check if the viewport is set, else we gonna set it if we can.
                    // if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    //     $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                    // }
                    
                    // Replace image with new SVG
                    $img.replaceWith($svg);
                    var liIndex = $('.layout_select_type li.select').index();
                    var elementTargetTmp = elementTarget.split(" ")[0];
                    var lastIdSvgSelected;
                    var mobileWrap = $("#mobile_wrap").attr("class").split(" ")[1];
                    var maxWidth;
                    switch ( liIndex ) {
                        case 0:
                            var svgChangeIndex = $('#appdesign-threerow-region a.selected').attr('id');
                            lastIdSvgSelected = svgChangeIndex.substr(3);
                            if ( $svg.attr('height') && $svg.attr('width') ) {
                                var width = $svg.attr('width').split("px")[0];
                                var height = $svg.attr('height').split("px")[0];
                                if ( mobileWrap === "iphone" ) {
                                    maxWidth = 40;
                                } else {
                                    maxWidth = 42;
                                }
                                if ( width < maxWidth ) {
                                    $(elementTargetTmp + " svg.icon").css({"width": width});
                                } else {
                                    $(elementTargetTmp + " svg.icon").css({"width": maxWidth});
                                }
                            }
                            break;
                        case 1:
                            var svgChangeIndex = $('#appdesign-onerow-region .bottom_menu a.selected').attr('id');
                            lastIdSvgSelected = svgChangeIndex.substr(3);
                            if ( $svg.attr('height') && $svg.attr('width') ) {
                                var width = $svg.attr('width').split("px")[0];
                                var height = $svg.attr('height').split("px")[0];
                                if ( mobileWrap === "iphone" ) {
                                    maxWidth = 35;
                                } else {
                                    maxWidth = 37;
                                }
                                if ( width < maxWidth ) {
                                    $(elementTargetTmp + " svg.icon").css({"width": width});
                                } else {
                                    $(elementTargetTmp + " svg.icon").css({"width": maxWidth});
                                }
                            }
                            break;
                    };
                    var color;                    
                    switch ( elementTargetTmp ) {
                        case "#icon_lt24":
                        case "#icon_lt25":
                        case "#icon_lt26":
                        case "#icon_lt27":
                        case "#icon_lt28":
                        case "#icon_lt29":
                        case "#icon_lt30":
                        case "#icon_lt31":
                        case "#icon_lt32":
                        case "#icon_lt33":
                        case "#icon_lt34":
                        case "#icon_lt35":
                            color = $("#togglePaletteOnly8").val();
                            break;
                        default:
                            color = $("#togglePaletteOnly1").val();
                            break;
                    };
                    $(elementTarget).css({"fill": color});
                    if ( lastIdSvgSelected ) {
                        if ( $('#appdesign-threerow-region').is(':visible') ) {
                            $('.icon' + lastIdSvgSelected).html($('.selected .svgContainer').html());
                        } else {
                            $('.rowicon' + lastIdSvgSelected).html($('#appdesign-onerow-region .bottom_menu a.selected .svgContainer').html());
                        }
                    }
                    $('#dialogue-region').hide();
                    $('#dialogue_confirm').hide();
                }, 'xml');
            });
        },
        getElementName: function() {
            var elementName;
            if ( $('#appdesign-threerow-region').is(':visible') ) {
                elementName = "#appdesign-threerow-region";
            } else {
                elementName = "#appdesign-onerow-region";
            }
            return elementName;
        }
	};

	return StyleUtil;

})();
