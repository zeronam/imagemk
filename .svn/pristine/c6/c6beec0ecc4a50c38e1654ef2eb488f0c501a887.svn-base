$(document).on('deviceready', function(){

	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: false,
		spaceBetween: 30,
		onSlideChangeEnd : function( swiper ){
			console.log( swiper.activeIndex );
			if( swiper.activeIndex == 2 ){
				$('.appTopButton').addClass('active');
			}else{
				$('.appTopButton').removeClass('active');
			}
		}
	});

});
