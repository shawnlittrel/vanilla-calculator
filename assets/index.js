//declare variables
const displayBox = document.getElementById("displayBox");
const historyBox = document.getElementById("historyBox");
const calcBox = document.getElementById("calcBox");
const totalBox = document.querySelector("#total");
let value1;
let value2;
let value1Entered = false;
let operator;
let displayValue = "";
let inputValue = "";
let historyArr = [];



//Push each button value to array and Display box
//Switch case for each operator
//Equal performs operation on values and outputs to display box
//History box will print results and scroll down -> old results eventually run off page
const calculateTotal = () => {
  //change strings to ints
  console.log('val1', value1);
  console.log('val2', value2);
  const operand1 = parseFloat(value1);
  const operand2 = parseFloat(value2);

  console.log(operand1);
  console.log(operand2);
  let total;

  switch (operator) {
    case "+":
      total = operand1 + operand2;
      break;

    case "-":
      total = operand1 - operand2;
      break;

    case "/":
      total = operand1 / operand2;
      break;

    case "*":
      total = operand1 * operand2;
      break;
  }

  //put total on screen
  totalBox.innerHTML = total;

  //add whole operation to history
  const historyObj = {
    operand1,
    operand2,
    operator,
    total
  };

  saveOperation(historyObj);
  historyBox.innerHTML = "";
  loadOperations();
  clear();
};

const saveOperation = (obj) => {
  if (historyArr.length >= 5) {
    historyArray.slice(0);
  }

  historyArr.push(obj);

  localStorage.setItem('calcHistory', JSON.stringify(historyArr));
};

const loadOperations = () => {
  //get from localstorage
  const storageItem = localStorage.getItem('calcHistory');
  const historyObj = JSON.parse(storageItem);
  console.log('hist', historyObj);
  let counter = 1;

  historyObj.forEach((operation) => {
    constructCard(operation, counter);
    counter++;
  })
};

const constructCard = (obj, counter) => {
    //create row
    const row = document.createElement("div");
    row.setAttribute('class', 'row');
    //create column
    const col = document.createElement("div");
    col.setAttribute('class', 'col s12');

    //create card
    const card = document.createElement("div");
    card.setAttribute('class', 'card grey darken-2');
    const opString = JSON.stringify(obj);
    card.setAttribute("data-operation", opString);
    
    //card content
    const cardContent = document.createElement("div");
    cardContent.setAttribute('class', 'card-content white-text');
    

    const title = document.createElement("div");
    title.setAttribute('class', 'card-title');
    title.innerText = `Operation ${counter}`;
    

    const operationText = document.createElement("div");
    operationText.setAttribute('class', 'cardOperation');
    operationText.innerText = `${obj.operand1} ${obj.operator} ${obj.operand2}`;

    const result = document.createElement("div");
    result.setAttribute("class", "cardResult");
    result.innerText = `${obj.total}`

    //append everything to page
    cardContent.appendChild(title);
    cardContent.appendChild(operationText);
    cardContent.appendChild(result);

    card.appendChild(cardContent);

    col.appendChild(card);

    row.appendChild(col);

    historyBox.appendChild(row);

    card.addEventListener("click", replayOperation, true);
};

const replayOperation = (event) => {
  const operation = event.currentTarget.dataset.operation;
  const opJson = JSON.parse(operation);
  console.log(opJson);

  displayBox.innerText = `${opJson.operand1}${opJson.operator}${opJson.operand2}`;
  totalBox.innerText = opJson.total;
};

const updateDisplay = (value) => {
  //dont update display if equal is pressed
  if (value === "=") return displayValue;

  let displayArr = displayValue.split("");

  const operators = ['+', '-', '/', '*'];
  //replace the last char if an operator is pressed twice
  if (
    operators.includes(displayArr[displayArr.length - 1]) &&
    operators.includes(value)
  ) {
    console.log('replace operator')
    displayArr[displayArr.length - 1] = value;
    console.log(displayArr);
  } else {
    displayArr.push(value);
  }

  return displayArr.join("");
};

const backspace = () => {
  //update all fields to delete the last number entered
  const displayArray = displayValue.split("");
  const charToDelete = displayArray.pop();

  const updatedDisplay = displayArray.join("");
  console.log(updatedDisplay);
  displayValue = updatedDisplay;
  displayBox.innerText = updatedDisplay;

  const inputValArray = inputValue.split("");
  const valToDelete = inputValArray.pop();
  const updatedVal = inputValArray.join("");

  inputValue = updatedVal;


};

const clear = () => {
  //clear out holders
  value1 = "";
  value2 = "";
  value1Entered = false;
  operator = "";
  displayValue = "";
  inputValue = "";
  displayBox.innerText = "";
};

//Register event to each button press
calcBox.addEventListener("click", event => {
  const closestBtn = event.target.closest('button');
  const operators = ['+', '-', '/', '*'];

  //stop function if a button wasn't clicked
  if (!closestBtn) return;
  if (!calcBox.contains(closestBtn)) return;


  //if button pushed is equal, calc total and push to history
  if (closestBtn.value === '=') {
    value2 = inputValue;
    inputValue = "";
    calculateTotal();
  } else if (closestBtn.value === "clear") { 
    clear();
  } else if (closestBtn.value === "bkspc") {
    backspace();
  } else if (operators.includes(closestBtn.value.toString())) {
    operator = closestBtn.value.toString();
    value1 = inputValue;

    value1Entered = true;
    inputValue = "";
      //add the keypress to the display
  displayValue = updateDisplay(closestBtn.value.toString());
  displayBox.innerHTML = displayValue;
  } else {
    //else add the number to one of the values
    inputValue += closestBtn.value.toString();
      //add the keypress to the display
  displayValue = updateDisplay(closestBtn.value.toString());
  displayBox.innerHTML = displayValue;
    //make sure total is cleared from previous operation
    if (totalBox.innerText) {
      totalBox.innerText = "";
    }
  }
});




loadOperations();