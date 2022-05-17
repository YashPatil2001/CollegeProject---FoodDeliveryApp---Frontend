$('#submit').click(() => {
    let username = $('#admin-name').val()
    let password = $('#admin-psw').val()

    console.log('admin : ' + username);
    console.log('password : ' + password);

    if(username === ''){
        makeToast('Invalid username', error = true)
        return
    }
    if(password === ''){
        makeToast('Invalid password', error = true)
        return
    }

    
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/admin/',
        contentType: "application/json",
        data: JSON.stringify({
            username : username,
            password : password
        }),
        dataType: "json",
        success: (data) => {    
          console.log("success");
          console.log("data : " + JSON.stringify(data));
          window.open('http://127.0.0.1:5502/html/admin_panel.html');
          history.back();
          
        },
        error: function (request, status, error) {
          console.log(JSON.stringify(status));
          console.log("login admin failed");
          makeToast('Not authorized', error = true)
          setTimeout(function() {
            window.close();
          }, 2000);
         
        },
      });

    
})