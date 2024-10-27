document.addEventListener("DOMContentLoaded", (event) => {
  let calcOperation = document.getElementById("calc-operation");
  let calcTyped = document.getElementById("calc-typed");
  let currentInput = "";

  const updateScreen = (operation, input) => {
    calcOperation.innerText = operation;
    calcTyped.innerText = input;
  };

  const clearScreen = () => {
    currentInput = "";
    updateScreen("", "");
  };

  const calculate = () => {
    try {
      let result = eval(currentInput);
      updateScreen(currentInput, result);
      currentInput = result.toString();
    } catch (e) {
      updateScreen("Error", "");
      currentInput = "";
    }
  };

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      let btnClass = button.className;
      let btnValue = button.innerText;

      switch (btnClass) {
        case "ac":
          clearScreen();
          break;
        case "sign":
          currentInput = currentInput.startsWith("-")
            ? currentInput.slice(1)
            : "-" + currentInput;
          updateScreen(currentInput, "");
          break;
        case "mod":
          currentInput += "%";
          updateScreen(currentInput, "");
          break;
        case "div":
          currentInput += "/";
          updateScreen(currentInput, "");
          break;
        case "mul":
          currentInput += "*";
          updateScreen(currentInput, "");
          break;
        case "sub":
          currentInput += "-";
          updateScreen(currentInput, "");
          break;
        case "add":
          currentInput += "+";
          updateScreen(currentInput, "");
          break;
        case "deci":
          currentInput += ".";
          updateScreen(currentInput, "");
          break;
        case "del":
          currentInput = currentInput.slice(0, -1);
          updateScreen(currentInput, "");
          break;
        case "res":
          calculate();
          break;
        default:
          currentInput += btnValue;
          updateScreen(currentInput, "");
      }
    });
  });
});
