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
dragAndDrop();