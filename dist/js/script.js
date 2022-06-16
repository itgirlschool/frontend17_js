console.log('Это написал скрипт из файла sidebar.js');;
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