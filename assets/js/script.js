var cardWrappers = [];
var fcHeaders = [];
var fcTemps = [];
var fcWindspeeds = [];
var fcHumidities = [];
var fcIcons = [];

var savedSearches = [];

var historyWrapperEl = document.querySelector('#historyWrapper');
var submitBtn = document.querySelector('.submitBtn');
var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.cityName');
var temp = document.querySelector('.temp');
var windSpeed = document.querySelector('.windSpeed');
var humidity = document.querySelector('.humidity');
var forecast = document.querySelector('.forecast');
var icon = document.querySelector('.icon');
var dateToday  = dayjs().format('MM/DD/YY');
cardWrappers.push(document.querySelector('#card1'));
cardWrappers.push(document.querySelector('#card2'));
cardWrappers.push(document.querySelector('#card3'));
cardWrappers.push(document.querySelector('#card4'));
cardWrappers.push(document.querySelector('#card5'));
fcHeaders.push(document.querySelector('.fc-header-1'));
fcHeaders.push(document.querySelector('.fc-header-2'));
fcHeaders.push(document.querySelector('.fc-header-3'));
fcHeaders.push(document.querySelector('.fc-header-4'));
fcHeaders.push(document.querySelector('.fc-header-5'));
fcTemps.push(document.querySelector('.fc-temp-1'));
fcTemps.push(document.querySelector('.fc-temp-2'));
fcTemps.push(document.querySelector('.fc-temp-3'));
fcTemps.push(document.querySelector('.fc-temp-4'));
fcTemps.push(document.querySelector('.fc-temp-5'));
fcWindspeeds.push(document.querySelector('.fc-windspeed-1'));
fcWindspeeds.push(document.querySelector('.fc-windspeed-2'));
fcWindspeeds.push(document.querySelector('.fc-windspeed-3'));
fcWindspeeds.push(document.querySelector('.fc-windspeed-4'));
fcWindspeeds.push(document.querySelector('.fc-windspeed-5'));
fcHumidities.push(document.querySelector('.fc-humidity-1'));
fcHumidities.push(document.querySelector('.fc-humidity-2'));
fcHumidities.push(document.querySelector('.fc-humidity-3'));
fcHumidities.push(document.querySelector('.fc-humidity-4'));
fcHumidities.push(document.querySelector('.fc-humidity-5'));
fcIcons.push(document.querySelector('.fc-icon-1'));
fcIcons.push(document.querySelector('.fc-icon-2'));
fcIcons.push(document.querySelector('.fc-icon-3'));
fcIcons.push(document.querySelector('.fc-icon-4'));
fcIcons.push(document.querySelector('.fc-icon-5'));

submitBtn.addEventListener('click', function (){
    fetchAll(inputValue.value, false);
});



fetchAll = (city, isFromSavedSearch) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid=4b2a0930a9f598b508cdf86601bc83db')
    .then (function (response) {
        if (response.ok){
        return response.json()
             } else {alert("Input a valid city!");}
    })
    .then (function (data) {
        console.log(data);
         var cityNameValue = data.name;
         var iconValue = data.weather[0].icon;
         var tempValue = data.main.temp;
         var windSpeedValue = data.wind.speed;
         var humidityValue = data.main.humidity;

         cityName.textContent = cityNameValue + "  " + dateToday;
         temp.textContent = "Temperature: " + tempValue + " F";
         windSpeed.textContent = "Wind Speed: " + windSpeedValue + " mph";
         humidity.textContent = "Humidity: " + humidityValue + " %";
         icon.src = "https://openweathermap.org/img/wn/" + iconValue + ".png";
    
    
    })

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=imperial&appid=4b2a0930a9f598b508cdf86601bc83db')
    .then (function (response) {
        return response.json();
        
    })
    .then (function (data) {
        console.log(data);
        
        var elI = 0

        for (i=0; i<data.list.length; i=i+8) {
            cardWrappers[elI].style.display = 'block';
            fcHeaders[elI].textContent = dayjs(data.list[i].dt_txt).format('MM/DD/YY');
            fcTemps[elI].textContent = data.list[i].main.temp + " F";
            fcWindspeeds[elI].textContent = data.list[i].wind.speed + ' mph';
            fcHumidities[elI].textContent = data.list[i].main.humidity + " %";
            fcIcons[elI].src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            elI++;
        }
        
        if (!isFromSavedSearch){
        savedSearches.push(data.city.name);
        displaySavedSearches();
        }
    })
};

displaySavedSearches = () => {
    historyWrapperEl.innerHTML= "";
    for (i=0; i<savedSearches.length; i++) {
        var btn = document.createElement("BUTTON");
        btn.classList.add('searchBtns');
        btn.innerHTML = savedSearches[i];
        btn.onclick = savedSearchClick;
        historyWrapperEl.appendChild(btn);
        
    }
    JSON.stringify(savedSearches);
    localStorage.setItem("searches", savedSearches);
    localStorage.getItem('searches');
    
}




savedSearchClick = (btn) => {
    fetchAll(btn.target.innerHTML, true);
    
    
}






