const createUserUrl = 'http://35.87.139.152:8081/admin/user'
$('#submit').click(() => {
    let email = $('#u-email').val()
    let firstName = $('#u-firstname').val()
    let lastName = $('#u-lastname').val()
    let password = $('#u-psw').val()

    

    if(email === ''){
        makeToast('Invalid email', error = true)
        return
    }
    if(firstName === ''){
        makeToast('Invalid firstname', error = true)
        return
    }
    if(lastName === ''){
        makeToast('Invalid lastname', error = true)
        return
    }

    if(password === ''){
        makeToast('Invalid password', error = true)
        return
    }

    
    $.ajax({
        type: "POST",
        url: createUserUrl,
        contentType: "application/json",
        data: JSON.stringify({
            email : email,
            firstName : firstName,
            lastName:lastName,
            password:password
        }),
        dataType: "json",
        success: (data) => {    
          console.log("success");
          console.log("data : " + JSON.stringify(data));
        //   window.open('http://127.0.0.1:5502/html/admin_panel.html');
        //   history.back();

              makeToast('new user created!!')
              setTimeout(()=> history.back(),2000)
        },
        error: function (request, status, error) {
          console.log(JSON.stringify(status));
          console.log("creating user failed");
          makeToast('somthing went wrong', error = true)
         
         
        },
      });

    
})