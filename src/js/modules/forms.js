import {closeModal} from './modal';

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
                    closeModal('.modal');
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

export default formsModule;