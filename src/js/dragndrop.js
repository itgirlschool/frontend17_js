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
		constructor(menuId, parent) {
			this.menuId = menuId;
			this.parent = parent;
		}

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
			let item = JSON.stringify(this);
			console.log(item);
			if (!localStorage.getItem('template')) {
				localStorage.setItem('template', JSON.stringify(this))
			} else {
				localStorage.setItem('template', [localStorage.getItem('template'), JSON.stringify(this)])
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
		constructor(menuId, parent, type, classes, width, height, posX, posY, bgColor, btnLabel, fontColor) {
			super(menuId, parent, type, classes, width, height, posX, posY);
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
		constructor(menuId, parent, type, classes, width, height, posX, posY, iconColor, link) {
			super(menuId, parent, type, classes, width, height, posX, posY);
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

	const dragDrop = function (e) {
		e.preventDefault();
		console.log('drag drop');
		this.append(movingElement);
		movingElement.classList.remove('menu__element');
		movingElement.classList.add('template__element');
		movingElement.removeEventListener('mousedown', getElementMousePosMenu);
		movingElement.addEventListener('mousedown', getElementMousePosTemplate);
		movingElement.addEventListener('dragstart', dragStart);
		if (!templateFlag) {
			if (movingElement.dataset.type === 'block') {
				movingElement.classList.add('wide');
				console.log(movingElement);
				const newBlock = new Block(movingElement.dataset.type, movingElement.classList, movingElement.style.backgroundColor);
				newBlock.saveToLS();
				console.log(newBlock);
			} else {
				movingElement.classList.add('draggable-element');
				movingElement.style.top = e.layerY - elementY + 1 + 'px';
				movingElement.style.left = e.layerX - elementX + 1 + 'px';
			}
		} else {
			movingElement.style.top = e.clientY - elementY + 'px';
			movingElement.style.left = e.clientX - elementX + 'px';
		}
	}

	const getElementMousePosMenu = function (e) {
		templateFlag = false;
		if (e.target.tagName === 'path') {
			elementX = e.layerX - e.target.parentNode.parentNode.offsetLeft + 5;
			elementY = e.layerY - e.target.parentNode.parentNode.offsetTop + 5;
		} else if (e.target.tagName === 'svg') {
			elementX = e.layerX - e.target.parentNode.offsetLeft + 5;
			elementY = e.layerY - e.target.parentNode.offsetTop + 5;
		} else if (e.target.parentNode === menuBlock) {
			elementX = e.layerX - e.originalTarget.offsetLeft;
			elementY = e.layerY - e.originalTarget.offsetTop;
		}
	}
	const getElementMousePosTemplate = function (e) {
		templateFlag = true;
		if (e.target.tagName === 'path' || e.target.tagName === 'svg') {
			elementX = e.layerX + 5;
			elementY = e.layerY + 5;
		} else {
			elementX = e.layerX;
			elementY = e.layerY;
		}
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
dragAndDrop();