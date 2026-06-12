// Grab references to our DOM elements
const usersGrid = document.getElementById('users-grid');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

async function fetchAndDisplayUsers() {
    // 1. Show the loading spinner and hide previous errors/data
    loader.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    usersGrid.innerHTML = ''; 

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON body using await
        const users = await response.json();
        //Build the UI
        displayUsers(users);

    } catch (error) {
        console.error("Fetching failed:", error);
        errorMessage.textContent = "Failed to load users. Please check your connection or try again later.";
        errorMessage.classList.remove('hidden');
        
    } finally {
        loader.classList.add('hidden');
    }
}

//  function to create cards and append
function displayUsers(users) {
    users.forEach(user => {
        // Create the card container
        const card = document.createElement('div');
        card.classList.add('card');
        // Insert the user data as HTML
        card.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Username:</strong> @${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        `;
 // Append to the grid
        usersGrid.appendChild(card);
    });
}

// Execute the function when the script loads
fetchAndDisplayUsers();