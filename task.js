import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDt6OItzUF0TXKygTGuDo9yER3C2ue_Qvo",
  authDomain: "web-app-7cd19.firebaseapp.com",
  projectId: "web-app-7cd19",
  storageBucket: "web-app-7cd19.appspot.com",
  messagingSenderId: "114458486905",
  appId: "1:114458486905:web:ae37f24178ad679eb9cca8",
  measurementId: "G-7QL4CECQQ8",
  databaseURL: "https://web-app-7cd19-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let tips = { todo: [], inProgress: [], done: [] };
let editingTip = null;

const form = document.getElementById('addTipForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const assignInput = document.getElementById('assign');
const tipCardsContainer = document.getElementById('tipCards');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTip = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    assign: assignInput.value.trim()
  };

  set(ref(db, 'student data/' + newTip.title), newTip)
    .then(() => {
      alert("✅ Task saved!");
      if (editingTip) {
        tips[editingTip.status][editingTip.index] = newTip;
        editingTip = null;
      } else {
        tips.todo.push(newTip); 
      }

      form.reset();
      renderCards();
    })
    .catch((err) => console.error("Firebase save error:", err));
});

function renderCards() {
  tipCardsContainer.innerHTML = '';
  const statuses = ['todo', 'inProgress', 'done'];

  statuses.forEach(status => {
    const col = document.createElement('div');
    col.className = 'bg-white rounded-lg p-4 shadow min-h-[300px] flex flex-col gap-4';
    col.ondragover = (e) => e.preventDefault();
    col.ondrop = (e) => handleDrop(e, status);

    const heading = document.createElement('h2');
    heading.className = 'text-xl font-semibold text-center capitalize text-blue-700';
    heading.textContent = status.replace(/([A-Z])/g, ' $1');

    col.appendChild(heading);

    tips[status].forEach((tip, index) => {
      const card = document.createElement('div');
      card.className = 'p-4 bg-blue-100 rounded shadow hover:shadow-lg transition cursor-move';
      card.draggable = true;
      card.dataset.index = index;
      card.dataset.status = status;

      card.ondragstart = (event) => {
        card.classList.add('opacity-50');
        event.dataTransfer.setData('text/plain', JSON.stringify({ index, status }));
      };
      card.ondragend = () => card.classList.remove('opacity-50');

      card.innerHTML = `
        <h3 class="font-bold text-lg mb-1">${tip.title}</h3>
        <p class="text-sm text-gray-700">${tip.description}</p>
        <p class="text-xs mt-1 text-gray-500">Assigned to: ${tip.assign || 'Unassigned'}</p>
        <div class="mt-3 flex gap-2">
          <button class="editBtn bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
          <button class="deleteBtn bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          <button class="moveBtn bg-yellow-500 text-white px-3 py-1 rounded">Next →</button>
        </div>
      `;

      card.querySelector('.editBtn').onclick = () => handleEdit(tip, status, index);
      card.querySelector('.deleteBtn').onclick = () => handleDelete(status, index);
      card.querySelector('.moveBtn').onclick = () => handleMoveToNext(status, index);

      col.appendChild(card);
    });

    tipCardsContainer.appendChild(col);
  });
}

function handleEdit(tip, status, index) {
  titleInput.value = tip.title;
  descriptionInput.value = tip.description;
  assignInput.value = tip.assign;
  editingTip = { status, index };
}

function handleDelete(status, index) {
  tips[status].splice(index, 1);
  renderCards();
}

function handleMoveToNext(status, index) {
  const flow = ['todo', 'inProgress', 'done'];
  const nextStatus = flow[flow.indexOf(status) + 1];
  if (!nextStatus) return;

  const [tip] = tips[status].splice(index, 1);
  tips[nextStatus].push(tip);
  renderCards();
}

function handleDrop(e, targetStatus) {
  const { index, status } = JSON.parse(e.dataTransfer.getData('text/plain'));
  const [tip] = tips[status].splice(index, 1);
  tips[targetStatus].push(tip);
  renderCards();
}

renderCards();