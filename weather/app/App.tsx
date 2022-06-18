import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import AppBar from './components/app-bar/AppBar'
import DisplayLocation from './components/weather/DisplayLocation'
import GetBackground from './components/weather/GetBackground'
import WeatherNow from './components/weather/WeatherNow'
import WeatherNowDetail from './components/weather/WeatherNowDetail'

export default function App() {
  return (
    <div className="App">
      {/* <Bootstrap> */}
      <Box
        sx={{
          width: 400,
          height: 500,
          maxWidth: 400,
          maxHeight: 500,
          // background: "aliceblue",
          background: `url(${GetBackground()})})`,
        }}
      >
        <DisplayLocation />
        <WeatherNow />
        <WeatherNowDetail />

        <AppBar />
        <Routes>
          <Route path="/" element={<WeatherNow />} />
        </Routes>
      </Box>
      {/* </Bootstrap> */}
    </div>
  );
}
