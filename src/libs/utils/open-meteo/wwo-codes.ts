import * as clearDay from '@/assets/lottie/weather-icons/clear-day.json';
import * as clearNight from '@/assets/lottie/weather-icons/clear-night.json';
import * as drizzle from '@/assets/lottie/weather-icons/drizzle.json';
import * as fogDay from '@/assets/lottie/weather-icons/fog-day.json';
import * as fogNight from '@/assets/lottie/weather-icons/fog-night.json';
import * as hail from '@/assets/lottie/weather-icons/hail.json';
import * as partlyCloudyDay from '@/assets/lottie/weather-icons/partly-cloudy-day.json';
import * as partlyCloudyNight from '@/assets/lottie/weather-icons/partly-cloudy-night.json';
import * as rain from '@/assets/lottie/weather-icons/rain.json';
import * as sleet from '@/assets/lottie/weather-icons/sleet.json';
import * as snow from '@/assets/lottie/weather-icons/snow.json';
import * as snowflake from '@/assets/lottie/weather-icons/snowflake.json';
import * as thunderstormsExtremeRain from '@/assets/lottie/weather-icons/thunderstorms-extreme-rain.json';
import * as thunderstormRain from '@/assets/lottie/weather-icons/thunderstorms-rain.json';

const wwocodes = [
  {
    code: [0],
    description: 'Clear sky',
    lottie: { day: clearDay, nigth: clearNight },
  },
  {
    code: [1, 2, 3],
    description: 'Mainly clear, partly cloudy, and overcast',
    lottie: { day: partlyCloudyDay, nigth: partlyCloudyNight },
  },
  {
    code: [45, 48],
    description: 'Fog and depositing rime fog',
    lottie: { day: fogDay, nigth: fogNight },
  },
  {
    code: [51, 53, 55],
    description: 'Drizzle: Light, moderate, and dense intensity',
    lottie: { day: drizzle, nigth: drizzle },
  },
  {
    code: [56, 57],
    description: 'Freezing Drizzle: Light and dense intensity',
    lottie: { day: sleet, nigth: sleet },
  },
  {
    code: [61, 63, 65],
    description: 'Rain: Slight, moderate and heavy intensity',
    lottie: { day: hail, nigth: hail },
  },
  {
    code: [66, 67],
    description: 'Freezing Rain: Light and heavy intensity',
    lottie: { day: sleet, nigth: sleet },
  },
  {
    code: [71, 73, 75],
    description: 'Snow fall: Slight, moderate, and heavy intensity',
    lottie: { day: snow, nigth: snow },
  },
  {
    code: [77],
    description: 'Snow grains',
    lottie: { day: snowflake, nigth: snowflake },
  },
  {
    code: [80, 81, 82],
    description: 'Rain showers: Slight, moderate, and violent',
    lottie: { day: rain, nigth: rain },
  },
  {
    code: [85, 86],
    description: 'Snow showers slight and heavy',
    lottie: { day: snow, nigth: snow },
  },
  {
    code: [95],
    description: 'Thunderstorm: Slight or moderate',
    lottie: { day: thunderstormRain, nigth: thunderstormRain },
  },
  {
    code: [96, 99],
    description: 'Thunderstorm with slight and heavy hail',
    lottie: { day: thunderstormsExtremeRain, nigth: thunderstormsExtremeRain },
  },
];

export const wwoDescription = (code: number) => {
  const wwo = wwocodes.find((c) => c.code.includes(code));
  return wwo ? wwo.description : 'Unknown';
};

export const wwoLottie = (code: number, isDay: boolean) => {
  const wwo = wwocodes.find((c) => c.code.includes(code));
  return wwo ? wwo.lottie[isDay ? 'day' : 'nigth'] : '';
};
