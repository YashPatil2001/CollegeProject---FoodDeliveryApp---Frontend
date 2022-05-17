$(document).ready(() => {
    getAllOrders();
  
    $("#addBtn").click(() => {
      window.open("http://127.0.0.1:5502/html/admin_add_product.html", "_self");
    });
  });
  
  getAllOrders = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/order",
      contentType: "application/json",
      dataType: "json",
      success: (data) => {
        console.log("success");
        console.log("products : " + JSON.stringify(data));
        makeOrderRows(data);
      },
      error: function (request, status, error) {
        console.log(JSON.stringify(status));
        console.log(" failed");
      },
    });
  };
  
  makeOrderRows = (products) => {
    const container = document.getElementById(`products`);
    if (container) {
      console.log("conatiner");
    } else {
      console.log("empty container");
    }
  
    let content = "";
    content += `
          <tr>
          <th>OrderId</th>
          <th>User</th>
          <th>total Items</th>
          <th>total Price</th>
          <th>Order Date</th>
          <th>Ship Address</th>
          </tr>
      `;
    for (let i = 0; i < products.length; i++) {
      const row = document.createElement("tr");
      row.classList = "card-body";
      let order = products[i];
      console.log(`product : ${order}`);
      content += `   
          <tr id="order-${i}">
          <td>${order.orderIdByPaymentGateway}</td>
          <td>${order.profile.email}</td>
          <td>${order.quantity}</td>
          <td>${order.totalPrice}</td>
          <td>${order.orderDate[2]}-${order.orderDate[1]}-${order.orderDate[0]}</td>
          <td>${order.shipAddress}</td>
           </tr>
                   `;
    }
  
    container.innerHTML = content;
  
    // setupClicks(products);
  };
  
  setupClicks = (products) => {
    for (let i = 0; i < products.length; i++) {
      console.log(`position ${i}`);
      $(`#order-${i}`).click(() => {
        deleteProduct(i, products[i]);
      });
    }
  };
  
  deleteProduct = (position, order) => {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/order/" + order.orderId,
      contentType: "application/json",
      dataType: "json",
      success: (data) => {
        console.log("success");
        console.log("orders : " + JSON.stringify(data));
        console.log(`position : ${position}`);
        $(`#order-${position}`).remove();
        makeToast("order delete successfully!!")
        // location.reload();
      },
      error: function (request, status, error) {
        console.log(JSON.stringify(status));
        console.log(" failed");
        makeToast('something went wrong!!',error= true)
      },
    });
  };
  