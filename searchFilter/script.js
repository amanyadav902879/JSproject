 // ---------- Static product data ----------
const products = [
  { id: 1, name: "Wireless Earbuds Pro", price: 2499, category: "Electronics", spec: "Bluetooth 5.3, 30hr battery" },
  { id: 2, name: "Smartwatch Series X", price: 4999, category: "Electronics", spec: "AMOLED, heart rate sensor" },
  { id: 3, name: "Portable Bluetooth Speaker", price: 1799, category: "Electronics", spec: "12hr playback, waterproof" },
  { id: 4, name: "Fast Charger 65W", price: 999, category: "Electronics", spec: "GaN, dual USB-C" },
  { id: 5, name: "Mechanical Keyboard", price: 3299, category: "Electronics", spec: "RGB, hot-swappable" },

  { id: 6, name: "Men's Cotton T-Shirt", price: 499, category: "Fashion", spec: "100% cotton, regular fit" },
  { id: 7, name: "Women's Denim Jacket", price: 1899, category: "Fashion", spec: "Slim fit, machine wash" },
  { id: 8, name: "Running Sneakers", price: 2199, category: "Fashion", spec: "Breathable mesh, size 6-11" },
  { id: 9, name: "Leather Wallet", price: 799, category: "Fashion", spec: "Genuine leather, 6 slots" },
  { id: 10, name: "Sunglasses UV400", price: 649, category: "Fashion", spec: "Polarized, unisex" },

  { id: 11, name: "Non-Stick Cookware Set", price: 2899, category: "Home", spec: "5-piece, induction friendly" },
  { id: 12, name: "LED Desk Lamp", price: 899, category: "Home", spec: "Touch dimmer, 3 modes" },
  { id: 13, name: "Memory Foam Pillow", price: 699, category: "Home", spec: "Cervical support, cooling gel" },
  { id: 14, name: "Wall Clock Minimal", price: 549, category: "Home", spec: "Silent sweep, 12 inch" },
  { id: 15, name: "Aroma Diffuser", price: 1199, category: "Home", spec: "300ml, 7 LED colors" },

  { id: 16, name: "Vitamin C Serum", price: 599, category: "Beauty", spec: "20% concentration, 30ml" },
  { id: 17, name: "Hair Dryer 1800W", price: 1399, category: "Beauty", spec: "Ionic, 3 heat settings" },
  { id: 18, name: "Matte Lipstick Set", price: 899, category: "Beauty", spec: "6 shades, long-lasting" },
  { id: 19, name: "Face Wash Neem", price: 249, category: "Beauty", spec: "150ml, oily skin" },
  { id: 20, name: "Electric Trimmer", price: 1099, category: "Beauty", spec: "USB rechargeable, 4 combs" },

  { id: 21, name: "Yoga Mat Premium", price: 999, category: "Sports", spec: "6mm, non-slip" },
  { id: 22, name: "Adjustable Dumbbells", price: 3499, category: "Sports", spec: "2-24kg pair" },
  { id: 23, name: "Football Size 5", price: 799, category: "Sports", spec: "Match quality, all-weather" },
  { id: 24, name: "Cricket Bat Kashmir Willow", price: 1599, category: "Sports", spec: "Full size, lightweight" },
];

// ---------- DOM references ----------
const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const applyPriceBtn = document.getElementById("applyPrice");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

// ---------- Populate category dropdown dynamically ----------
const categories = [...new Set(products.map(p => p.category))];
categories.forEach(cat => {
  const opt = document.createElement("option");
  opt.value = cat;
  opt.textContent = cat;
  categoryFilter.appendChild(opt);
});

// ---------- Render function ----------
function renderCards(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    noResults.style.display = "block";
    resultCount.textContent = "";
    return;
  }

  noResults.style.display = "none";
  resultCount.textContent = `${list.length} product${list.length > 1 ? "s" : ""} mile`;

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-img">${p.name.charAt(0)}</div>
      <div class="card-body">
        <span class="card-category">${p.category}</span>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-spec">${p.spec}</p>
        <p class="card-price">₹${p.price.toLocaleString("en-IN")}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ---------- Core filter logic ----------
function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const sortOrder = sortFilter.value;
  const minPrice = minPriceInput.value !== "" ? Number(minPriceInput.value) : null;
  const maxPrice = maxPriceInput.value !== "" ? Number(maxPriceInput.value) : null;

  let filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesMin = minPrice === null || p.price >= minPrice;
    const matchesMax = maxPrice === null || p.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  if (sortOrder === "low-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderCards(filtered);
}

// ---------- Event listeners ----------
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);
applyPriceBtn.addEventListener("click", applyFilters);

// Allow Enter key inside price inputs to trigger filter too
[minPriceInput, maxPriceInput].forEach(input => {
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") applyFilters();
  });
});

// ---------- Initial render ----------
renderCards(products);
  