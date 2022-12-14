var apiKey = '2193d760faaf2569d7030d04e1cbd2cc';
var input = document.querySelector('#user-search')
var searchBtn = document.querySelector('.searchButton');
var currentCard = document.querySelector('.currentWeather');
var fail = document.querySelector('.fail-button');

var startSearch = function(event) {
    event.preventDefault();
    var w = input.value.trim();
    getCode(w);
}

var getCode = function(w){
    var codeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + w + "&limit=5&appid=" + apiKey;
    
    fetch(codeURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
               getCoords(data);
            });
        } else {
            fail.click();
         }
     })
     .catch(function (error) {
         fail.click();
     });
 }
var getCoords = function(data) {
    var lattitude = data[0].lat;
    var longitude = data[0].lon;
    resolveCurrent(lattitude, longitude);
}

var resolveCurrent = function(lattitude, longitude) {    
    var openWeatherURL = 'https:api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + lattitude + '&lon=' + longitude + '&appid=' + apiKey;
    
    fetch(openWeatherURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayMainCard(data)
                
            });
        } else {
            fail.click();
         }
     })
     .catch(function (error) {
         fail.click();
     });
 }

var resolveFiveDay = function(lattitude, longitude) {    
    var openWeatherURL = 'https:api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + lattitude + '&lon=' + longitude + '&appid=' + apiKey;
    
    fetch(openWeatherURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayFiveDay(data.city, data.list)
                
            });
        } else {
            fail.click();
         }
     })
     .catch(function (error) {
         fail.click();
     });
 }

    var displayMainCard = function(data){
        currentCard.innerHTML = null;
        var icon = data.weather[0].icon
        var iconImage = 'http://openweathermap.org/img/w/' + icon + '.png';
        var unixTimestamp = data.dt;
        var date = new Date(unixTimestamp * 1000);
        
        var card = document.createElement('div')
        var cardBody = document.createElement('div')
        var cardTitle = document.createElement('h2');
        var iconSpan = document.createElement('span');
        var iconImg = document.createElement('img');
        var tempPEl = document.createElement('p');
        var windPEl = document.createElement('p');
        var humidityPEl = document.createElement('p');

        card.className = 'card col-10 m-3 p-3';
        cardBody.classname = 'card-body';
        cardTitle.className = 'card-title';
        iconImg.setAttribute('src', iconImage)
        iconImg.setAttribute('alt', 'Open Weather Icon')

        cardTitle.textContent = data.name + ' - ' + date.toLocaleDateString('en-US');
        tempPEl.textContent = 'Temp: ' + data.main.temp + ' °F';
        windPEl.textContent = 'Wind: ' + data.wind.speed + ' MPH';
        humidityPEl.textContent = 'Humidity: ' + data.main.humidity + ' %';

        currentCard.append(card);
        card.append(cardBody);
        cardBody.append(cardTitle, tempPEl, windPEl, humidityPEl);
        cardTitle.appendChild(iconSpan);
        iconSpan.append(iconImg);
    }

    var displayFiveDay = function (city, list){
        for(i = 0; i < displayMainCard.length)
        var card = document.createElement('div')
        var cardBody = document.createElement('div')
        var cardTitle = document.createElement('h2');
        var iconSpan = document.createElement('span');
        var iconImg = document.createElement('img');
        var tempPEl = document.createElement('p');
        var windPEl = document.createElement('p');
        var humidityPEl = document.createElement('p'); 

        card.className = 'card col-2 m-2 p-2';
        cardBody.classname = 'card-body';
        cardTitle.className = 'card-title';
        iconImg.setAttribute('src', iconImage)
        iconImg.setAttribute('alt', 'Open Weather Icon')
    }

searchBtn.addEventListener('click', startSearch);