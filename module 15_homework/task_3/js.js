const wsUri =" wss://echo-ws-service.herokuapp.com";


function chatLoad(){
   //находим все необходимые epks DOM
 const chatInput = document.querySelector(".input");
 const chatOutput = document.querySelector(".chat_output");
 const infoOutput = document.querySelector(".info_output");
 const sendBtn = document.querySelector(".btn_send");
 const geoBtn = document.querySelector(".btn_geo"); 
 
 //создаем новый объект Websocket

 let websocket = new WebSocket(wsUri);

//приуспешном соединеии

 websocket.onopen = () => {
    infoOutput.innerText = "Соединение установлено"
 }

 websocket.onmessage = () => {
    writeToScreen(event.data, true);
 }
 //при неуспешном соединеии 

 websocket.onerror = () => {
    infoOutput.innerText = "Сбой соединения"

 }
//навешиваем обработчики на кнопки

 sendBtn.addEventListener("click", postMessage);
 geoBtn.addEventListener("click", sendLocation);

 //распределяем сообщения от клиента и сервера

 function writeToScreen(message, isReceived) {
    let messageHTML = `<div class="${isReceived? "received" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
 }
 //функция отправки сообщений при клике на кнопку 

 function postMessage() {
    if(!chatInput.value)return;
    websocket.send(chatInput.value)
    writeToScreen(chatInput.value, false);
    chatInput.value === "";
 }
 //фунция получения гео-локации

 function sendLocation() {
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);    
        }else{
            infoOutput.innerText = "Браузер не поддерживает определение мстоположения"
        }
    }
    //колбэк при поддержке функции определения местоположения 

 function locationSuccess(data) {
    let link = `https://www.openstreetmap.org/search?whereami=1&query=${data.coords.longitude}%${data.coords.latitude}#map=18/53.94218/27.70787`
    let result = `<a class="link" target="_blank" href="${link}">Я тут</a>`
    writeToScreen(result);
 } 
 //при оштбке во время определения местоположения 

 function locationError() {
    chatOutput.innerText = "Произошла ошибка"
 }

 }


document.addEventListener("DOMContentLoaded", chatLoad);