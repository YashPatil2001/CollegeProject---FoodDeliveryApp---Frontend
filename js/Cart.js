$(document).ready(() => {
    checkCart()
})


cartInit = (cart) => {
    console.log('cart ' + cart);

    const container = document.getElementById(`basket-products`);
    if(container){
        console.log("conatiner");
    }else{
        console.log("empty container");
    }
    
    let content="";
    for (let i = 0; i < cart.length; i++) {
          const row = document.createElement("div");
          row.classList = "card-body";
          cart[i].quantity = 1
          localStorage.setItem('cart',JSON.stringify(cart))
          let product = cart[i];
          console.log(`product : ${product}`);
          content += `   
          <div class="basket-product" id="item-${product.productId}">
          <div class="item">
            <div class="product-image">
              <img src="${product.imageUrl}" alt="Placholder Image 2" class="product-frame">
            </div>
            <div class="product-details">
              <h1><strong><span class="item-quantity-${product.productId}"></span>${product.title}</strong></h1>
              <h2 class="product-desc">${product.description}</h2>
            </div>
          </div>
          <div class="price">${product.price}</div>
          <div class="quantity" aria-orientation="horizontal">
            <input id="item-quantity-${product.productId}" type="number" value="1" min="1" max="4" class="quantity-field" >
          </div>
          <div class="subtotal" id="item-subtotal-${product.productId}">${product.price}</div>
          <div class="remove" id="btn-remove-${product.productId}">
            <button>Remove</button>
          </div>
        </div>
                 `;

    }
    
   container.innerHTML = content;
   addClicks(cart);
}

addClicks = (cart) => {
    for (let i = 0; i < cart.length; i++) { 
        console.log("sas");
        let product = cart[i];
          $(`#item-quantity-${product.productId}`).on('input',() => {
              console.log("quantity : " + $(`#item-quantity-${product.productId}`).val());
              let quantity =  $(`#item-quantity-${product.productId}`).val();
              product.quantity = quantity;
              $(`#item-subtotal-${product.productId}`).text(quantity * product.price);
              localStorage.setItem('cart',JSON.stringify(cart))
              console.log('subtotal  ' + quantity * product.price);
              updateCart(cart)
          })

          $(`#btn-remove-${product.productId}`).click(() => {
              console.log('cart size before : ' + cart.length);
              $(`#item-${product.productId}`).remove();
              cart.splice(cart.indexOf(product),1)
              localStorage.setItem('cart',JSON.stringify(cart));
              makeToast(`'${product.title} removed!!'`,error = true)
              console.log('cart size after : ' + cart.length);
              console.log('cart size after localstorage: ' + JSON.parse(localStorage.getItem('cart')).length);
              checkCart();
          })


    }
}

checkCart = () => {
    cart = JSON.parse(localStorage.getItem('cart'))
    console.log('length : ' + cart.length);
    if(cart && cart.length > 0){
        $('.empty-cart-title').hide()
        $('emptu-cart').hide()
        $('.main').show()
       cartInit(JSON.parse(localStorage.getItem('cart')))
       console.log("total  : " + JSON.parse(localStorage.getItem('cart')).length);
    }else{
        $('.main').hide()
        $('.empty-cart-title').show()
        $('emptu-cart').show()
    }

    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) { 
        let product = cart[i]; 
        totalPrice += (product.quantity ? product.quantity * product.price : product.price);     
    }    
    $('#basket-subtotal').text(totalPrice) 
    $('#basket-total').text(totalPrice) 
}

updateCart = (cart) => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) { 
        let product = cart[i]; 
        totalPrice += (product.quantity ? product.quantity * product.price : product.price);     
    }    
    console.log("updateCart => totalPrice : " + totalPrice);
    $('#basket-subtotal').text(totalPrice) 
    $('#basket-total').text(totalPrice) 
}



//checkout

$('.summary-checkout').click(() => {
    console.log('address : ' + $('#address').val());
    if($('#address').val() === ''){
        makeToast('Please enter your address',error=true)
        return
    }
    sessionStorage.setItem('total-price',$('#basket-total').text())
    sessionStorage.setItem('address',$('#address').val())
    console.log('total : ' + sessionStorage.getItem('total-price'));
    window.open('http://127.0.0.1:5502/html/checkout.html', "_self");
})