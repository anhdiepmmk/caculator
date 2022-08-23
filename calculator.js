function combine(a, b, operator) {
  if (operator === "x") {
    return a * b;
  }
  if (operator === "/") {
    return a / b;
  }
  if (operator === "+") {
    return a + b;
  }
  if (operator === "-") {
    return a - b;
  }

  throw new Error(`Invalid operator: ${operator}`);
}

function removeNullElements(elements) {
  while (elements.includes(null)) {
    const index = elements.findIndex((element) => element === null);
    elements.splice(index, 1);
  }
}
function compact(originalElements, operator) {
  const elements = originalElements;
  while (elements.includes(operator)) {
    const index = elements.findIndex((element) => element === operator);
    const leftIndex = index - 1;
    const rightIndex = index + 1;

    const leftValue = parseFloat(elements[leftIndex]);
    const rightValue = parseFloat(elements[rightIndex]);

    // update operator to new value
    elements[index] = combine(leftValue, rightValue, operator);

    // mark to delete
    elements[leftIndex] = null;
    elements[rightIndex] = null;

    removeNullElements(elements);
  }
}

function calculate(elements) {
  compact(elements, "x");
  compact(elements, "/");
  compact(elements, "+");
  compact(elements, "-");

  if (elements.length > 1) {
    throw new Error(
      `there are some invalid elements ${JSON.stringify(elements)}`
    );
  }

  return elements[0];
}

function convertElements2String(elements) {
  return elements.join(" ");
}
