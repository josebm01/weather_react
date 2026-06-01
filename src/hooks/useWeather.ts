
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

    const { VITE_GEO_URL, VITE_WEATHER_API_KEY, VITE_WEATHER_URL } = import.meta.env;

    const fetchWeather = async (search: SearchType) => {

        setLoading(true);
        setWeather(initialState);
        setNotFound(false);

        try {

            // obteniendo latitud y longitud de la ciudad
            const geoURL = `${VITE_GEO_URL}${search.city},${search.country}&appid=${VITE_WEATHER_API_KEY}`;
            const { data } = await axios.get(geoURL);

            // Comprobando si se encuentra la información
            if ( !data[0] ) {
                setNotFound(true);
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            // obteniendo la información del clima con la latitud y longitud de la ciudad
            const weatherURL = `${VITE_WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${VITE_WEATHER_API_KEY}`;
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
