# frontend17_js

Наш проект использует сборщик Gulp.
Чтобы начать работу: 
1. Клонируйте репозиторий.
2. В терминале введите npm install.
3. Чтобы сборщик начал работать, в терминале введите gulp.
	В проекте появится папка dist и проект откроется в браузере. 
4. Cоздайте новую ветвь и сделайте "Опубликовать ветвь".

Теперь можно работать над проектом в своей ветке.
Наша папка - src, папка сборщика - dist, ее нам трогать не нужно, мы работаем в src.

Как совместно работать в Gulp.

HTML: 
- html-файлы класть в корень папки src (рядом с остальными, там уже есть пример).
- Название вашего html-файла должно начинаться с _ (подчеркивания), например, _myfile.html 
- Подключить свой файл к index.html - добавить в index.html строку @@include('_myfile.html'). 

JS:
- Класть в src/js.
- Название любое, _ не обязательно.
- Подключить свой файл к script.js - добавить в  script.js строку @@include('myscript.js'). 

SCSS:
- Стили пишем в src/scss/main.scss.

Чтобы видеть изменения в своем проекте в режиме онлайн, нужно ввести в терминале команду gulp. Остановить работу Gulp (если нужно ввести какую-то другую команду или сделать Pull Request) - в терминале с помощью клавиш Ctrl + C.
Пока Gulp работает, он преобразует scss в css, собирает наши html в один, js тоже в один файл и показывает в браузере уже обработанные файлы из папки dist. 
Если Gulp остановлен, то сайт уже не будет автоматически обновляться.

Папку node-modules выгружать в git не нужно. 
