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
               getCoords(data)
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
                
            });
        }
    })
    .catch(function (error) {
            
        });
    }



searchBtn.addEventListener('click', startSearch);