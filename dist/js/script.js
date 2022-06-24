document.addEventListener("DOMContentLoaded", function (event) {
    let login = localStorage.getItem('login');
    let firstName = localStorage.getItem('firstname');
    if (login != null) {
        document.getElementById('wrapper__button').innerHTML = `
        <div>Привет, ${firstName}!</div>
        <button id="buttonOut" onclick="outUser()" class="regButton">Выйти</button>`
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
};
let json = `[{
    "type": "block",
        "style":{
    "width": "100%",
    "height": "80px",
    "background-color": "#DCDCDC"}
},{
    "type": "block",
        "style":{
    "width": "100%",
    "height": "80px",
    "background-color": "#fff973dd"}
},{
    "type": "block",
        "style":{
    "width": "100%",
    "height": "500px",
    "background-color": "#FFE4E1"}
},{
    "type": "block",
        "style":{
    "width": "100%",
    "height": "500px",
    "background-color": "#DCDCDC"}
},{
    "type": "block",
        "style":{
    "width": "100%",
    "height": "100px",
    "background-color": "#fff973dd"}
},{
    "type": "block",
        "style":{
    "width": "100%",
    "height": "100px",
    "background-color": "#FFE4E1"}
},{
    "type": "block",
        "style":{
    "width": "100%",
    "height": "80px",
    "background-color": "#F0FFF0"}
}, {
	"type": "block",
        "style":{
	"width": "100%",
	"height": "500px",
	"background-color": "#FFFFF0"}
},{
	"type": "block",
        "style":{
	"width": "100%",
	"height": "150px",
	"background-color": "#c6c3af",
	"border-radius": "40px"}
},{
    "type": "block",
        "style":{
    "width": "100px",
    "height": "100px",
    "border": "thick solid grey"}
},{
	"type": "block",
        "style":{
	"width": "80px",
	"height": "80px",
	"background-color": "grey",
	"border-radius": "50%"}
},{
    "type": "block",
        "style":{
    "width": "100px",
    "height": "50px",
    "background-color": "#fff973",
    "border-radius": "100px / 50px"}
},{
    "type": "block",
        "style":{
    "width": "100%",
    "height": "100px",
    "background-color": "pink"}
},{
	"type": "button",
        "style":{
	"width": "150px",
	"height": "30px",
	"background-color": "#fff973",
	"color": "black"},
	"text": "Кнопка"
},{
	"type": "button",
        "style":{
	"width": "150px",
	"height": "30px",
	"background-color": "#c6c3af",
	"color": "black"},
	"text": "Кнопка"
},{
    "type": "button",
        "style":{
    "width": "150px",
    "height": "40px",
    "background-color": "black",
    "color": "white",
    "font-family": "Courier New",
    "font-size": "16px"},
    "text": "View More"
},{
    "type": "button",
        "style":{
    "width": "150px",
    "height": "40px",
    "background-color": "white",
    "color": "black",
    "font-size": "20px"},
    "text": "Read More"
},{
    "type": "button",
        "style":{
    "width": "150px",
    "height": "40px",
    "background-color": "rgb(11, 47, 91)",
    "color": "rgb(202, 215, 231)",
    "font-family": "Trebuchet MS",
    "font-size": "20px",
    "border": "2px solid rgb(202, 215, 231)"},
    "text": "SEND"
},{
    "type": "button",
        "style":{
    "width": "150px",
    "height": "40px",
    "background-color": "rgb(63, 118, 82)",
    "color": "white",
    "font-family": "Cambria",
    "font-size": "20px",
    "border-radius": "40px"},
    "text": "SHOP &#8594;"
},{
    "type": "button",
        "style":{
    "width": "150px",
    "height": "40px",
    "background-color": "white",
    "color": "blue",
    "font-family": "Helvetica",
    "font-size": "20px"},
    "text": "VIEW ALL"
},{
    "type": "button",
        "style":{
    "width": "150px",
    "height": "40px",
    "background-color": "rgb(7, 61, 81)",
    "color": "white",
    "font-family": "Helvetica",
    "font-size": "14px"},
    "text": "DOWNLOAD"
},{
    "type": "button",
        "style":{
    "width": "150px",
    "height": "40px",
    "background-color": "rgb(229, 235, 250)",
    "color": "rgb(4, 107, 254)",
    "font-family": "Helvetica",
    "font-size": "14px",
    "border-radius": "40px"},
    "text": "JOIN US"
},{
    "type": "button",
        "style":{
    "width": "70px",
    "height": "40px",
    "background-color": "pink",
    "color": "red",
    "font-family": "Helvetica",
    "font-size": "40px",
    "border-radius": "100px"},
    "text": "&#10084;"
},{
    "type": "button",
        "style":{
    "width": "70px",
    "height": "40px",
    "background-color": "rgb(229, 235, 250)",
    "color": "rgb(4, 107, 254)",
    "font-family": "Helvetica",
    "font-size": "30px",
    "border-radius": "5px"},
    "text": "&#10006;"
},{
    "type": "button",
        "style":{
    "width": "45px",
    "height": "40px",
    "background-color": "rgb(229, 235, 250)",
    "color": "rgb(4, 107, 254)",
    "font-family": "Helvetica",
    "font-size": "30px",
    "border-radius": "5px"},
    "text": "&#128386;"
},{
    "type": "button",
        "style":{
    "width": "45px",
    "height": "40px",
    "background-color": "rgb(229, 235, 250)",
    "color": "rgb(4, 107, 254)",
    "font-family": "Helvetica",
    "font-size": "30px",
    "border-radius": "5px"},
    "text": "&#9742;"
},{
    "type": "button",
        "style":{
    "width": "45px",
    "height": "40px",
    "background-color": "rgb(229, 235, 250)",
    "color": "rgb(4, 107, 254)",
    "font-family": "Helvetica",
    "font-size": "30px",
    "border-radius": "5px"},
    "text": "&#9997;"
},{
    "type": "button",
        "style":{
    "width": "45px",
    "height": "40px",
    "background-color": "rgb(229, 235, 250)",
    "color": "rgb(4, 107, 254)",
    "font-family": "Helvetica",
    "font-size": "30px",
    "border-radius": "5px"},
    "text": "&#9786;"
},{
    "type": "button",
        "style":{
    "width": "45px",
    "height": "40px",
    "background-color": "rgb(229, 235, 250)",
    "color": "rgb(4, 107, 254)",
    "font-family": "Helvetica",
    "font-size": "30px",
    "border-radius": "5px"},
    "text": "&#10046;"
},{
    "type": "button",
        "style":{
    "width": "150px",
    "height": "40px",
    "background-color": "white",
    "color": "rgb(63, 118, 82)",
    "font-family": "Franklin Gothic Medium",
    "font-size": "18px",
    "font-style": "italic"},
    "text": "Apply Now"
},{
    "type": "button",
        "style":{
    "width": "150px",
    "height": "40px",
    "background-color": "white",
    "color": "rgb(63, 118, 82)",
    "font-family": "Arial",
    "font-size": "18px",
    "border": "2px solid rgb(63, 118, 82)"},
    "text": "Featured"
},{
    "type": "button",
        "style":{
    "width": "45px",
    "height": "40px",
    "background-color": "rgb(255, 252, 204)",
    "color": "rgb(161, 103, 7)",
    "font-family": "Helvetica",
    "font-size": "30px"},
    "text": "&#62;"
},{
    "type": "button",
        "style":{
    "width": "110px",
    "height": "40px",
    "background-color": "rgb(255, 248, 107)",
    "color": "black",
    "font-family": "Verdana",
    "font-size": "18px",
    "font-weight": "bold"},
    "text": "SEND"
},{
    "type": "button",
        "style":{
    "width": "110px",
    "height": "40px",
    "background-color": "white",
    "color": "rgb(12, 68, 38)",
    "font-family": "Franklin Gothic Medium",
    "font-size": "16px"},
    "text": "BACK TO TOP"
},{
    "type": "button",
        "style":{
    "width": "40px",
    "height": "40px"},
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d='M256 112c-48.6 0-88 39.4-88 88C168 248.6 207.4 288 256 288s88-39.4 88-88C344 151.4 304.6 112 256 112zM256 240c-22.06 0-40-17.95-40-40C216 177.9 233.9 160 256 160s40 17.94 40 40C296 222.1 278.1 240 256 240zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-46.73 0-89.76-15.68-124.5-41.79C148.8 389 182.4 368 220.2 368h71.69c37.75 0 71.31 21.01 88.68 54.21C345.8 448.3 302.7 464 256 464zM416.2 388.5C389.2 346.3 343.2 320 291.8 320H220.2c-51.36 0-97.35 26.25-124.4 68.48C65.96 352.5 48 306.3 48 256c0-114.7 93.31-208 208-208s208 93.31 208 208C464 306.3 446 352.5 416.2 388.5z' fill='#401a49'/></svg>"
}, {
    "type": "button",
        "style":{
    "width": "48px",
    "height": "48px"},
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'><path d='M6 36V33H42V36ZM6 25.5V22.5H42V25.5ZM6 15V12H42V15Z' fill='#401a49'/></svg>"
}, {
    "type": "button",
        "style":{
    "width": "48px",
    "height": "48px"},
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'><path d='M24 32.35 14.35 22.7 16.5 20.55 22.5 26.55V8H25.5V26.55L31.5 20.55L33.65 22.7ZM11 40Q9.8 40 8.9 39.1Q8 38.2 8 37V29.85H11V37Q11 37 11 37Q11 37 11 37H37Q37 37 37 37Q37 37 37 37V29.85H40V37Q40 38.2 39.1 39.1Q38.2 40 37 40Z' fill='#401a49'/></svg>"
}, {
    "type": "button",
        "style":{
    "width": "48px",
    "height": "48px"},
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'><path d='M23 33.5H25.25V25.3H33.5V23H25.25V14.5H23V23H14.5V25.3H23ZM24 43Q20 43 16.525 41.55Q13.05 40.1 10.475 37.525Q7.9 34.95 6.45 31.475Q5 28 5 24Q5 20 6.45 16.55Q7.9 13.1 10.475 10.525Q13.05 7.95 16.525 6.475Q20 5 24 5Q28 5 31.45 6.475Q34.9 7.95 37.475 10.525Q40.05 13.1 41.525 16.55Q43 20 43 24Q43 28 41.525 31.475Q40.05 34.95 37.475 37.525Q34.9 40.1 31.45 41.55Q28 43 24 43ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM24 40.75Q30.9 40.75 35.825 35.825Q40.75 30.9 40.75 24Q40.75 17.1 35.825 12.175Q30.9 7.25 24 7.25Q17.1 7.25 12.175 12.175Q7.25 17.1 7.25 24Q7.25 30.9 12.175 35.825Q17.1 40.75 24 40.75Z' fill='#401a49'/></svg>"
}, {
	"type": "text",
        "style":{
	"textStyle": "header_h1",
	"width": "150px",
	"font-size": "29px",
	"color": "#000",
	"font-family": "Verdana"},
    "text": "Название"
},{
    "type": "text",
        "style":{
    "textStyle": "header_h2",
    "width": "150px",
    "font-size": "26px",
    "color": "#000",
    "font-family": "Verdana"},
    "text": "Заголовок"
},{
	"type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
	"font-size": "14px",
	"color": "#000"},
	"text": "Ваш текст будет написан в этом блоке"
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "20px",
    "color": "#000",
    "font-family": "Arial"},
    "text": "Arial"
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "20px",
    "color": "#000",
    "font-family": "Times New Roman"},
    "text": "Times New Roman"
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "20px",
    "color": "#000",
    "font-family": "Courier New"},
    "text": "Courier New"
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "20px",
    "color": "#000",
    "font-family": "Verdana"},
    "text": "Verdana"
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "20px",
    "color": "#000",
    "font-family": "Trebuchet MS"},
    "text": "Trebuchet MS"
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "20px",
    "color": "#000",
    "font-family": "Cambria"},
    "text": "Cambria"
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "20px",
    "color": "#000",
    "font-family": "Franklin Gothic Medium"},
    "text": "Franklin Gothic Medium"
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "20px",
    "color": "#000",
    "font-family": "Helvetica"},
    "text": "Helvetica"
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "16px",
    "color": "#000",
    "font-family": "Helvetica"},
    "text": "Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site."
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "16px",
    "color": "#000",
    "font-family": "Helvetica",
    "font-weight": "bold"},
    "text": "Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site."
},{
    "type": "text",
        "style":{
	"textStyle": "simple_text",
	"width": "150px",
    "font-size": "16px",
    "color": "#000",
    "font-family": "Helvetica",
    "font-style": "italic"},
    "text": "Helvetica Light is an easy-to-read font, with tall and narrow letters, that works well on almost every site."
},{
	"type": "image",
        "style":{
	"width": "300px",
	"height": "300px",
	"border": "1px solid #c6c3af",
	"background-image": "url(./img/bar-chart.png)",
    "background-size": "contain"}
},{
	"type": "image",
        "style":{
	"width": "300px",
	"height": "300px",
	"border": "1px solid #c6c3af",
	"background-image": "url(./img/team-work.png)",
    "background-size": "contain"}
},{
    "type": "image",
        "style":{
    "width": "150px",
    "height": "150px",
    "border": "1px solid #c6c3af",
    "background-image": "url(./img/letter.png)",
    "background-size": "contain"}
},{
    "type": "image",
        "style":{
    "width": "150px",
    "height": "150px",
    "border": "1px solid #c6c3af",
    "background-image": "url(./img/web-programming.png)",
    "background-size": "contain"}
},{
    "type": "icon",
        "style":{
    "width": "30px",
    "height": "30px"},
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z'/></svg>",
    "link": "https://www.facebook.com"
},{
    "type": "icon",
        "style":{
    "width": "30px",
    "height": "30px"},
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z'/></svg>",
    "link": "https://www.twitter.com"
},{
    "type": "icon",
        "style":{
    "width": "30px",
    "height": "30px"},
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512'><path d='M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z'/></svg>",
    "link": "https://www.telegram.com"
}]
`

const leftSidebarButton = document.querySelector('.left-sidebar__button');
const leftSidebarMenu = document.querySelector('.left-sidebar__menu');
const leftSidebarElements = document.querySelector(".left-sidebar__elements");

leftSidebarButton.addEventListener('click', function () {
    leftSidebarMenu.classList.toggle("leftSidebarMenu");
});

let blocksArray = [];
let buttonsArray = [];
let textArray = [];
let imagesArray = [];
let iconsArray = [];

jsonElements = JSON.parse(json);
jsonElements.forEach(el => {
    const jsonElementType = el.type;
    let newEl = `<div class="element elementPreview flexible" draggable="true"`
    const elProperties = Object.entries(el);
    let text = '';
    elProperties.forEach(pr => {
        if (pr[0] === 'style') {
            const styleAttributes = Object.entries(pr[1]);
            newEl += ` style="`;
            styleAttributes.forEach(attr => {
                newEl += `${attr[0]}:${attr[1]}; `;
            });
            newEl += `"`;
        } else if (pr[0] === 'text' || pr[0] === 'svg') {
            text = pr[1];
        } else {
            newEl += ` ${pr[0]}="${pr[1]}"`;
        }
    });
    newEl += `>${text}</div>`;

    switch (true) {
        case (jsonElementType == "block"): {
            blocksArray.push(newEl);
            break;
        }
        case (jsonElementType == "button"): {
            buttonsArray.push(newEl)
            break;
        }
        case (jsonElementType == "text"): {
            textArray.push(newEl)
            break;
        }
        case (jsonElementType == "image"): {
            imagesArray.push(newEl)
            break;
        }
        case (jsonElementType == "icon"): {
            iconsArray.push(newEl)
            break;
        }
    }
});


// //отрисовываем элементы из json в меню
// //переделано в отдельные функции для каждого типа блока
// function drawCategories(elements) {
//     let elementsContent = "";
//     for (let element of elements) {
//         elementsContent +=
//             `<div class="element elementPreview"
//             draggable="true"
//             contenteditable="true"
//             data-type="${element.type}"
//             style="background: ${element.bgColor}; width: ${element.width}; height: ${element.height}; color: ${element.color}; font-size: ${element.fontSize}; border: ${element.border}; bgImage: ${element.bgImage}; icon: ${element.icon}; link: ${element.link}; border-radius: ${element.borderRadius}; border-left: ${element.borderLeft}; border-right: ${element.borderRight}; border-bottom: ${element.borderBottom}; border-top: ${element.borderTop};
//             ">` +
//             ((element.text == undefined) ? `` : `"${element.text}"`) +
//             `</div>`;
//     }
//     document.querySelector(".left-sidebar__elements").innerHTML = elementsContent;
//     dragFromSidebar();
// }

let categories = document.querySelectorAll(".categories__button");
for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener('click', function (event) {
        let target = event.target;
        switch (true) {
            case (target.classList.contains('left-sidebar__categories-block')): {
                leftSidebarElements.classList.add('menuFlexStyle');
                let elements = blocksArray;
                drawMenu(elements);
                break;
            }
            case (target.classList.contains('left-sidebar__categories-button')): {
                leftSidebarElements.classList.add('menuFlexStyle');
                let elements = buttonsArray;
                drawMenu(elements);
                break;
            }
            case (target.classList.contains('left-sidebar__categories-text')): {
                leftSidebarElements.classList.remove('menuFlexStyle');
                let elements = textArray;
                drawMenu(elements);
                break;
            }
            case (target.classList.contains('left-sidebar__categories-image')): {
                leftSidebarElements.classList.remove('menuFlexStyle');
                let elements = imagesArray;
                drawMenu(elements);
                break;
            }
            case (target.classList.contains('left-sidebar__categories-icon')): {
                leftSidebarElements.classList.add('menuFlexStyle');
                let elements = iconsArray;
                drawMenu(elements);
                break;
            }
        }
        dragAndDrop();
    });
};

function drawMenu(elements) {
    let elementsContent = "";
    for (let element of elements) {
        elementsContent += element;
    }
    leftSidebarElements.innerHTML = elementsContent;
}


//при клике на элемент выводит его в body, где потом его можно переносить с dragndrop
// let elementId = 0;

// function dragFromSidebar() {
// 	let newElements = document.querySelectorAll(".elementPreview");

// 	for (let j = 0; j < newElements.length; j++) {
// 		newElements[j].addEventListener('click', function (event) {
// 			let target = event.target;
// 			const newDiv = target.cloneNode(true);
// 			elementId++;
// 			newDiv.id = elementId; //чтобы обратиться по id
// 			document.body.appendChild(newDiv);
// 			newDiv.classList.remove("elementPreview");
// 			newDiv.classList.add("elementMovable"); //новый класс, чтобы привязать dragndrop
// 			newDiv.classList.add("flexible");
// 		});
// 	}
// };;
let templateIndCount = 0;
const menuBlock = document.querySelector('.left-sidebar__elements');
const templateBlock = document.querySelector('.template');

templateBlock.addEventListener('dragover', dragOver);
templateBlock.addEventListener('dragenter', dragEnter);
templateBlock.addEventListener('dragleave', dragLeave);
templateBlock.addEventListener('drop', dragDrop, {
	capture: true
});
const elementsProps = {
	templNameBtn: {
		classes: ['btnForm', 'selectTemplateBtn'],
	},
	templateNameInput: {
		classes: ['inputReg', 'templateNameInput'],
		id: 'projectname',
		placeholder: 'Название проекта',
		type: 'text'
	}
}

// --------------- render ---------------

renderHeader();
handleDocLoad();

function handleDocLoad() {
	const email = userLoggedIn();
	if (isUserTemplateInLS(email)) {
		renderPopup('open');
	}
}

function userLoggedIn() {
	const email = localStorage.getItem('email')
	return ((email) && (localStorage.getItem('login') === 'true')) ? email : false;
}

function isUserTemplateInLS(email) {
	return (localStorage.getItem(email) !== null) ? true : false;
}

function renderHeader() {
	renderSaveBtn();
	renderListBtn();
}

function renderSaveBtn() {
	const btn = document.createElement('div');
	btn.classList.add('headerBtn', 'save');
	btn.innerHTML = '<img src="./img/save.svg" alt="Save to Local Storage">'
	document.querySelector('header').prepend(btn);
	document.querySelector('.save').addEventListener('click', handleSaveClick);
}

function renderListBtn() {
	const btn = document.createElement('div');
	btn.classList.add('headerBtn', 'list');
	btn.innerHTML = '<img src="./img/list.svg" alt="List of Projects">'
	document.querySelector('header').prepend(btn);
	document.querySelector('.list').addEventListener('click', handleListClick);
}

function renderProjBtn(action, el, i) {
	console.log(el);
	let selectTemplateBtn;
	if (action === 'list') {
		selectTemplateBtn = document.createElement('button');
	} else {
		selectTemplateBtn = document.createElement('button');
	}
	selectTemplateBtn.textContent = el.name;
	selectTemplateBtn.classList.add('btnForm', 'selectTemplateBtn');
	selectTemplateBtn.dataset.id = i;
	selectTemplateBtn.dataset.action = action;
	document.querySelector('#windowSelectTemplate > .popup__form').append(selectTemplateBtn);
	selectTemplateBtn.addEventListener('click', selectTemplate);
}

function selectTemplate(e) {
	e.preventDefault();
	const email = userLoggedIn();
	const template = JSON.parse(localStorage.getItem(email));
	if (e.target.dataset.action === 'open') {
		renderHtmlById(e.target.dataset.id, template);
		handleTemplateLoad();
	} else if (e.target.dataset.action === 'save') {
		saveTemplateAs(e.target.dataset.id);
	} else if (e.target.dataset.action === 'list') {
		renderHtmlById(e.target.dataset.id, template);
		handleTemplateLoad();
	}
	showPopup('none');
}

function renderPopup(action) {
	const popupSelectTemplate = document.querySelector('#windowSelectTemplate > .popup__form');
	popupSelectTemplate.innerHTML = '';
	const email = userLoggedIn();
	if (isUserTemplateInLS(email)) {
		const template = JSON.parse(localStorage.getItem(email));
		try {
			template.forEach((el, i) => {
				renderProjBtn(action, el, i);
			});
		} catch (e) {
			renderProjBtn(action, template, 0);
		}
	}
	let title;
	if (action === 'open') {
		title = renderTitle('Выберите проект');
		popupSelectTemplate.prepend(title);
		addEmptyTemplateBtn(popupSelectTemplate);
	} else if (action === 'save') {
		if (isUserTemplateInLS(email)) {
			title = renderTitle('Сохранить под именем:')
			popupSelectTemplate.prepend(title);
		}
		addNewTemplateInput(popupSelectTemplate);
	} else if (action === 'list') {
		console.log('list');
		if (isUserTemplateInLS(email)) {
			title = renderTitle('Мои проекты');
			renderEditIcons();
		} else {
			title = renderTitle('Вы пока не сохранили ни одного проекта');
		}
		popupSelectTemplate.prepend(title);
	}
	showPopup('block');
}

function renderEditIcons() {
	const buttons = document.querySelectorAll('.selectTemplateBtn');
	buttons.forEach((el) => {
		const wrapper = document.createElement('div');
		wrapper.classList.add('popup__form--wrapper');
		wrapper.dataset.id = el.dataset.id;
		el.before(wrapper);
		wrapper.append(el);
		renderIcon('change-name', wrapper, el);
		renderIcon('delete', wrapper, el);
	});
	const icons = document.querySelectorAll('.btnForm--icon');
	icons.forEach(icon => {
		if (icon.dataset.type === 'change-name') {
			icon.addEventListener('click', handleChangeNameClick);
		} else if (icon.dataset.type === 'delete') {
			icon.addEventListener('click', handleDeleteClick);
		}
	})
}

function handleChangeNameClick(e) {
	let id;
	let node;
	if (e.target.tagName === 'IMG') {
		id = e.target.parentNode.dataset.id;
		node = e.target.parentNode;
		e.target.src = "./img/save.svg";
	} else {
		id = e.target.dataset.id;
		node = e.target;
		e.target.childNodes[0].src = "./img/save.svg";
	}
	node.removeEventListener('click', handleChangeNameClick);
	node.addEventListener('click', saveChangedName);
	const nameBtn = document.querySelector(`.selectTemplateBtn[data-id="${id}"]`);
	nameBtn.removeEventListener('click', selectTemplate);
	nameBtn.contentEditable = true;
	nameBtn.focus();
}

function handleDeleteClick(e) {
	e.preventDefault();
	let id;
	if (e.target.tagName === 'IMG') {
		id = e.target.parentNode.dataset.id;
	} else {
		id = e.target.dataset.id;
	}
	const wrapper = document.querySelector(`div[data-id="${id}"]`);
	deleteTemplateFromLS(id);
	wrapper.remove();
}

function deleteTemplateFromLS(id) {
	const email = userLoggedIn();
	const template = JSON.parse(localStorage.getItem(email));
	template.splice(id, 1);
	localStorage.setItem(email, JSON.stringify(template));
}

function renderIcon(src, block, el) {
	let newEl = document.createElement('div');
	newEl.classList.add('btnForm', 'btnForm--icon');
	newEl.dataset.id = el.dataset.id;
	newEl.dataset.type = src;
	newEl.innerHTML = `<img src="./img/${src}.svg" alt="icon">`;
	block.append(newEl);
}

function renderTitle(title) {
	let titleEl = document.createElement('h2');
	titleEl.innerHTML = title;
	return titleEl;
}

function addEmptyTemplateBtn(target) {
	const emptyTemplateBtn = document.createElement('button');
	emptyTemplateBtn.textContent = 'Создать новый проект';
	emptyTemplateBtn.classList.add('btnForm');
	target.append(emptyTemplateBtn);
	emptyTemplateBtn.addEventListener('click', openEmptyProject);
}

function addNewTemplateInput(target) {
	let title = renderTitle('Новый проект:');
	target.append(title);
	const inputTemplateName = document.createElement('input');
	const inputProps = elementsProps.templateNameInput;
	inputProps.classes.forEach(el => {
		inputTemplateName.classList.add(el);
	});
	inputTemplateName.id = inputProps.id;
	inputTemplateName.placeholder = inputProps.placeholder;
	inputTemplateName.type = inputProps.type;
	target.append(inputTemplateName);
	const newNameSaveBtn = document.createElement('button');
	newNameSaveBtn.textContent = 'Сохранить';
	newNameSaveBtn.classList.add('btnForm');
	target.append(newNameSaveBtn);
	newNameSaveBtn.addEventListener('click', saveNewTemplate)
}

function openEmptyProject() {
	showPopup('none');
}

function showPopup(state) {
	document.getElementById('windowSelectTemplate').style.display = state;
	document.getElementById('grayBackground').style.display = state;
}

// --------------- save and load from LS ---------------
function handleListClick() {
	renderPopup('list');
}

function handleSaveClick(e) {
	const email = userLoggedIn();
	console.log(email);
	renderPopup('save');
}

function saveNewTemplate(e) {
	const email = userLoggedIn();
	const projName = document.querySelector('#projectname').value;
	const projHtml = templateBlock.innerHTML;
	const templateObj = {
		name: projName,
		html: projHtml
	}
	if (!isUserTemplateInLS(email)) {
		localStorage.setItem(email, JSON.stringify(templateObj));
	} else {
		let elArray = [];
		let data = null;
		data = JSON.parse(localStorage.getItem(email));
		if (data.length > 1) {
			elArray.push(...data, templateObj);
		} else {
			elArray.push(data, templateObj);
		}
		localStorage.setItem(email, JSON.stringify(elArray));
	}
	showPopup('none');
}

function handleTemplateLoad() {
	const elements = getTemplateElements();
	elements.forEach(el => {
		addListenersForNewElement(el);
	})
}

function getTemplateElements() {
	return document.querySelectorAll('.template__element');
}

function saveChangedName(e) {
	console.log('save as');
	let id;
	let node;
	if (e.target.tagName === 'IMG') {
		id = e.target.parentNode.dataset.id;
		node = e.target.parentNode;
		e.target.src = "./img/change-name.svg";
	} else {
		id = e.target.dataset.id;
		node = e.target;
		node.childNodes[0].src = "./img/change-name.svg";
	}
	const nameBtn = document.querySelector(`.selectTemplateBtn[data-id="${id}"]`);
	newName = nameBtn.innerHTML.replace('<br>', '');
	console.log(newName);
	const email = userLoggedIn();
	const template = JSON.parse(localStorage.getItem(email));
	if (template.length > 1) {
		template[id].name = newName;
	} else {
		template.name = newName;
	}
	localStorage.removeItem(email);
	localStorage.setItem(email, JSON.stringify(template));
	console.log(JSON.parse(localStorage.getItem(email))[id]);
	nameBtn.addEventListener('click', selectTemplate);
	nameBtn.contentEditable = false;
	nameBtn.blur();
	node.removeEventListener('click', saveChangedName);
	node.addEventListener('click', handleChangeNameClick);
}

function saveTemplateAs(id) {
	const email = userLoggedIn();
	const projHtml = templateBlock.innerHTML;
	const template = JSON.parse(localStorage.getItem(email));
	if (template.length > 1) {
		template[id].html = projHtml;
	} else {
		template.html = projHtml;
	}
	localStorage.setItem(email, JSON.stringify(template));
}

function renderHtmlById(htmlId, template) {
	let name;
	if (template.length > 1) {
		html = template[htmlId].html;
		name = template[htmlId].name;
	} else {
		html = template.html;
		name = template.name;
	}
	addTitleToHeader(name);

	templateBlock.innerHTML = html;
}

function addTitleToHeader(name) {
	document.querySelector('header').innerHTML += `<div class="header__title">${name}</div>`;
	document.querySelector('.list').addEventListener('click', handleListClick);
	document.querySelector('.save').addEventListener('click', handleSaveClick);
}
// ----------------- drag and drop -----------------

let templateFlag = false;
let movingElement = null;
let elementX = 0;
let elementY = 0;

function dragAndDrop() {
	const elements = document.querySelectorAll('.element');
	elements.forEach(el => {
		el.addEventListener('dragstart', dragStart);
		el.addEventListener('dragend', dragEnd);
	});
}

function dragStart(e) {
	getPosition(e);
	getTemplateFlag(e);
	setTimeout(() => {
		if (e.target.parentNode.isSameNode(menuBlock)) {
			movingElement = e.target.cloneNode(true);
		} else if (e.target.parentNode.isSameNode(templateBlock)) {
			movingElement = e.target;
		}
	})
}

function dragEnd(e) {
	e.preventDefault();
}

function dragOver(e) {
	e.preventDefault();
}

function dragEnter(e) {
	e.preventDefault();
}

function dragLeave(e) {
	e.preventDefault();
}

function dragDrop(e) {
	e.stopPropagation();
	e.preventDefault();
	if (!e.target.isSameNode(movingElement)) {
		this.append(movingElement);
		movingElement.classList.remove('element', 'elementPreview');
		movingElement.classList.add('template__element');
		addListenersForNewElement(movingElement);
		if (!templateFlag) {
			createNewElement(e, movingElement);
		} else {
			setPosition(e);
		}
	}
}

function createNewElement(e, movingElement) {
	const type = movingElement.dataset.type;
	if (type === 'block') {
		movingElement.classList.add('wide');
	} else {
		movingElement.classList.add('draggable-element');
		setPosition(e);
		switch (type) {
			case 'button':
				movingElement.classList.add('template__button');
				break;
			case 'icon':
				break;
			case 'text':
				movingElement.style.width = '';
				const textStyleClassName = movingElement.dataset.textstyle;
				movingElement.classList.add(textStyleClassName, 'template__text');
				break;
			case 'image':
				movingElement.classList.add('template__image');
				break;
		}
	}
}

function addListenersForNewElement(movingElement) {
	movingElement.addEventListener('click', handleClick);
	movingElement.addEventListener('dblclick', handleDoubleClick);
	movingElement.addEventListener('focusout', handleFocusOut);
	movingElement.addEventListener('dragstart', dragStart);
}

function pasteCopiedElement(movingElement) {
	templateBlock.append(movingElement);
	movingElement.style.top = movingElement.style.top.slice(0, -2) - (-50) + 'px';
	movingElement.style.left = movingElement.style.left.slice(0, -2) - (-50) + 'px';
	movingElement.classList.remove('selected');
	addListenersForNewElement(movingElement);
}

// ----------------- positioning ----------------

function getTemplateFlag(e) {
	if (e.target.parentNode.isSameNode(templateBlock)) {
		templateFlag = true;
	} else {
		templateFlag = false;
	}
}

function setPosition(e) {
	const scroll = document.scrollingElement.scrollTop;
	offParTop = e.target.offsetParent.offsetTop;
	offParLeft = e.target.offsetParent.offsetLeft;
	movingElement.style.top = e.clientY - elementY - offParTop + scroll + 'px';
	movingElement.style.left = e.clientX - elementX - offParLeft + 'px';
}

function getPosition(e) {
	elementY = e.offsetY;
	elementX = e.offsetX;
}

// -------------- editing handlers -------------------
function getTarget(e) {
	let node;
	if (e.target.tagName === 'path') {
		node = e.target.parentNode.parentNode;
	} else if (e.target.tagName === 'svg') {
		node = e.target.parentNode;
	} else {
		node = e.target;
	}
	return node;
}

function handleClick(e) {
	let target = getTarget(e);
	target.classList.add('selected');
	target.focus();
	target.addEventListener('keydown', handleKeyDown);
	// node.addEventListener('focusout', handleFocusOut);
}

function handleDoubleClick(e) {
	let target = getTarget(e);
	target.contentEditable = true;
	target.removeEventListener('click', handleClick);
	target.removeEventListener('keydown', handleKeyDown);
	target.classList.add('selected');
	if (target.dataset.type === 'text') {
		target.style.height = 'auto';
	}
}

function handleFocusOut(e) {
	let target = getTarget(e);
	window.getSelection().removeAllRanges();
	target.contentEditable = false;
	target.classList.remove('selected');
	target.addEventListener('click', handleClick);
}

function handleKeyDown(e) {
	e.preventDefault();
	if (e.ctrlKey === true && e.key === 'c') {
		movingElement = e.target.cloneNode(true);
	} else if (e.ctrlKey === true && e.key === 'v') {
		pasteCopiedElement(movingElement);
	} else if (e.key === 'Delete') {
		e.target.remove();
	} else if (e.key === 'ArrowLeft') {
		let left = e.target.style.left;
		e.target.style.left = left.slice(0, left.length - 2) - 1 + 'px';
	} else if (e.key === 'ArrowRight') {
		let right = e.target.style.left;
		e.target.style.left = right.slice(0, right.length - 2) - (-1) + 'px';
	} else if (e.key === 'ArrowUp') {
		let up = e.target.style.top;
		e.target.style.top = up.slice(0, up.length - 2) - 1 + 'px';
	} else if (e.key === 'ArrowDown') {
		let down = e.target.style.top;
		e.target.style.top = down.slice(0, down.length - 2) - (-1) + 'px';
	}
};