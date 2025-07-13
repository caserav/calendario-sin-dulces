const goalData = [
  { date: "14 julio", target: 57 },
  { date: "18 julio", target: 56 },
  { date: "21 julio", target: 55 },
  { date: "25 julio", target: 54 },
  { date: "28 julio", target: 53 }
];

let timelineEl = document.getElementById("timeline");
let modal = document.getElementById("weightModal");
let modalTitle = document.getElementById("modalTitle");
let modalTarget = document.getElementById("modalTarget");
let decreaseBtn = document.getElementById("decreaseWeight");
let increaseBtn = document.getElementById("increaseWeight");
let currentWeightDisplay = document.getElementById("currentWeightDisplay");
let saveWeightBtn = document.getElementById("saveWeight");
let closeModalBtn = document.getElementById("closeModal");
let messageModal = document.getElementById("messageModal");
let messageText = document.getElementById("messageText");
let closeMessageModalBtn = document.getElementById("closeMessageModal");
let resetBtn = document.getElementById("resetBtn");

let currentModalIndex = 0;
let currentWeight = 57.0;
let userData = JSON.parse(localStorage.getItem("weightData")) || {};

initTimeline();

function initTimeline() {
  timelineEl.innerHTML = "";
  goalData.forEach((data, index) => {
    const item = document.createElement("div");
    item.classList.add("timeline-item");
    if (userData[data.date] !== undefined) item.classList.add("completed");

    let icon = "🚩";
    if (index === 0) icon = "🚩";
    if (index === goalData.length - 1) icon = "🏁";

    let weightText = userData[data.date] !== undefined
      ? `${userData[data.date]} kg`
      : `${data.target} kg`;

    item.innerHTML = `
      <div class="circle" data-index="${index}">
        ${icon}<br>${weightText}
      </div>
      <div class="label">${data.date}</div>
    `;

    item.querySelector(".circle").addEventListener("click", () => {
      openModal(index);
    });

    timelineEl.appendChild(item);
  });
}

function openModal(index) {
  currentModalIndex = index;
  const data = goalData[index];

  modalTitle.textContent = `Peso el ${data.date}`;
  modalTarget.textContent = `Objetivo: ${data.target} kg`;

  if (index === 0) {
    currentWeight = 57.0;
  } else {
    let prevDate = goalData[index - 1].date;
    currentWeight = userData[prevDate] || data.target;
  }

  currentWeightDisplay.textContent = currentWeight.toFixed(1);
  modal.style.display = "block";
}

decreaseBtn.addEventListener("click", () => {
  currentWeight -= 0.1;
  if (currentWeight < 30) currentWeight = 30;
  currentWeightDisplay.textContent = currentWeight.toFixed(1);
});

increaseBtn.addEventListener("click", () => {
  currentWeight += 0.1;
  currentWeightDisplay.textContent = currentWeight.toFixed(1);
});

saveWeightBtn.addEventListener("click", () => {
  const date = goalData[currentModalIndex].date;
  const weight = parseFloat(currentWeight.toFixed(1));
  const target = goalData[currentModalIndex].target;

  userData[date] = weight;
  localStorage.setItem("weightData", JSON.stringify(userData));

  modal.style.display = "none";

  let message = "";
  if (weight <= target) {
    message = "✅ Muy bien Mar! Objetivo conseguido!";
    if (currentModalIndex === goalData.length - 1) {
      message = "🎆 ¡META CONSEGUIDA! Disfruta Huelva 🎆";
    }
  } else {
    message = "❌ Hay que seguir apretando!";
  }

  showMessageModal(message);
  initTimeline();
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

closeMessageModalBtn.addEventListener("click", () => {
  messageModal.style.display = "none";
});

resetBtn.addEventListener("click", () => {
  if (confirm("¿Seguro que quieres reiniciar el reto?")) {
    localStorage.removeItem("weightData");
    userData = {};
    initTimeline();
  }
});

function showMessageModal(msg) {
  messageText.textContent = msg;
  messageModal.style.display = "block";
}


