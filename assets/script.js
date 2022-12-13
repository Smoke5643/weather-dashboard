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
                console.log(data);
                
            });
        }
    })
    // .catch(function (error) {
            
    // });
    
}



searchBtn.addEventListener('click', startSearch);