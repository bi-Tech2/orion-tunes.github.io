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

    tabsBox.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();  // Prevent default behavior to ensure smooth dragging
    });

    tabsBox.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
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
    { name: "Burna Boy (NG)", type: "artist", url: "burna-boy.html" },
    { name: "Wizkid (NG)", type: "artist", url: "wizkid.html" },
    { name: "Davido (NG)", type: "artist", url: "davido.html" },
    { name: "XXX Tentacion (US)", type: "artist", url: "xxxtentacion.html" },
    { name: "Lil Durk (US)", type: "artist", url: "lildurk.html" },
    { name: "Work Of Art (Asake)", type: "album", url: "workofart.html" },
    { name: "Shakespoppi (Shallipoppi)", type: "artist", url: "shakespop.html" },
    { name: "Juice Wrld (US)", type: "artist", url: "juicewrld.html" },
    { name: "Pain Paints Paintings (Dax)", type: "album", url: "painpaints.html" },
    { name: "YWN Melly (US)", type: "artist", url: "ywnmelly.html" },
    { name: "Download (Recommended)", type: "recommended", url: "download.html" },
    { name: "Fighting Demons (Juice Wrld)", type: "album", url: "fighting.html" },
    { name: "Made in Lagos (Wizkid)", type: "album", url: "wizkid.html" },
    { name: "Hip-Hop (Recommended)", type: "recommended", url: "hiphop.html" },
    { name: "Backdoor (Lil Durk)", type: "album", url: "lildurk.html" },
    { name: "Bandana - ft Asake (Fireboy)", type: "album", url: "fireboy.html" },
    { name: "Artists page (Recommended)", type: "recommended", url: "artists.html" },
    { name: "African Giant (Burna Boy)", type: "album", url: "burna-boy.html" },
    { name: "Blog (Recommended)", type: "blog", url: "news.html" },
    { name: "Strings & Blings (Nasty C)", type: "album", url: "strings.html" },
    { name: "Ye (Burna Boy)", type: "album", url: "burna-boy.html" },
    { name: "Adekunle Gold (NG)", type: "artist", url: "adekunle.html" },
    { name: "Jack Harlow", type: "artist", url: "jack.html" },
    { name: "Hello (Pop Smoke)", type: "music", url: "popsmoke.html" },
    { name: "On the Low (Burna Boy)", type: "album", url: "burna-boy.html" },
    { name: "Charm (Rema)", type: "album", url: "rema.html" },
    { name: "Doe (Davido)", type: "album", url: "davido.html" },
    { name: "What's Popping (Jack Harlow)", type: "album", url: "jack.html" },
    { name: "Common Person (Burna Boy)", type: "album", url: "burna-boy.html" },
    { name: "Pop Music", type: "recommended", url: "pop.html" },
    { name: "Rap Music", type: "recommended", url: "rap.html" },
    { name: "Afrobeats", type: "recommended", url: "afro.html" },
    { name: "Music Insight", type: "recommended", url: "insight.html" },
    { name: "OrionTunes Blog", type: "blog", url: "news.html" },
    { name: "Asake", type: "artist", url: "asake.html" },
    { name: "Holly + Drill", type: "album", url: "drill.html" },
    { name: "Player", type: "album", url: "layer.html" },
    { name: "About OrionTunes", type: "recommended", url: "about.html" },
    { name: "23 (Album)", type: "album", url: "23.html" },
    { name: "Fireboy DML", type: "artist", url: "fireboy.html" },
    { name: "Kid Cudi", type: "artist", url: "kidcudi.html" }
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
