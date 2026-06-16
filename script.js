// --- DOM Elements: Navigation & Views ---
const homeView = document.getElementById('home-view');
const directoryView = document.getElementById('directory-view');
const navHome = document.getElementById('nav-home');
const navDirectory = document.getElementById('nav-directory');
const ctaBtn = document.getElementById('cta-btn');
const errorHomeBtn = document.getElementById('error-home-btn');

// --- DOM Elements: Directory ---
const usersGrid = document.getElementById('users-grid');
const loader = document.getElementById('loader');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');

// Track if we've already fetched users so we don't do it twice unnecessarily 
let usersLoaded = false;

// --- Navigation Logic ---
function showHome() {
    homeView.classList.remove('hidden');
    directoryView.classList.add('hidden');
    navHome.classList.add('active');
    navDirectory.classList.remove('active');
}

function showDirectory() {
    homeView.classList.add('hidden');
    directoryView.classList.remove('hidden');
    navHome.classList.remove('active');
    navDirectory.classList.add('active');
    
    // Fetch users only if we haven't already
    if (!usersLoaded) {
        fetchAndDisplayUsers();
    }
}

// --- Event Listeners ---
navHome.addEventListener('click', showHome);
navDirectory.addEventListener('click', showDirectory);
ctaBtn.addEventListener('click', showDirectory);
errorHomeBtn.addEventListener('click', showHome);

// --- Fetch Logic ---
async function fetchAndDisplayUsers() {
    loader.classList.remove('hidden');
    errorContainer.classList.add('hidden');
    usersGrid.innerHTML = ''; 

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const users = await response.json();
        displayUsers(users);
        usersLoaded = true; // Mark as successful so we don't fetch again

    } catch (error) {
        console.error("Fetching failed:", error);
        errorMessage.textContent = "Failed to load users. Please check your connection or try again later.";
        errorContainer.classList.remove('hidden');
        usersLoaded = false; // Allow retrying if they come back to this screen
        
    } finally {
        loader.classList.add('hidden');
    }
}

// --- UI Logic ---
function displayUsers(users) {
    users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('card');
        const initial = user.name.charAt(0);

        card.innerHTML = `
            <div class="card-header">
                <div class="avatar">${initial}</div>
                <h2>${user.name}</h2>
            </div>
            <div class="card-body">
                <p><strong>Username:</strong> @${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
            </div>
        `;
        usersGrid.appendChild(card);
    });
}