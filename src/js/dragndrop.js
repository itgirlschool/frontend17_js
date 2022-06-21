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
}