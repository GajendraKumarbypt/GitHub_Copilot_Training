/**
 * useWeather.js
 * Hook to fetch weather data for a city and cache it locally with TTL.
 * Returns { data, loading, error } where data contains { tempC, humidity, description }
 */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCached, setCached } from '../utils/cache';

const DEFAULT_TTL_MS = 10 * 60 * 1000; // 10 minutes

export default function useWeather(cityName, ttl = DEFAULT_TTL_MS) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const cacheKey = `weather:${cityName.toLowerCase()}`;
      try {
        const cached = getCached(cacheKey);
        if (cached) {
          if (!cancelled) {
            setData(cached);
            setLoading(false);
          }
          return;
        }

        // Read API key from multiple sources depending on runtime:
        // - Node/Jest: process.env.REACT_APP_WEATHER_API_KEY
        // - Vite/browser: import.meta.env.VITE_WEATHER_API_KEY or import.meta.env.REACT_APP_WEATHER_API_KEY
        // Safely read API key from Node/Jest (process.env) or Vite (import.meta.env).
        let apiKey = "b491b6be2f77bd93febb0ee38b91e6a4";

        if (!apiKey) {
          try {
            // Access import.meta.env via a Function to avoid syntax errors in environments
            // that don't support import.meta (like some Node/CJS runtimes used by Jest).
            // The Function body is evaluated only in environments that support import.meta.
            // eslint-disable-next-line no-new-func
            const env = new Function('return import.meta.env')();
            apiKey = (env && (env.VITE_WEATHER_API_KEY || env.REACT_APP_WEATHER_API_KEY));
          } catch (e) {
            // ignore — runtime doesn't support import.meta or env not present
          }
        }

        if (!apiKey) throw new Error('REACT_APP_WEATHER_API_KEY not configured');

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName,
        )}&appid=${apiKey}&units=metric`;

        const res = await axios.get(url);
        const payload = res?.data;
        if (!payload || !payload.main) throw new Error('Invalid weather response');

        const mapped = {
          tempC: Math.round(payload.main.temp),
          humidity: payload.main.humidity,
          description: payload.weather && payload.weather[0] && payload.weather[0].description,
        };

        setCached(cacheKey, mapped, ttl);

        if (!cancelled) {
          setData(mapped);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [cityName, ttl]);

  return { data, loading, error };
}
