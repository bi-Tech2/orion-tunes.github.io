document.addEventListener('DOMContentLoaded', function() {
    const tabsBox = document.querySelector('.tabs-box');
    const arrowIcons = document.querySelectorAll('.icon i');

    let isDragging = false;

    const handleIcons = (scrollVal) => {
        const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
        arrowIcons[0].parentElement.style.display = scrollVal > 0 ? 'flex' : 'none';
        arrowIcons[1].parentElement.style.display = maxScrollableWidth > scrollVal ? 'flex' : 'none';
    };

    arrowIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            let scrollWidth = tabsBox.scrollLeft += icon.id === 'left' ? -340 : 340;
            handleIcons(tabsBox.scrollLeft);
        });
    });

    tabsBox.addEventListener('mousedown', () => isDragging = true);
    tabsBox.addEventListener('mousemove', (e) => {
        if(!isDragging) return;
        tabsBox.classList.add('dragging');
        tabsBox.scrollLeft -= e.movementX;
        handleIcons(tabsBox.scrollLeft);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        tabsBox.classList.remove('dragging');
    });

    tabsBox.addEventListener('scroll', () => handleIcons(tabsBox.scrollLeft));
});

// Function to check if the search input is empty
function isSearchInputEmpty() {
    const searchInput = document.getElementById('search-input');
    return searchInput.value.trim() === '';
}

// Event listener for clicks on the document
document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('search-input');
    const elements = document.querySelectorAll('#dn');

    // Check if the click was outside the search input
    if (!searchInput.contains(event.target)) {
        // If search input is empty, show elements with id="dn"
        if (isSearchInputEmpty()) {
            elements.forEach(function(element) {
                element.style.display = 'block'; // Assuming they were originally set to display: none; in CSS
            });
        }
    } else {
        // Click was inside the search input, hide elements with id="dn"
        elements.forEach(function(element) {
            element.style.display = 'none';
        });
    }
});

// Event listener for input focus to initially hide elements with id="dn"
document.getElementById('search-input').addEventListener('focus', function() {
    const elements = document.querySelectorAll('#dn');
    elements.forEach(function(element) {
        element.style.display = 'none';
    });
});

const searchInput = document.getElementById('search-input');
const autocompleteList = document.getElementById('autocomplete-list');

// List of autocomplete options with corresponding types and URLs
const autocompleteOptions = [
    { name: "Davido", type: "artist", url: "davido.html" },
    { name: "Rema", type: "artist", url: "rema.html" },
    { name: "Asake", type: "artist", url: "asake.html" },



    { name: "For You - Davido ft Teni", type: "music", url: "for-you.html" },
    { name: "Option 4", type: "music", url: "option4.html" },



    { name: "Work Of Art", type: "album", url: "workofart.html" },
    { name: "Option 5", type: "album", url: "option5.html" },



    { name: "Insight", type: "blog", url: "news.html" },
    { name: "How Music Changed The World", type: "blog", url: "news.html" },



    { name: "Party Starter", type: "recommended", url: "listen2.html" },
    { name: "Option 5", type: "recommended", url: "option5.html" }
];

// Function to filter autocomplete options based on input value
function filterOptions(inputValue) {
    return autocompleteOptions.filter(option =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
}

// Function to display loading spinner
function showLoadingSpinner() {
    autocompleteList.innerHTML = '<li><div class="spinner"></div>Loading...</li>';
    autocompleteList.style.display = 'block';
}

// Function to display autocomplete options or "No Results Found"
function displayOptions(options) {
    if (options.length > 0) {
        autocompleteList.innerHTML = '';
        options.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option.name;
            const span = document.createElement('span');
            span.textContent = `(${option.type})`;
            span.className = 'type';
            li.appendChild(span);
            li.addEventListener('click', function() {
                window.location.href = option.url;
            });
            autocompleteList.appendChild(li);
        });
        autocompleteList.style.display = 'block';
    } else {
        autocompleteList.innerHTML = '<li>No Results Found</li>';
        autocompleteList.style.display = 'block';
        setTimeout(function() {
            autocompleteList.style.display = 'none';
        }, 2000); // Delay before hiding "No Results Found" message (adjust as needed)
    }
}

// Event listener for input changes
searchInput.addEventListener('input', function() {
    const inputValue = this.value.trim();

    if (inputValue.length > 0) {
        showLoadingSpinner();
        setTimeout(function() {
            const filteredOptions = filterOptions(inputValue);
            displayOptions(filteredOptions);
        }, 500); // Simulating a delay for demonstration purposes (replace with actual data fetching logic)
    } else {
        autocompleteList.style.display = 'none';
    }
});

// Event listener for clicks outside the search input to hide autocomplete list
document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target)) {
        autocompleteList.style.display = 'none';
    }
});
