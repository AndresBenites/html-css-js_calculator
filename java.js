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

function operate(myFunct, a, b) {
  return window[myFunct](a, b);
}


let totalValue = 0;
let displayValue = 0;
let funcPressed = "add";
let myDisplay = document.querySelector("#display p");

// // highlight calculator buttons when pushed with keyboard
// let regex = new RegExp(/\d|\.|\-|\+|x|\/|\=\*/);
// let keys = document.addEventListener("keydown", (e) => {
//   digit = e.key;
//   if (!regex.test(digit)) return;
//   e.preventDefault();
//   flashButton(e.key);
//   updateDisplay(e.key);
// });


const buttons = document.getElementById("buttons");
buttons.addEventListener("click",function(clicked) {
    if (clicked.target.classList.contains("button")){
        clicked.preventDefault();
        clicked.target.classList.add("pressed");
        if(clicked.target.classList.contains("clear")) {
            clearDisplay();
            clearVariables();
            return;
        }
        if(clicked.target.classList.contains("equals")) {
            displayValue = parseInt(myDisplay.textContent);
            myDisplay.textContent = operate(funcPressed, totalValue, displayValue);
            return;
        }
        if(clicked.target.classList.contains("func")){
            funcPressed = clicked.target.id;
            totalValue = parseInt(myDisplay.textContent);
            clearDisplay();
            return;
        }
        updateDisplay(clicked.target.textContent);
    }
})

function clearDisplay(){
    myDisplay.textContent = "0";
}
function clearVariables(){
    totalValue = 0;
    displayValue = 0;
}
// remove the animation when it's finished
const allKeys = document.querySelectorAll(".button");
allKeys.forEach((myButton) =>
  myButton.addEventListener("transitionend", (e) => {
    myButton.classList.remove("pressed");
  })
);


function updateDisplay(value){
    if (myDisplay.textContent == 0) myDisplay.textContent = "";
    myDisplay.textContent += value;
}

function flashButton(buttonValue){
    let pressedKey = document.getElementById(buttonValue);
    pressedKey.classList.add("pressed");
}

