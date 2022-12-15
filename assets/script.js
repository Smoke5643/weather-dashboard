var apiKey = '2193d760faaf2569d7030d04e1cbd2cc';
var input = document.querySelector('#user-search')
var searchBtn = document.querySelector('.searchButton');
var currentCard = document.querySelector('.currentWeatherParent');
var fiveDayCard = document.querySelector('.currentWeather');
var fail = document.querySelector('.fail-button');
var leftPanel = document.querySelector('.leftPanel');

var storageList = JSON.parse(localStorage.getItem('city')) || [];


var getCode = function (w) {
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
var getCoords = function (data) {
    var lattitude = data[0].lat;
    var longitude = data[0].lon;
    resolveCurrent(lattitude, longitude);
    resolveFiveDay(lattitude, longitude);
}

var resolveCurrent = function (lattitude, longitude) {
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

var resolveFiveDay = function (lattitude, longitude) {
    var openWeatherURL = 'https:api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + lattitude + '&lon=' + longitude + '&appid=' + apiKey;

    fetch(openWeatherURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayFiveDay(data.list)

                });
            } else {
                fail.click();
            }
        })
        .catch(function (error) {
            fail.click();
        });
}

var displayMainCard = function (data) {
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

var displayFiveDay = function (list) {
    console.log(list);

    for (var i = 0; i < list.length; i += 8) {

        var unixTimestamp = list[i].dt;
        var date = new Date(unixTimestamp * 1000);
        var icon = list[i].weather[0].icon;
        var iconImage = 'http://openweathermap.org/img/w/' + icon + '.png';

        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var cardTitle = document.createElement('h5');
        var iconSpan = document.createElement('span');
        var iconImg = document.createElement('img');
        var tempPEl = document.createElement('p');
        var windPEl = document.createElement('p');
        var humidityPEl = document.createElement('p');

        card.className = 'card col-2 m-2 p-2 bg-dark text-light';
        cardBody.classname = 'card-body';
        cardTitle.className = 'card-title';
        iconImg.setAttribute('src', iconImage)
        iconImg.setAttribute('alt', 'Open Weather Icon')

        cardTitle.textContent = date.toLocaleDateString('en-US');
        tempPEl.textContent = 'Temp: ' + list[i].main.temp + ' °F';
        windPEl.textContent = 'Wind: ' + list[i].wind.speed + ' MPH';
        humidityPEl.textContent = 'Humidity: ' + list[i].main.humidity + ' %';

        currentCard.append(card);
        card.append(cardBody);
        cardBody.append(cardTitle, tempPEl, windPEl, humidityPEl);
        cardTitle.appendChild(iconSpan);
        iconSpan.append(iconImg);
    };
}

var startSearch = function (event) {
    event.preventDefault();
    var w = input.value.trim();
    getCode(w);
    saveCity(w);
}

var saveCity = function (city) {
    if (storageList.includes(city)){
        return;
    }else{
        storageList.push(city)
        localStorage.setItem('city', JSON.stringify(storageList));
    }
}

var createButton = function (city) {
    if (storageList.includes(city)){
        return;
    }
    for (var i = 0; i < storageList.length; i++) {
        var cityButton = document.createElement('button');
        cityButton.className = 'btn btn-secondary cityBtn ms-3 mb-3 w-100'
        cityButton.setAttribute('type', 'button');
        cityButton.textContent = storageList[i];
        leftPanel.appendChild(cityButton);
    }
}

createButton();

searchBtn.addEventListener('click', startSearch);