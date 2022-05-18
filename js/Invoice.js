const userInfoUrl = 'http://35.87.139.152:8081/'
$(document).ready(() => {
  cart = JSON.parse(localStorage.getItem("cart"));
  total = sessionStorage.getItem("total-price");
  console.log(cart);
  invoiceInit(cart,total);

});

invoiceInit = (cart, totalPrice) => {
  const container = document.getElementById(`container`);

  let content = "";
  for (let i = 0; i < cart.length; i++) {
    const card = document.createElement("tr");
    card.classList = "card-body";
    let product = cart[i];
    console.log(`product : ${JSON.stringify(product)}`);
    content += `   
          <tr class="item last">
             <td>${product.title}</td>

             <td>Rs.${product.quantity * product.price}</td>
         </tr>
                 `;
  }
  container.innerHTML = content;
  $(".total").text(`Total : Rs.${totalPrice}/-`);
  setCurrentDate()
  setUserInfo()
};

setCurrentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  console.log("date " + today);
  $('#date').text(`Created at : ${today}`)
};

setUserInfo = () => {
    
    $.ajax({
        type: "GET",
        // url: `http://localhost:8080/auth/user/${localStorage.getItem('user_id')}`,
        url: `http://35.87.139.152:8081/auth/user/${localStorage.getItem('user_id')}`,
        contentType: "application/json",
        dataType: "json",
        success: (data) => {    
          console.log("success");
          console.log("data : " + JSON.stringify(data));
           $('#user-name').text(data.firstName + ' ' + data.lastName)
           $('#user-email').text(data.email)
           sendInvoicetoBackEnd(document.documentElement.innerHTML,data.email)
        //    console.log('code : ' + document.documentElement.innerHTML);

        },
        error: function (request, status, error) {
          console.log(JSON.stringify(status));
        },
      });
}

sendInvoicetoBackEnd = (html,email) => {
   
    $.ajax({
        type: "POST",
        // url: 'http://localhost:8080/order/invoice',
        url: 'http://35.87.139.152:8081/order/invoice',
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            html:html
        }),
        dataType: "json",
        success: (data) => {    
        makeToast('Check your registered email to get invoice copy')
        localStorage.removeItem('cart')
        sessionStorage.setItem('total-price',null)
        console.log("after success");
       
        },
        error: function (request, status, error) {
          // console.log(JSON.stringify(status));    
          console.log('after fail');
        },
      });
}