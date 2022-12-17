var apiKey = '2193d760faaf2569d7030d04e1cbd2cc';
var input = document.querySelector('#user-search')
var searchBtn = document.querySelector('.searchButton');
var currentCard = document.querySelector('.currentWeatherParent');
var fiveDayCard = document.querySelector('.fiveDayWeather');
var fail = document.querySelector('.fail-button');
var leftPanel = document.querySelector('.leftPanel');

var storageList = JSON.parse(localStorage.getItem('city')) || [];

// Beggining search function to gather data from API and load all elements
var startSearch = function (event) {
    fiveDayCard.innerHTML = null;
    event.preventDefault();
    var w = input.value.trim();
    getCode(w);
    saveCity(w);
    createButton(w);
}
// Allows data to be reloaded if a saved button is clicked
var restartSearch = function (event) {
    fiveDayCard.innerHTML = null;
    var w = event.target.innerHTML;
    getCode(w);
}
// Gets lattitude and longitude for getCoords to handle and retrieve correct weather data
var getCode = function (w) {
    var codeURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + w + '&limit=5&appid=' + apiKey;

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
// Gathers data to be able to display on screen
var resolveCurrent = function (lattitude, longitude) {
    var openWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + lattitude + '&lon=' + longitude + '&appid=' + apiKey;

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
// Gathers 5 day forecast to display on screen
var resolveFiveDay = function (lattitude, longitude) {
    var openWeatherURL = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=' + lattitude + '&lon=' + longitude + '&appid=' + apiKey;

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
// Formats and creates data to be displayed in current weather card
var displayMainCard = function (data) {
    currentCard.innerHTML = null;
    var icon = data.weather[0].icon
    var iconImage = 'https://openweathermap.org/img/w/' + icon + '.png';
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

    card.className = 'card col-12 p-3';
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
// Formats and creates data to be displayed in 5 day weather cards
var displayFiveDay = function (list) {
   
    for (var i = 0; i < list.length; i += 8) {

        var unixTimestamp = list[i].dt;
        var date = new Date(unixTimestamp * 1000);
        var icon = list[i].weather[0].icon;
        var iconImage = 'https://openweathermap.org/img/w/' + icon + '.png';

        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var cardTitle = document.createElement('h5');
        var iconSpan = document.createElement('span');
        var iconImg = document.createElement('img');
        var tempPEl = document.createElement('p');
        var windPEl = document.createElement('p');
        var humidityPEl = document.createElement('p');

        card.className = 'card col-12 col-md m-2 p-2 bg-dark text-light';
        cardBody.classname = 'card-body';
        cardTitle.className = 'card-title';
        iconImg.setAttribute('src', iconImage)
        iconImg.setAttribute('alt', 'Open Weather Icon')

        cardTitle.textContent = date.toLocaleDateString('en-US');
        tempPEl.textContent = 'Temp: ' + list[i].main.temp + ' °F';
        windPEl.textContent = 'Wind: ' + list[i].wind.speed + ' MPH';
        humidityPEl.textContent = 'Humidity: ' + list[i].main.humidity + ' %';

        fiveDayCard.append(card);
        card.append(cardBody);
        cardBody.append(cardTitle, tempPEl, windPEl, humidityPEl);
        cardTitle.appendChild(iconSpan);
        iconSpan.append(iconImg);
    };
}
// If the city searched is not already in local storage it is added
var saveCity = function (city) {
    if (storageList.includes(city)) {
        return;
    } else {
        storageList.push(city)
        localStorage.setItem('city', JSON.stringify(storageList));
    }
}
// Creates buttons for each city weather search
var createButton = function (city) {
    var cityButton = document.createElement('button');
    cityButton.className = 'btn btn-secondary cityBtn ms-3 mb-3 w-100';
    cityButton.setAttribute('type', 'button');
    cityButton.textContent = city;
    leftPanel.appendChild(cityButton);
}
// Keeps past search buttons on page after reload
var recreateButton = function (city) {
    if (storageList.includes(city)) {
        return;
    } else {
        for (var i = 0; i < storageList.length; i++) {
            var cityButton = document.createElement('button');
            cityButton.className = 'btn btn-secondary cityBtn ms-3 mb-3 w-100';
            cityButton.setAttribute('type', 'button');
            cityButton.textContent = storageList[i];
            leftPanel.appendChild(cityButton);
        }
    }
}
// Listens for the click on past search buttons to show data again
document.addEventListener('click', function (event) {
    if (event.target.matches('.cityBtn')) {
        restartSearch(event);
    }
})
// Listens for main search button click to start all search processes
searchBtn.addEventListener('click', startSearch);
// Runs the function to recreate past search buttons
recreateButton();