const OPERATORS = ["+", "-", "x", "/"];

const btnNumbers = document.getElementsByClassName("numbers");
const btnOperators = document.getElementsByClassName("operators");
const divResult = document.getElementById("result");
const divHistory = document.getElementById("history");

// ['3', '+', '4.1']
const inputs = [];

for (const btnNumber of btnNumbers) {
  btnNumber.addEventListener("click", (event) => {
    const lastElement = inputs.at(-1);

    if (lastElement === undefined || OPERATORS.includes(lastElement)) {
      // insert new element
      inputs.push(event.target.textContent);
      divResult.innerText = convertElements2String(inputs);
    } else {
      // merge with last element
      inputs[inputs.length - 1] = `${lastElement}${event.target.textContent}`;
      divResult.innerText = convertElements2String(inputs);
    }

    divResult.innerText = convertElements2String(inputs);
  });
}

for (const btnOperator of btnOperators) {
  btnOperator.addEventListener("click", (event) => {
    const lastElement = inputs.at(-1);
    if (lastElement !== undefined && !OPERATORS.includes(lastElement)) {
      inputs.push(event.target.textContent);
      divResult.innerText = convertElements2String(inputs);
    }
  });
}

document.getElementById("enter").addEventListener("click", (event) => {
  const lastElement = inputs.at(-1);

  if (lastElement !== undefined && !OPERATORS.includes(lastElement)) {
    divHistory.innerText = convertElements2String(inputs);
    const result = calculate(inputs);
    // remove all elements
    inputs.length = 0;
    divResult.innerText = result;
  }
});

document.getElementById("backspace").addEventListener("click", () => {
  const lastElement = inputs.at(-1);

  if (lastElement !== undefined) {
    if (OPERATORS.includes(lastElement)) {
      inputs.pop();
    } else {
      // remove last charater
      const updatedLastElement = lastElement.slice(0, -1);

      if (updatedLastElement === "") {
        inputs.pop();
      } else {
        inputs[inputs.length - 1] = updatedLastElement;
      }
    }

    divResult.innerText = convertElements2String(inputs);
  }
});

document.getElementById("clear").addEventListener("click", () => {
  // remove all elements
  inputs.length = 0;
  divResult.innerText = convertElements2String(inputs);
});

document.getElementById("point").addEventListener("click", () => {
  const lastElement = inputs.at(-1);

  if (
    lastElement !== undefined &&
    !OPERATORS.includes(lastElement) &&
    !`${lastElement}`.includes(".")
  ) {
    // append point (.)
    inputs[inputs.length - 1] = `${lastElement}.`;
  } else if (lastElement === undefined || OPERATORS.includes(lastElement)) {
    // append '0.'
    inputs[inputs.length] = `0.`;
  }

  divResult.innerText = convertElements2String(inputs);
});
