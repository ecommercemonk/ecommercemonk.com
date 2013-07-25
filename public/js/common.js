function isEmail(email){
  if(email.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)) {
    return true;
  } else { return false; }
}
$(document).ready(function(e) { 
    $('.nav li a').bind('click', function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top - 53}, 300);                                                         
    });
    $('#start').bind('click', function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: $('#contact').offset().top - 53}, 300);                                                         
    });

    $('#submit').bind('click', function(e){
    	$('#firstname, #email, #message').css('border', '1px solid #ffffff');
    	
    	var firstname = $('#firstname').val();
    	var lastname = $('#lastname').val();
    	var email = $('#email').val();
    	var website = $('#website').val();
    	var message = $('#message').val();

    	var error = false;
    	
    	if(!firstname) {
    		$('#firstname').css('border','2px solid #E74C3C');
    		error = true;
    	}
    	if(!email || !isEmail(email)) {
    		$('#email').css('border','2px solid #E74C3C');
    		error = true;
    	}
    	if(!message || message.length < 25) {
    		$('#message').css('border','2px solid #E74C3C');
    		error = true
    	}
    	
    	if(!error) {
    		$.ajax({
		        type:'POST',
		        url:'/contactus',
		        data: {
		          firstname: firstname,
		          lastname: lastname,
		          email: email,
		          website: website,
		          message: message
		        },
		        success: function(data){
		          	if(data.success){
		            	$('#contact-form')[0].reset();
		            	$('#notification').addClass('alert-success').removeClass('alert-error').removeClass('hidden').children('span').text('Thank you for contacting us');
		          	} else {
		            	$('#notification').addClass('alert-error').removeClass('alert-success').removeClass('hidden').children('span').text('Something went wrong. Please try again');
		          	}
		        },
		        error: function(jqXHR, textStatus, errorThrown){
		          $('#notification').addClass('alert-error').removeClass('hidden').children('span').text('Something went wrong. Please try again');
		        }
		    });
    	}
    });
});