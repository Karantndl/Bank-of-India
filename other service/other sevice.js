


//validation rules 


$(function(){


    $('#Fn-error-message').hide();
    $('#Ln-error-message').hide();
    $('#email-error-message').hide();
    $('#number-error-message').hide();
    $('#message-error-message').hide();
    
    let errorFname = false;
    let errorLname = false;
    let errorEmail = false;
    let errorNumber = false;
    let errorMessage = false;
    
    let fname = ""; 
        let lname = ""; 
        let email = ""; 
        let number = ""; 
        let message = "";
    
    
    $('#fname').focusout(function(){
        check_fname();
    });
    
    $('#lname').focusout(function(){
        check_lname();
    });
    
    $('#email').focusout(function(){
        check_email();
    });
    
    $('#number').focusout(function(){
        check_number();
    });
    
    $('#message').focusout(function(){
        check_message();
    });
    
    //checking the first name, it has to match a to z in lower and cap and cannot be empty
    function check_fname(){
        let pattern = /^[a-zA-Z]+$/;
        fname = $('#fname').val();
    
        if (pattern.test(fname) && fname !== ''){
            $('#Fn-error-message').hide();
        }else{
            $('#Fn-error-message').html('Should only contain character');
            $('#Fn-error-message')
            .css({'color': 'red','font-size': '12px','font-weight': 'bold','margin-top': '5px'}).show();
            errorFname = true;
        }
    }
    
    
    //last name validating
    function check_lname(){
        let pattern = /^[a-zA-Z]+$/;
        lname = $('#lname').val();
    
        if (pattern.test(lname) && lname !== ''){
            $('#Ln-error-message').hide();
        }else{
            $('#Ln-error-message').html('Should only contain character');
            $('#Ln-error-message')
            .css({'color': 'red','font-size': '12px','font-weight': 'bold','margin-top': '5px'}).show();
            errorLname = true;
        }
    }
    
    function check_number(){
        number = $('#number').val();
        if (number.length >= 10){
            $('#number-error-message').hide();
    
        } else {
            $('#number-error-message').html('Please enter a valid 10-digit number');
            $('#number-error-message')
            .css({'color': 'red','font-size': '12px','font-weight': 'bold','margin-top': '5px'}).show();
            errorNumber = true;
        }
    
    }
    
    function check_email(){
        let pattern =  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        email = $('#email').val();
    
        if (pattern.test(email) && email !== ''){
            $('#email-error-message').hide();
        }else{
            $('#email-error-message').html('Invalid Eamil');
            $('#email-error-message')
            .css({'color': 'red','font-size': '12px','font-weight': 'bold','margin-top': '5px'}).show();
            errorEmail = true;
        }
    }
    
    function check_message() {
        message = $('#message').val();
    
        if (message.length >= 10) {
            $('#message-error-message').hide();
        } else {
            $('#message-error-message').html('Message must be at least 10 characters long');
            $('#message-error-message')
            .css({'color': 'red','font-size': '12px','font-weight': 'bold','margin-top': '5px'}).show();
            errorMessage = true;
        }
    }
    
    
    $('form.contact-form').submit(function(event) {
    
        errorFname = false;
        errorLname = false;
        errorEmail = false;
        errorNumber = false;
        errorMessage = false;
    
    
        check_fname();
        check_lname();
        check_number();
        check_email();
        check_message();
    
    
    
        if (errorFname === false && errorLname === false && errorEmail === false && errorNumber === false &&errorMessage === false){
            event.preventDefault();
            alert('We have received your queries, will get in contact with you via email ') 
    
            console.log('Testing First Name:', fname);
            console.log('Testing Last Name:', lname);
            console.log('Testing Email:', email);
            console.log('Testing Number:', number);
            console.log('Testing Message Length:', message.length);
            $('form.contact-form')[0].reset(); // it will clear all fiels once it successfully submited
        }else{
            alert('Please fill in the information properly')
        }
    
    });
    });


    $(document).ready(function() {
        // click function for consulation for when user click it will scroll down
        $('.consultantBtn').click(function() {
            // Animate scrolling to the #contact-form container
            $('html, body').animate({
                scrollTop: $('#contact-form').offset().top 
            }, 1000); // 1 second for the scrolling animation
        });
    });

