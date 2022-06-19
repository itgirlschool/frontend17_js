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
};