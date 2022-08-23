import {daysInMonth} from "../../../components/weather-widget/script/helperFuncs.js";

function getHiLo(data) {
    let max = data[0]
    let min = data[0]

    for (let i = 0; i < data.length; i++) {
        if (max.main.temp < data[i].main.temp) {
            max = data[i];
        };
        if (min.main.temp > data[i].main.temp) {
            min = data[i];
        };
    };
    return {
        max,
        min,
    };
};

function getWeeklyData(tempData) {
    let currentDate = new Date();
    let dayValueToday = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;

    let dayTomorrow = 0;
    let dayAfterTomorrow = 0;
    let dayNext = 0;

    dayValueToday === daysInMonth(currentMonth) ? dayTomorrow = 1 : dayTomorrow = dayValueToday + 1;
    dayTomorrow === daysInMonth(currentMonth) ? dayAfterTomorrow = 1 : dayAfterTomorrow = dayTomorrow + 1;
    dayAfterTomorrow === daysInMonth(currentMonth) ? dayNext = 1 : dayNext = dayAfterTomorrow + 1;

    let dayTomorrowData = [];
    let dayAfterTomorrowData = [];
    let dayNextData = [];

    for (let data of tempData.list) {
        if (dayTomorrow === new Date(data.dt * 1000).getDate()) {
            dayTomorrowData.push(data);
        }
        if (dayAfterTomorrow === new Date(data.dt * 1000).getDate()) {
            dayAfterTomorrowData.push(data);
        }
        if (dayNext === new Date(data.dt * 1000).getDate()) {
            dayNextData.push(data);
        }
    };

    return {
        dayTomorrowData,
        dayAfterTomorrowData,
        dayNextData,
    };
};

export {getHiLo, getWeeklyData};
