var apiKey = '2193d760faaf2569d7030d04e1cbd2cc';
var input = document.querySelector('#user-search')
var searchBtn = document.querySelector('.searchButton');
var currentCard = document.querySelector('.currentWeather')

var startSearch = function(event) {
    event.preventDefault();
    var w = input.value.trim();
    getCode(w);
}

var getCode = function(w){
    var codeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + w + "&limit=1&appid=" + apiKey;
    
    fetch(codeURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
               getCoords(data);
            });
        }
    })
    // .catch(function (error) {
            
    // });
}

var getCoords = function(data) {
    var lattitude = data[0].lat;
    var longitude = data[0].lon;
    resolveLocation(lattitude, longitude);
}

var resolveLocation = function(lattitude, longitude) {    
    var openWeatherURL = 'https:api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + lattitude + '&lon=' + longitude + '&appid=' + apiKey;
    
    fetch(openWeatherURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayMainCard(data.city, data.list);
                
            });
        }
    })
    .catch(function (error) {
            
        });
    }

    var displayMainCard = function(city, list){
        currentCard.innerHTML = null;
        var icon = list[0].weather[0].icon
        var iconImage = 'http://openweathermap.org/img/w/' + icon + '.png';
        
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

        cardTitle.textContent = city.name;
        tempPEl.textContent = 'Temp: ' + list[0].main.temp + ' °F';
        windPEl.textContent = 'Wind: ' + list[0].wind.speed + ' MPH';
        humidityPEl.textContent = 'Humidity: ' + list[0].main.humidity + ' %';

        currentCard.append(card);
        card.append(cardBody);
        cardBody.append(cardTitle, tempPEl, windPEl, humidityPEl);
        cardTitle.appendChild(iconSpan);
        iconSpan.append(iconImg);
    }



searchBtn.addEventListener('click', startSearch);