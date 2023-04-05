let startTime;
let elapsedTime = 0;
let timerInterval;

const timer = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

function startTimer() {
    const durationInMinutes = parseInt(document.getElementById("duration").value);
    const durationInMs = durationInMinutes * 60 * 1000;
    startTime = Date.now();
    timerInterval = setInterval(() => {
      const elapsedTimeMs = Date.now() - startTime;
      const remainingTimeMs = durationInMs - elapsedTimeMs;
      if (remainingTimeMs <= 0) {
        stopTimer();
        signal.play();
      } else {
        elapsedTime = elapsedTimeMs;
        updateTimer();
      }
    }, 10);
    startButton.classList.add("active");
    stopButton.classList.remove("active");
    resetButton.classList.add("disabled");
  }
  

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = Date.now();
    elapsedTime = 0;
    updateTimer();
    startButton.classList.remove("active");
    stopButton.classList.remove("active");
    resetButton.classList.add("disabled");
  }
  

function updateTimer() {
  const elapsedTimeMs = Date.now() - startTime;
  elapsedTime = elapsedTimeMs;
  const formattedTime = formatTime(elapsedTimeMs);
  timer.textContent = formattedTime;
}

function formatTime(timeMs) {
  const date = new Date(timeMs);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);


const addPlayerButton = document.getElementById("add-player");
addPlayerButton.addEventListener("click", function() {
  const tbody = document.querySelector("#results tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" class="player-name" value=""></td>
    <td id=""-score"><input type="number" class="player-score" value="0"></td>
    <td><button class="edit-button">Actualizar</button></td>
  `;
  tbody.appendChild(newRow);

  // Agregar controlador de eventos al botón "Actualizar" recién agregado
  const editButton = newRow.querySelector(".edit-button");
  editButton.addEventListener("click", function() {
    const row = editButton.closest("tr");
    const name = row.querySelector(".player-name").value;
    const score = parseInt(row.querySelector(".player-score").value);
    updatePlayer(name, score);
  });
});


const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach(function(editButton) {
  editButton.addEventListener("click", function() {
    const row = editButton.closest("tr");
    const name = row.querySelector(".player-name").value;
    const score = parseInt(row.querySelector(".player-score").value);
    updatePlayer(name, score);
  });
});

function updatePlayer(name, score) {
  const scoreCell = document.getElementById(`${name}-score`);
  if (scoreCell) {
    scoreCell.textContent = score;
  } else {
    const tbody = document.querySelector("#results tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${name}</td>
      <td id="${name}-score">${score}</td>
      <td><button class="edit-button">Actualizar</button></td>
    `;
    tbody.appendChild(newRow);
  }
}

const saveButton = document.getElementById("save");
saveButton.addEventListener("click", function() {
  const results = {};
  const rows = document.querySelectorAll("#results tbody tr");
  rows.forEach(function(row) {
    const nameElement = row.querySelector(".player-name");
    const scoreElement = row.querySelector(".player-score");
    if (nameElement && scoreElement) {
      const name = nameElement.value;
      const score = parseInt(scoreElement.value);
      results[name] = score;
    }
  });
  localStorage.setItem("results", JSON.stringify(results));
});


// Cargar los datos guardados en el almacenamiento local
const savedResults = localStorage.getItem("results");
if (savedResults) {
  const results = JSON.parse(savedResults);
  for (const name in results) {
    const score = results[name];
    updatePlayer(name, score);
  }
}

// Agregar controlador de eventos al botón "Eliminar"
const deleteButton = newRow.querySelector(".delete-button");
deleteButton.addEventListener("click", function() {
  const row = deleteButton.closest("tr");
  const name = row.querySelector(".player-name").value;
  deletePlayer(name);
  row.remove();
});

function deletePlayer(name) {
  const results = getResultsFromStorage();
  delete results[name];
  localStorage.setItem("results", JSON.stringify(results));
}


