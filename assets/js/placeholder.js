
$(document).ready(function(){
	
	$('#contact-us-name, #contact-us-email, #contact-us-phone, #contact-us-message').removeAttr('placeholder');
	
	$('#contact-us-name').val('Name...');
	$('#contact-us-email').val('Email...');
	$('#contact-us-phone').val('Phone...');
	$('#contact-us-message').text('Message...');
	
});