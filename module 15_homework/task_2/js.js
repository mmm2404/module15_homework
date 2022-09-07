//находим кнопку в DOM
const btn = document.querySelector(".btn");

function alertSize(){
    //навешиваем обработчик на кнопку, записываем переменные в результат и выводим в alert
    btn.addEventListener('click', () => {
        const scrWidth = window.screen.availWidth;
        const scrHeight = window.screen.availHeight;
        let result = alert('Ширина экрана: ' + scrWidth + ' Высота: '  + scrHeight)
        return result;
    })
}
document.addEventListener("DOMContentLoaded", alertSize);