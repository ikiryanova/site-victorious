function sliderModule() {
    const slides = document.querySelectorAll('.rates-card'),
        prev = document.querySelector('.arrows__left'),
        next = document.querySelector('.arrows__right'),
        slidesWrapper = document.querySelector('.rates-card-wrapper'),
        slidesField = document.querySelector('.rates-cards-flex'),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    function sliderActive() {
        if (document.documentElement.clientWidth <= 1200) {
            sliderWork();
        }
    }

    //window.addEventListener('resize', sliderActive());

    // window.addEventListener('resize', () => {
    //   if (document.documentElement.clientWidth <= 1200) {
    //     sliderWork();
    //   }

    //   if (document.documentElement.clientWidth <= 576) {
    //     btnSubmit.classList.add('modal-open');
    //   } else {
    //     btnSubmit.classList.remove('modal-open');
    //   }

    // });

    sliderActive();

    function sliderWork() {
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';

        slides.forEach(slide => {
            slide.style.width = width;
        });

        next.addEventListener('click', () => {
            if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.replace(/\D/g, '');
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

        });

        prev.addEventListener('click', () => {
            if (offset === 0) {
                offset = +width.replace(/\D/g, '') * (slides.length - 1);
            } else {
                offset -= +width.slice(0, width.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
        });
    }
}

export default sliderModule;