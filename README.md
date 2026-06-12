# card-fetching
# Async User Directory
## Features

*   **API Integration:** Fetches live data from the JSONPlaceholder REST API.
*   **Loading State:** Displays a CSS-animated spinner while the network request is pending.
*   **Error Handling:** Gracefully catches network failures or invalid HTTP responses and displays a user-friendly error message instead of breaking the page.
*   **Responsive Design:** Uses CSS Grid to automatically adjust the number of cards per row based on the screen size.

## Core Concepts Demonstrated

This project is built to showcase the following JavaScript concepts:
*   **The Fetch API:** Using `fetch()` to make HTTP GET requests and parsing responses with `.json()`.
*   **Promises & Async/Await:** Writing asynchronous code that reads like synchronous code, avoiding traditional "Callback Hell" and `.then()` chaining.
*   **Try / Catch / Finally:** Handling standard execution (`try`), catching and managing errors (`catch`), and cleaning up UI states like loading spinners regardless of the outcome (`finally`).

## Project Files

*   `index.html` — Contains the structural layout, including hidden containers for the loading spinner and error messages.
*   `style.css` — Contains all the visual styling, including the `.hidden` utility class used to toggle UI elements via JavaScript.
*   `script.js` — Contains the `async` functions, API calls, and DOM injection logic.
