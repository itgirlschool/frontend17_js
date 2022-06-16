document.addEventListener("DOMContentLoaded", function (event) {
    let login = localStorage.getItem('login');
    let firstName = localStorage.getItem('firstname');
    if (login != null) {
        document.getElementById('wrapper__button').innerHTML = `<div>Привет, ${firstName}!</div><button id="buttonOut" onclick="outUser()" class="regButton">Выйти</button>`
    }
})

let errors = [];

function showReg(state) {
    errors = [];
    document.getElementById('windowReg').style.display = state;
    document.getElementById('gray').style.display = state;
}

function showIn(state) {
    document.getElementById('windowIn').style.display = state;
    document.getElementById('gray2').style.display = state;
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('pass');
    if (email != null) {
        document.querySelector('#email__in').value = email;
    }
    if (email != null) {
        document.querySelector('#pass__in').value = password;
    }
}

function checkValidity(input) {
    let validity = input.validity;
    console.log(validity.valueMissing);

    if (validity.valueMissing) {
        errors.push('Поле ' + input.placeholder + ' не заполнено');
    }
    if (validity.patternMismatch) {
        errors.push('Не верный формат заполнения e-mail');
    }
    return errors;
}

function checkPassword() {
    let password = document.querySelector('#pass1').value;
    let password2 = document.querySelector('#pass2').value;
    console.log(password);
    if (password != null) {
        if (password.length < 4) {
            errors.push('Минимальное значение пароля не может быть меньше, чем 4');
        }
        if (password.length > 10) {
            errors.push('Максимальное значение пароля не может быть больше, чем 10');
        }
        if (password.search(/[a-z]/) === -1) {
            errors.push('Пароль должен содержать минимум одну прописную букву');
        }
        if (password.search(/[A-Z]/) === -1) {
            errors.push('Пароль должен содержать минимум одну заглавную букву');
        }
        if (password.search(/[0123456789]/) === -1) {
            errors.push('Пароль должен содержать минимум одну цифру');
        }
        if (password != password2) {
            errors.push('Пароль не совпадает!');
        }
    }
    return errors;
}

function pushReg() {
    let inputs = document.querySelectorAll(".inputReg");
    console.log(inputs);
    for (let input of inputs) {
        checkValidity(input);
    }

    checkPassword();

    if (errors == false) {
        saveData();
    } else {
        document.getElementById("error").innerHTML = errors.join('.<br>');
        errors = [];
    }
    document.querySelector('form').addEventListener('submit', (e) => e.preventDefault())

}

function saveData() {
    let firstName = document.querySelector('#firstname').value;
    let lastName = document.querySelector('#lastname').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#pass1').value;
    let password2 = document.querySelector('#pass2').value;
    console.log(password, password2);
    document.querySelector('.error').innerHTML = '';

    if (localStorage.getItem('firstName') == null) {
        localStorage.setItem('firstname', firstName);
    }
    if (localStorage.getItem('lastname') == null) {
        localStorage.setItem('lastname', lastName);
    }
    if (localStorage.getItem('email') == null) {
        localStorage.setItem('email', email);
    }
    if (localStorage.getItem('pass') == null) {
        localStorage.setItem('pass', password2);
    }

localStorage.setItem('login', true);
document.getElementById('windowReg').style.display = "none";
document.getElementById('gray').style.display = "none";
document.querySelector('form').addEventListener('submit', (e) => e.preventDefault())
document.getElementById('wrapper__button').innerHTML = `<div>Привет, ${firstName}!</div><button id="buttonOut" onclick="outUser()" class="regButton">Выйти</button>`
}

function getIn() {
    document.querySelector('#inForm').addEventListener('submit', (e) => e.preventDefault())
    document.getElementById('windowIn').style.display = "none";
    document.getElementById('gray2').style.display = "none";
    document.getElementById('wrapper__button').innerHTML = `<div>Привет, ${localStorage.getItem('firstname')}!</div><button id="buttonOut" onclick="outUser()" class="regButton">Выйти</button>`
    localStorage.setItem('login', true);
}

function outUser() {
    document.getElementById('wrapper__button').innerHTML = `<button id="buttonReg" onclick="showReg('block')" class="regButton">Регистрация</button>
    <button id="buttonIn" onclick="showIn('block')" class="regButton">Войти</button>`
    localStorage.removeItem('login');
}
