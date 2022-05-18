const getAllProductsUrl = 'http://35.87.139.152:8081/product/allProducts'
$(document).ready(() => {
  getAllUsers();

  $("#addBtn").click(() => {
    window.open("http://127.0.0.1:5502/html/admin_add_product.html", "_self");
  });
});

getAllUsers = () => {
  $.ajax({
    type: "GET",
    url: getAllProductsUrl,
    contentType: "application/json",
    dataType: "json",
    success: (data) => {
      console.log("success");
      console.log("products : " + JSON.stringify(data));
      makeProductRows(data);
    },
    error: function (request, status, error) {
      console.log(JSON.stringify(status));
      console.log(" failed");
    },
  });
};

makeProductRows = (products) => {
  const container = document.getElementById(`products`);
  if (container) {
    console.log("conatiner");
  } else {
    console.log("empty container");
  }

  let content = "";
  content += `
        <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
        </tr>
    `;
  for (let i = 0; i < products.length; i++) {
    const row = document.createElement("tr");
    row.classList = "card-body";
    let product = products[i];
    console.log(`product : ${product}`);
    content += `   
        <tr id="pro-${i}">
        <td><img src="${product.imageUrl}" alt="" srcset=""></td>
        <td>${product.title}</td>
        <td>Rs.${product.price}/-</td>
        <td${product.description}</td>
         </tr>
                 `;
  }

  container.innerHTML = content;

  setupClicks(products);
};

setupClicks = (products) => {
  for (let i = 0; i < products.length; i++) {
    console.log(`position ${i}`);
    $(`#pro-${i}`).click(() => {
      deleteProduct(i, products[i]);
    });
  }
};

deleteProduct = (position, product) => {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/product/pro/" + product.productId,
    contentType: "application/json",
    dataType: "json",
    success: (data) => {
      console.log("success");
      console.log("orders : " + JSON.stringify(data));
      console.log(`position : ${position}`);
      $(`user-${position}`).closest("tr").remove();
      location.reload();
    },
    error: function (request, status, error) {
      console.log(JSON.stringify(status));
      console.log(" failed");
    },
  });
};
