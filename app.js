var keyArray = document.getElementsByClassName("key");
var operationArray = document.getElementsByClassName("operation");
this.GLOBAL_RESET_STATE = true;

for (var i = 0; i < keyArray.length; i++) {
  keyArray[i].addEventListener("click", changeInput);
}

for (var i = 0; i < operationArray.length; i++) {
  operationArray[i].addEventListener("click", doOperation);
}

document.getElementById("clearInput").onclick = function(){
  document.getElementById("result").value = "0";
  window.GLOBAL_RESET_STATE = true;
}

function changeInput() {
  var currentInput = document.getElementById("result");
  var operation = this.innerText;
  var length = currentInput.value.length;
  if(window.GLOBAL_RESET_STATE){
    // if((operation >="0" && operation<="9") || operation === '.'){
      window.GLOBAL_RESET_STATE = false;
      currentInput.value = ""; 
    // }
  }
  
  if((operation >="0" && operation<="9") || operation === '.' ){
   currentInput.value = currentInput.value + operation;
  }
}

function doOperation(){
  var currentInput = document.getElementById("result");
  var symbolArr = ['+', '-', '×', '÷', '='];
  var length = currentInput.value.length;
  var operation = this.innerText;
  if(operation === '='){
    window.GLOBAL_RESET_STATE = true;
    operation = "";
  }
  if(symbolArr.indexOf(currentInput.value[length-1]) !== -1){
      currentInput.value = (currentInput.value).substring(0,length-1);
  }
  currentInput.value  = calc(currentInput.value);
  if(currentInput.value !== "Error" && currentInput.value !=="") currentInput.value+=operation;
}

function calc(expression){
  var num1 = "", num2 = "",index=-1, res="";
  var symbolArr = ['+', '-', '×', '÷', '='];
  var dotCount = 0;
  for(var i=0; i<expression.length; i++){
     if(symbolArr.indexOf(expression[i]) == -1){
       num1+=expression[i];
       if(expression[i] === '.'){
           dotCount++;
         if(dotCount>1){
           return "Error";
         }
       }
     }
     else{ // symbols
       if(num1 !== ""){
         num2 = num1;
         num1 = "";
         index = i;
         dotCount = 0;
       }
       if(expression[i] === '-'){
         if((num1 === "") && (num2 === "")) num1 = "-";
       }
     }
  }
  if(index === -1) return num1;
  switch (expression[index]){
    case '+':
      res = parseFloat(num1) + parseFloat(num2);
      break;
    case '-':
      res = parseFloat(num2) - parseFloat(num1);
      break;
    case '×':
      res = parseFloat(num1) * parseFloat(num2);
      break;
    case '÷':
      res = parseFloat(num2) / parseFloat(num1);
      break;
  }
  return res;
}
