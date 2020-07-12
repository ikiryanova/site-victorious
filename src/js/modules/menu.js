function menuModule() {
    const menuOpen = document.querySelector('.navbar-menu-btn'),
        overlay = document.querySelector('.overlay'),
        mobileMenu = document.querySelector('.mobile-menu'),
        menuClose = document.querySelector('.m-menu-close');

    menuOpen.addEventListener('click', () => {
        overlay.classList.add('overlay-vizible');
        mobileMenu.classList.add('active-menu');
        document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', () => {
        overlay.classList.remove('overlay-vizible');
        mobileMenu.classList.remove('active-menu');
        document.body.style.overflow = '';
    });
}

export default menuModule;