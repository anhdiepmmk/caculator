const OPERATORS = ['+', '-', 'x', '/'];

const btnNumbers = document.getElementsByClassName('numbers');
const btnOperators = document.getElementsByClassName('operators');
const divResult = document.getElementById('result');
const btnDot = document.getElementById('dot');

const inputs = [];

for (const btnNumber of btnNumbers) {
  btnNumber.addEventListener('click', (event) => {
    const lastElement = inputs.at(-1);

    if (lastElement === undefined || OPERATORS.includes(lastElement) || lastElement === ('.')) {
      // insert new element
      inputs.push(parseFloat(event.target.textContent));
      console.log('inputs-1: ',inputs);
      if (lastElement === '.' && inputs.length === 1) {
        inputs.push(parseFloat( '0' + event.target.textContent));
      }
    }
    else {
      // merge with last element
      inputs[inputs.length - 1] = parseFloat(
        `${lastElement}${event.target.textContent}`
      );
      console.log(`inputs-2: ${inputs[inputs.length - 1]}`);
    }

    divResult.innerText = convertElements2String(inputs);
    console.log(divResult.innerText);
  });
}

for (const btnOperator of btnOperators) {
  btnOperator.addEventListener('click', (event) => {
    // if (result !== undefined) {
    //
    // }
    const lastElement = inputs.at(-1);
    if (lastElement !== undefined && !OPERATORS.includes(lastElement) && lastElement !== '.') {
      inputs.push(event.target.textContent);
      divResult.innerText = convertElements2String(inputs);
    }
  });
}

btnDot.addEventListener('click', (event) => {
  const lastElement = inputs.at(-1);

  if (lastElement === undefined || OPERATORS.includes(lastElement)) {
    // insert new element
    inputs.push(event.target.textContent);
    console.log('inputs-1: ',inputs);
  }
  else if (typeof(lastElement) === ('number') && !inputs.includes('.')) {
    inputs.push(event.target.textContent);
    console.log('inputs-2: ',inputs);
  }

  divResult.innerText = convertElements2String(inputs);
});

document.getElementById('enter').addEventListener('click', () => {
  const lastElement = inputs.at(-1);

  if (lastElement !== undefined && !OPERATORS.includes(lastElement)) {
    const result = calculate(inputs);
    // remove all elements
    inputs.length = 0;
    divResult.innerText = result;
  }
  console.log(divResult.innerText);
});

document.getElementById('backspace').addEventListener('click', () => {
  const lastElement = inputs.at(-1);

  if (lastElement !== undefined) {
    if (OPERATORS.includes(lastElement)) {
      inputs.pop();
    } else {
      let lastElementStr = `${lastElement}`;
      console.log(lastElementStr);

      // remove last charater
      lastElementStr = lastElementStr.slice(0, -1);

      if (lastElementStr === '') {
        inputs.pop();
      } else {
        inputs[inputs.length - 1] = parseInt(lastElementStr);
      }
    }

    divResult.innerText = convertElements2String(inputs);
  }
});

document.getElementById('clear').addEventListener('click', () => {
  // remove all elements
  inputs.length = 0;
  divResult.innerText = convertElements2String(inputs);
});
