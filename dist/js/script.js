console.log('Это написал скрипт из файла sidebar.js');;
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
;
// block, button : setColor()
// block, image : setBackground()
// text, button : setText()
// icon : setLink()

/*
const elementExample = {
	templateInd: 0,
	menuId: '#idMenu',
	type: ['block', 'button', 'text', 'image', 'icon'],
	position: {
		x: 0,
		y: 0
	},
	size: {
		width: 0,
		height: 0
	},
	classes: ['class1', 'class2'],
	text: 'text',
	parent: parentNode,
	color: 'color',
	bgColor: 'color',
	bgImage: 'url',
	link: 'url'
}
*/
const menuElements = []; // TODO
const templateElements = [];
let templateIndCount = 0;

class DragNDrop {
	constructor(menuId, parent) {
		this.menuId = menuId;
		this.parent = parent;
	}

}

class Element extends DragNDrop {
	constructor(menuId, parent, type, classes) {
		super(menuId, parent);
		this.type = type;
		this.classes = classes;
	}
	duplicate() {
		// TODO
	}
	showMenu() {
		// TODO
	}
	delete() {
		// TODO
	}
	saveToLS() {
		// TODO
	}
}

const dragAndDrop = () => {

	const elements = document.querySelectorAll('.menu__element');
	const sourceBlock = document.querySelector('.menu');
	const targetBlock = document.querySelector('.target');
	let movingElement = '';
	let elementX = 0;
	let elementY = 0;

	const dragStart = function (e) {
		setTimeout(() => {
			if (e.target.parentNode === sourceBlock) {
				movingElement = e.target.cloneNode(true);
			} else if (e.target.parentNode === targetBlock) {
				movingElement = e.target;
			}
			console.log('drag start');
		})
	}

	const dragEnd = function (e) {
		console.log('drag end');
	}
	const dragOver = function (e) {
		e.preventDefault();
		console.log('drag over');
	}
	const dragEnter = function (e) {
		e.preventDefault();
		console.log('drag enter');
	}
	const dragLeave = function () {
		e.preventDefault();
		console.log('drag leave');
	}

	const dragDrop = function (e) {
		console.log('drag drop');
		this.append(movingElement);
		movingElement.classList.add('moved');
		movingElement.classList.remove('menu__element');
		movingElement.classList.add('template__element');
		movingElement.addEventListener('mousedown', getElementMousePos);
		movingElement.addEventListener('dragstart', dragStart);
		if (movingElement.classList.contains('bar')) {
			movingElement.classList.add('wide');
		} else {
			movingElement.classList.add('draggable-element');
			movingElement.style.top = e.layerY - elementY - 1 + 'px';
			movingElement.style.left = e.layerX - elementX - 1 + 'px';
		}
	}

	function getElementMousePos(e) {
		console.log('get initial mouse pos');
		if (e.target.parentNode === sourceBlock) {
			elementX = e.layerX - e.originalTarget.offsetLeft;
			elementY = e.layerY - e.originalTarget.offsetTop;
		} else if (e.target.parentNode === targetBlock) {
			elementX = e.layerX;
			elementY = e.layerY;
		}
	}

	elements.forEach(el => {
		el.addEventListener('dragstart', dragStart);
		el.addEventListener('dragend', dragEnd);
		el.addEventListener('mousedown', getElementMousePos)
	});
	targetBlock.addEventListener('dragover', dragOver);
	targetBlock.addEventListener('dragenter', dragEnter);
	targetBlock.addEventListener('drop', dragDrop);
}
dragAndDrop();;
