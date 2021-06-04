const form = document.getElementsByTagName("form")[0];

const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");
const email = document.getElementById("email");
const pwd = document.getElementById("password");
const fNameError = document.getElementById("firstNameError");
const lNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const pwdError = document.getElementById("passwordError");
let fNameStatus = null;
let lNameStatus = null;
let emailStatus = null;
let pwdStatus = null;

const trialButton = document.getElementById("trialButton");

form.addEventListener("submit", function (event) {
  if (fName.validity.valueMissing) {
    event.preventDefault();
    fName.classList.add("errored");
    fName.setAttribute("placeholder", "");
    fNameError.innerHTML = "First Name cannot be empty";
    fNameStatus = true;
  }
  if (lName.validity.valueMissing) {
    event.preventDefault();
    lName.classList.add("errored");
    lName.setAttribute("placeholder", "");
    lNameError.innerHTML = "Last Name cannot be empty";
    lNameStatus = true;
  }
  if (email.validity.valueMissing) {
    event.preventDefault();
    email.classList.add("errored");
    email.setAttribute("placeholder", "");
    emailError.innerHTML = "Email cannot be empty";
    emailStatus = true;
  } else if (email.validity.typeMismatch) {
    event.preventDefault();
    email.classList.add("errored");
    email.setAttribute("value", "");
    email.setAttribute("placeholder", "email@example/com");
    emailError.innerHTML = "Looks like this is not an email";
    emailStatus = true;
  }
  if (pwd.validity.valueMissing) {
    event.preventDefault();
    pwd.classList.add("errored");
    pwd.setAttribute("placeholder", "");
    pwdError.innerHTML = "Password cannot be empty";
    pwdStatus = true;
  } else {
    console.log("Form submitted successfully!");
  }
});

fName.addEventListener("change", function () {
  if (fNameStatus == true && fName.validity.valid) {
    fName.classList.remove("errored");
    fNameError.innerHTML = "";
    fNameStatus = false;
  }
});

lName.addEventListener("change", function () {
  if (lNameStatus == true && lName.validity.valid) {
    lName.classList.remove("errored");
    lNameError.innerHTML = "";
    lNameStatus = false;
  }
});

email.addEventListener("change", function () {
  if (emailStatus == true && email.validity.valid) {
    email.classList.remove("errored");
    emailError.innerHTML = "";
    emailStatus = false;
  }
});

pwd.addEventListener("change", function () {
  if (pwdStatus == true && pwd.validity.valid) {
    pwd.classList.remove("errored");
    pwdError.innerHTML = "";
    pwdStatus = false;
  }
});

trialButton.addEventListener("click", function () {
  fName.focus();
});
