const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
const recentEl1 = document.querySelector(".one");
const recentEl2 = document.querySelector(".two");
const recentEl3 = document.querySelector(".three");
const recentEl4 = document.querySelector(".four");
const recentEl5 = document.querySelector(".five");

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;
let arr = [];
let recentOps = 0;

numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2El.innerText = dis2Num;
  });
});

operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) {
      return;
    }
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  display1El.innerText = result + name;
  display2El.innerText = "";
  dis2Num = "";
  tempResultEl.innerText = dis1Num;
}

function mathOperation() {
  if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
}

equalEl.addEventListener("click", (e) => {
  if (!dis2Num || !dis1Num) {
    return;
  }
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  localStorage.setItem(
    "result",
    tempResultEl.innerText + " = " + display2El.innerText
  );
  if (recentOps < 5) {
    if (arr.length === 0) {
      arr.push(localStorage.getItem("result"));
    } else {
      arr.unshift(localStorage.getItem("result"));
    }
  } else {
    arr.pop();
    arr.unshift(localStorage.getItem("result"));
  }
  recentOps++;
  //   console.log(arr);
  showRecents(arr);
  tempResultEl.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

clearAllEl.addEventListener("click", (e) => {
  display1El.innerText = "0";
  display2El.innerText = "0";
  dis1Num = "";
  dis2Num = "";
  result = "";
  tempResultEl.innerText = "";
});

clearLastEl.addEventListener("click", (e) => {
  display2El.innerText = "";
  dis2Num = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("X");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});

function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operationEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickEqual() {
  equalEl.click();
}

function showRecents(arr) {
  arr.map((a) => a);

  document.getElementById("recents").innerHTML =
    "<li>" + arr.join("</li><li>") + "</li>";
}
