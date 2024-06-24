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
