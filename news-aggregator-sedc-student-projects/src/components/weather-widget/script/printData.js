import { getHiLo, getWeeklyData } from '../../../components/weather-widget/script/dataRetrieval.js';
import { getDayName } from '../../../components/weather-widget/script/helperFuncs.js';

function printWeatherData(data, el){
   let hiLo = getHiLo(data.list);
   let weeklyData = getWeeklyData(data);

   const date = new Date();
   let time = date.toTimeString().substring(0, 5);

   el.innerHTML = `
    <div style="display: flex; flex-direction: row;">
    <img class="weather-img" src="http://openweathermap.org/img/w/${data.list[0].weather[0]
       .icon}.png" alt="weatherIcon" style="padding: 5px;" width="100" height="100">

    <div style="display: inline; margin-left: 5px;"> 
        <p>${getDayName(data.list[0].dt_txt.substring(0, 10), 'us-US').substring(0, 3)} ${data.list[0].dt_txt.substring(
      5,
      10
   )}</p>       
        <p style="font-size: large">${time}</p>
        <p>${data.city.name}</p>   
    </div>
    </div>

   <div style="display: flex; flex-direction: row;">
        <div style="display: inline; padding-right: 2.5px; margin-right: 12.5px;"> 
            <p style="font-size: large"> ${data.list[0].main.temp.toString().substring(0, 2)}°C<p>
            <p style="font-size: large">${data.list[0].weather[0].main}</p>        
            <p><em><small>low:</small></em> ${hiLo.min.main.temp.toString().substring(0, 2)}°C</p>
            <p><em><small>high:</small></em> ${hiLo.max.main.temp.toString().substring(0, 2)}°C</p>
        </div>

        <div style="display: inline; padding: 1px;">
            <p>${getDayName(weeklyData.dayTomorrowData[0].dt_txt.substring(0, 10), 'us-US')
               .substring(0, 3)
               .toUpperCase()}<p>        
            <img src="http://openweathermap.org/img/w/${weeklyData.dayTomorrowData[4].weather[0]
               .icon}.png" alt="weatherIcon" width="45" height="45">
            <p><em><small>low:</small></em> ${getHiLo(weeklyData.dayTomorrowData).min.main.temp
               .toString()
               .substring(0, 2)}°C</p> 
            <p><em><small>high:</small></em> ${getHiLo(weeklyData.dayTomorrowData).max.main.temp
               .toString()
               .substring(0, 2)}°C</p>
        </div>
           
        <div style="display: inline; padding: 1px;">
            <p>${getDayName(weeklyData.dayAfterTomorrowData[0].dt_txt.substring(0, 10), 'us-US')
               .substring(0, 3)
               .toUpperCase()}<p>        
            <img src="http://openweathermap.org/img/w/${weeklyData.dayAfterTomorrowData[4].weather[0]
               .icon}.png" alt="weatherIcon" width="45" height="45">
            <p><em><small>low:</small></em> ${getHiLo(weeklyData.dayAfterTomorrowData).min.main.temp
               .toString()
               .substring(0, 2)}°C</p> 
            <p><em><small>high:</small></em> ${getHiLo(weeklyData.dayAfterTomorrowData).max.main.temp
               .toString()
               .substring(0, 2)}°C</p>
        </div>

        <div style="display: inline; padding: 1px;">
            <p>${getDayName(weeklyData.dayNextData[0].dt_txt.substring(0, 10), 'us-US')
               .substring(0, 3)
               .toUpperCase()}<p>        
            <img src="http://openweathermap.org/img/w/${weeklyData.dayNextData[4].weather[0]
               .icon}.png" alt="weatherIcon" width="45" height="45">
            <p><em><small>low:</small></em> ${getHiLo(weeklyData.dayNextData).min.main.temp
               .toString()
               .substring(0, 2)}°C</p>
            <p><em><small>high:</small></em> ${getHiLo(weeklyData.dayNextData).max.main.temp
               .toString()
               .substring(0, 2)}°C</p>
        </div>
    </div>            
    `;
}

export { printWeatherData };
