let items = [];
let filteredItems = [];

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag]));
}

async function loadItems(){
  try{
    const res = await fetch("/api/items");
    items = await res.json();
    filteredItems = [...items];
    renderItems();
  } catch (err){
    console.error("Failed to load iems:", err);
  }
}

document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const response = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    alert("Error submitting item");
    return;
  }

  await loadItems();
  e.target.reset();

  showToast("Item submitted successfully!");
});

function renderItems() {
  const container = document.getElementById("items");
  container.innerHTML = "";

  filteredItems.forEach(item => {
    const badgeClass = item.status === "Active" ? "badge-active" : "badge-claimed";

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="badge ${badgeClass}">${item.status}</span>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.description)}</p>
      <p><strong>Location:</strong> ${escapeHTML(item.location)}</p>
      <p><strong>Date:</strong> ${new Date(item.date).toLocaleDateString()}</p>
    `;

    const statusBtn = document.createElement("button");
    statusBtn.textContent = "Mark Claimed";

    if (item.status === "Claimed") {
      statusBtn.disabled = true;
      statusBtn.classList.add("btn-disabled");
    } else {
      statusBtn.addEventListener("click", () => {
        markClaimed(item.id);
      });
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteItem(item.id);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "card-buttons";
    buttonContainer.appendChild(statusBtn);
    buttonContainer.appendChild(deleteBtn);

    card.appendChild(buttonContainer);
    container.appendChild(card);
  });
}

async function submitForm(data) {
  try {
    await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      
    });
  await loadItems();
  } catch (err) {
    console.error("Error creating item:", err);
  }
}

async function deleteItem(id) {

  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  await fetch(`/api/items/${id}`, {
    method: "DELETE",
  });

  await loadItems();
}


async function markClaimed(id) {
  await fetch(`/api/items/${id}`, {
    method: "PUT"
  });
  loadItems();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
/* SEARCH */
document.getElementById("searchInput").addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(keyword) ||
    item.location.toLowerCase().includes(keyword)
  );
  renderItems();
});

/* SORT */
document.getElementById("sortSelect").addEventListener("change", e => {
  if (e.target.value === "newest") {
    filteredItems.sort((a,b) => new Date(b.date) - new Date(a.date));
  } else {
    filteredItems.sort((a,b) => new Date(a.date) - new Date(b.date));
  }
  renderItems();
});

loadItems();