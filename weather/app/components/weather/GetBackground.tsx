import React from 'react'
import { useRecoilValue } from 'recoil'
import { yrSunriseState } from '~weather/app/recoil/yr_sunrise.state'
import { yrWeatherState } from '~weather/app/recoil/yr_weather.state'

import { Background } from '../../../assets/background'

import type { BackgroundKey } from "../../types/background.type";

export default function GetBackground() {
  const weatherData = useRecoilValue(yrWeatherState)!;
  const astroData = useRecoilValue(yrSunriseState)!;

  const date = weatherData!.properties.timeseries[0].time;

  function getSunData() {
    for (let i = 0; i < astroData.length; i++) {
      if (astroData[i].location.time[0].date === date.slice(0, 10)) {
        let sunrise = astroData[i].location.time[0].sunrise.time.slice(11, -9);
        let sunset = astroData[i].location.time[0].sunset.time.slice(11, -9);
        return { sunrise, sunset };
      }
    }
  }

  const { sunrise, sunset }: any = getSunData();

  let dt = new Date().toLocaleString("ru-RU", {
    hour: "2-digit",
  });
  let set = Number(sunset.slice(0, 2));
  let rise = Number(sunrise.slice(0, 2));
  let dtNow = Number(dt);

  if (dtNow > rise && dtNow < set) {
    return Background["clearsky_day" as BackgroundKey];
  } else {
    return Background["clearsky_night" as BackgroundKey];
  }
  // return <div></div>;
}
