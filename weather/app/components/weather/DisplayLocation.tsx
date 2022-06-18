import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { nameLocation } from '../../recoil/location.state'
import { yrWeatherState } from '../../recoil/yr_weather.state'
import LocationMenu from '../select-location/LocationMenu'

export default function DisplayLocation() {
  const place = useRecoilValue(nameLocation);
  // const coord = useRecoilValue(coordLocation);
  const weatherData = useRecoilValue(yrWeatherState)!;
  // console.log(coord, place);

  let date = new Date(weatherData.properties.timeseries[0].time);
  let dt = date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  let dtUpdate = new Date(
    weatherData.properties.meta.updated_at
  ).toLocaleString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Box sx={{ ml: 0, mt: 0, mb: 0 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Box sx={{ mb: -2.2 }}>
            <LocationMenu place={place} />
          </Box>
        </Grid>
        <Grid item>
          <Box
            component="span"
            sx={{
              textAlign: "center",
              fontSize: 12,
              // fontWeight: "bold",
              fontStyle: "italic",
              color: "white",
            }}
          >
            ( Обновлено {dtUpdate})
          </Box>
        </Grid>

        <Grid item>
          <Box
            sx={{
              mt: -0.5,
              textAlign: "center",
              fontSize: 14,
              color: "white",
              textShadow: 2,
            }}
          >
            {dt}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
