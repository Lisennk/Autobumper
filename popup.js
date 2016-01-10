// вешаем событие начала автобампа на кнопку
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("start_autobump").addEventListener("click", function() {
    	chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
		   	var activeTab = tabs[0];
		    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
		    text.innerHTML = 'Теперь этот тред будет бампаться до перезагрузки страницы';
		    text.style.color = '#FF6600';
		    start_autobump.style.display = 'none';
		    monkey.style.display = 'block';

  		});
	});
});