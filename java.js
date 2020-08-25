let totalValue = "";
let displayValue = "";
let funcPressed = "";
const myDisplay = document.querySelector("#display p");
const buttons = document.getElementById("buttons");
const numbersReg = new RegExp(/\d/);
const decimalReg = new RegExp(/\.0+/);

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

function clearDisplay() {
  myDisplay.textContent = "0";
}
function clearVariables() {
  totalValue = "";
  displayValue = "";
  funcPressed = "";
}

function updateDisplay(value) {
  if (decimalReg.test(myDisplay.textContent)){
    console.log("decimalReg true");
    myDisplay.textContent += value;
    return;
  } else if (myDisplay.textContent == 0){
    myDisplay.textContent = "";
  }
  myDisplay.textContent += value;
}

function flashButton(buttonValue) {
  let pressedKey = document.getElementById(buttonValue);
  pressedKey.classList.add("pressed");
}

function lockPeriod() {
  period = document.getElementById(".");
  period.classList.add("disabled");
}

function unlockPeriod() {
  period = document.getElementById(".");
  period.classList.remove("disabled");
}

function checkLockedPeriod() {
  period = document.getElementById(".");
  return period.classList.contains("disabled") ? true : false;
}

function backspace(str) {
  return str.slice(0, -1);
}

function clearAll() {
  clearDisplay();
  clearVariables();
  unlockPeriod();
}

function equals() {
  if (funcPressed == "") return;
  displayValue = parseFloat(myDisplay.textContent);
  myDisplay.textContent = operate(funcPressed, totalValue, displayValue);
  clearVariables();
  unlockPeriod();
}

function funcKeyPressed(id) {
  if (funcPressed == "") {
    funcPressed = id;
    totalValue = parseFloat(myDisplay.textContent);
    clearDisplay();
    unlockPeriod();
    return;
  } else {
    displayValue = parseFloat(myDisplay.textContent);
    clearDisplay();
    myDisplay.textContent = operate(funcPressed, totalValue, displayValue);
    totalValue = parseFloat(myDisplay.textContent);
    displayValue = "";
    funcPressed = id;
    unlockPeriod();
  }
}

window.addEventListener("keydown", (key) => {
  if (key.key == "Backspace") {
    if (myDisplay.textContent == 0) return;
    myDisplay.textContent = backspace(myDisplay.textContent);
    if (myDisplay.textContent == "") myDisplay.textContent = 0;
  }
  if (key.key == "Escape") {
    flashButton("clear");
    clearAll();
    unlockPeriod();
  }
  if (key.key == "Enter") {
    flashButton("equals");
    equals();
  }
  if (key.key == "/") {
    key.preventDefault();
    flashButton("divide");
    funcKeyPressed("divide");
  }
  if (key.key == "*" || key.key == "x") {
    flashButton("multiply");
    funcKeyPressed("multiply");
  }
  if (key.key == "-") {
    flashButton("subtract");
    funcKeyPressed("subtract");
  }
  if (key.key == "+") {
    flashButton("add");
    funcKeyPressed("add");
  }
  if (key.key == "." && checkLockedPeriod()) {
    return;
  }
  if (key.key == "." && !checkLockedPeriod()) {
    flashButton(".");
    updateDisplay(key.key);
    lockPeriod();
  }
  if (!numbersReg.test(key.key)) return;
  if (totalValue == myDisplay.textContent) clearDisplay();
  flashButton(key.key);
  updateDisplay(key.key);
});

buttons.addEventListener("click", function (clicked) {
  if (clicked.target.classList.contains("button")) {
    clicked.preventDefault();
    clicked.target.classList.add("pressed");

    if (clicked.target.classList.contains("clear")) {
      clearAll();
      return;
    }
    // if = is pressed
    if (clicked.target.classList.contains("equals")) {
      equals();
      return;
      // if a function that isn't = is pressed
    } else if (clicked.target.classList.contains("func")) {
      funcKeyPressed(clicked.target.id);
      return;
      // if any othe key is clicked
    } else {
      // if the display is the totaled value from another calc
      if (totalValue == myDisplay.textContent) clearDisplay();

      // if the . is pressed and already locked, do nothing
      if (clicked.target.id == "." && checkLockedPeriod()) {
        return;
      }
      //if the . is pressed and not locked
      if (clicked.target.id == "." && !checkLockedPeriod()) {
        updateDisplay(clicked.target.id);
        lockPeriod();
        return;
      }
      // otherwise, just add the key to the display
      updateDisplay(clicked.target.textContent);
    }
  }
});

// remove the animation when it's finished
const allKeys = document.querySelectorAll(".button");
allKeys.forEach((myButton) =>
  myButton.addEventListener("transitionend", (e) => {
    myButton.classList.remove("pressed");
  })
);
