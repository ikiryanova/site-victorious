/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function formsModule() {
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
            })
            .catch(() => {
                statusMessage.textContent = message.failure;
            })
            .finally(() => {
                form.reset();
                setTimeout(() => {
                    message.remove();
                    Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
                }, 3000);
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
}

/* harmony default export */ __webpack_exports__["default"] = (formsModule);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (menuModule);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: modalModule, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modalModule", function() { return modalModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
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




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (sliderModule);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");





window.addEventListener('DOMContentLoaded', function () {

  Object(_modules_menu__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["modalModule"])('.close', '.modal', '.modal-open');
  Object(_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])();
  Object(_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])();


});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map