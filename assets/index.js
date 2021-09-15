//declare variables
let displayBox = document.getElementById("displayBox");
let historyBox = document.getElementById("historyBox");
const calcBox = document.getElementById("calcBox");



//Register event to each button press
//Push each button value to array and Display box
//Switch case for each operator
//Equal performs operation on values and outputs to display box
//History box will print results and scroll down -> old results eventually run off page



calcBox.addEventListener("click", event => {
  console.log(event.target.value)
});