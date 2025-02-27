let currentInput = '';
let historyList = [];

// Append a number to the display
function appendNumber(number) {
    currentInput += number.toString();
    updateDisplay();
}

// Append an operator
function appendOperator(operator) {
    if (currentInput !== '' && !/[+\-*/] $/.test(currentInput)) {
        currentInput += ' ' + operator + ' ';
        updateDisplay();
    }
}

// Append a decimal point
function appendDot() {
    const lastNumber = currentInput.split(/[\s+\-*/]+/).pop();
    if (!lastNumber.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

// Clear the display
function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

// Delete the last character
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Toggle the sign of the current number
function toggleSign() {
    const lastNumber = currentInput.split(/[\s+\-*/]+/).pop();
    if (lastNumber) {
        const newNumber = lastNumber.startsWith('-') ? lastNumber.slice(1) : '-' + lastNumber;
        currentInput = currentInput.replace(new RegExp(lastNumber + '$'), newNumber);
        updateDisplay();
    }
}

// Calculate percentage
function calculatePercentage() {
    try {
        const lastNumber = currentInput.split(/[\s+\-*/]+/).pop();
        const percentageValue = parseFloat(lastNumber) / 100;
        currentInput = currentInput.replace(new RegExp(lastNumber + '$'), percentageValue.toString());
        updateDisplay();
    } catch {
        currentInput = 'Error';
        updateDisplay();
    }
}

// Perform the calculation
function calculate() {
    try {
        const result = eval(currentInput);
        historyList.push(`${currentInput} = ${result}`);
        currentInput = result.toString();
        updateHistory();
        updateDisplay();
    } catch {
        currentInput = 'Error';
        updateDisplay();
    }
}

// Update the display
function updateDisplay() {
    document.getElementById('display').innerText = currentInput || '0';
}

// Update the history section
function updateHistory() {
    const historyElement = document.getElementById('history-list');
    historyElement.innerHTML = historyList.map(item => `<div>${item}</div>`).join('');
}

// Toggle the visibility of the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}
// Function to clear the history list
function clearHistory() {
    historyList = []; // Empty the history array
    updateHistory(); // Update the UI to reflect the cleared history
}
