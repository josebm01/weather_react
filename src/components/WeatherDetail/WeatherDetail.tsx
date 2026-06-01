import type { Weather } from '../../types';
import { formatTemperature } from '../../utils';
import styles from './WeatherDetail.module.css';

type WeatherDetailProps = {
  weather: Weather
}

export const WeatherDetail = ({ weather }: WeatherDetailProps) => {
  const currentWeather = weather.weather[0];
  const iconUrl = currentWeather
    ? `https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`
    : null;

  return (
    <div className={styles.container}>
      {iconUrl && (
        <div className={styles.iconWrapper}>
          <img src={iconUrl} alt={currentWeather.description} className={styles.icon} />
          <p className={styles.description}>{currentWeather.description}</p>
        </div>
      )}

      <h2 className={styles.city}>
        {weather.name}
      </h2>

      <p className={styles.current}>
        {formatTemperature(weather.main.temp)}&deg;C
      </p>

      <div className={styles.grid}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Min</span>
          <span className={styles.statValue}>{formatTemperature(weather.main.temp_min)}&deg;C</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Max</span>
          <span className={styles.statValue}>{formatTemperature(weather.main.temp_max)}&deg;C</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Feels like</span>
          <span className={styles.statValue}>{formatTemperature(weather.main.feels_like)}&deg;C</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Humidity</span>
          <span className={styles.statValue}>{weather.main.humidity}%</span>
        </div>
      </div>
    </div>
  )
}
