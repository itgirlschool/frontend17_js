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
    bgColor: '#c6c3af77'
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
    bgColor: '#c6c3af77'
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
    text: 'Заголовок'
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
    bgImage: 'url(./img/bar-chart.png)'
}, {
    type: 'image',
    width: '150px',
    height: '150px',
    border: '1px solid #c6c3af',
    bgImage: 'url(./img/team-work.png)'
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
                    `<div class="element" tabindex="0" data-type="${element.type}" style="background: ${element.bgColor}; width: ${element.width}; height: ${element.height};" draggable="true"> </div>`;
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
                    `<div class="element" tabindex="0" data-type="${element.type}" data-textstyle="${element.textStyle}" style="color: ${element.color}; width: ${element.width}; height: ${element.height}; font-size: ${element.fontSize}" draggable="true">${element.text}</div>`;
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
                    `<div class="element" tabindex="0" data-type="${element.type}" style="width: ${element.width}; border: ${element.border}; background-image: ${element.bgImage}; height: ${element.height};" draggable="true"> </div>`;
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
                    `<div class="element" tabindex="0" data-type="${element.type}" style="width: ${element.width}; border: ${element.border}; icon: ${element.icon}; height: ${element.height};" draggable="true"> </div>`;
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
templateBlock.addEventListener('dragleave', dragLeave);
templateBlock.addEventListener('drop', dragDrop, {
	capture: true
});
document.querySelector('.save img').addEventListener('click', handleSaveClick);

// --------------- render ---------------

handleDocLoad();

function handleDocLoad() {
	console.log('load');
	const email = userLoggedIn();
	console.log(email);
	if (isUserTemplateInLS(email)) {
		const template = JSON.parse(localStorage.getItem(email));
		renderPopup(template, 'open');
	}
}

function userLoggedIn() {
	const email = localStorage.getItem('email')
	return ((email) && (localStorage.getItem('login') === 'true')) ? email : false;
}

function isUserTemplateInLS(email) {
	return (localStorage.getItem(email) !== null) ? true : false;
}

function renderPopup(template, action) {
	const popupSelectTemplate = document.querySelector('#windowSelectTemplate > .popup__form');
	popupSelectTemplate.innerHTML = '';
	template.forEach((el, i) => {
		let selectTemplateBtn = document.createElement('button');
		selectTemplateBtn.textContent = el.name;
		selectTemplateBtn.classList.add('btnForm');
		selectTemplateBtn.dataset.id = i;
		popupSelectTemplate.append(selectTemplateBtn);
		selectTemplateBtn.addEventListener('click', {
			handleEvent: selectTemplate,
			arr: template,
			action: action
		});
	});
	if (action === 'open') {
		let title = document.createElement('h2');
		title.innerHTML = 'Выберите проект';
		popupSelectTemplate.prepend(title);
		addEmptyTemplateBtn(popupSelectTemplate);
	} else if (action === 'save') {
		let title = document.createElement('h2');
		title.innerHTML = 'Сохранить под именем:';
		popupSelectTemplate.prepend(title);
		console.log('save');
		addNewTemplateInput(popupSelectTemplate);
	}
	showPopup('block');
}
// function openTemplate(e) {
// 	templateBlock.innerHTML = this.arr.html;
// 	handleTemplateLoad();
// }
function addEmptyTemplateBtn(target) {
	const emptyTemplateBtn = document.createElement('button');
	emptyTemplateBtn.textContent = 'Создать новый проект';
	emptyTemplateBtn.classList.add('btnForm');
	target.append(emptyTemplateBtn);
	emptyTemplateBtn.addEventListener('click', openEmptyProject)
}

function addNewTemplateInput(target) {
	let title = document.createElement('h2');
	title.innerHTML = 'Новый проект:';
	target.append(title);
	const inputTemplateName = document.createElement('input');
	inputTemplateName.id = 'projectname';
	inputTemplateName.placeholder = 'Название проекта';
	inputTemplateName.type = 'text';
	inputTemplateName.classList.add('inputReg');
	target.append(inputTemplateName);
	const newNameSaveBtn = document.createElement('button');
	newNameSaveBtn.textContent = 'Сохранить';
	newNameSaveBtn.classList.add('btnForm');
	target.append(newNameSaveBtn);
	newNameSaveBtn.addEventListener('click', saveNewTemplate)
}

function saveNewTemplate(e) {
	const email = userLoggedIn();
	const projName = document.querySelector('#projectname').value;
	console.log(projName);
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

function openEmptyProject() {
	showPopup('none');
}

// function renderTemplate() {
// 	// const email = localStorage.getItem('email');
// 	const template = JSON.parse(localStorage.getItem(email));
// 	if (template !== null) {
// 		if (template.length > 1) {
// 			renderPopup(template);
// 		} else {
// 			templateBlock.innerHTML = template.html;
// 			handleTemplateLoad();
// 		}
// 	}
// }

function showPopup(state) {
	document.getElementById('windowSelectTemplate').style.display = state;
	document.getElementById('grayBackground').style.display = state;
}

// --------------- save and load from LS ---------------

function handleTemplateLoad() {
	const elements = getTemplateElements();
	elements.forEach(el => {
		addListenersForNewElement(el);
	})
}

function getTemplateElements() {
	return document.querySelectorAll('.template__element');
}

function selectTemplate(e) {
	if (this.action === 'open') {
		renderHtmlById(e.target.dataset.id, this.arr);
		handleTemplateLoad();
	} else if (this.action === 'save') {

	}
	showPopup('none');
}

function renderHtmlById(htmlId, template) {
	html = template[htmlId].html;
	templateBlock.innerHTML = html;
}
// ------------------ save -------------------------

function handleSaveClick(e) {
	const email = userLoggedIn();
	if (isUserTemplateInLS(email)) {
		const template = JSON.parse(localStorage.getItem(email));
		renderPopup(template, 'save');
	} else {
		showIn('block');
	}
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
				movingElement.classList.add(textStyleClassName);
				movingElement.classList.add('template__text');
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
	offParTop = e.target.offsetParent.offsetTop;
	offParLeft = e.target.offsetParent.offsetLeft;
	movingElement.style.top = e.clientY - elementY - offParTop + 'px';
	movingElement.style.left = e.clientX - elementX - offParLeft + 'px';
}

function getPosition(e) {
	elementY = e.offsetY;
	elementX = e.offsetX;
}

// -------------- editing handlers -------------------

function handleClick(e) {
	e.target.classList.add('selected');
	e.target.focus();
	e.target.addEventListener('keydown', handleKeyDown);
}

function handleDoubleClick(e) {
	e.target.contentEditable = true;
	e.target.removeEventListener('click', handleClick);
	e.target.removeEventListener('keydown', handleKeyDown);
	e.target.classList.add('selected');
	if (e.target.dataset.type === 'text') {
		e.target.style.height = 'auto';
	}
}

function handleFocusOut(e) {
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
};
