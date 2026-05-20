let hours = 0;
let minutes = 0;
let seconds = 0;
let timerInterval = null;
let isRunning = false;
// isRunning prevents the timer from being started twice or adjusted while counting down.
function adjustTime(unit, amount) {
  // can't adjust the buttons/time while timer is running
  if (isRunning) return;

  if (unit === 'hours') {
    hours = Math.max(0, Math.min(99, hours + amount));
  } else if (unit === 'minutes') {
    minutes = Math.max(0, Math.min(59, minutes + amount));
  } else if (unit === 'seconds') {
    seconds = Math.max(0, Math.min(59, seconds + amount));
  }
  // Math.max and Math.min clamp the values within valid ranges so 
// the user cannot set an impossible time like 99 minutes or -1 seconds.

  updateDisplay();
}

// Updates the three span elements in the HTML to show the current 
// hours, minutes, and seconds values.
function updateDisplay() {
  document.getElementById('hours-display').textContent = 
    String(hours).padStart(2, '0');
  document.getElementById('minutes-display').textContent = 
    String(minutes).padStart(2, '0');
  document.getElementById('seconds-display').textContent = 
    String(seconds).padStart(2, '0');
}
// String().padStart(2, '0') ensures numbers always display as two digits. 
// This keeps the timer looking like a proper clock display
//  and prevents the layout from jumping when single digit numbers appear.


function startTimer() {
  // don't start if already running or time is 0
  if (isRunning) return;
  if (hours === 0 && minutes === 0 && seconds === 0) return;

  isRunning = true;

  timerInterval = setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (hours > 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    } else {
      // when all units have reached zero, timer finished notification appears which gives the user 
// clear feedback that their study session is complete,
      clearInterval(timerInterval);
      isRunning = false;
      alert("Time's up, Well Done!");
      return;
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

// Clears the interval and sets all time values back to zero
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  updateDisplay();
}