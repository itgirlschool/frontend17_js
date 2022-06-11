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

const menuBlock = document.querySelector('.menu');
const templateBlock = document.querySelector('.template');
const templateElements = [{
	templateInd: 1,
	type: ['block'],
	size: {
		width: '100%',
		height: '80px'
	},
	classes: [],
	parent: menuBlock,
	bgColor: '#c6c3af'
}, {
	templateInd: 2,
	type: ['block'],
	size: {
		width: '100%',
		height: '500px'
	},
	classes: [],
	parent: templateBlock,
	bgColor: '#fff973'
}, {
	templateInd: 3,
	type: ['block'],
	size: {
		width: '100%',
		height: '300px'
	},
	classes: [],
	parent: menuBlock,
	bgColor: '#ffffff'
}, {
	templateInd: 4,
	type: ['block'],
	size: {
		width: '100%',
		height: '500px'
	},
	classes: [],
	parent: menuBlock,
	bgColor: '#c6c3af'
}, {
	templateInd: 5,
	type: ['block'],
	size: {
		width: '100%',
		height: '100px'
	},
	classes: [],
	parent: templateBlock,
	bgColor: '#fff973'
}, {
	type: ['button'],
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
	type: ['button'],
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
	type: ['text'],
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
	menuId: 'header-h2',
	type: ['text'],
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
	menuId: 'text',
	type: ['text'],
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
	type: ['image'],
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
	type: ['icon'],
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

class ResizableElement extends Element {
	constructor(menuId, parent, type, classes) {
		super(menuId, parent);
		this.type = type;
		this.classes = classes;
	}
	changeHeight() {
		// TODO
	}
	changeWidth() {
		// TODO
	}
}

class Block extends Element {
	constructor(menuId, parent, type, classes, bgColor) {
		super(menuId, parent, type, classes);
		this.bgColor = bgColor;
	}
	setTemplateInd() {
		this.templateInd = templateIndCount++;
	}
	setBackgroundColor() {
		// TODO
	}
}
class Button extends Element {
	constructor(menuId, parent, type, classes, bgColor) {
		super(menuId, parent, type, classes);
		this.bgColor = bgColor;
	}
	setTemplateInd() {
		this.templateInd = templateIndCount++;
	}
	setBackgroundColor() {
		// TODO
	}
}
const saveToLS = () => {
	console.log(templateElements);
	localStorage.setItem('template', JSON.stringify(templateElements));
}
saveToLS();
const getFromLS = () => {
	const templateMap = new Map
}
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
const dragAndDrop = () => {

	const elements = document.querySelectorAll('.menu__element');
	let movingElement = '';
	let elementX = 0;
	let elementY = 0;

	const dragStart = function (e) {
		setTimeout(() => {
			if (e.target.parentNode === menuBlock) {
				movingElement = e.target.cloneNode(true);
			} else if (e.target.parentNode === templateBlock) {
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
		if (e.target.parentNode === menuBlock) {
			elementX = e.layerX - e.originalTarget.offsetLeft;
			elementY = e.layerY - e.originalTarget.offsetTop;
		} else if (e.target.parentNode === templateBlock) {
			elementX = e.layerX;
			elementY = e.layerY;
		}
	}

	elements.forEach(el => {
		el.addEventListener('dragstart', dragStart);
		el.addEventListener('dragend', dragEnd);
		el.addEventListener('mousedown', getElementMousePos)
	});
	templateBlock.addEventListener('dragover', dragOver);
	templateBlock.addEventListener('dragenter', dragEnter);
	templateBlock.addEventListener('drop', dragDrop);
}
dragAndDrop();