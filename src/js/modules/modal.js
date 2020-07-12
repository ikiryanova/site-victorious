function modalModule(closeSelector, modalSelector, openSelector) {
    const close = document.querySelector(closeSelector),
        modal = document.querySelector(modalSelector),
        openModals = document.querySelectorAll(openSelector);

    openModals.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });

    close.addEventListener('click', () => {
        closeModal(modalSelector);
    });

    document.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('modal_active')) {
            closeModal(modalSelector);
        }
    });

    function openModal() {
        modal.classList.remove('modal_close');
        modal.classList.add('modal_active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('modal_active');
    modal.classList.add('modal_close');
    document.body.style.overflow = '';
}


export {modalModule, closeModal};