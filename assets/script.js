var apiKey = '2193d760faaf2569d7030d04e1cbd2cc';
var input = document.querySelector('#user-search')
var searchBtn = document.querySelector('.searchButton');
var currentCard = document.querySelector('.currentWeather')

var getWeatherData = function(w) {    
    var openWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather/?q=' + w + '&units=imperial&APPID=' + apiKey;
    
    fetch(openWeatherUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        }
    })
    // .catch(function (error) {
        //     alert('Unable to connect');
        // });
    }

    var startSearch = function(event) {
        event.preventDefault();
        var w = input.value.trim();
        getWeatherData(w);
    }
    









searchBtn.addEventListener('click', startSearch);