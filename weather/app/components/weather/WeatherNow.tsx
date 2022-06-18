import styled from '@emotion/styled'
import { Box, Grid, Paper } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { yrSunriseState } from '~weather/app/recoil/yr_sunrise.state'

import { Icons } from '../../../assets/icons'
import { yrWeatherState } from '../../recoil/yr_weather.state'

import type { IconsKey } from "../../types/icon.type";
// import GetDirectionOfTheWind from './GetDirectionOfTheWind'

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  align: "center",
});

// type RowDataProps = {
//   cell1: any;
//   cell2: any;
//   ind: number;
// };
// function RowData({ cell1, cell2, ind }: RowDataProps) {
//   return (
//     // <TableRow style={{ backgroundColor: ind % 2 ? "aliceblue" : "" }}>
//     <TableRow>
//       <TableCell align="left">
//         <Box component="span" sx={{ textAlign: "left", fontSize: 16 }}>
//           {cell1}
//         </Box>
//       </TableCell>
//       <TableCell align="left">
//         <Box
//           component="span"
//           sx={{ textAlign: "left", fontSize: 16, fontWeight: "bold" }}
//         >
//           {cell2}
//           {ind === 3 ? (
//             <Box sx={{ ml: 5, mt: -2.7 }}>
//               {/* <GetDirectionOfTheWind windDirection={cell2.slice(0, -1)} /> */}
//             </Box>
//           ) : null}
//         </Box>
//       </TableCell>
//     </TableRow>
//   );
// }

export default function WeatherNow() {
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

  // const arTableHead = [
  //   "Облачность",
  //   "Температура",
  //   "Скорость ветра",
  //   "Направление ветра",
  //   "Осадки",
  //   "Относительная влажность",
  //   "Атмосферное давление",
  // ];

  const data = weatherData!.properties.timeseries[0].data.next_1_hours;
  const details = weatherData!.properties.timeseries[0].data.instant.details;
  // const arTableData = [
  //   Math.round(details.cloud_area_fraction) + " %",
  //   Math.round(details.air_temperature) + "°",
  //   Math.round(details.wind_speed) + " м/сек",
  //   Math.round(details.wind_from_direction) + "°",
  //   data.details.precipitation_amount + " мм",
  //   Math.round(details.relative_humidity) + " %",
  //   Math.round(details.air_pressure_at_sea_level * 0.75) + " мм",
  // ];

  const temperature = Math.round(details.air_temperature); // + "°";

  return (
    <Box>
      {/* <GetBackground sunrise={sunrise} sunset={sunset} /> */}
      <Paper
        sx={{
          background: "transparent",
        }}
      >
        <Box sx={{ ml: 0 }}>
          <Img
            alt="wether"
            width={50}
            src={Icons[data.summary.symbol_code as IconsKey]}
          />
        </Box>

        <Grid
          container
          spacing={0}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={0}
          >
            <Grid item>
              <Box
                component="span"
                sx={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {sunrise}
              </Box>
              <Box
                sx={{
                  mt: -0.5,
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Восход
              </Box>
            </Grid>

            <Grid item>
              <Box
                component="span"
                sx={{
                  textAlign: "center",
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {temperature > 0
                  ? "+" + temperature + "°"
                  : "-" + temperature + "°"}
              </Box>
            </Grid>
            <Grid item>
              <Box
                component="span"
                sx={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {sunset}
              </Box>
              <Box
                sx={{
                  mt: -0.5,
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Заход
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
