import { html } from '../../weatherApp/script/domElements.js';
import {printCity, clearCity, printHourly, printWeeklyData} from '../../weatherApp/script/dataPrinting.js';
import {errorFunc} from '../../weatherApp/script/helperFunctions.js';

const citiesArr = [
    'Krushevo', 
    'Prilep', 
    'Demir Hisar', 
    'Bitola',
    'Resen',
    'Ohrid', 
    'Struga', 
    'Debar', 
    'Kicevo',
    'Makedonski Brod', 
    'Gostivar', 
    'Tetovo', 
    'Kumanovo', 
    'Kriva Palanka', 
    'Kratovo', 
    'Probishtip', 
    'Makedonska Kamenica', 
    'Delchevo', 
    'Kochani', 
    'Vinica', 
    'Shtip', 
    'Radovish', 
    'Berovo', 
    'Strumica', 
    'Bogdanci', 
    'Valandovo', 
    'Gevgelija',
    'Demir Kapija', 
    'Negotino', 
    'Kavadarci', 
    'Veles', 
    'Sveti Nikole', 
    'Skopje', 
    'Prishtina', 
    'Belgrade', 
    'Novi Sad', 
    'Ljubljana', 
    'City of Zagreb', 
    'Sarajevo', 
    'Split', 
    'Podgorica', 
    'Tirana', 
    'Thessaloniki', 
    'Athens', 
    'Istanbul', 
    'Sofia'
];

const myAPIKey = `2c02fbaa40e80adfed940892d3d56de0`;

let dataArr = [];
let counter = 0;
let counter1 = 0;
let counter2 = 0;
let index = 0;
let timer = null;

function getWeatherData(cityName, value){

    let weatherApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${myAPIKey}`;
    let promise = fetch(weatherApi);
    
    promise.then(function (response){
        return response.json();
    })
    .then (function(result){
        printCity(result, value);
        printHourly(result, value);
        printWeeklyData(result, value);
        dataArr.push(result);
    })
    .catch(function(error){
        console.log(error);
        errorFunc();
        tBodyHourly.innerHTML = '';
        tBodyWeekly.innerHTML = '';
        clearCity();
    });
};

function changeCities() {
    
    getWeatherData(citiesArr[Math.floor(Math.random() * citiesArr.length)], true);

    if(index === citiesArr.length-1){
      index = 0;
    } else {
      index++;
      counter = 0;
      counter1 = 0;
      counter2 = 0;
      html.tBodyWeekly.innerHTML = '';
    };
}; 

function timerFunc(){

    timer = setInterval(changeCities, 10000);
};

function hideDivs(){

    html.hourlyDiv.style.display = 'none';
    html.weeklyDiv.style.display = 'none';
    html.aboutDiv.style.display = 'none';
    html.errorDiv.style.display = 'none';
    html.homeDivWithData.style.display = 'none';
};

function searchFunc(){

    getWeatherData(html.searchBar.value, true);
    counter = 0;
    counter1 = 0;
    counter2 = 0;
    clearInterval(timer);
    hideDivs();
    html.homeDivWithData.style.display = 'block';
}
window.addEventListener('load', () => {

    getWeatherData('Skopje', true);
    timerFunc();
    hideDivs();
    html.homeDivWithData.style.display = 'block';
});

searchBar.addEventListener('keypress', (event) => {

    if (event.key === 'Enter'){
        searchFunc();
    };
});

searchBtn.addEventListener('click', searchFunc);

home.addEventListener('click', () => {

    hideDivs();
    html.homeDivWithData.style.display = 'block';
});

hourly.addEventListener('click', () => {

    hideDivs();
    html.hourlyDiv.style.display = 'block';
});

weekly.addEventListener('click', () => {

    hideDivs();
    html.weeklyDiv.style.display = 'block';
});

about.addEventListener('click', () => {

    hideDivs();
    html.aboutDiv.style.display = 'block';
});

tempTableHeader.addEventListener('click', ()=>{

    counter1++;

    if(searchBar.value===''){
        if(counter1%2 !== 0){printHourly(dataArr[dataArr.length-1], false)}
        else if(counter1%2 === 0){printHourly(dataArr[dataArr.length-1], true)}
    } else {
        if(counter1%2 !== 0){printHourly(dataArr[dataArr.length-1], false)}
        else if(counter1%2 === 0){printHourly(dataArr[dataArr.length-1], true)}
    }
});

((current, fl) => {

    let btnsArr = [current, fl];

    btnsArr.forEach((btn) => {

        btn.addEventListener('click', () => {
        counter++;
        if(searchBar.value===''){
            if(counter%2 !== 0){printCity(dataArr[dataArr.length-1], false)}
            else if(counter%2 === 0){printCity(dataArr[dataArr.length-1], true)}
    }   else {
            if(counter%2 !== 0){printCity(dataArr[dataArr.length-1], false)}
            else if(counter%2 === 0){printCity(dataArr[dataArr.length-1], true)}
    };
        });
    });
})(currentTemp, feelsLike);

((min, max, avg) => {

    let btnsArr = [min, max, avg];

    btnsArr.forEach((el) => 

    el.addEventListener('click', ()=> {
        counter2++;
        if(searchBar.value===''){
            if(counter2%2 !== 0){printWeeklyData(dataArr[dataArr.length-1], false)}
            else if(counter2%2 === 0){printWeeklyData(dataArr[dataArr.length-1], true)}
        } else {
            if(counter2%2 !== 0){printWeeklyData(dataArr[dataArr.length-1], false)}
            else if(counter2%2 === 0){printWeeklyData(dataArr[dataArr.length-1], true)}
        };
    }));
})(weeklyMax, weeklyMin, weeklyAvg);