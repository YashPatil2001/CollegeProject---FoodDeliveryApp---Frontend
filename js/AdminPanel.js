const getStatsUrl = 'http://35.87.139.152:8081/admin/stats'
const getOrdersUrl = 'http://35.87.139.152:8081/order'
$(document).ready(() => {
    getBasicStats()
  setupOrders()
  setupNavigation()
});



setupNavigation = () => {
  

}


getBasicStats = () => {
    $.ajax({
        type: "GET",
        url: getStatsUrl,
        contentType: "application/json",
        dataType: "json",
        success: (data) => {    
          console.log("success");
          console.log("orders : " + JSON.stringify(data));
        //   let timerId = setInterval(() => alert('tick'), 2000);

// after 5 seconds stop
// setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
          $('#user-count').text(data.totalUsers)
          $('#product-count').text(data.totalProducts)
          $('#order-count').text(data.totalOrders)
          // animateValue('user-count', 0, 10000, linear);
          // animateValue("product-count", 0, 10000, linear);
          // animateValue("order-count", 0, 10000, constant);
          
        },
        error: function (request, status, error) {
          console.log(JSON.stringify(status));
          console.log(" failed");
        
        },
      });
}

setCounting = (id,count) => {
    let n = 0;
    let timerId = setInterval(() => alert('tick'), 2000);
}
setupOrders = () => {

    $.ajax({
        type: "GET",
        url: getOrdersUrl,
        contentType: "application/json",
        dataType: "json",
        success: (data) => {    
          console.log("success");
          console.log("orders : " + JSON.stringify(data));
           makeOrderRows(data);
          
        },
        error: function (request, status, error) {
          console.log(JSON.stringify(status));
          console.log(" failed");
        
        },
      });

//   <div>
//     <tr>
//       <td>Farm Party</td>
//       <td>22-May-2022</td>
//       <td>
//         <span class="status"> </span> Booked
//       </td>
//     </tr>
//   </div>
};

makeOrderRows = (orders) => {
    const container = document.getElementById(`order-container`);
    if(container){
        console.log("conatiner");
    }else{
        console.log("empty container");
    }
    
    let content="";
    for (let i = 0; i < orders.length; i++) {
          const row = document.createElement("div");
          row.classList = "card-body";
          let order = orders[i];
          console.log(`order : ${order}`);
          content += `   
          <div>
              <tr>
               <td>${order.orderIdByPaymentGateway}</td>
                 <td>${order.orderDate[2]}-${order.orderDate[1]}-${order.orderDate[0]}</td>
                 <td>
                   <span class="status">${order.totalPrice}</span> 
                 </td>
                 <td>
                   <span class="status">${order.profile.email}</span> 
                 </td>
               </tr>
             </div>
                 `;

    }
    
   container.innerHTML = content;
}
