document.addEventListener('DOMContentLoaded', function () {
    const filterItems = document.querySelectorAll('.filter-item');
    const filterContents = document.querySelectorAll('.filter-content');

    filterItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all items and contents
            filterItems.forEach(i => i.classList.remove('active'));
            filterContents.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked item and corresponding content
            item.classList.add('active');
            const filter = item.getAttribute('data-filter');
            document.querySelector(`.${filter}-filter`).classList.add('active');
        });
    });
});



document.querySelector('.nav__search-icon').addEventListener('click', () => {
    document.getElementById('overlay').classList.toggle('active');
    document.getElementById('search-input').focus();
});

document.getElementById('overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('overlay')) {
        document.getElementById('overlay').classList.remove('active');
    }
});

const searchInput = document.getElementById('search-input');
const autocompleteList = document.getElementById('autocomplete-list');

const data = [
    { img: 'artist1.jpg', name: 'Artist 1', year: 2023, link: 'music.html', type: 'artist' },
    { img: 'song1.jpg', name: 'Song 1', year: 2022, link: '#', type: 'music' },
    { img: 'video1.jpg', name: 'Video 1', year: 2021, link: '#', type: 'video' },
    { img: 'album1.jpg', name: 'Album 1', year: 2023, link: '#', type: 'album' },
    { img: 'orion-logo.png', name: 'Davido', year: 2023, link: 'music.html', type: 'artist' },
    { img: 'song1.jpg', name: 'Song 1', year: 2022, link: '#', type: 'music' },
    { img: 'video1.jpg', name: 'Video 1', year: 2021, link: '#', type: 'video' },
    { img: 'album1.jpg', name: 'Album 1', year: 2023, link: '#', type: 'album' },
    // Add more items as needed
];

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    autocompleteList.innerHTML = '';
    if (searchTerm) {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm));
        filteredData.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('autocomplete-item');
            listItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <span>${item.name}</span>
                    <span class="year">${item.year}</span>
                    <a href="${item.link}">${item.link}</a>
                </div>
            `;
            listItem.addEventListener('click', () => {
                window.location.href = item.link;
            });
            autocompleteList.appendChild(listItem);
        });
    }
});

function filterContent(category) {
    // Placeholder function for filtering content
    // Replace this with actual filtering logic
    console.log(`Filtering content by: ${category}`);
}