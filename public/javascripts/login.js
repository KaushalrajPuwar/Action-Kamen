function togglePassword(str) {
  let passwordField = document.querySelector("#pswd-input" + str);
  let toggleImage = document.getElementById("toggle-icon" + str);
  let toggleText = document.getElementById("toggle-text" + str);
  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleImage.src = "images/hide_pswd.svg";
    toggleText.innerHTML = "Hide password";
  } else {
    passwordField.type = "password";
    toggleImage.src = "images/show_pswd.svg";
    toggleText.innerHTML = "Show password";
  }
}

function signupPage() {
  document.querySelector(".login-section").classList.add("hidden");
  document.querySelector(".signup-section").classList.remove("hidden");
}

function loginPage() {
  document.querySelector(".login-section").classList.remove("hidden");
  document.querySelector(".signup-section").classList.add("hidden");
}

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
