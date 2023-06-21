class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  compute() {
    let computetion;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computetion = prev + curr;
        break;
      case "-":
        computetion = prev - curr;
        break;
      case "*":
        computetion = prev * curr;
        break;
      case "÷":
        computetion = prev / curr;
        break;
      default:
        return;
    }
    this.currOperand = computetion;
    this.operation = undefined;
    this.prevOperand = "";
  }
  getDisplayNumber(number) {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return "";

    return floatNumber.toLocaleString("en");
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currOperand
    );

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.prevOperand
      )} ${this.operation}`;
    }
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-prev-operand]"
);
const currentOperandTextElement = document.querySelector("[data-curr-operand]");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
