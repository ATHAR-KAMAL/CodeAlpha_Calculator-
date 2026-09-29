let currentNumber = "";
let previousNumber = "";
let operation = undefined;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function appendNumber(number) {

    if (number === "0" && currentNumber === "0") {
        return;
    }

    currentNumber += number;

    updateDisplay();
}

function appendDecimal() {

    if (currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "") {
        currentNumber = "0";
    }

    currentNumber += ".";

    updateDisplay();
}

function chooseOperation(selectedOperation) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    operation = selectedOperation;

    previousNumber = currentNumber;
    currentNumber = "";

    updateDisplay();
}

function calculate() {

    if (previousNumber === "" || currentNumber === "") {
        return;
    }

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    let result;

    switch (operation) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "×":
            result = previous * current;
            break;

        case "÷":

            if (current === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operation = undefined;

                updateDisplay();
                return;
            }

            result = previous / current;
            break;
    }

    currentNumber = result.toString();

    previousNumber = "";
    operation = undefined;

    updateDisplay();
}

function clearDisplay() {

    currentNumber = "";
    previousNumber = "";
    operation = undefined;

    updateDisplay();
}

function deleteNumber() {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}

function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";

    previousDisplay.textContent =
        previousNumber && operation
            ? `${previousNumber} ${operation}`
            : "";
}
function calculatePercentage() {

    if (currentNumber === "") {
        return;
    }

    currentNumber = (parseFloat(currentNumber) / 100).toString();

    updateDisplay();
}
// Keyboard Support

document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    // Decimal
    else if (key === ".") {
        appendDecimal();
    }

    // Operators
    else if (key === "+") {
        chooseOperation("+");
    }

    else if (key === "-") {
        chooseOperation("-");
    }

    else if (key === "*") {
        chooseOperation("×");
    }

    else if (key === "/") {
        chooseOperation("÷");
    }

    // Calculate
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    // Delete
    else if (key === "Backspace") {
        deleteNumber();
    }

    // Clear
    else if (key === "Escape") {
        clearDisplay();
    }

});