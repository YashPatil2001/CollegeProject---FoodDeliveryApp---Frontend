const productListUrl = 'http://localhost:8080/product/allProducts'

$(document).ready(() => {
  $(`.profile`).hide();
  // if(localStorage.getItem('is_log_in')){
  //     $('.profile').show()
  //     $('.loginsignup').hide()
  // }
  $.ajax({
    type: "GET",
    url: productListUrl,
    contentType: "application/json",
    dataType: "json",
    success: (data) => {
    //   alert(data)
      console.log("success");
      console.log("data : " + data);

    //   data.array.forEach(element => {
    //       console.log(`title : ${element.title}`);
    //   });

    console.log(data[0].title);
    // const products = []

    // for (let i = 0; i < data.length; i++) {
    //     const element = array[i];
        
    // }

    setData(data);
    
    },
    error: function (request, status, error) {
       console.log(error);
    },
  });
});






setData = (data) => {
    const container = document.getElementById(`accordion`);

    for (let i = 0; i < data.length; i++) {
          const card = document.createElement("div");
          card.classList = "card-body";
          let product = data[i]
          console.log(`product : ${product}`);
          const content = `   
                 <div class="card">
                    <img src="${product.imageUrl}" alt="Avatar" style="width:100%" id="img-${i}">
                    <div class="container">
                    <h4 class="title" id="title-${i}"><b>${product.title}</b></h4>
                    <br>
                    <p class="text" id="text-${i}">${product.description}</p>
                    <br>
                    <p class="price" id="price-${i}">${product.price} Rs</p>
                    <button class="button" id="btn-${i}">Order</button>
                    </div>
                 </div>
                 `;

   container.innerHTML += content;
    }
    
    setListeners(data);
}

setListeners = (data) => {
   for (let i = 0; i < data.length; i++) {
         $(`#btn-${i}`).click(() => {
              alert('title : ' + data[i].title);
         })
   }
}

