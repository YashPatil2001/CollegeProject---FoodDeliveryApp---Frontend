// const productListUrl = 'http://localhost:8080/product/allProducts'
const productListUrl = 'http://35.87.139.152:8081/product/allProducts'
// import { makeToast } from './Toast.js'


$(document).ready(() => {

  if(localStorage.getItem('is_log_in')){
      $('.profile').show()
      $('.cart').show();
      $('.loginsignup').hide()
  }else{
    $('.profile').hide()
    $('.cart').hide();
    $('.loginsignup').show()
  }
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

    
    let content="";
    for (let i = 0; i < data.length; i++) {
          const card = document.createElement("div");
          card.classList = "card-body";
          let product = data[i];
          console.log(`product : ${product}`);
          content += `   
                 <div class="card" id="card-${i}">
                    <div class="img-conntainer">
                    <img src="${product.imageUrl}" alt="Avatar" style="width:100%" id="img-${i}">
                    </div>
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

    }
    
   container.innerHTML = content;
    setListeners(data);
}

setListeners = (products) => {
   for (let i = 0; i < products.length; i++) {
         $(`#btn-${i}`).click(() => {
          // $(`#card-${i}`).remove();
              // alert('title : ' + data[i].title);

              if(localStorage.getItem('is_log_in')){
                cart = JSON.parse(localStorage.getItem("cart") || "[]");
                if(cart.some( product => product.productId === products[i].productId)){
                  makeToast(`"${products[i].title}" already added to cart`,error=true);
                }else{
                  addtoCart(products[i]);
                }
              }else{
                window.open('http://127.0.0.1:5502/html/signup.html');
              }
             
            
         })
   }
 
}

addtoCart = (product) => {
  cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  product.isAdded = true;
  localStorage.setItem("cart",JSON.stringify(cart));
  makeToast(`"${product.title}" added to cart`);
           
}

