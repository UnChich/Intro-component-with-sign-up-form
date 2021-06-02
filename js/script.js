let fname = null;
let lname = null;
let email = null;
let pwd = null;

function inputCheck(field) {
  field = true;
}

function submitForm() {
  if (fname == null) {
    document.getElementById("fnameError").innerHTML =
      "First Name cannot be empty";
  }
  if (lname == null) {
    document.getElementById("lnameError").innerHTML =
      "Last Name cannot be empty";
  }
  if (email == null) {
    document.getElementById("emailError").innerHTML = "Email cannot be empty";
  }
  if (pwd == null) {
    document.getElementById("pwdError").innerHTML = "Password cannot be empty";
  } else {
    console.log("Success");
  }
}
