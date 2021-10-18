//declare variables
let displayBox = document.getElementById("displayBox");
let historyBox = document.getElementById("historyBox");
const calcBox = document.getElementById("calcBox");
const displayArray = [];


function gatherInput(event) {
  
}
//Push each button value to array and Display box
//Switch case for each operator
//Equal performs operation on values and outputs to display box
//History box will print results and scroll down -> old results eventually run off page


//Register event to each button press
calcBox.addEventListener("click", event => {
  let closestBtn = event.target.closest('button');

  //stop function if a button wasn't clicked
  if(!closestBtn) return;
  if(!calcBox.contains(closestBtn)) return;

  console.log(closestBtn.value);
  
});