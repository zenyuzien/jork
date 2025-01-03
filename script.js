const timeLeftDisplay = document.getElementById("timeLeft");
const setTimeButton = document.getElementById("setTimeButton");
const clearButton = document.getElementById("clearButton");
const timerSettings = document.querySelector(".timer-settings");
const datetimeInput = document.getElementById("datetimeInput");
const setTimerButton = document.getElementById("setTimer");
const pastRecords = document.getElementById("pastRecords");
const recordsList = document.getElementById("recordsList");

// Get saved timer from localStorage
let savedTimer = localStorage.getItem("timer");
let timerData = savedTimer ? JSON.parse(savedTimer) : null;

// Check if there's an active timer and show it
function updateTimeDisplay() {
    if (timerData) {
        const now = new Date().getTime();
        const timeLeft = timerData.time - now; // Calculate time difference in milliseconds
        if (timeLeft > 0) {
            timeLeftDisplay.textContent = formatTime(timeLeft);
        } else {
            timeLeftDisplay.textContent = "Timer completed";
            localStorage.removeItem("timer"); // Remove the timer from localStorage once it's completed
            timerData = null; // Reset the timerData
        }
    } else {
        timeLeftDisplay.textContent = "No timer set";
    }
}

// Format time (milliseconds) into HH:MM:SS
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Set a new timer
setTimerButton.addEventListener("click", () => {
    const dateTime = new Date(datetimeInput.value).getTime();
    const currentTime = new Date().getTime(); // Get the current time in milliseconds

    if (dateTime > currentTime) {
        timerData = { time: dateTime };
        localStorage.setItem("timer", JSON.stringify(timerData)); // Save the timer to localStorage
        updateTimeDisplay();
        saveTimerRecord(dateTime); // Save this timer to past records
        timerSettings.classList.add("hidden"); // Hide the timer settings panel
    } else {
        alert("Please set a time in the future.");
    }
});

// Save past timer records
function saveTimerRecord(timerEnd) {
    let pastTimers = JSON.parse(localStorage.getItem("pastTimers")) || [];
    if (pastTimers.length >= 5) {
        pastTimers.pop();  // Remove the oldest record
    }
    pastTimers.unshift(new Date(timerEnd).toLocaleString()); // Add the new record to the beginning
    localStorage.setItem("pastTimers", JSON.stringify(pastTimers)); // Save it to localStorage
    displayPastRecords();
}

// Display past timer records
function displayPastRecords() {
    let pastTimers = JSON.parse(localStorage.getItem("pastTimers")) || [];
    recordsList.innerHTML = '';
    pastTimers.forEach(record => {
        const li = document.createElement("li");
        li.textContent = record;
        recordsList.appendChild(li);
    });
}

// Show the settings to set a timer
setTimeButton.addEventListener("click", () => {
    timerSettings.classList.toggle("hidden");
    if (!timerSettings.classList.contains("hidden")) {
        datetimeInput.value = ''; // Clear the datetime input when the settings are shown
    }
});

// Clear the timer
clearButton.addEventListener("click", () => {
    localStorage.removeItem("timer");
    timerData = null;
    timeLeftDisplay.textContent = "No timer set";
});

// Show past timers
pastRecords.addEventListener("click", () => {
    displayPastRecords();
    pastRecords.classList.toggle("hidden");
});

// Initial Update of the Timer Display
updateTimeDisplay();
displayPastRecords();
