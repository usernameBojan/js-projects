import { html } from '../../weatherApp/script/domElements.js';
import { getMinMax, getWeeklyData } from '../../weatherApp/script/dataRetrieval.js';
import { convertToFahrenheit, getDayName } from '../../weatherApp/script/helperFunctions.js';

function printCity(text, value) {

    let minMax = getMinMax(text.list);

    let cutDecimals = minMax.avgTemp.toString();
    let avgTempShort = cutDecimals.substring(0, 5);
    
    let symbol = '';
    let unit = [];

    const celsiusValues = [
        text.list[0].main.temp,
        text.list[0].main.feels_like, 
        minMax.max.main.temp, 
        minMax.min.main.temp, 
        avgTempShort
    ];

    const fahrenheitValues = [
        convertToFahrenheit(text.list[0].main.temp), 
        convertToFahrenheit(text.list[0].main.feels_like),
        convertToFahrenheit(minMax.max.main.temp), 
        convertToFahrenheit(minMax.min.main.temp), 
        convertToFahrenheit(avgTempShort)
    ];

    if (value) {
        unit = celsiusValues;
        symbol = "°C";
    } else {
        unit = fahrenheitValues;
        symbol = "°F";
    };

    html.currentTemp.innerHTML = `Current temp: <b>${unit[0]}${symbol}</b> <i><small>(Click to convert to °F/°C)</small></i> <br>`;
    html.feelsLike.innerHTML = `Feels like: <b>${unit[1]}${symbol} </b><i><small>(Click to convert to °F/°C)</small></i>`;
    html.weatherStatus.innerText = `${text.list[0].weather[0].main}`;
    html.weatherImg.innerHTML = `<img src="http://openweathermap.org/img/w/${text.list[0].weather[0].icon}.png" alt="weatherIcon">`
    html.cityName.innerText = `City: ${text.city.name}`;
    html.maxTemp.innerText = `Max temp: ${unit[2]}${symbol}`;
    html.lowTemp.innerText = `Low temp: ${unit[3]}${symbol}`;
    html.avgTemp.innerText = `Avg temp: ${unit[4]}${symbol}`;
    html.avgHumd.innerText = `Avg humd: ${minMax.avgHumd}%`;
    html.maxHumd.innerText = `Max humd: ${minMax.maxHum.main.humidity}%`;
    html.lowHumd.innerText = `Low humd: ${minMax.minHum.main.humidity}%`;
    html.warmestDay.innerHTML = `<h3>Warmest day will be ${minMax.warmestDay}</h3>`;
    html.coldestDay.innerHTML = `<h3>Coldest day will be ${minMax.coldestDay}</h3>`;
};

function clearCity() {

    html.currentTemp.innerHTML = '';
    html.feelsLike.innerHTML = '';;
    html.weatherStatus.innerText = '';;
    html.weatherImg.innerHTML = '';
    html.cityName.innerText = '';;
    html.maxTemp.innerText = '';
    html.lowTemp.innerText = '';
    html.avgTemp.innerText = '';
    html.avgHumd.innerText = '';
    html.maxHumd.innerText = '';
    html.lowHumd.innerText = '';
    html.warmestDay.innerHTML = '';
    html.coldestDay.innerHTML = '';
};

function printHourly(tempData, value) {

    html.tBodyHourly.innerHTML = '';

    for (let data of tempData.list) {
        let temp = '';
        let tempFl = '';
        let symbol = '';

        if (value) {
            temp = data.main.temp;
            tempFl = data.main.feels_like;
            symbol = '°C';
        } else {
            temp = convertToFahrenheit(data.main.temp);
            tempFl = convertToFahrenheit(data.main.feels_like);
            symbol = '°F';
        };

        html.tBodyHourly.innerHTML += `<tr> 
        <td></td>
        <td>${tempData.city.name}</td>
        <td>${data.weather[0].description} <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weatherIcon"></td>
        <td>${data.dt_txt}</td>
        <td>${temp}${symbol} (${tempFl}${symbol})</td>
        <td>${data.main.humidity}%</td>
        <td>${data.wind.speed} km/h </td>
        </tr>`
    };
};

function printWeeklyData(data, value) {

    let weeklyData = getWeeklyData(data);

    html.tBodyWeekly.innerHTML = '';

    ((day1, day2, day3, day4, tbody, value) => {

        let daysArr = [day1, day2, day3, day4];

        daysArr.forEach((el) => {

            let min = 0;
            let max = 0;
            let minFl = 0;
            let maxFl = 0;
            let avg = 0;
            let symbol = '';

            if (value) {
                min = getMinMax(el).min.main.temp;
                max = getMinMax(el).max.main.temp;
                minFl = getMinMax(el).min.main.feels_like;
                maxFl = getMinMax(el).max.main.feels_like;
                avg = getMinMax(el).avgTemp.toString().substring(0, 5);
                symbol = '°C';
            } else {
                min = getMinMax(el).min.main.fhValues;
                max = getMinMax(el).max.main.fhValues;
                minFl = getMinMax(el).min.main.fhFl;
                maxFl = getMinMax(el).max.main.fhFl;
                avg = convertToFahrenheit(getMinMax(el).avgTemp.toString().substring(0, 5));
                symbol = '°F';
            };

            tbody.innerHTML +=
                `<tr>
                <td>${el[0].dt_txt.substring(0, 10)}
                ${getDayName(el[0].dt_txt.substring(0, 10), 'mk-MK').toUpperCase()} | 
                ${getDayName(el[0].dt_txt.substring(0, 10), 'us-US')} </td>
                <td>${data.city.name}</td>
                <td>${el[4].weather[0].description} <img src="http://openweathermap.org/img/w/${el[4].weather[0].icon}.png" alt="weatherIcon"></td>
                <td>${max}(${maxFl})${symbol}</td>
                <td>${min}(${minFl})${symbol}</td>
                <td> ${avg}${symbol}</td>
                <td> hi: ${getMinMax(el).maxHum.main.humidity}% lo: ${getMinMax(el).minHum.main.humidity}% 
                avg: ${getMinMax(el).avgHumd.toString().substring(0, 5)}%</td>
            </tr>`
        });
    })(weeklyData.dayTomorrowData, weeklyData.dayAfterTomorrowData, weeklyData.dayNextData, weeklyData.dayLastData, html.tBodyWeekly, value);
};

export { printCity, clearCity, printHourly, printWeeklyData };