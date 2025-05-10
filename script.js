// Calculator State
let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;
let memoryValue = 0;
let historyList = [];

// DOM Elements
const display = document.getElementById('display');
const memoryIndicator = document.getElementById('memory-indicator');
const historyListElement = document.getElementById('history-list');

// Initialize the calculator
function init() {
    updateDisplay();
    updateMemoryIndicator();
    document.addEventListener('keydown', handleKeyboardInput);
}

// Update the main display
function updateDisplay() {
    display.textContent = currentInput;
}

// Update memory indicator
function updateMemoryIndicator() {
    memoryIndicator.textContent = memoryValue !== 0 ? 'M' : '';
}

// Append a number to the display (original function name)
function appendNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = '';
        resetScreen = false;
    }
    currentInput += number;
    updateDisplay();
}

// Append a decimal point (original function name)
function appendDot() {
    if (resetScreen) {
        currentInput = '0';
        resetScreen = false;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

// Set the operation (original function name)
function appendOperator(op) {
    if (operation !== null && !resetScreen) calculate();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

// Perform calculation (original function name)
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Add to history
    addToHistory(`${previousInput} ${operation} ${currentInput}`, result);
    
    currentInput = result.toString();
    operation = null;
    resetScreen = true;
    updateDisplay();
}

// Clear the display (original function name)
function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

// Clear all (new function)
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

// Delete the last character (original function name)
function deleteLast() {
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Toggle the sign of the current number (original function name)
function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

// Calculate percentage (original function name)
function calculatePercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    addToHistory(`${currentInput}%`, currentInput);
    updateDisplay();
}

// Calculate square (new function)
function calculateSquare() {
    const num = parseFloat(currentInput);
    const result = num * num;
    addToHistory(`sqr(${num})`, result);
    currentInput = result.toString();
    updateDisplay();
}

// Calculate square root (new function)
function calculateSquareRoot() {
    const num = parseFloat(currentInput);
    if (num >= 0) {
        const result = Math.sqrt(num);
        addToHistory(`√(${num})`, result);
        currentInput = result.toString();
    } else {
        currentInput = 'Error';
    }
    updateDisplay();
}

// Calculate reciprocal (new function)
function calculateReciprocal() {
    const num = parseFloat(currentInput);
    if (num !== 0) {
        const result = 1 / num;
        addToHistory(`1/(${num})`, result);
        currentInput = result.toString();
    } else {
        currentInput = 'Error';
    }
    updateDisplay();
}

// Memory functions
function memoryAdd() {
    memoryValue += parseFloat(currentInput) || 0;
    updateMemoryIndicator();
}

function memorySubtract() {
    memoryValue -= parseFloat(currentInput) || 0;
    updateMemoryIndicator();
}

function memoryRecall() {
    currentInput = memoryValue.toString();
    updateDisplay();
}

function memoryClear() {
    memoryValue = 0;
    updateMemoryIndicator();
}

// History functions
function addToHistory(expression, result) {
    historyList.unshift({ expression, result });
    if (historyList.length > 10) historyList.pop();
    updateHistory();
}

function updateHistory() {
    historyListElement.innerHTML = historyList.map(item => `
        <div class="history-item">
            <div class="expression">${item.expression}</div>
            <div class="result">= ${item.result}</div>
        </div>
    `).join('');
}

function clearHistory() {
    historyList = [];
    updateHistory();
}

// Toggle sidebar
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Keyboard support
function handleKeyboardInput(e) {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    else if (e.key === '.') appendDot();
    else if (e.key === '=' || e.key === 'Enter') calculate();
    else if (e.key === 'Backspace') deleteLast();
    else if (e.key === 'Escape') clearAll();
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    }
    else if (e.key === '%') calculatePercentage();
}

// Initialize calculator when page loads
window.onload = init;