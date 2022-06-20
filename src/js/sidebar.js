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
// };