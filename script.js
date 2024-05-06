function addToDisplay(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}
function toast() {
  Toastify({
    text: "All entries deleted Successfully from DB",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }, // Callback after click
  }).showToast();
}
let Data = [];
function getData() {
  fetch("http://localhost:3000/getCalc")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here

      Data = data;
    })
    .catch((error) => {
      // Handle errors here
      console.error("There was a problem with the fetch operation:", error);
    });
}
getData();
let index = 10;
function ShowHistory(pos) {
  document.getElementById("display").value = "";
  console.log(Data);
  if (index > Data.length) {
    console.log(Data.length);
    index = Data.length;
  }
  console.log(index);
  if (pos == "back" && index == 0) return;
  else if (pos == "forward" && (index == 10 || index >= Data.length)) return;
  else if (pos == "back")
    document.getElementById("display").value = Number(
      Data[--index].calculation
    );
  else if (pos == "forward")
    document.getElementById("display").value = Number(
      Data[++index].calculation
    );
}

function Hello() {
  console.log("Hello");
}

function deleteHistory() {
  fetch("http://localhost:3000/delete-all", {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to delete entries");
    })
    .then((data) => {
      console.log(data.message);
      getData();
      toast();
    })
    .catch((error) => {
      console.error("Error deleting entries:", error.message); // Log error message
    });
}

function calculate() {
  var expression = document.getElementById("display").value;
  try {
    var result = eval(expression);
    document.getElementById("display").value = result;
    console.log(Data);
    fetch("http://localhost:3000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "24",
        calculation: result,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
        console.log(data);
        getData();
      })
      .catch((error) => {
        // Handle errors here
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    alert("Error in expression!");
  }
}

function trigFunction(func) {
  var value = document.getElementById("display").value;
  var result;
  switch (func) {
    case "sin":
      result = Math.sin(eval(value));
      break;
    case "cos":
      result = Math.cos(eval(value));
      break;
    case "tan":
      result = Math.tan(eval(value));
      break;
    default:
      break;
  }
  document.getElementById("display").value = result;
}

function logFunction(func) {
  var value = document.getElementById("display").value;
  var result;
  switch (func) {
    case "log":
      result = Math.log10(eval(value));
      break;
    case "ln":
      result = Math.log(eval(value));
      break;
    default:
      break;
  }
  document.getElementById("display").value = result;
}

function sqrtFunction() {
  var value = document.getElementById("display").value;
  var result = Math.sqrt(eval(value));
  document.getElementById("display").value = result;
}

function powerFunction(power) {
  var value = document.getElementById("display").value;
  var result = Math.pow(eval(value), power);
  document.getElementById("display").value = result;
}

function factorialFunction() {
  var value = parseInt(document.getElementById("display").value);
  var result = 1;
  for (var i = 2; i <= value; i++) {
    result *= i;
  }
  document.getElementById("display").value = result;
}

function absoluteFunction() {
  var value = document.getElementById("display").value;
  var result = Math.abs(eval(value));
  document.getElementById("display").value = result;
}

function inverseTrigFunction(func) {
  var value = document.getElementById("display").value;
  var result;
  switch (func) {
    case "asin":
      result = Math.asin(eval(value));
      break;
    case "acos":
      result = Math.acos(eval(value));
      break;
    case "atan":
      result = Math.atan(eval(value));
      break;
    default:
      break;
  }
  document.getElementById("display").value = result;
}
