const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});


  document.getElementById("addTipForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;

    if (!title || !description || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const card = document.createElement("div");
    card.className = "p-4 bg-white shadow rounded border border-gray-200";

    card.innerHTML = `
      <h3 class="text-xl font-semibold text-blue-600">${title}</h3>
      <p class="text-gray-700 mt-2">${description}</p>
      <span class="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded">${category}</span>
      <div class="mt-4 flex gap-2">
        <button class="editBtn bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">Edit</button>
        <button class="deleteBtn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
      </div>
    `;

    document.getElementById("tipsContainer").appendChild(card);

  
    card.querySelector(".deleteBtn").addEventListener("click", function () {
      card.remove();
    });

   
    card.querySelector(".editBtn").addEventListener("click", function () {
      document.getElementById("title").value = title;
      document.getElementById("description").value = description;
      document.getElementById("category").value = category;
      card.remove();
    });

    this.reset();
  });

  // Mobile menu toggle
  //document.getElementById("menuToggle").addEventListener("click", function () {
   // document.getElementById("mobileMenu").classList.toggle("hidden");
  //});

