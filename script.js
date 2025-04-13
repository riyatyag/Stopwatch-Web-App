let timerInterval;
let elapsedTime = 0;
let startTime;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
  const hours = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
  const seconds = String(Math.floor((ms % (1000 * 60)) / 1000)).padStart(2, "0");
  const milliseconds = String(ms % 1000).padStart(3, "0");
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
  clearLaps();
}

function addLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement("li");
    lapElement.textContent = `Lap ${lapsContainer.children.length + 1} - ${lapTime}`;
    lapElement.style.backgroundColor = getRandomColor();
    lapsContainer.appendChild(lapElement);
  }
}

function getRandomColor() {
  const colors = ["#ff7eb3", "#6f42c1", "#20c997", "#fd7e14", "#e83e8c", "#17a2b8"];
  return colors[Math.floor(Math.random() * colors.length)];
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
