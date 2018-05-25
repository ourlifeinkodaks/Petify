
function check_active_menu_element() {
	var nav_height = $('nav').outerHeight();
	$('nav a.scroll-link').each(function(){
		var element_class = $(this).attr('href').replace('#', '.') + '-container';
		if($(window).scrollTop() >= $(element_class).offset().top - nav_height) {
			$('nav a.scroll-link').removeClass('active');
			$(this).addClass('active');
		}
	});
}

function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		scroll_to = $(element_class + '-container').offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


$(document).ready(function() {
	
    /*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		var clicked_link = $(this);
		if($('nav').css('position') == 'static') { // window width <= 991
			$('nav .nav-links a').fadeOut('600', function(){
				scroll_to(clicked_link, 0);
			});
		}
		else {
			var nav_height = $('nav').outerHeight();
			scroll_to(clicked_link, nav_height);
		}
	});
	
	$('nav .show-menu span').on('click', function(){
		var menu_links = $(this).parent('.show-menu').siblings('a');
		if(menu_links.css('display') == 'none') {
			menu_links.css('display', 'inline-block');
		}
		else {
			menu_links.css('display', 'none');
		}
	});

	var previous_window_width = $(window).width();
	var previous_window_height = $(window).height();
	$(window).on('resize', function(){
		var new_window_width = $(window).width();
		var new_window_height = $(window).height();
		if(new_window_width != previous_window_width || new_window_height != previous_window_height) {
			if($('nav').css('position') == 'static') { // window width <= 991
				$('nav .nav-links a').css('display', 'none');
				$('nav .show-menu').show();
			}
			else {
				$('nav .nav-links a').css('display', 'inline-block');
				$('nav .show-menu').hide();
			}
			previous_window_width = new_window_width;
			previous_window_height = new_window_height;
		}
	});
	
	/*
	    Video
	*/
	// Vimeo
	var iframe = $('.top-content-video iframe')[0], player = $f(iframe);

	$('.top-content-video').on('click', function(){
		$(this).find('img').fadeOut('400');
		$(this).find('p').fadeOut('400');
		$(this).find('iframe').fadeIn('400');
		// Call Vimeo API to play video
		player.api('play');
	});
	
	/*
	    Top custom select (see the works)
	*/
	// add images to options
	function format(state) {
	    return "<span class='custom-select-image " + state.css.replace('custom-select-', 'custom-select-image-') + "'></span>" + state.text;
	}
	$('.top-content-select select').select2({
		minimumResultsForSearch: -1,
		formatResult: format,
	    formatSelection: format,
	    escapeMarkup: function(m) { return m; }
	});
    
    /*
        Customer reviews
    */
    $('.review-active').html('<p>' + $('.review-single:first p').html() + '</p>');
    $('.review-single:first .review-single-pagination').addClass('active');
    
    $('.review-single-pagination').on('click', function() {
    	$('.review-single-pagination').removeClass('active');
    	$(this).addClass('active');
    	var new_review_text = $(this).siblings('p').html();
    	$('.review-active p').fadeOut(300, function() {
    		$(this).html(new_review_text);
    		$(this).fadeIn(400);
    	});
    });
    
    /*
	    Slider
	*/
    $('.slider-container').backstretch("assets/img/slider-bg.jpg");
    
    /*
	    Project valuation custom select
	*/
	$('.project-valuation-form select').select2({
		minimumResultsForSearch: -1,
		dropdownCssClass : 'project-valuation-custom-select',
	    escapeMarkup: function(m) { return m; }
	});
    
	/*
	    Project valuation examples input
	*/
    $('.project-valuation-form form .project-valuation-examples input[type="text"]').on('focus', function(){
    	$(this).addClass('active');
    	$(this).parent('.project-valuation-examples').addClass('active');
    	$(this).siblings('input[type="text"]').addClass('active');
    	$(this).siblings('label').addClass('active');
    });
    
    $('.project-valuation-form form .project-valuation-examples input[type="text"]').on('blur', function(){
    	$(this).removeClass('active');
    	$(this).parent('.project-valuation-examples').removeClass('active');
    	$(this).siblings('input[type="text"]').removeClass('active');
    	$(this).siblings('label').removeClass('active');
    });
	
	/*
	    Google map
	*/
	var position = new google.maps.LatLng(40.820108, -74.092475);
	var marker_image = new google.maps.MarkerImage('assets/img/icons/map-marker.png', 
												new google.maps.Size(66, 83), 
												new google.maps.Point(0,0), 
												new google.maps.Point(0, 83)
											);
	$('.map').gmap({'center': position, 'zoom': 15, 'disableDefaultUI':true, 'scrollwheel': false, 'callback': function() {
	        var self = this;
	        self.addMarker({'position': this.get('map').getCenter(), 'icon':marker_image});
	    }
	});

	/*
	    Contact us form input
	*/
	$('.contact-us-form form input[type="text"], .contact-us-form form textarea').on('focus', function(){
    	$(this).siblings('label').addClass('active');
    });
    
    $('.contact-us-form form input[type="text"], .contact-us-form form textarea').on('blur', function(){
    	$(this).siblings('label').removeClass('active');
    });
	
    
});


$(window).load(function(){
	
    /*
	    Portfolio
	*/
	$('.portfolio-masonry').masonry({
		columnWidth: '.portfolio-box', 
		itemSelector: '.portfolio-box',
		transitionDuration: '0.5s'
	});
	
	$('.portfolio-filters a').on('click', function(e){
		e.preventDefault();
		if(!$(this).hasClass('active')) {
	    	$('.portfolio-filters a').removeClass('active');
	    	var clicked_filter = $(this).attr('class').replace('filter-', '');
	    	$(this).addClass('active');
	    	if(clicked_filter != 'all') {
	    		$('.portfolio-box:not(.' + clicked_filter + ')').css('display', 'none');
	    		$('.portfolio-box:not(.' + clicked_filter + ')').removeClass('portfolio-box');
	    		$('.' + clicked_filter).addClass('portfolio-box');
	    		$('.' + clicked_filter).css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
	    	else {
	    		$('.portfolio-masonry > div').addClass('portfolio-box');
	    		$('.portfolio-masonry > div').css('display', 'block');
	    		$('.portfolio-masonry').masonry();
	    	}
		}
	});
	
	// gray images on hover
	$('.portfolio-box').hover(
			function(){ $('.portfolio-box').not(this).find('img').addClass('grayscale'); }, 
			function(){ $('.portfolio-box img').removeClass('grayscale'); }
	);
	
	// image popup	
	$('.portfolio-box-text').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: 'The image could not be loaded.',
			titleSrc: function(item) {
				return item.el.find('h3').text();
			}
		},
		callbacks: {
			elementParse: function(item) {
				item.src = item.el.parent('.portfolio-box-text-container').siblings('img').attr('src');
			},
			beforeOpen: function() { $('nav').css('z-index', '99'); },
			afterClose: function() { $('nav').css('z-index', '99999'); }
		}
	});
	
	$(window).on('resize', function(){ $('.portfolio-masonry').masonry(); });
	
	// select portfolio projects from top content select
	$('.top-content-select a').on('click', function(e){
		e.preventDefault();
		var selected_projects = $(this).siblings('select').val();
		var nav_height = $('nav').outerHeight();
		var scroll_to = $('.portfolio-filters').offset().top - nav_height;
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000, function(){
			$('.portfolio-box img').removeClass('grayscale');
			$('.portfolio-filters a.filter-' + selected_projects).trigger('click');
		});
	});
	
	/*
	    Check top menu
	*/
	check_active_menu_element();
	
	$(window).on('scroll', function(){
		clearTimeout($.data(this, "scrollCheck"));
		$.data(this, "scrollCheck", setTimeout(function(){
			check_active_menu_element();
		}, 250));
	});
	
	$(window).on('resize', function(){ check_active_menu_element(); });
	
});

