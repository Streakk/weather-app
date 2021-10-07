/**
 * Adds a zero string to a number if the number is higher than 10.
 * @param {number} number - Number to add to.
 * @returns {object} Returns a number.
 */
function leadingZero(number) {
  return (number < 10 ? '0' : '') + number;
}

/**
 * Formats weather data and returns it.
 * @param {object} weatherData - Weather data from yr.no api.
 * @returns {object} Returns a formatted weather data object.
 */
export default function format(weatherData) {
  const result = {
    weatherData: [],
    labels: [
      'Time',
      'Temperature',
      'Pressure',
      'Cloud coverage',
      'Humidity',
      'Wind direction',
      'Wind Speed',
      'Summary'
    ]
  };
  const units = {
    airPressure: weatherData.properties.meta.units.air_pressure_at_sea_level,
    airTemperature: weatherData.properties.meta.units.air_temperature,
    cloadAreaFraction: weatherData.properties.meta.units.cloud_area_fraction,
    precipitationAmount: weatherData.properties.meta.units.precipitation_amount,
    relativeHumidity: weatherData.properties.meta.units.relative_humidity,
    windDirection: weatherData.properties.meta.units.wind_from_direction,
    windSpeed: weatherData.properties.meta.units.wind_speed,
  }
  const timeseries = weatherData.properties.timeseries;

  let startingTime = new Date();
  startingTime.setUTCMinutes(0, 0, 0);
  // Forecasts three days after current day do not have hourly updates
  let secondStartTime = new Date();
  secondStartTime.setUTCMinutes(0, 0, 0);
  secondStartTime.setUTCDate(startingTime.getDate() + 3);
  let secondStartTimeSet = false;

  for (let i = 0; i < timeseries.length; i++) {
    let elementTime = new Date(timeseries[i].time);
    if (!secondStartTimeSet && secondStartTime.getUTCDate() === elementTime.getUTCDate()) {
      startingTime.setUTCHours(elementTime.getUTCHours());
      secondStartTimeSet = true;
    }
    if (elementTime.getUTCHours() === startingTime.getUTCHours()) {
      let month = elementTime.getMonth() + 1;
      let day = elementTime.getDate();
      let hour = elementTime.getHours();
      let minute = elementTime.getMinutes();
      result.weatherData.push({
        time: `${elementTime.getFullYear()}-${leadingZero(month)}-${leadingZero(day)} ${leadingZero(hour)}:${leadingZero(minute)}`,
        temperature: `${timeseries[i].data.instant.details.air_temperature} ${units.airTemperature}`,
        pressure: `${timeseries[i].data.instant.details.air_pressure_at_sea_level} ${units.airPressure}`,
        cloudCoverage: `${timeseries[i].data.instant.details.cloud_area_fraction} ${units.cloadAreaFraction}`,
        humidity: `${timeseries[i].data.instant.details.relative_humidity} ${units.relativeHumidity}`,
        windDirection: `${timeseries[i].data.instant.details.wind_from_direction} ${units.windDirection}`,
        windSpeed: `${timeseries[i].data.instant.details.wind_speed} ${units.windSpeed}`,
        summary: timeseries[i].data?.next_6_hours?.summary?.symbol_code || 'N/A',
      });
      startingTime.setUTCHours(startingTime.getUTCHours() + 6);
    }
  }
  return result;
}
