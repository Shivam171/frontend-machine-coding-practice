import { suggestionsList } from './list.js';

const userInput = document.getElementById('userInput');
const suggestionsContainer = document.getElementById('suggestionsContainer');


function debounce(func, wait = 500) {
    let timeout;
    return function (...args) {
        // Preserve Context
        const context = this;

        // Clear the previous timer
        clearInterval(timeout);

        // Set a new timer
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait)
    }
}

// Function to render suggestions
function renderSuggestions(matches) {
    // Clear existing suggestions
    suggestionsContainer.innerHTML = '';

    // if the matches are 0 then show no results found
    if (matches.length === 0) {
        suggestionsContainer.innerHTML = '<li class="p-3 text-gray-500">No results found!</li>';
        return;
    }

    // Populate the suggestions container
    matches.forEach(match => {
        // Create a list item
        const listItem = document.createElement('li');
        // Add style to list item
        listItem.className = 'list-items border-t border-zinc-500 hover:bg-zinc-300 cursor-pointer p-3';
        // Add result to list item
        listItem.textContent = match;
        // Add click event to fill the input with the selected suggestion
        listItem.addEventListener("click", () => {
            userInput.value = match;
            suggestionsContainer.classList.add('hidden');
        })
        // Putting list item in list
        suggestionsContainer.appendChild(listItem)
    });

    // finally hide the list back
    suggestionsContainer.classList.remove('hidden');
}

// Debounce input handler
const handleInput = debounce((event) => {
    const query = event.target.value.trim().toLowerCase();
    if (query === '') {
        suggestionsContainer.classList.add('hidden');
        return;
    }
    
    // Show "Loading..." message
    suggestionsContainer.innerHTML = '<li class="p-3 text-gray-500">Loading...</li>';
    suggestionsContainer.classList.remove('hidden');

    setTimeout(() => {
        const matches = suggestionsList.filter((country) =>
            country.toLowerCase().includes(query)
        );
        renderSuggestions(matches);
    }, 500)
}, 500)

// Adding event listener for input events
userInput.addEventListener('input', handleInput)