const placeOrderUrl = 'http://localhost:8080/order/place'
const RAZO_KEY = 'rzp_test_xNBNDsvlR1Zr9I'
const RAZO_RECRET = 'ReQMGxpo1bPzEKXUfL45K1Sf'

$(document).ready(() => {
    placeOrder()
})


placeOrder = () => {
   
    productIds = []
    cart = JSON.parse(localStorage.getItem('cart'))
    for (let i=0;i<cart.length;i++) {
       productIds.push(cart[i].productId)
    }
    userId = localStorage.getItem('user_id')
    quantity = cart.length
    shipAddress = sessionStorage.getItem('address')
    totalPrice = sessionStorage.getItem('total-price')

    console.log('price  :'. totalPrice);

     requestBody = {
         userId : userId,
         quantity : quantity,
         shipAddress : shipAddress,
         totalPrice : totalPrice,
         productIds : productIds
     }
     console.log('requestbody : ' + JSON.stringify(requestBody));

    $.ajax({
        type: "POST",
        url: placeOrderUrl,
        contentType: "application/json",
        data: JSON.stringify(requestBody),
        dataType: "json",
        success: (data) => {    
          console.log("success");
          console.log("data : " + JSON.stringify(data));
          console.log("order Id : " + data.orderIdByPaymentGateway);
          $('#title').text('Moving to checkout...')
          setupPayment(data.orderIdByPaymentGateway,data)

        },
        error: function (request, status, error) {
          console.log(JSON.stringify(status));
          console.log("Placing order failed");
          $('#title').text('Something Went Wrong!!')
          $('.loader').hide()
        },
      });

}



setupPayment = (orderId,order) => {
    var options = {
        "key": RAZO_KEY, // Enter the Key ID generated from the Dashboard
        "amount": order.totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": `${order.profile.firstName} ${order.profile.lastName}`,
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            $('#title').text('Payment done sucessfully,Have a nice day')
            $('.loader').hide()
            window.open('http://127.0.0.1:5502/html/invoice.html','_self');
        },
        "prefill": {
            "name": "Yash Patil",
            "email": "yashpatilc2001@gmail.com.com",
            "contact": "7517096043"
        },
        "notes": {
            "address": "RYK College of Science"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
    //         alert(response.error.code);
    //         alert(response.error.description);
    //         alert(response.error.source);
    //         alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            $('#title').text('Something Went Wrong!!\n ' + response.error.reason)
            $('.loader').hide()
            window.open('http://127.0.0.1:5502/html/cart.html','_self');
    });
    rzp1.open();
}