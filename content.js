// стандартные настройки 
var delay = 30; // количество секунд между бампами
var message = 'Бамп'; // стандартное сообщение для бампа

// слушаем событие начала бампа с попапа
chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.message === "start" ) {
         	start_autobump(delay, message);
        }
      }
);

// функция, начинающая автобамп
function start_autobump(delay, message) {

	console.log('Starting autobump...');

	// парсим с URL код текущей доски и номер треда
	if (window.location.pathname.split('/')[2] == 'res') {
		var url = window.location.pathname.split('/');
		var board = url[1];
		var thread = parseInt(url[3]);	

	// добавляем бамп-пост каждые delay секунд
	setInterval(function() {
		addPost(board, thread, message);
	}, delay * 1000);

	console.log('Autobump started...');

	} else {
		console.log('Для работы расширения должен быть открыт тред...');
		alert('Для начала автобампа откройте вкладку с тредом');
	}

}

// универсальная функция отправки сообщения на Двач на основе API
function addPost(board, thread, message) {
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://2ch.hk/makaba/posting.fcgi?json=1', true);

	xhr.send(
			  'task=post' +
		'&' + 'board=' + board + 
		'&' + 'thread=' + thread +
		'&' + 'comment=' + message +
		'&' + 'captcha_type=recaptcha'
	); 

	xhr.onreadystatechange = function() {
  		if (xhr.readyState != 4) return;

  		if (xhr.status != 200) {
    		console.log('Абу шатает макабу', xhr.status + ': ' + xhr.statusText);

  		} else {
    		console.log('Bumped!');
  		}

	}
}