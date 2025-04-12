const form = document.getElementById("addTipForm");

form.onsubmit = (e) => {
  e.preventDefault();

  const tip = {
    id: Date.now(), 
    title: form.title.value,
    description: form.description.value,
    category: form.category.value,
    timestamp: new Date().toLocaleString()
  };

  let tips = JSON.parse(localStorage.getItem("tips")) || [];
  tips.push(tip);
  localStorage.setItem("tips", JSON.stringify(tips));

  alert("Tip added successfully!");
  form.reset();
  window.location.href = "mytips.html";
};