import { html } from '../../weatherApp/script/domElements.js';

function errorFunc(){
    
    html.homeDivWithData.style.display = 'block';
    html.homeDiv.style.display = 'block';
    html.hourlyDiv.style.display = 'none';
    html.weeklyDiv.style.display = 'none';
    html.errorDiv.style.display = 'block';
    html.aboutDiv.style.display = 'none';
};

function convertToFahrenheit(celsius){

    let fahrenheit = (celsius * 9/5) + 32;

    return fahrenheit.toString().substring(0,5);
};

function getDayName(dateStr, locale){

    let date = new Date(dateStr);

    return date.toLocaleDateString(locale, { weekday: 'long' });        
};

function daysInMonth(monthValue){

    const thirtyDaysArr = [4, 6, 9, 11];
    const thirtyOneDaysArr = [1, 3, 5, 7, 8, 10, 12];

    if(monthValue===2){
        return 28;
    } else {
        for(let i=0; i<thirtyDaysArr.length; i++){
            if(monthValue===thirtyDaysArr[i]) return 30;
        };
        for(let i=0; i<thirtyOneDaysArr.length; i++){
            if(monthValue===thirtyOneDaysArr[i]) return 31;
        };
    };
};

export {errorFunc, convertToFahrenheit, getDayName, daysInMonth};