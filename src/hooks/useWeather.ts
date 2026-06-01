
import axios from 'axios'
import type { SearchType, Weather } from '../types';
import { array, number, object, string, parse } from 'valibot';
import { useMemo, useState } from 'react';

export const WeatherSchema = object({
    name: string(),
    main: object({
        temp:       number(),
        temp_min:   number(),
        temp_max:   number(),
        feels_like: number(),
        humidity:   number()
    }),
    weather: array(object({
        id:          number(),
        description: string(),
        icon:        string()
    }))
})

const initialState: Weather = {
    name: '',
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0,
        feels_like: 0,
        humidity: 0
    },
    weather: []
}

export const useWeather = () => {

    const [weather, setWeather] = useState<Weather>(initialState);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const fetchWeather = async (search: SearchType) => {

        setLoading(true);
        setWeather(initialState);
        setNotFound(false);

        try {
            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
            const { data } = await axios.get(geoURL);

            if ( !data[0] ) {
                setNotFound(true);
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
            const { data: weatherData } = await axios.get(weatherURL);

            const result = parse(WeatherSchema, weatherData);
            if(result) {
                setWeather(result);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const hasWeatherData = useMemo(() => weather.name !== '', [weather])

    return {
        weather,
        loading,
        fetchWeather,
        hasWeatherData,
        notFound
    }
}
