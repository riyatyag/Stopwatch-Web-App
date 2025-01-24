let timerInterval;
let elapsedTime = 0;
let startTime;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const hours = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTimerDisplay();
    }, 10);
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function restartTimer() {
  pauseTimer();
  elapsedTime = 0;
  updateTimerDisplay();
  startTimer();
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  updateTimerDisplay();
  lapsContainer.innerHTML = "";
}

function addLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement("li");
    lapElement.textContent = lapTime;
    lapsContainer.appendChild(lapElement);
  }
}

function clearLaps() {
  lapsContainer.innerHTML = "";
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("restart").addEventListener("click", restartTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", addLap);
document.getElementById("clearLaps").addEventListener("click", clearLaps);
