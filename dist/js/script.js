let json = `[{
    "type": "block",
    "width": "100%",
    "height": "80px",
    "bgColor": "grey"
},{
    "type": "block",
    "width": "80px",
    "height": "80px",
    "bgColor": "grey",
    "borderRadius": "50%"
},{
    "type": "block",
    "width": "100px",
    "height": "100px",
    "border": "thick solid grey"
},{
    "type": "block",
    "width": "100%",
    "height": "500px",
    "bgColor": "#c6c3af",
    "borderRadius": "40px"
},{
    "type": "block",
    "width": "100px",
    "height": "50px",
    "bgColor": "#fff973",
    "borderRadius": "100px / 50px"
},{
    "type": "block",
    "width": "100%",
    "height": "100px",
    "bgColor": "pink"
},{
    "type": "block",
    "width": "0",
	"height": "0",
    "borderLeft": "50px solid transparent",
	"borderRight": "50px solid transparent",
	"borderBottom": "100px solid #fff973"
},{
    "type": "block",
    "width": "0",
	"height": "0",
    "borderTop": "50px solid transparent",
	"borderRight": "100px solid pink",
	"borderBottom": "50px solid transparent"
},{
    "type": "block",
    "width": "0",
	"height": "0",
	"borderRight": "100px solid transparent",
	"borderBottom": "100px solid yellow"
},{
    "type": "button",
    "width": "150px",
    "height": "30px",
    "bgColor": "#fff973",
    "color": "black",
    "text": "Кнопка"
},{
    "type": "button",
    "width": "150px",
    "height": "30px",
    "bgColor": "#c6c3af",
    "color": "black",
    "text": "Кнопка"
},{
    "type": "text",
    "width": "150px",
    "height": "30px",
    "fontSize": "20px",
    "color": "#000",
    "text": "Заголовок 2"
},{
    "type": "text",
    "width": "150px",
    "height": "30px",
    "fontSize": "20px",
    "color": "#000",
    "text": "Ваш текст будет написан в этом блоке"
},{
    "type": "image",
    "width": "150px",
    "height": "150px",
    "border": "1px solid #c6c3af",
    "bgImage": "url(./img/work-together.jpg) "
},{
    "type": "icon",
    "width": "24px",
    "height": "24px",
    "border": "1px solid #c6c3af",
    "icon": "url(./img/social/facebook.svg)",
    "link": "https://www.facebook.com"
}]`

const leftSidebarButton = document.querySelector('.left-sidebar__button');
const leftSidebarMenu = document.querySelector('.left-sidebar__menu');

leftSidebarButton.addEventListener('click', function () {
    leftSidebarMenu.classList.toggle("leftSidebarMenu");
});

let jsonElements = JSON.parse(json);
let blocksArray = [];
let buttonsArray = [];
let textArray = [];
let imagesArray = [];
let iconsArray = [];

for (let jsonElement of jsonElements) {
    const jsonElementType = jsonElement.type;
    switch (true) {
        case (jsonElementType == "block"): {
            blocksArray.push(jsonElement);
            break;
        }
        case (jsonElementType == "button"): {
            buttonsArray.push(jsonElement)
            break;
        }
        case (jsonElementType == "text"): {
            textArray.push(jsonElement)
            break;
        }
        case (jsonElementType == "image"): {
            imagesArray.push(jsonElement)
            break;
        }
        case (jsonElementType == "icon"): {
            iconsArray.push(jsonElement)
            break;
        }
    }
}

//отрисовываем элементы из json в меню
function drawCategories(elements) {
    let elementsContent = "";
    for (let element of elements) {
        elementsContent +=
            `<div class="element elementPreview"
            draggable="true"
            data-type="${element.type}"
            style="background: ${element.bgColor}; width: ${element.width}; height: ${element.height}; color: ${element.color}; fontSize: ${element.fontSize}; border: ${element.border}; bgImage: ${element.bgImage}; icon: ${element.icon}; link: ${element.link}; border-radius: ${element.borderRadius}; border-left: ${element.borderLeft}; border-right: ${element.borderRight}; border-bottom: ${element.borderBottom}; border-top: ${element.borderTop};
            ">` +
            ((element.text == undefined) ? `` : `"${element.text}"`) +
            `</div>`;
    }
    document.querySelector(".left-sidebar__elements").innerHTML = elementsContent;
    dragFromSidebar();
}

let categories = document.querySelectorAll(".categories__button");
for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener('click', function (event) {
        let target = event.target;

        switch (true) {
            case (target.classList.contains('left-sidebar__categories-block')): {
                let elements = blocksArray;
                drawCategories(elements);
                break;
            }
            case (target.classList.contains('left-sidebar__categories-button')): {
                let elements = buttonsArray;
                drawCategories(elements);
                break;
            }
            case (target.classList.contains('left-sidebar__categories-text')): {
                let elements = textArray;
                drawCategories(elements);
                break;
            }
            case (target.classList.contains('left-sidebar__categories-image')): {
                let elements = imagesArray;
                drawCategories(elements);
                break;
            }
            case (target.classList.contains('left-sidebar__categories-icon')): {
                let elements = iconsArray;
                drawCategories(elements);
                break;
            }
        }
    });
};

//при клике на элемент выводит его в body, где потом его можно переносить с dragndrop
let elementId = 0;

function dragFromSidebar() {
    let newElements = document.querySelectorAll(".element");

    for (let j = 0; j < newElements.length; j++) {
        newElements[j].addEventListener('click', function (event) {
            let target = event.target;
            const newDiv = target.cloneNode(true);
            elementId++;
            newDiv.id = elementId; //чтобы обратиться по id
            document.body.appendChild(newDiv);
            newDiv.classList.remove("elementPreview");
        });
    }
};;
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
	border: 'border',
	bgColor: 'color',
	bgImage: 'url',
	icon: 'url',
	link: 'url'
}
*/
const dragAndDrop = () => {
	const menuBlock = document.querySelector('.menu');
	const templateBlock = document.querySelector('.template');
	// let elementsInLS = [];
	const templateElements = [{
		templateInd: 0,
		type: 'block',
		size: {
			width: '100%',
			height: '80px'
		},
		classes: [],
		parent: menuBlock,
		bgColor: '#c6c3af'
	}, {
		templateInd: 1,
		type: 'block',
		size: {
			width: '100%',
			height: '500px'
		},
		classes: [],
		parent: templateBlock,
		bgColor: '#fff973'
	}, {
		templateInd: 2,
		type: 'block',
		size: {
			width: '100%',
			height: '300px'
		},
		classes: [],
		parent: menuBlock,
		bgColor: '#ffffff'
	}, {
		templateInd: 3,
		type: 'block',
		size: {
			width: '100%',
			height: '500px'
		},
		classes: [],
		parent: menuBlock,
		bgColor: '#c6c3af'
	}, {
		templateInd: 4,
		type: 'block',
		size: {
			width: '100%',
			height: '100px'
		},
		classes: [],
		parent: templateBlock,
		bgColor: '#fff973'
	}, {
		type: 'button',
		size: {
			width: '150px',
			height: '30px'
		},
		position: {
			x: 200,
			y: 500
		},
		classes: [],
		parent: templateBlock,
		bgColor: '#fff973',
		text: 'Кнопка',
	}, {
		type: 'button',
		size: {
			width: '150px',
			height: '30px'
		},
		position: {
			x: 200,
			y: 200
		},
		classes: [],
		parent: templateBlock,
		bgColor: '#c6c3af',
		text: 'Кнопка'
	}, {
		type: 'text',
		size: {
			width: '150px',
			height: '30px'
		},
		position: {
			x: 400,
			y: 100
		},
		classes: [],
		fontSize: '24px',
		parent: templateBlock,
		color: '#000',
		text: 'Заголовок 1'
	}, {
		type: 'text',
		size: {
			width: '150px',
			height: '30px'
		},
		position: {
			x: 400,
			y: 200
		},
		classes: [],
		fontSize: '20px',
		parent: templateBlock,
		color: '#000',
		text: 'Заголовок 2'
	}, {
		type: 'text',
		size: {
			width: '150px',
			height: '30px'
		},
		position: {
			x: 400,
			y: 500
		},
		classes: [],
		fontSize: '14px',
		parent: templateBlock,
		color: '#000',
		text: 'Ваш текст будет написан в этом блоке'
	}, {
		type: 'image',
		size: {
			width: '150px',
			height: '150px'
		},
		position: {
			x: 200,
			y: 800
		},
		classes: [],
		parent: templateBlock,
		border: '1px solid #c6c3af',
		bgImage: './img/work-together.jpg'
	}, {
		type: 'icon',
		size: {
			width: '24px',
			height: '24px'
		},
		position: {
			x: 500,
			y: 1000
		},
		classes: [],
		parent: templateBlock,
		border: '1px solid #c6c3af',
		icon: './img/social/facebook.svg',
		link: 'https://www.facebook.com'
	}];

	let templateIndCount = 0;

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
		constructor(menuId, parent, type, classes, color) {
			super(menuId, parent, type, classes);
			this.color = color;
		}
		setColor() {
			// TODO
		}
	}

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

	const elements = document.querySelectorAll('.menu__element');
	let templateFlag = false;
	let movingElement = null;
	let elementX = 0;
	let elementY = 0;

	const dragStart = function (e) {
		console.log('drag start');
		setTimeout(() => {
			if (e.target.parentNode === menuBlock) {
				movingElement = e.target.cloneNode(true);
			} else if (e.target.parentNode === templateBlock) {
				movingElement = e.target;
			}
		})
	}

	const dragEnd = function (e) {
		// console.log('drag end');
	}
	const dragOver = function (e) {
		e.preventDefault();
		// console.log('drag over');
	}
	const dragEnter = function (e) {
		e.preventDefault();
		// console.log('drag enter');
	}
	const dragLeave = function () {
		e.preventDefault();
		// console.log('drag leave');
	}
	const createNewElement = function (e, movingElement) {
		const type = movingElement.dataset.type;
		let newBlock = null;
		if (type === 'block') {
			movingElement.classList.add('wide');
			newBlock = new Block(type, movingElement.classList, movingElement.style.backgroundColor);
			newBlock.saveToLS();
		} else {
			movingElement.classList.add('draggable-element');
			movingElement.style.top = e.layerY - elementY + 'px';
			movingElement.style.left = e.layerX - elementX + 'px';
			if (type === 'button') {
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
				// console.log(newBlock);
			} else if (type === 'icon') {
				// newBlock = new SocialIcon(type, movingElement.classList, movingElement.clientWidth,
				// movingElement.clientHeight,
				// movingElement.style.left,
				// movingElement.style.top,
				// iconColor, link);
				// newBlock.saveToLS();
				// console.log(newBlock);
			}
		}
	}
	const dragDrop = function (e) {
		e.preventDefault();
		console.log('drag drop');
		console.log(movingElement);
		// console.log(e.clientY, e.clientX, e.layerY, e.layerX);
		this.append(movingElement);
		movingElement.classList.remove('menu__element');
		movingElement.classList.add('template__element');
		movingElement.removeEventListener('mousedown', getElementMousePosMenu);
		movingElement.addEventListener('mousedown', getElementMousePosTemplate);
		movingElement.addEventListener('dragstart', dragStart);
		if (!templateFlag) {
			createNewElement(e, movingElement);
		} else {
			movingElement.style.top = e.clientY - elementY + 'px';
			movingElement.style.left = e.clientX - elementX + 'px';
		}
	}

	const getElementMousePosMenu = function (e) {
		templateFlag = false;
		console.log('from menu');
		elementY = e.offsetY;
		elementX = e.offsetX;
		// if (e.target.tagName === 'path' || e.target.tagName === 'svg') {
		// 	elementY = e.offsetY;
		// 	elementX = e.offsetX;
		// } else {
		// 	elementY = e.offsetY;
		// 	elementX = e.offsetX;
		// }
	}
	const getElementMousePosTemplate = function (e) {
		console.log('from template');
		console.log(`e.client: ${e.clientY},${e.clientX}`);
		console.log(e);
		console.log('offset E: ' + e.offsetY, e.offsetX);
		console.log('offset: ' + e.target.offsetTop, e.target.offsetLeft);
		templateFlag = true;
		elementY = e.offsetY;
		elementX = e.offsetX;
		// if (e.target.tagName === 'path' || e.target.tagName === 'svg') {
		// 	elementY = e.offsetY + 1;
		// } else {
		// 	elementY = e.offsetY;
		// }
	}

	elements.forEach(el => {
		el.addEventListener('dragstart', dragStart);
		el.addEventListener('dragend', dragEnd);
		el.addEventListener('mousedown', getElementMousePosMenu)
	});
	templateBlock.addEventListener('dragover', dragOver);
	templateBlock.addEventListener('dragenter', dragEnter);
	templateBlock.addEventListener('drop', dragDrop);
}
dragAndDrop();;
