console.log("test");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(funct, a, b) {
  return funct(a, b);
}
let regex = new RegExp(/\d|\.|\-|\+|\*|\/|\=/);
let keys = document.addEventListener("keydown", (e) => {
  digit = e.key;
  if (!regex.test(digit)) return;
  let pressedKey = document.getElementById(digit);
  pressedKey.classList.add("pressed");
});
const allKeys = document.querySelectorAll(".button");
allKeys.forEach((myButton) =>
  myButton.addEventListener("transitionend", (e) => {
    myButton.classList.remove("pressed");
  })
);

let totalValue = 0;
display = document.querySelector("#display p");
display.textContent = totalValue;

