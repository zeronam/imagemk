////////////////////////////////////////
// applican の読み込み完了まで待機
document.addEventListener("deviceready", onDeviceReady, false);

// applican 準備完了
function onDeviceReady(){
	w = $(window).width();
	h = $(window).height();
	ow = $(window).outerWidth();
	oh = $(window).outerHeight();
//	console.log("w="+w+",h="+h+"/ow="+ow+",oh="+oh);
	w = ow;
	h = oh;
	$('#content').css({'height': h});
	$('.scratchpad').css({'left': ( w - 240 ) / 2, 'top': ( h - 240 ) / 2});
	$('#get').css({'left': ( w - 230 ) / 2, 'top': ( h - 230 ) / 2});
	$('#btnMainWrpper').css({'left': ( w - 250 ) / 2, 'top': h / 2 + 150});
	$('#btnMainWrpper').show();
}
