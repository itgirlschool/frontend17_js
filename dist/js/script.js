const leftSidebarButton = document.querySelector('.left-sidebar__button');
const leftSidebarMenu = document.querySelector('.left-sidebar__menu');

leftSidebarButton.addEventListener('click', function () {
    leftSidebarMenu.classList.toggle("leftSidebarMenu");
});


//examples from dragndrop.js
const blockElements = [{
    type: 'block',
    width: '100%',
    height: '80px',
    bgColor: '#c6c3af'
}, {
    type: 'block',
    width: '100%',
    height: '80px',
    bgColor: '#fff973'
}, {
    type: 'block',
    width: '100%',
    height: '300px',
    bgColor: 'pink'
}, {
    type: 'block',
    width: '100%',
    height: '500px',
    bgColor: '#c6c3af'
}, {
    type: 'block',
    width: '100%',
    height: '100px',
    bgColor: '#fff973'
}, {
    type: 'block',
    width: '100%',
    height: '100px',
    bgColor: 'pink'
}];

const buttonElements = [{
    type: 'button',
    width: '150px',
    height: '30px',
    bgColor: '#fff973',
    color: 'black',
    text: 'Кнопка'
}, {
    type: 'button',
    width: '150px',
    height: '30px',
    bgColor: '#c6c3af',
    color: 'black',
    text: 'Кнопка'
}];

const textElements = [{
    type: 'text',
    textStyle: 'header_h2',
    width: '150px',
    height: '30px',
    fontSize: '32px',
    color: '#000',
    text: 'Заголовок 2'
}, {
    type: 'text',
    textStyle: 'simple_text',
    width: '150px',
    height: '30px',
    fontSize: '14px',
    color: '#000',
    text: 'Ваш текст будет написан в этом блоке'
}];

const imageElements = [{
    type: 'image',
    width: '150px',
    height: '150px',
    border: '1px solid #c6c3af',
    bgImage: 'url("./img/work-together.jpg")'
}];

const iconElements = [{
    type: 'icon',
    width: '24px',
    height: '24px',
    border: '1px solid #c6c3af',
    icon: 'url(./img/social/facebook.svg)',
    link: 'https://www.facebook.com'
}];


let categories = document.querySelectorAll(".categories__button");
for (let i = 0; i < categories.length; i++) {
    categories[i].onclick = function (event) {
        let target = event.target;

        //blocks
        if (target.classList.contains('left-sidebar__categories-block')) {
            let elements = blockElements;
            let elementsContent = "";
            for (let element of elements) {
                elementsContent +=
                    `<div class="element"  tabindex="0" data-type="${element.type}" style="background: ${element.bgColor}; width: ${element.width}; height: ${element.height};" draggable="true"> </div>`;
            }
            document.querySelector(".left-sidebar__elements").innerHTML = elementsContent;
            // dragFromSidebar();
        }

        //button
        else if (target.classList.contains('left-sidebar__categories-button')) {
            let elements = buttonElements;
            let elementsContent = "";
            for (let element of elements) {
                elementsContent +=
                    `<div class="element" tabindex="0" data-type="${element.type}" style="color: ${element.color}; background-color: ${element.bgColor}; width: ${element.width}; height: ${element.height};" draggable="true">${element.text}</div>`;
            }
            document.querySelector(".left-sidebar__elements").innerHTML = elementsContent;
            // dragFromSidebar();
        }

        //text
        else if (target.classList.contains('left-sidebar__categories-text')) {
            let elements = textElements;
            let elementsContent = "";
            for (let element of elements) {
                elementsContent +=
                    `<div class="element"  tabindex="0" data-type="${element.type}" data-textstyle="${element.textStyle}" style="color: ${element.color}; width: ${element.width}; height: ${element.height}; font-size: ${element.fontSize}" draggable="true">${element.text}</div>`;
            }
            document.querySelector(".left-sidebar__elements").innerHTML = elementsContent;
            // dragFromSidebar();
        }

        //image
        else if (target.classList.contains('left-sidebar__categories-image')) {
            let elements = imageElements;
            let elementsContent = "";
            for (let element of elements) {
                elementsContent +=
                    `<div class="element"  tabindex="0" data-type="${element.type}" style="width: ${element.width}; border: ${element.border}; background-image: ${element.bgImage}; height: ${element.height};" draggable="true"> </div>`;
            }
            document.querySelector(".left-sidebar__elements").innerHTML = elementsContent;
            // dragFromSidebar();
        }

        //icon
        else if (target.classList.contains('left-sidebar__categories-icon')) {
            let elements = iconElements;
            let elementsContent = "";
            for (let element of elements) {
                elementsContent +=
                    `<div class="element"  tabindex="0" data-type="${element.type}" style="width: ${element.width}; border: ${element.border}; icon: ${element.icon}; height: ${element.height};" draggable="true"> </div>`;
            }
            document.querySelector(".left-sidebar__elements").innerHTML = elementsContent;
            // dragFromSidebar();
        }
        dragAndDrop();
    }

};

//при клике на элемент выводит его в body, где потом его можно переносить с dragndrop
// function dragFromSidebar() {
//     let newElements = document.querySelectorAll(".element");
//     let elementId = 0;
//     for (let j = 0; j < newElements.length; j++) {
//         newElements[j].onclick = function (event) {
//             let target = event.target;
//             const newDiv = target.cloneNode(true);
//             elementId++;
//             newDiv.id = elementId; //чтобы обратиться по id
//             document.querySelector('.template').appendChild(newDiv);
//         }
//     }
// };;
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
let templateIndCount = 0;
const menuBlock = document.querySelector('.left-sidebar__elements');
const templateBlock = document.querySelector('.template');

templateBlock.addEventListener('dragover', dragOver);
templateBlock.addEventListener('dragenter', dragEnter);
templateBlock.addEventListener('dragenter', dragLeave);
templateBlock.addEventListener('drop', dragDrop, {
	capture: true
});
const keyCodes = {
	delete: 46,
	arrowLeft: 37,
	arrowUp: 38,
	arrowRight: 39,
	arrowDown: 40,
	cKey: 67,
	vKey: 86
}
class DragNDrop {
	// static

}

class Element {
	constructor(type, classes) {
		// super(menuId, parent);
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
		let elArray = [];
		let data = null;
		if (!localStorage.getItem('template')) {
			localStorage.setItem('template', JSON.stringify(this));
		} else {
			data = JSON.parse(localStorage.getItem('template'));
			if (data.length > 1) {
				elArray.push(...data, this);
			} else {
				elArray.push(data, this);
			}
			localStorage.setItem('template', JSON.stringify(elArray));
		}
	}
}

class ResizableElement extends Element {
	constructor(type, classes, width, height, posX, posY) {
		super(type, classes);
		this.width = width;
		this.height = height;
		this.posX = posX;
		this.posY = posY;
	}
	changeHeight() {
		// TODO
	}
	changeWidth() {
		// TODO
	}
	changePosX() {
		// TODO
	}
	changePosY() {
		// TODO
	}
}

class Block extends Element {
	constructor(type, classes, bgColor) {
		super(type, classes);
		this.bgColor = bgColor;
		this.templateInd = templateIndCount++;
	}
	setTemplateInd() {
		// this.templateInd = templateIndCount++;
	}
	setBackgroundColor() {
		// TODO
	}
	// saveToLS() {
	// 	let item = JSON.stringify(this);
	// 	console.log(item);
	// 	if (!localStorage.getItem('template')) {
	// 		localStorage.setItem('template', JSON.stringify(this))
	// 	} else {
	// 		localStorage.setItem('template', [...localStorage.getItem('template'), JSON.stringify(this)])
	// 	}
	// }
}
class Button extends ResizableElement {
	constructor(type, classes, width, height, posX, posY, bgColor, btnLabel, fontColor) {
		super(type, classes, width, height, posX, posY);
		this.bgColor = bgColor;
		this.btnLabel = btnLabel;
		this.fontColor = fontColor;
	}
	setBackgroundColor() {
		// TODO
	}
	setBtnLabel() {
		// TODO
	}
	setFontColor() {
		// TODO
	}
}
class Image extends ResizableElement {
	constructor(menuId, parent, type, classes, width, height, posX, posY, bgImage, border) {
		super(menuId, parent, type, classes, width, height, posX, posY);
		this.bgImage = bgImage;
		this.border = border;
	}
	setBackgroundImage() {
		// TODO
	}
	setBorder() {
		// TODO
	}
}
class SocialIcon extends ResizableElement {
	constructor(type, classes, width, height, posX, posY, iconColor, link) {
		super(type, classes, width, height, posX, posY);
		this.iconColor = iconColor;
		this.link = link;
	}
	setIconColor() {
		// TODO
	}
	setLink() {
		// TODO
	}
}
class Text extends Element {
	constructor(type, classes, color, textStyle) {
		super(type, classes);
		this.color = color;
		this.textStyle = textStyle;
	}
	setColor() {
		// TODO
	}
	changeText() {

	}
}

function dragAndDrop() {
	console.log('start dragndrop');

	const elements = document.querySelectorAll('.element');
	elements.forEach(el => {
		el.addEventListener('dragstart', dragStart);
		el.addEventListener('dragend', dragEnd);
	});

}
let templateFlag = false;
let movingElement = null;
let elementX = 0;
let elementY = 0;

function dragStart(e) {
	getPosition(e);
	getTemplateFlag(e);
	console.log('drag start');
	console.log(this);
	setTimeout(() => {
		if (e.target.parentNode.isSameNode(menuBlock)) {
			movingElement = e.target.cloneNode(true);
		} else if (e.target.parentNode.isSameNode(templateBlock)) {
			movingElement = e.target;
		}
		console.log(movingElement);
	})
}

function dragEnd(e) {
	console.log('drag end');
	e.preventDefault();
}

function dragOver(e) {
	e.preventDefault();
	console.log('drag over');
}

function dragEnter(e) {
	e.preventDefault();
	console.log('drag enter');
}

function dragLeave(e) {
	e.preventDefault();
	console.log('drag leave');
}

function createNewElement(e, movingElement) {
	const type = movingElement.dataset.type;
	console.log(type);
	let newBlock = null;
	if (type === 'block') {
		movingElement.classList.add('wide');
		newBlock = new Block(type, movingElement.classList, movingElement.style.backgroundColor);
		newBlock.saveToLS();
	} else {
		movingElement.classList.add('draggable-element');
		setPosition(e);
		switch (type) {
			case 'button':
				movingElement.classList.add('template__button');
				newBlock = new Button(type, movingElement.classList, movingElement.clientWidth,
					movingElement.clientHeight,
					movingElement.style.left,
					movingElement.style.top,
					movingElement.style.backgroundColor,
					movingElement.innerHTML,
					movingElement.style.color
				);
				// type, classes, width, height, posX, posY, bgColor, btnLabel, fontColor;
				newBlock.saveToLS();
				break;
			case 'icon':
				// newBlock = new SocialIcon(type, movingElement.classList, movingElement.clientWidth,
				// movingElement.clientHeight,
				// movingElement.style.left,
				// movingElement.style.top,
				// iconColor, link);
				// newBlock.saveToLS();
				// console.log(newBlock);
				break;
			case 'text':
				movingElement.style.width = '';
				const textStyleClassName = movingElement.dataset.textstyle;
				movingElement.classList.add(textStyleClassName);
				movingElement.classList.add('text');
				newBlock = new Text(type, movingElement.classList, movingElement.style.color, movingElement.dataset.textstyle);
				newBlock.saveToLS();
				break;
		}
	}
}

function dragDrop(e) {
	e.stopPropagation();
	e.preventDefault();
	console.log('drag drop');
	if (!e.target.isSameNode(movingElement)) {
		this.append(movingElement);
		movingElement.classList.remove('element');
		movingElement.classList.add('template__element');
		addListenersForNewElement(movingElement);
		if (!templateFlag) {
			createNewElement(e, movingElement);
		} else {
			setPosition(e);
		}
	}
}

function pasteCopiedElement(movingElement) {
	templateBlock.append(movingElement);
	movingElement.style.top = movingElement.style.top.slice(0, -2) - (-50) + 'px';
	movingElement.style.left = movingElement.style.left.slice(0, -2) - (-50) + 'px';
	movingElement.classList.remove('selected');
	addListenersForNewElement(movingElement);
}

function addListenersForNewElement(movingElement) {
	movingElement.addEventListener('click', handleClick);
	movingElement.addEventListener('dblclick', handleDoubleClick);
	movingElement.addEventListener('focusout', handleFocusOut);
	movingElement.addEventListener('dragstart', dragStart);
}

function setPosition(e) {
	offParTop = e.target.offsetParent.offsetTop;
	offParLeft = e.target.offsetParent.offsetLeft;
	movingElement.style.top = e.clientY - elementY - offParTop + 'px';
	movingElement.style.left = e.clientX - elementX - offParLeft + 'px';
}

function getPosition(e) {
	elementY = e.offsetY;
	elementX = e.offsetX;
}

function handleClick(e) {
	e.target.classList.add('selected');
	e.target.focus();
	console.log('focus');
	e.target.addEventListener('keydown', handleKeyDown);
}

function handleDoubleClick(e) {
	console.log('dblclick');
	e.target.contentEditable = true;
	e.target.removeEventListener('click', handleClick);
	e.target.removeEventListener('keydown', handleKeyDown);
	e.target.classList.add('selected');
	if (e.target.dataset.type === 'text') {
		e.target.style.height = 'auto';
	}
}

function handleFocusOut(e) {
	console.log('focusout');
	window.getSelection().removeAllRanges();
	e.target.contentEditable = false;
	e.target.classList.remove('selected');
	e.target.addEventListener('click', handleClick);
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

}

function getTemplateFlag(e) {
	console.log('templateFlag');
	console.log(e.target.parentNode);
	if (e.target.parentNode.isSameNode(templateBlock)) {
		templateFlag = true;
	} else {
		templateFlag = false;
	}
}

// function getElementMousePosMenu(e) {
// 	templateFlag = false;
// 	console.log('from menu');
// 	elementY = e.offsetY;
// 	elementX = e.offsetX;
// }

// function getElementMousePosTemplate(e) {
// 	console.log('from template');
// 	templateFlag = true;
// 	elementY = e.offsetY;
// 	elementX = e.offsetX;
// }
// dragAndDrop();

// let elementsInLS = [];
// const saveAllToLS = () => {
// 	localStorage.setItem('template', JSON.stringify(templateElements));
// }
// saveAllToLS();
// const makeMapOfElements = () => {
// 	const templateMap = new Map();
// 	templateElements.forEach(el => {
// 		const key = el.type;
// 		if (!templateMap.get(key)) {
// 			templateMap.set(key, [el]);
// 		} else {
// 			templateMap.set(key, [...templateMap.get(key), el]);
// 		}
// 	});
// }
// makeMapOfElements();

// const renderTemplate = () => {

// 	templateElements.forEach(el => {
// 		let newElement = document.createElement('div');
// 		newElement.style.width = el.size.width;
// 		newElement.style.height = el.size.height;
// 		if (el.type === 'block') {

// 		} else if (el.type === 'block' || el.type === 'button') {
// 			newElement.style.backgroundColor = el.bgColor;
// 		}

// 		document.querySelector('.template').append(newElement);
// 	})
// }
// renderTemplate();

// const templateElements = [{
// 	templateInd: 0,
// 	type: 'block',
// 		size: {
// 		width: '100%',
// 		height: '80px'
// 	},
// 	classes: [],
// 	parent: menuBlock,
// 	bgColor: '#c6c3af'
// }, {
// 	templateInd: 1,
// 	type: 'block',
// 	size: {
// 		width: '100%',
// 		height: '500px'
// 	},
// 	classes: [],
// 	parent: templateBlock,
// 	bgColor: '#fff973'
// }, {
// 	templateInd: 2,
// 	type: 'block',
// 	size: {
// 		width: '100%',
// 		height: '300px'
// 	},
// 	classes: [],
// 	parent: menuBlock,
// 	bgColor: '#ffffff'
// }, {
// 	templateInd: 3,
// 	type: 'block',
// 	size: {
// 		width: '100%',
// 		height: '500px'
// 	},
// 	classes: [],
// 	parent: menuBlock,
// 	bgColor: '#c6c3af'
// }, {
// 	templateInd: 4,
// 	type: 'block',
// 	size: {
// 		width: '100%',
// 		height: '100px'
// 	},
// 	classes: [],
// 	parent: templateBlock,
// 	bgColor: '#fff973'
// }, {
// 	type: 'button',
// 	size: {
// 		width: '150px',
// 		height: '30px'
// 	},
// 	position: {
// 		x: 200,
// 		y: 500
// 	},
// 	classes: [],
// 	parent: templateBlock,
// 	bgColor: '#fff973',
// 	text: 'Кнопка',
// }, {
// 	type: 'button',
// 	size: {
// 		width: '150px',
// 		height: '30px'
// 	},
// 	position: {
// 		x: 200,
// 		y: 200
// 	},
// 	classes: [],
// 	parent: templateBlock,
// 	bgColor: '#c6c3af',
// 	text: 'Кнопка'
// }, {
// 	type: 'text',
// 	size: {
// 		width: '150px',
// 		height: '30px'
// 	},
// 	position: {
// 		x: 400,
// 		y: 100
// 	},
// 	classes: [],
// 	fontSize: '24px',
// 	parent: templateBlock,
// 	color: '#000',
// 	text: 'Заголовок 1'
// }, {
// 	type: 'text',
// 	size: {
// 		width: '150px',
// 		height: '30px'
// 	},
// 	position: {
// 		x: 400,
// 		y: 200
// 	},
// 	classes: [],
// 	fontSize: '20px',
// 	parent: templateBlock,
// 	color: '#000',
// 	text: 'Заголовок 2'
// }, {
// 	type: 'text',
// 	size: {
// 		width: '150px',
// 		height: '30px'
// 	},
// 	position: {
// 		x: 400,
// 		y: 500
// 	},
// 	classes: [],
// 	fontSize: '14px',
// 	parent: templateBlock,
// 	color: '#000',
// 	text: 'Ваш текст будет написан в этом блоке'
// }, {
// 	type: 'image',
// 	size: {
// 		width: '150px',
// 		height: '150px'
// 	},
// 	position: {
// 		x: 200,
// 		y: 800
// 	},
// 	classes: [],
// 	parent: templateBlock,
// 	border: '1px solid #c6c3af',
// 	bgImage: './img/work-together.jpg'
// }, {
// 	type: 'icon',
// 	size: {
// 		width: '24px',
// 		height: '24px'
// 	},
// 	position: {
// 		x: 500,
// 		y: 1000
// 	},
// 	classes: [],
// 	parent: templateBlock,
// 	border: '1px solid #c6c3af',
// 	icon: './img/social/facebook.svg',
// 	link: 'https://www.facebook.com'
// }];;
