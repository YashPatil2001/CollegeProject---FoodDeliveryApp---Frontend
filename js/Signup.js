const email = document.getElementById("user-email");
const firstName = document.getElementById("user-firstname");
const lastName = document.getElementById("user-lastname");
const password = document.getElementById("user-password");
const passwordConfirmed = document.getElementById("user-password-c");

const emailErr = document.getElementById("email-err");
const firstnameErr = document.getElementById("firstname-err");
const lastnameErr = document.getElementById("lastname-err");
const passwordErr = document.getElementById("password-err");
const cPasswordErr = document.getElementById("c-password-err");

submitButton = document.getElementById("btn-signup")
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

const signupUrl = 'http://35.87.139.152:8081/auth/signup';
const validationUrl = 'http://35.87.139.152:8081/auth/validation';

var success = false;

$('#user-email-validation-code').hide();

// validation
email.addEventListener('input', (e) => {
    const value = e.target.value;
  
    if (value == "") {
      emailErr.textContent = 'email should not be empty';
    } else if(!emailPattern.test(value)){
        emailErr.textContent = 'Invalid email';
    }else{
        emailErr.textContent = ''
    }
  });
 
  
  firstName.addEventListener('input', (e) => {
    const value = e.target.value;
  
    if (value == "") {
      firstnameErr.textContent = 'firstname should not be empty';
    } else {
      firstnameErr.textContent = '';
    }
  });  

  lastName.addEventListener('input', (e) => {
    const value = e.target.value;
  
    if (value == "") {
      lastnameErr.textContent = 'lastname should not be empty';
    } else {
      lastnameErr.textContent = '';
    }
  });   

  password.addEventListener('input', (e) => {
    const value = e.target.value;
  
    if (value == "") {
      passwordErr.textContent = 'Please enter password';
    } else {
      passwordErr.textContent = '';
    }
  });   

  passwordConfirmed.addEventListener('input', (e) => {
    const value = e.target.value;
  
    if (value == "") {
      cPasswordErr.textContent = 'Please enter confirmed password';
    } else if(value != password.value){
        cPasswordErr.textContent = 'Password doesn\'t match';
    }else {
        cPasswordErr.textContent = ""
    }
  });  


  document.getElementById('user-email-validation-code').addEventListener('input',
               (e) => {
                const value = e.target.value;
  
                if (value == "") {
                  $('#v-code-err').textContent = 'Please enter your validation code';
                } else if(value.length != 36){
                    $('#v-code-err').textContent = 'Invalid code';
                }else {
                    $('#v-code-err').textContent = ""
                }
               });

              
 checkfinalValidation  = () => {
   if(email.value == ''){
      emailErr.textContent = 'email should not be empty'
      return false
   }
   if(firstName.value == ''){
    firstnameErr.textContent = 'Firstname should not be empty'
    return false
   }
   if(lastName.value == ''){
    lastnameErr.textContent = 'Lastname should not be empty'
    return false
   }
   if(password.value == ''){
     passwordErr.value = 'Password should not be empty'
     return false
   }
   if(passwordConfirmed.value == ''){
    cPasswordErr.value = 'Password should not be empty'
    return false
  }

   return true  

 }

//   submitButton.addEventListener("click",() => {
//     var data = email.value + "\n" + 
//                firstName.value + "\n" + 
//                 lastName.value + "\n" + 
//                 password.value + "\n" + 
//                 passwordConfirmed.value ;
//            console.log("User data : " + data);     
//  })



 $(submitButton).click(() => {
  
   if(!checkfinalValidation()){
     return
   } 
     var data = email.value + "\n" + 
    firstName.value + "\n" + 
     lastName.value + "\n" + 
     password.value + "\n" + 
     passwordConfirmed.value ;
     console.log("on submit : " + data);

     $(".loading-icon").removeClass("hide");
     $(".button").attr("disabled", true);
     $(".btn-txt").text("Signing...");
  
     if(success){
         console.log("validation code  : " +  $('#user-email-validation-code').val());
         $.get(validationUrl + "/" + $('#user-email-validation-code').val(),
         (data,status) => {
          $(".loading-icon").addClass("hide");
          $(".button").attr("disabled", false);
          $(".btn-txt").text("Signup");
             alert("Email Validation Successfull")
             localStorage.setItem("is_log_in",true);
             localStorage.setItem("user_id", data);
             window.open('http://127.0.0.1:5502/html/home.html','_self');
         })
     }else{
        $.ajax({
            type: "POST",
            url: signupUrl,
            contentType: "application/json",
            data:JSON.stringify({
                email : email.value,
                firstName : firstName.value,
                lastName : lastName.value,
                password : password.value
            }),
            dataType: "json",
            success: onSuccess(),
            error: function (request, status, error) {
                $(".loading-icon").addClass("hide");
                $(".button").attr("disabled", false);
                $(".btn-txt").text("Signup");
                alert(request.status);
                success = false;
            }
          });
     }
  

 })


 function onSuccess(){
    console.log("Success");

    $(".loading-icon").addClass("hide");
    $(".button").attr("disabled", false);
    $(".btn-txt").text("Signup");

    $('#user-email-validation-code').show();
    $('#user-password').hide();
    $('#user-password-c').hide();
    success = true;
 }








