import { printWeatherData } from './script/printData.js';

class WeatherWidget extends HTMLElement {
   constructor() {
      super();
      this.baseUrl = 'https://api.openweathermap.org';
      this.API_KEY = '2c02fbaa40e80adfed940892d3d56de0';
      this.attachShadow({ mode: 'open' });
   }

   getUserLocation() {
      if (navigator.geolocation) {
         if (!window.sessionStorage.getItem('location')) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
               sessionStorage.setItem('location', JSON.stringify({ lat: coords.latitude, lon: coords.longitude }));
               window.location.reload();
            });
         }
      }
   }

   async getCityName() {
      const { lat, lon } = JSON.parse(window.sessionStorage.getItem('location'));
      const ednpoint = `${this.baseUrl}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.API_KEY}`;
      if (!JSON.parse(sessionStorage.getItem('location')).cityName) {
         console.log('api call for city name');
         const res = await fetch(ednpoint);
         const [ data ] = await res.json();
         sessionStorage.setItem('location', JSON.stringify({ lat, lon, cityName: data.name }));
      }
   }

   async getWeatherData(units = 'metric') {
      if (!sessionStorage.getItem('weatherData')) {
         console.log('api call for weather data');
         const { cityName } = JSON.parse(sessionStorage.getItem('location'));
         const ednpoint = `${this.baseUrl}/data/2.5/forecast?q=${cityName}&units=${units}&&APPID=${this.API_KEY}`;
         const res = await fetch(ednpoint);
         const data = await res.json();
         sessionStorage.setItem('weatherData', JSON.stringify(data));
      }
   }

   displayWeatherData() {
      const weatherData = JSON.parse(sessionStorage.getItem('weatherData'));
      printWeatherData(weatherData, this.shadowRoot.getElementById('weather'));
   }

   async connectedCallback() {
      const weatherTemplate = document.createElement('template');
      const stream = await fetch('../../components/weather-widget/weather-widget.html');
      const html = await stream.text();
      weatherTemplate.innerHTML = html;
      this.shadowRoot.appendChild(weatherTemplate.content.cloneNode(true));
      this.getUserLocation();
      await this.getCityName();
      await this.getWeatherData();
      this.displayWeatherData();
   }
}

window.customElements.define('weather-widget', WeatherWidget);
