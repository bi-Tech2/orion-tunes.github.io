function countdown(dateEnd) {
    var timer, days, hours, minutes, seconds;

    dateEnd = new Date(dateEnd);
    dateEnd = dateEnd.getTime();

    if (isNaN(dateEnd)) {
        return;
    }

    timer = setInterval(calculate, 1000);

    function calculate() {
        var dateStart = new Date();
        var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000);

        if (timeRemaining >= 0) {
            days = parseInt(timeRemaining / 86400);
            timeRemaining = (timeRemaining % 86400);
            hours = parseInt(timeRemaining / 3600);
            timeRemaining = (timeRemaining % 3600);
            minutes = parseInt(timeRemaining / 60);
            timeRemaining = (timeRemaining % 60);
            seconds = parseInt(timeRemaining);

            document.getElementById("days").innerHTML = parseInt(days, 10);
            document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
            document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
            document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
        } else {
            clearInterval(timer); // Stop the timer when countdown ends
        }
    }
}

window.onload = function () {
    var preloader = document.querySelector('.preloader');
    setTimeout(function () {
        preloader.style.display = 'none';
    }, 300);

    const playPauseBtn = document.getElementById('playPauseBtn');
    const nextTrackBtn = document.getElementById('nextTrackBtn');
    const prevTrackBtn = document.getElementById('prevTrackBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicPopup = document.getElementById('musicPopup');
    const togglerBtn = document.getElementById('togglerBtn');
    const closeBtn = document.getElementById('closeBtn');

    const musicTracks = [
        "Davido-For-The-Road-(OrionTunes).mp3",
        "Davido-Ft-Asake-No-Competition-New-Song-(OrionTunes).mp3",
        "2 30 - Asake(oriontunes).mp3",
        "path/to/your/music/file5.mp3"
    ];

    let currentTrack = 0;
    let hidePopupTimeout;

    function attemptAutoPlay() {
        backgroundMusic.play().then(() => {
            playPauseBtn.innerHTML = "<i class='bx bx-pause'></i>";
            showPopupTemporarily();
        }).catch((error) => {
            console.log('Auto-play was prevented:', error);
            // Listen for user interaction to attempt play again
            document.body.addEventListener('click', userInteractToPlay, {
                once: true
            });
        });
    }

    function userInteractToPlay() {
        backgroundMusic.play();
        playPauseBtn.innerHTML = "<i class='bx bx-pause'></i>";
        showPopupTemporarily();
    }

    // Countdown setup (extended to August 1st, 2024 23:59:59)
    var endDate = new Date("August 1, 2024 23:59:59");
    countdown(endDate);

    // Attempt autoplay on page load
    attemptAutoPlay();

    // Show toggler button outside for 15 seconds
    togglerBtn.classList.add('visible');
    setTimeout(function() {
        togglerBtn.classList.remove('visible');
    }, 15000);

    // Music player event listeners
    playPauseBtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playPauseBtn.innerHTML = "<i class='bx bx-pause'></i>";
            showPopupTemporarily();
        } else {
            backgroundMusic.pause();
            playPauseBtn.innerHTML = "<i class='bx bx-play'></i>";
        }
    });

    nextTrackBtn.addEventListener('click', () => {
        currentTrack = (currentTrack + 1) % musicTracks.length;
        backgroundMusic.src = musicTracks[currentTrack];
        backgroundMusic.play();
        playPauseBtn.innerHTML = "<i class='bx bx-pause'></i>";
        showPopupTemporarily();
    });

    prevTrackBtn.addEventListener('click', () => {
        currentTrack = (currentTrack - 1 + musicTracks.length) % musicTracks.length;
        backgroundMusic.src = musicTracks[currentTrack];
        backgroundMusic.play();
        playPauseBtn.innerHTML = "<i class='bx bx-pause'></i>";
        showPopupTemporarily();
    });

    backgroundMusic.addEventListener('ended', () => {
        currentTrack = (currentTrack + 1) % musicTracks.length;
        backgroundMusic.src = musicTracks[currentTrack];
        backgroundMusic.play();
    });

    togglerBtn.addEventListener('click', () => {
        if (musicPopup.classList.contains('visible')) {
            hidePopup();
        } else {
            showPopupTemporarily();
        }
    });

    closeBtn.addEventListener('click', () => {
        hidePopup();
    });

    function showPopupTemporarily() {
        clearTimeout(hidePopupTimeout);
        musicPopup.classList.add('visible');
        hidePopupTimeout = setTimeout(hidePopup, 15000); // Hide after 15 seconds
    }

    function hidePopup() {
        musicPopup.classList.remove('visible');
    }
};
