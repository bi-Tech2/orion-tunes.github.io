document.addEventListener('DOMContentLoaded', function () {
  // Filter functionality
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
          const filterContent = document.querySelector(`.${filter}-filter`);
          if (filterContent) {
              filterContent.classList.add('active');
          }
      });
  });

  // Search functionality
  const searchIcon = document.querySelector('.nav__search-icon');
  const overlay = document.getElementById('overlay');
  const searchInput = document.getElementById('search-input');
  const autocompleteList = document.getElementById('autocomplete-list');

  if (searchIcon && overlay && searchInput && autocompleteList) {
      searchIcon.addEventListener('click', () => {
          overlay.classList.toggle('active');
          searchInput.focus();
      });

      overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
              overlay.classList.remove('active');
          }
      });

      const data = [
          { img: 'artist1.jpg', name: 'Artist 1', year: 2023, link: 'music.html', type: 'artist' },
          { img: 'song1.jpg', name: 'Song 1', year: 2022, link: '#', type: 'music' },
          { img: 'video1.jpg', name: 'Video 1', year: 2021, link: '#', type: 'video' },
          { img: 'album1.jpg', name: 'Album 1', year: 2023, link: '#', type: 'album' },
          { img: 'orion-logo.png', name: 'Davido', year: 2023, link: 'music.html', type: 'artist' },
          { img: 'song1.jpg', name: 'Song 1', year: 2022, link: '#', type: 'music' },
          { img: 'video1.jpg', name: 'Video 1', year: 2021, link: '#', type: 'video' },
          { img: 'album1.jpg', name: 'Album 1', year: 2023, link: '#', type: 'album' },
      ];

      searchInput.addEventListener('input', function() {
          const searchTerm = this.value.toLowerCase();
          autocompleteList.innerHTML = '<div class="loading">Loading...</div>'; // Show loading message
          if (searchTerm) {
              setTimeout(() => { // Simulate loading delay
                  autocompleteList.innerHTML = ''; // Clear loading message
                  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm));
                  if (filteredData.length > 0) {
                      filteredData.forEach(item => {
                          const listItem = document.createElement('div');
                          listItem.classList.add('autocomplete-item');
                          listItem.innerHTML = `
                              <img src="${item.img}" alt="${item.name}">
                              <div>
                                  <span>${item.name}</span>
                                  <span class="year">${item.year}</span>
                              </div>
                          `;
                          listItem.addEventListener('click', () => {
                              window.location.href = item.link;
                          });
                          autocompleteList.appendChild(listItem);
                      });
                  } else {
                      autocompleteList.innerHTML = '<div class="no-results">No results found</div>';
                  }
              }, 500); // Adjust the delay as needed
          } else {
              autocompleteList.innerHTML = '';
          }
      });
  }

  // Swiper initialization
  const swiperContainer = document.querySelector('.swiper-container');
  if (swiperContainer) {
      const swiper = new Swiper(swiperContainer, {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30,
          loop: true,
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
          },
          autoplay: {
              delay: 3000,
              disableOnInteraction: false,
          },
          breakpoints: {
              640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
              },
              768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
              },
              1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
              },
          },
      });
  }
});




let currentAudio = null;

function togglePlayPause(button) {
    const audio = button.nextElementSibling;
    const icon = button.querySelector('i');

    // Pause the currently playing audio
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        const currentButton = currentAudio.previousElementSibling;
        const currentIcon = currentButton.querySelector('i');
        currentIcon.classList.remove('bx-pause');
        currentIcon.classList.add('bx-play');
    }

    // Toggle play/pause
    if (audio.paused) {
        audio.play();
        icon.classList.remove('bx-play');
        icon.classList.add('bx-pause');
        currentAudio = audio;
    } else {
        audio.pause();
        icon.classList.remove('bx-pause');
        icon.classList.add('bx-play');
        currentAudio = null;
    }
}

function notifyDownload(button) {
    const notification = document.getElementById('notification');
    notification.innerText = 'Download Pending...';
    notification.style.backgroundColor = 'yellow';
    notification.style.display = 'block';

    setTimeout(() => {
        // Simulate download status update
        notification.innerText = 'Downloading...';
        notification.style.backgroundColor = 'green';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }, 1000);
}




// Function to add bottom padding to last visible element
function addBottomPadding() {
    const container = document.querySelector('.music-table-container');
    const table = document.querySelector('.music-table');
    const items = table.querySelectorAll('tbody tr');
    
    // Calculate the total height of all items
    let totalHeight = 0;
    items.forEach(item => {
        totalHeight += item.offsetHeight;
    });

    // Check if content height exceeds container height
    if (totalHeight > container.clientHeight) {
        // Add padding to the bottom of the table to make the last item fully visible
        table.style.paddingBottom = `${container.clientHeight - totalHeight + items[items.length - 1].offsetHeight}px`;
    } else {
        // Reset padding if all items fit within container
        table.style.paddingBottom = '0';
    }
}

// Call the function when the window is resized or content changes
window.addEventListener('resize', addBottomPadding);
document.addEventListener('DOMContentLoaded', addBottomPadding);




// $(document).ready(function(){
//   $('.music-slider').slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     arrows: true,
//     prevArrow: '<button type="button" class="slick-prev">&#8592;</button>',
//     nextArrow: '<button type="button" class="slick-next">&#8594;</button>',
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         }
//       }
//     ]
//   });
// });
