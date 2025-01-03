// Elements
const setTimeButton = document.getElementById("setTimeButton");
const timeModal = document.getElementById("timeModal");
const closeModal = document.getElementById("closeModal");
const saveTimeBtn = document.getElementById("saveTimeBtn");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");
const dateTimeInput = document.getElementById("dateTime");

// Show Modal
setTimeButton.addEventListener("click", () => {
  timeModal.style.display = "block";
});

// Close Modal
closeModal.addEventListener("click", () => {
  timeModal.style.display = "none";
});

// Save the time
saveTimeBtn.addEventListener("click", () => {
  const selectedDateTime = new Date(dateTimeInput.value);
  if (selectedDateTime.getTime() > Date.now()) {
    localStorage.setItem("targetTime", selectedDateTime.getTime());
    startTimer(selectedDateTime.getTime());
    timeModal.style.display = "none";
  } else {
    alert("Please select a valid future date and time.");
  }
});

// Load target time from localStorage
const savedTargetTime = localStorage.getItem("targetTime");
if (savedTargetTime) {
  startTimer(parseInt(savedTargetTime));
} else {
  timerElement.innerHTML = "No timer set";
}

function startTimer(targetTime) {
  function updateTimer() {
    const now = new Date().getTime();
    const remainingTime = targetTime - now;
    
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerElement.innerHTML = "Timer Completed!";
      messageElement.innerHTML = "";
    } else {
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);
      const timeString = `${hours}h ${minutes}m ${seconds}s`;
      timerElement.innerHTML = timeString;
      messageElement.innerHTML = "Time Left";
    }
  }

  // Update the timer every second
  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}
