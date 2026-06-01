# Weather Search App

A weather search application built with React, TypeScript and Vite. Enter a city and country to get the current weather conditions including temperature, humidity, and feels-like data.

## Features

- Search weather by city and country
- Displays current temperature, min/max, feels like, and humidity
- Weather icon and description from OpenWeatherMap
- Form validation with visual alerts
- Responsive layout (single column on mobile, two-column grid on desktop)

## Tech Stack

- [React 19](https://react.dev) — UI library
- [TypeScript](https://www.typescriptlang.org) — static typing
- [Vite](https://vite.dev) — build tool and dev server
- [Axios](https://axios-http.com) — HTTP client
- [Valibot](https://valibot.dev) — schema validation for API responses

## API

Weather data is provided by [OpenWeatherMap](https://openweathermap.org).

The app uses two endpoints:

| Endpoint | Purpose |
|---|---|
| [Geocoding API](https://openweathermap.org/api/geocoding-api) | Resolve city name to latitude/longitude |
| [Current Weather API](https://openweathermap.org/current) | Fetch weather data by coordinates |

## Getting Started

### 1. Get an API key

Sign up at [https://openweathermap.org/api](https://openweathermap.org/api) and generate a free API key.

### 2. Configure environment variables

Create a `.env` file at the project root:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_GEO_URL=https://api.openweathermap.org/geo/1.0/direct?q=
VITE_WEATHER_URL=https://api.openweathermap.org/data/2.5/weather
VITE_OPEN_WEATHER_URL=https://openweathermap.org
```

### 3. Install dependencies and run

```bash
npm install
npm run dev
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
