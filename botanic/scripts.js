// Plant Database
const plants = [
    {
        id: 1,
        name: "Monstera Deliciosa",
        category: "indoor",
        price: 48.00,
        rating: 4.9,
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800",
        description: "Famous for its natural leaf holes, this tropical classic brings instant jungle vibes to any space."
    },
    {
        id: 2,
        name: "Fiddle Leaf Fig",
        category: "indoor",
        price: 65.00,
        rating: 4.8,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=80&w=800",
        description: "Stunning sculptural violin-shaped leaves make this the ultimate statement houseplant."
    },
    {
        id: 3,
        name: "Echeveria Elegans",
        category: "succulent",
        price: 18.00,
        rating: 4.9,
        badge: "Pet Friendly",
        image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=800",
        description: "Compact rosettes of pale blue-green leaves. Incredibly resilient and easy to grow."
    },
    {
        id: 4,
        name: "Pink Princess Philodendron",
        category: "rare",
        price: 89.00,
        rating: 5.0,
        badge: "Rare Find",
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
        description: "Highly sought-after tropical beauty featuring deep dark leaves splashed with vibrant bubblegum pink."
    },
    {
        id: 5,
        name: "Snake Plant Sansevieria",
        category: "indoor",
        price: 32.00,
        rating: 4.9,
        badge: "Hardy",
        image: "https://i.pinimg.com/736x/81/89/88/8189880f4ce1aa2ebbeceee064e60dca.jpg",
        description: "Virtually indestructible air-purifying plant that thrives on neglect and low light."
    },
    {
        id: 6,
        name: "Jade Succulent",
        category: "succulent",
        price: 24.00,
        rating: 4.7,
        badge: "Classic",
        image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=800",
        description: "Symbol of good fortune with thick woody stems and glossy oval leaves."
    },
    {
        id: 7,
        name: "Alocasia Polly",
        category: "rare",
        price: 54.00,
        rating: 4.8,
        badge: "Exotic",
        image: "https://i.pinimg.com/1200x/cb/68/a2/cb68a20cdb904bd8a4efac04e52d77de.jpg",
        description: "Striking arrow-shaped dark leaves with prominent silvery-white veins."
    },
    {
        id: 8,
        name: "Golden Pothos",
        category: "indoor",
        price: 22.00,
        rating: 4.9,
        badge: "Easy Care",
        image: "https://i.pinimg.com/736x/9e/8d/a1/9e8da1424521245dd1aa8859af61e9bc.jpg",
        description: "Cascading vines with heart-shaped variegated leaves. Perfect for hanging planters or shelves."
    }
];

let cart = [];

// Render Product Catalog
function renderProducts(category = 'all') {
    const grid = document.getElementById('product-grid');
    const filtered = category === 'all' ? plants : plants.filter(p => p.category === category);
    
    grid.innerHTML = filtered.map(plant => `
        <div class="bg-botanical-800 rounded-3xl border border-botanical-700/60 overflow-hidden card-hover flex flex-col justify-between">
            <div class="relative aspect-square overflow-hidden bg-botanical-900/50">
                <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://placehold.co/400x400/132e24/eef3f1?text=Plant'">
                <span class="absolute top-3 left-3 bg-botanical-900/80 backdrop-blur-md text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-botanical-700">${plant.badge}</span>
                <div class="absolute top-3 right-3 bg-botanical-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <i class="fa-solid fa-star text-amber-400 text-[10px]"></i> ${plant.rating}
                </div>
            </div>
            <div class="p-6 flex flex-col flex-1 justify-between">
                <div>
                    <h3 class="font-bold text-white text-lg mb-1">${plant.name}</h3>
                    <p class="text-botanical-100/70 text-xs line-clamp-2 mb-4">${plant.description}</p>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-botanical-700/60">
                    <span class="text-xl font-extrabold text-white">$${plant.price.toFixed(2)}</span>
                    <button onclick="addToCart(${plant.id})" class="px-4 py-2 rounded-xl bg-sage-accent hover:bg-sage-light text-white text-sm font-medium transition shadow-md flex items-center gap-2">
                        <i class="fa-solid fa-plus text-xs"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Switcher
function filterPlants(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-sage-accent', 'text-white');
        btn.classList.add('text-botanical-100/70');
        if(btn.dataset.category === category) {
            btn.classList.add('bg-sage-accent', 'text-white');
            btn.classList.remove('text-botanical-100/70');
        }
    });
    renderProducts(category);
}

// Cart Actions
function addToCart(id) {
    const plant = plants.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...plant, qty: 1 });
    }
    updateCartUI();
    showToast(`Added ${plant.name} to your bag!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const container = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    badge.textContent = totalCount;
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 text-botanical-100/50">
                <i class="fa-solid fa-bag-shopping text-4xl mb-3 block"></i>
                <p class="text-sm">Your shopping bag is currently empty.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="py-4 flex items-center gap-4">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-2xl object-cover bg-botanical-900">
            <div class="flex-1">
                <h4 class="font-bold text-white text-sm">${item.name}</h4>
                <p class="text-sage-accent text-sm font-semibold mt-0.5">$${item.price.toFixed(2)}</p>
                <div class="flex items-center gap-3 mt-2">
                    <button onclick="updateCartQuantity(${item.id}, -1)" class="w-6 h-6 rounded-lg bg-botanical-700 text-white flex items-center justify-center text-xs hover:bg-botanical-600">-</button>
                    <span class="text-xs font-bold text-white">${item.qty}</span>
                    <button onclick="updateCartQuantity(${item.id}, 1)" class="w-6 h-6 rounded-lg bg-botanical-700 text-white flex items-center justify-center text-xs hover:bg-botanical-600">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-botanical-100/40 hover:text-red-400 p-2">
                <i class="fa-solid fa-trash-can text-sm"></i>
            </button>
        </div>
    `).join('');
}

// Modals & UI Toggles
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('hidden');
}

function toggleSearch() {
    const modal = document.getElementById('search-modal');
    modal.classList.toggle('hidden');
    if(!modal.classList.contains('hidden')) {
        document.getElementById('search-input').focus();
    }
}

function handleSearch(query) {
    const results = document.getElementById('search-results');
    if(!query.trim()) {
        results.innerHTML = `<p class="text-sm text-botanical-100/50 text-center py-4">Type to start searching our collection...</p>`;
        return;
    }
    const filtered = plants.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));
    if(filtered.length === 0) {
        results.innerHTML = `<p class="text-sm text-botanical-100/50 text-center py-4">No plants found matching "${query}".</p>`;
        return;
    }
    results.innerHTML = filtered.map(plant => `
        <div onclick="toggleSearch(); addToCart(${plant.id});" class="flex items-center gap-4 p-3 rounded-2xl hover:bg-botanical-700/50 cursor-pointer transition">
            <img src="${plant.image}" class="w-12 h-12 rounded-xl object-cover">
            <div class="flex-1">
                <h4 class="font-bold text-white text-sm">${plant.name}</h4>
                <p class="text-xs text-botanical-100/60 uppercase">${plant.category} • $${plant.price.toFixed(2)}</p>
            </div>
            <span class="text-xs bg-sage-accent text-white px-3 py-1.5 rounded-xl font-medium">Add to Cart</span>
        </div>
    `).join('');
}

function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.fa-chevron-down');
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = msg;
    toast.classList.remove('translate-y-32', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-32', 'opacity-0');
    }, 3000);
}

function checkout() {
    if(cart.length === 0) return;
    showToast('Order placed successfully! Thank you for choosing Flora & Co.');
    cart = [];
    updateCartUI();
    toggleCart();
}

// Initialize on load
window.onload = function() {
    renderProducts();
}