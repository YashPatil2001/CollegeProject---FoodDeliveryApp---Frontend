const deleteUserUrl = 'http://35.87.139.152:8081/admin/user/'
const getAllUsersUrl = 'http://35.87.139.152:8081/admin/users'
// <div id="user-container">
// <tr>
//     <td>Alfreds Futterkiste</td>
//     <td>Maria Anders</td>
//     <td>Germany</td>
// </tr>
// </div>

$(document).ready(() => {
    getAllUsers();

    $('#addBtn').click(() => {
        window.open('http://127.0.0.1:5502/html/admin_create_user.html','_self');
    })
});


getAllUsers = ( ) => {
    $.ajax({
        type: "GET",
        url: getAllUsersUrl,
        contentType: "application/json",
        dataType: "json",
        success: (data) => {    
          console.log("success");
          console.log("orders : " + JSON.stringify(data));
           makeUserRows(data);
          
        },
        error: function (request, status, error) {
          console.log(JSON.stringify(status));
          console.log(" failed");
        
        },
      });
}

makeUserRows = (users) => {
    const container = document.getElementById(`customers`);
    if (container) {
        console.log("conatiner");
    } else {
        console.log("empty container");
    }

    let content = "";
    content += `
    <tr>
    <th>Email</th>
    <th>FirstName</th>
    <th>LastName</th>
    </tr>
    `;
    for (let i = 0; i < users.length; i++) {
        const row = document.createElement("tr");
        row.classList = "card-body";
        let user = users[i];
        console.log(`user : ${user}`);
        content += `   
          <tr id="user-${i}">
              <td>${user.email}</td>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
          </tr>
                 `;
    }

    container.innerHTML = content;

    setupClicks(users);
};


setupClicks = (users) => {
    for(let i=0;i<users.length;i++){
        console.log(`position ${i}`);
        $(`#user-${i}`).click(() => {
            deleteUser(i,users[i]);
        })
    }
}

deleteUser = (position,user) => {

    $.ajax({
        type: "GET",
        url: deleteUserUrl + user.profileId,
        contentType: "application/json",
        dataType: "json",
        success: (data) => {    
          console.log("success");
          console.log("orders : " + JSON.stringify(data));
          console.log(`position : ${position}`);
          $(`user-${position}`).closest("tr").remove();
          makeToast('user delete successfully')
          location.reload();
          
        },
        error: function (request, status, error) {
          console.log(JSON.stringify(status));
          console.log(" failed");
          makeToast('something went wrong',error=true)
        
        },
      });

}
