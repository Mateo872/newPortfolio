const btnHamburger = document.querySelector(".btn-toggle");
const menuOverlay = document.querySelector(".menu-overlay");
const menu = document.querySelector(".menu");
const moon = document.querySelector("#moon");
const firstName = document.querySelector("#firstName");
const btnSubmit = document.querySelector(".btn-disable");
const email = document.querySelector("#mail");
const messageInput = document.querySelector("#message");
const messageContainer = document.querySelector(".messageContainer");
const messageValidate = document.createElement("p");
const form = document.querySelector(".form");
const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const typed = new Typed(".typed", {
  strings: ["Mateo.", "Desarrollador web."],

  typeSpeed: 100,

  startDelay: 200,

  backSpeed: 200,

  loop: true,
});

btnSubmit.disabled = true;

btnHamburger.addEventListener("click", menuVisible);
menuOverlay.addEventListener("click", menuClosed);
moon.addEventListener("click", switchThemes);
firstName.addEventListener("blur", inputValue);
email.addEventListener("blur", inputValue);
messageInput.addEventListener("blur", inputValue);
btnSubmit.addEventListener("click", sendEmail);

function menuVisible() {
  menuOverlay.classList.add("menu-visible");
  menu.classList.add("menu-visible-animation");
  btnHamburger.classList.add("bi-x");
}

function menuClosed() {
  menuOverlay.classList.remove("menu-visible");
  menu.classList.remove("menu-visible-animation");
  btnHamburger.classList.remove("bi-x");
}

function switchThemes() {
  moon.classList.toggle("bi-sun");
  document.body.classList.toggle("background-dark-mode");
}

function inputValue(e) {
  if (e.target.value.length > 0) {
    e.target.classList.remove("border-error");
    e.target.classList.add("border-correct");
  } else {
    e.target.classList.add("border-error");
    e.target.classList.remove("border-correct");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      e.target.classList.remove("border-error");
      e.target.classList.add("border-correct");
    } else {
      e.target.classList.remove("border-correct");
      e.target.classList.add("border-error");
    }
  }

  if (
    firstName.className.includes("border-correct") &&
    email.className.includes("border-correct") &&
    messageInput.className.includes("border-correct")
  ) {
    messageContainer.style.display = "none";
    btnSubmit.disabled = false;
    btnSubmit.classList.remove("btn-disable");
  } else {
    btnSubmit.disabled = true;
    btnSubmit.classList.add("btn-disable");
    messageValidate.classList.add("message-error");
    showMessage("Todos los campos son obligatorios");
  }
}

function showMessage(message) {
  messageValidate.innerHTML = message;
  messageContainer.appendChild(messageValidate);
}

function sendEmail(e) {
  e.preventDefault();

  btnSubmit.disabled = true;
  btnSubmit.classList.add("btn-disable");

  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  setTimeout(() => {
    spinner.style.display = "none";

    firstName.classList.remove("border-correct");
    email.classList.remove("border-correct");
    messageInput.classList.remove("border-correct");
    messageContainer.style.display = "block";
    messageValidate.classList.add("message-correct");
    showMessage("Mensaje enviado correctamente!");

    setTimeout(() => {
      messageContainer.style.display = "none";
      resetForm();
    }, 3000);
  }, 3000);
}

function resetForm() {
  form.reset();
}
