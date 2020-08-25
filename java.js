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
  if (b == 0) {
    alert("You cannot divide by 0"); 
    return 0;
  }
  return a / b;
}

function operate(myFunct, a, b) {
  return window[myFunct](a, b);
}


let totalValue = "";
let displayValue = "";
let funcPressed = "";
let myDisplay = document.querySelector("#display p");

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
            clearVariables();
            return;
        } else if(clicked.target.classList.contains("func")){
          if (totalValue == ""){
            funcPressed = clicked.target.id;
            totalValue = parseInt(myDisplay.textContent);
            clearDisplay();
            return;
          }
          displayValue = parseInt(myDisplay.textContent);
          clearDisplay();
          myDisplay.textContent = operate(funcPressed, totalValue, displayValue);
          totalValue = parseInt(myDisplay.textContent);
          displayValue = "";
          funcPressed = clicked.target.id;
          return;
        } else {
          if (totalValue == myDisplay.textContent) clearDisplay();
          updateDisplay(clicked.target.textContent);
          if(clicked.target.textContent == ".") lockPeriod(clicked)
        }
    }
})

function clearDisplay(){
    myDisplay.textContent = "0";
}
function clearVariables(){
    totalValue = "";
    displayValue = "";
    funcPressed = "";
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

function lockPeriod (key){
  key.target.classList.add("disabled");
}
