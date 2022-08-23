import { daysInMonth, convertToFahrenheit } from '../../weatherApp/script/helperFunctions.js';

function getMinMax(tempData){

    let max = tempData[0];
    let min = tempData[0];
    let maxHum = tempData[0];
    let minHum = tempData[0];
    let average = 0;
    let averageHum = 0;

    for (let i=0; i<tempData.length; i++){
        if (max.main.temp<tempData[i].main.temp){
            max = tempData[i];
        };
        if (min.main.temp>tempData[i].main.temp){
            min = tempData[i];
        };
        if (maxHum.main.humidity<tempData[i].main.humidity){
            maxHum = tempData[i];
        };
        if (minHum.main.humidity>tempData[i].main.humidity){
            minHum = tempData[i];
        };

    average += tempData[i].main.temp;
    averageHum += tempData[i].main.humidity;
};

    return {
        max,
        min,
        maxHum,
        minHum,
        avgTemp: average / tempData.length,
        avgHumd: averageHum / tempData.length,
        warmestDay: max.dt_txt.substring(0,10),
        coldestDay: min.dt_txt.substring(0,10)
    };
};

function getWeeklyData(tempData){
    
    let currentDate = new Date();
    let dayValueToday = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;

    let dayTomorrow = 0;
    let dayAfterTomorrow = 0;
    let dayNext = 0;
    let dayLast = 0;

    dayValueToday===daysInMonth(currentMonth) ? dayTomorrow=1 : dayTomorrow = dayValueToday + 1;
    dayTomorrow===daysInMonth(currentMonth) ? dayAfterTomorrow=1 : dayAfterTomorrow = dayTomorrow + 1;
    dayAfterTomorrow===daysInMonth(currentMonth) ? dayNext=1 : dayNext = dayAfterTomorrow + 1;
    dayNext===daysInMonth(currentDate) ? dayLast=1 : dayLast = dayNext + 1;

    let dayTomorrowData = []
    let dayAfterTomorrowData = [];
    let dayNextData = [];
    let dayLastData = [];

    for(let data of tempData.list){
        if(dayTomorrow === new Date(data.dt * 1000).getDate()){
            dayTomorrowData.push(data);
        }
        if(dayAfterTomorrow === new Date(data.dt * 1000).getDate()){
            dayAfterTomorrowData.push(data);
        }
        if(dayNext === new Date(data.dt * 1000).getDate()){
            dayNextData.push(data);
        }
        if(dayLast === new Date(data.dt * 1000).getDate()){
            dayLastData.push(data);
        }
    };

    ((day1, day2, day3, day4) => {
        let daysArr = [day1, day2, day3, day4];
        daysArr.forEach((el) => el.forEach((data) => data.main.fhValues = convertToFahrenheit(data.main.temp)));
        daysArr.forEach((el) => el.forEach((data) => data.main.fhFl = convertToFahrenheit(data.main.feels_like)));
    })(dayTomorrowData, dayAfterTomorrowData, dayNextData, dayLastData);

    return {
        dayTomorrowData,
        dayAfterTomorrowData,
        dayNextData,
        dayLastData
    };
};

export {getMinMax, getWeeklyData};