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
// }];