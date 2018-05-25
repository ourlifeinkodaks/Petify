
//Menu dropdown animation
jQuery(function($) {
	$('.sub-menu').hide();
	$('.main-navigation .children').hide();
	$('.menu-item').hover( 
		function() {
			$(this).children('.sub-menu').slideDown();
		}, 
		function() {
			$(this).children('.sub-menu').hide();
		}
	);
	$('.main-navigation li').hover( 
		function() {
			$(this).children('.main-navigation .children').slideDown();
		}, 
		function() {
			$(this).children('.main-navigation .children').hide();
		}
	);	
});

//Open social links in a new tab
jQuery(function($) {
     $( '.social-menu-widget li a' ).attr( 'target','_blank' );
});

//Fit Vids
jQuery(function($) {
    $("body").fitVids();  
});

//Mobile menu
jQuery(function($) {
	$('.main-navigation .menu').slicknav({
		label: '<i class="fa fa-bars"></i>',
		prependTo: '.mobile-nav',
		closedSymbol: '&#43;',
		openedSymbol: '&#45;',
		allowParentLinks: true
	});
	$('.info-close').click(function(){
		$(this).parent().fadeOut();
		return false;
	});
});	

//Menu bar
jQuery(function($) {
    var headerHeight = $('.site-header').outerHeight();
    $('.header-clone').css('height',headerHeight);

	$(window).resize(function(){	
		var headerHeight = $('.site-header').outerHeight();
		$('.header-clone').css('height',headerHeight);
	});
});

//Menu bar
jQuery(function($) {
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 0 ) {
			$('.site-header').addClass('header-scrolled');
		} else {
			$('.site-header').removeClass('header-scrolled');
		}
	});
});

//Go to top
jQuery(function($) {
	var goTop = $('.go-top');
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 800 ) {
			goTop.addClass('show');
		} else {
			goTop.removeClass('show');
		}
	}); 

	goTop.on('click', function() {
		$("html, body").animate({ scrollTop: 0 }, 1000);
		return false;
	});
});

//Smooth scrolling
jQuery(function($) {
	$('a[href*=#]:not([href=#],.wc-tabs a)').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top - 70
		        }, 1000);
		        return false;
		    }
		}
	});
});