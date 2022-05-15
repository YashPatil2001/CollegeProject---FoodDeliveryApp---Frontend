const email = document.getElementById("user-email");
const password = document.getElementById("user-password");

const emailErr = document.getElementById("email-err");
const passwordErr = document.getElementById("password-err");
const commonErr = document.getElementById("common-err");

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const siginUrl = "http://localhost:8080/auth/login";

email.addEventListener("input", (e) => {
  const value = e.target.value;

  if (value == "") {
    emailErr.textContent = "email should not be empty";
  } else if (!emailPattern.test(value)) {
    emailErr.textContent = "Invalid email";
  } else {
    emailErr.textContent = "";
  }
});

password.addEventListener("input", (e) => {
  const value = e.target.value;

  if (value == "") {
    passwordErr.textContent = "Please enter password";
  } else {
    passwordErr.textContent = "";
  }
});

checkfinalValidation = () => {
  if (email.value == "") {
    emailErr.textContent = "email should not be empty";
    return false;
  }
  if (password.value == "") {
    passwordErr.value = "Password should not be empty";
    return false;
  }

  return true;
};

$("#btn-signin").click(() => {
  commonErr.textContent = "";
  if (!checkfinalValidation()) {
    return;
  }
  var data = email.value + "\n" + password.value;
  console.log("on submit : " + data);

  $(".loading-icon").removeClass("hide");
  $(".button").attr("disabled", true);
  $(".btn-txt").text("Signing...");
  console.log("going to login");
  $.ajax({
    type: "POST",
    url: siginUrl,
    contentType: "application/json",
    data: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    dataType: "json",
    success: (data) => {
      $(".loading-icon").addClass("hide");
      $(".button").attr("disabled", false);
      $(".btn-txt").text("SignIn");
       
      console.log("success");
      console.log("data : " + data);
      // alert('login successfully')
      localStorage.setItem("is_log_in", true);
      localStorage.setItem("user_id", data);
      window.open("http://127.0.0.1:5502/html/home.html", "_self");
    },
    error: function (request, status, error) {
      $(".loading-icon").addClass("hide");
      $(".button").attr("disabled", false);
      $(".btn-txt").text("Signup");
      //alert(request.status);
      commonErr.textContent = "Incorrect Email or password";
    },
  });
});

function onSuccess() {
  $(".loading-icon").addClass("hide");
  $(".button").attr("disabled", false);
  $(".btn-txt").text("SignIn");

  console.log("success");
  // alert('login successfully')
  localStorage.setItem("is_log_in", true);
  window.open('#profile.html',"_self");
}
