$(document).ready(() => {
  $(".profile").hide();
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
       console.log(status);
    },
  });
});

const productListUrl = 'http://localhost:8080/product/allProducts'

// $('#menu').click(() => {
//     $.ajax({
//         type: "GET",
//         url: productListUrl,
//         contentType: "application/json",
//         dataType: "json",
//         success: (data) => {
//         //   alert(data)
//           console.log("success");
//           console.log("data : " + data);

//         //   data.array.forEach(element => {
//         //       console.log(`title : ${element.title}`);
//         //   });

//         console.log(data[0].title);
//         // const products = []

//         // for (let i = 0; i < data.length; i++) {
//         //     const element = array[i];
            
//         // }

//         setData(data);
        
//         },
//         error: function (request, status, error) {
//            console.log(status);
//         },
//       });

//       const obj = {
//           name : 'yash',
//           email : 'yashpatilc2001@gmail.com'
//       }
//       console.log("obj  : " + obj);
// })

const container = document.getElementById("accordion");
// $("#menu").click(() => {
//   const card = document.createElement("div");
//   card.classList = "card-body";

//   // Construct card content
//   // const content = `
//   //   <div class="card">
//   //   <div class="card-header" id="heading-1">
//   //     <h5 class="mb-0">
//   //       <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1">

//   //               </button>
//   //     </h5>
//   //   </div>

//   //   <div id="collapse-1" class="collapse show" aria-labelledby="heading-2" data-parent="#accordion">
//   //     <div class="card-body">

//   //       <h5>yash</h5>
//   //       <p>chandrabhan</p>
//   //       <p>patil</p>
//   //       ...
//   //     </div>
//   //   </div>
//   // </div>
//   // `;

//   const content = `   
//     <div class="card">
//     <img src="./images/pizza1.jpg" alt="Avatar" style="width:100%">
//     <div class="container">
//       <h4 id="title"><b>John Doe</b></h4>
//       <p id="desc">Architect & Engineer</p>
//       <p id="price">20Rs</p>
//       <button class="button">Order</button>
//     </div>
//   </div>
//    `;

//   // Append newyly created card element to the container
//   container.innerHTML += content;
// });


setData = (data) => {
    const container = document.getElementById("accordion");

    for (let i = 0; i < data.length; i++) {
          const card = document.createElement("div");
          card.classList = "card-body";
          let product = data[i]
          console.log(`product : ${product}`);
          const content = `   
                 <div class="card">
                    <img src="${product.imageUrl}" alt="Avatar" style="width:100%">
                    <div class="container">
                    <h4 id="title"><b>${product.title}</b></h4>
                    <p id="desc">${product.description}</p>
                    <p id="price">${product.price} Rs</p>
                    <button class="button">Order</button>
                    </div>
                 </div>
                 `;

   container.innerHTML += content;
    }
  
    
}