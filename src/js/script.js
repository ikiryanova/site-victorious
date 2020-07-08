window.addEventListener('DOMContentLoaded', function() {
  // Mobile-menu

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

  // Slider rates
  const slider = document.querySelector('.rates-cards-flex'),
    slides = document.querySelectorAll('.rates-card'),
    prev = document.querySelector('.arrows__left'),
    next = document.querySelector('.arrows__right'),
    slidesWrapper = document.querySelector('.rates-card-wrapper'),
    slidesField = document.querySelector('.rates-cards-flex'),
    width = window.getComputedStyle(slidesWrapper).width,
    btnSubmit = document.querySelector('#promotion-submit');
  let slideIndex = 1;
  let offset = 0;

  function sliderActive() {
    if (document.documentElement.clientWidth <= 1200) {
      sliderWork();
    } 
  }

  window.addEventListener('resize', sliderActive());

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

  //sliderActive();

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

  // Modal
  const closeModal = document.querySelector('.close'),
    modal = document.querySelector('.modal'),
    openModals = document.querySelectorAll('.modal-open');

  openModals.forEach(item => {
    item.addEventListener('click', () => {
      open();
    });
  });

  closeModal.addEventListener('click' , () => { 
    close();
  });

  document.addEventListener('click' , (e) => { 
    if (e.target === modal) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('modal_active')) { 
      close();
    }
  });

  function close() {
    modal.classList.remove('modal_active');
    modal.classList.add('modal_close');
    document.body.style.overflow = '';
  }

  function open() {
    modal.classList.remove('modal_close');
    modal.classList.add('modal_active');
    document.body.style.overflow = 'hidden';
  }

  // Forms

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так'
  };

  forms.forEach(item => {
    formCheck(item);
  });

  function formCheck(form) {
    const name = form.elements.name;
    const phone = form.elements.phone; 

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (checkName(name) & checkPhone(phone)) {
        bindPostData(form);
      } 
    });
  }

  const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
  };

  function bindPostData(form) {

    const statusMessage = document.createElement('div');
    statusMessage.textContent = message.loading;
    statusMessage.style.color = '#fff';
    statusMessage.classList.add('status');
    form.append(statusMessage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData('http://localhost:3000/requests', json)
    .then(() => {
      statusMessage.textContent = message.success;
        setTimeout(() => {
          statusMessage.remove();
          close();
        }, 2000);
    })
    .catch(() => {
      statusMessage.textContent = message.failure;
      setTimeout(() => {
        statusMessage.remove();
        close();
      }, 2000);
    })
    .finally(() => {
      form.reset();
    });

  }

  function checkName(name) {
    if (name.value.match(/\D/g) && name.value.length >= 2) {
      name.previousElementSibling.style.display = 'none';
      name.previousElementSibling.textContent = '';
      name.style.border = 'none';
      return true;
    } else {
      name.previousElementSibling.style.display = 'block';
      name.previousElementSibling.textContent = 'Введите имя';
      name.style.border = '2px solid #E90000';
      return false;
    }
  }

  function checkPhone(phone) {
    if (phone.value.length >= 11) {
      phone.previousElementSibling.style.display = 'none';
      phone.previousElementSibling.textContent = '';
      phone.style.border = 'none';
      return true;
    } else {
      phone.previousElementSibling.style.display = 'block';
      phone.previousElementSibling.textContent = 'Введите телефон';
      phone.style.border = '2px solid #E90000';
      return false;
    }
  }

});



