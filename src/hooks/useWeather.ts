
import axios from 'axios'
import type { SearchType } from '../types';

export const useWeather = () => {

    const fetchWeather = async (search: SearchType) => {
        
        try {        
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
            const {data} = await axios.get(geoURL);

            const lat = data[0].lat;
            const lon = data[0].lon;

            console.log(lat, lon);


            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
            
            console.log(weatherURL);


        } catch (error) {
            console.error(error);
        }
    }

    return {
        fetchWeather
    }
}
