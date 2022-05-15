makeToast = (text,error) => {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";
  x.textContent = text;
  if(error){
    $("#snackbar").css("background-color", "red");
  }else{
    $("#snackbar").css("background-color", "orange");
  }
 
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
};
