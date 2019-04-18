# Задание 2. Верстка

## Использованные библиотеки

0. NPM для управления зависимостями в проекте;
1. webpack-dev-server - для тестирования запущенного сайта;
2. gulp-sass - для обработки и компилияции SCSS файлов в CSS;
3. micromodal - создание и открытие модальных окон. Полностью отсутствуют стили, нет необходимости писать лишний очевидный код.
4. swiper - для реализации постраничного листания в прототипе. Есть очевидные минусы, в дальнейшем нужно заменить на собственный код или библиотеку получше.

## Структура проекта

В файле index.html хранится вся разметка для макета.

Файл styles\index.css подключается как файл со стилями, сгенерирован из файла index.scss. 
В папке styles находятся все стили для логически выделенных блоков страницы.
В файле mobile.scss находятся стили для мобильной версии страницы и компонентов.
(Да, немного неправильно, нужно сделать для каждого компонента файл \*.mobile.scss)
(И вообще, использовал неправильный подход с Desktop-first, необходимо Mobile-first)

Файл index.js подключается как точка входа для исполнения всех JS-скриптов. Происходит инициализация модулей.
В папке scripts находятся скрипты, используемые в index.js.

В папке images находятся все изображения, используемые на странице.

## Известные ошибки

* В блоке избранных сценариев одна строка вместо двух. Так происходит из-за использования swiper. При наличии большего свободного времени ошибка исправится написанием своего листателя.

* Отсутствует листание устройств в блоке "Главное". Все еще ограничения swiper. Необходимо переключать ориентацию блока и листания блока при смене ширины экрана.

* Отсутствует листание списка режимов в мобильной версии в модельном окне управления устройством.