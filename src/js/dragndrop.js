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
	document.querySelector('header').innerHTML += `<div class="header__title"></div>`;
	document.querySelector('.header__title').innerHTML = name;
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
}