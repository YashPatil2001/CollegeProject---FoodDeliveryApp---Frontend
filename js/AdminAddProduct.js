const addProductUrl = 'http://35.87.139.152:8081/product/add'
$('#submit').click(() => {
    let title = $('#p-title').val()
    let price = $("#p-pr").val()
    let url = $('#p-url').val()
    let description = $('#p-desc').val()

    

    if(title === ''){
        makeToast('Invalid title', error = true)
        return
    }
    if(price === ''){
        makeToast('Invalid price', error = true)
        return
    }
    if(url === ''){
        makeToast('Invalid url', error = true)
        return
    }

    if(description === ''){
        makeToast('Invalid description', error = true)
        return
    }

    
    $.ajax({
        type: "POST",
        url: addProductUrl,
        contentType: "application/json",
        data: JSON.stringify({
            title : title,
            imageUrl : url,
            price:price,
            description:description
        }),
        dataType: "json",
        success: (data) => {    
          console.log("success");
          console.log("data : " + JSON.stringify(data));
        //   window.open('http://127.0.0.1:5502/html/admin_panel.html');
        //   history.back();

              makeToast('new Product Added Successfully!!')
              setTimeout(()=> history.back(),2000)
        },
        error: function (request, status, error) {
          console.log(JSON.stringify(status));
          console.log("creating user failed");
          makeToast('somthing went wrong', error = true)
         
         
        },
      });

    
})