import { LocationOn } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { coordLocation } from '../../recoil/yr_weather.state'
import { LocalStorageManager } from '../../utils/localStorage'

export default function GetLocation() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const setCoord = useSetRecoilState(coordLocation);

  const [city, setSity] = useState(LocalStorageManager.getItem("location"));
  const [country, setCountry] = useState("Украина");
  const [place, setPlace] = useState(city + ", Украина");
  //   const [info, setInfo] = useState<any>(null);
  // const [lat, setLat] = useState(46.41966);
  // const [lon, setLon] = useState(30.759988);

  //Получить координаты места
  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(
          "https://trueway-geocoding.p.rapidapi.com/Geocode",
          {
            params: { address: `${place}`, language: "ru" },
            headers: {
              "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
              "X-RapidAPI-Key":
                "050f75361emsha7b99b2d54f071dp1ea92fjsn09f30b38db11",
            },
          }
        );
        //   coord: "lat=46.4725&lon=30.7414&altitude=42"
        // setLat(response.data?.results[0]?.location.lat);
        // setLon(response.data?.results[0]?.location.lng);
        const coord = `lat=${response.data?.results[0]?.location.lat}&lon=${response.data?.results[0]?.location.lng}&altitude=0`;
        console.log(coord);
        // if (coord !== undefined) {
        //   LocalStorageManager.setItem("coord", coord);
        //   LocalStorageManager.setItem("location", city);
        //   // LocalStorageManager.setItem("country", country);
        //   setCoord(coord);
        //   // navigate("/");
        // }
      } catch (error) {
        console.log(error);
      }
    };

    load();
  }, [place]);

  // Получить высоту места по координатам
  // Odessa
  // https://maps.googleapis.com/maps/api/elevation/json?locations=46.41966,30.759988&key=AIzaSyBWOp07puUz7zeFj6_kQB4LVICINqg3UC8

  // useEffect(() => {
  //   const getAltitude = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lon}&key=AIzaSyBWOp07puUz7zeFj6_kQB4LVICINqg3UC8`,
  //         // `https://maps.googleapis.com/maps/api/elevation/json?locations=46.41966,30.759988&key=AIzaSyBWOp07puUz7zeFj6_kQB4LVICINqg3UC8`,
  //         {
  //           headers: {
  //             "Access-Control-Allow-Origin": "*",
  //             "Content-Type": "application/json",
  //           },

  //           withCredentials: false,
  //         }
  //       );
  //       const alt = Math.round(response.data?.results[0].elevation);
  //       console.log(alt);
  //       const coord = `lat=${lat}&lon=${lon}&altitude=${alt}`;
  //       console.log(coord);
  //       if (coord !== undefined) {
  //         LocalStorageManager.setItem("coord", coord);
  //         LocalStorageManager.setItem("location", city);
  //         // LocalStorageManager.setItem("country", country);
  //         setCoord(coord);
  //         // navigate("/");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAltitude();
  // }, []);

  return (
    <>
      <Tooltip title="Select location">
        <IconButton
          size="large"
          aria-label="search"
          color="inherit"
          onClick={() => setOpen(true)}
        >
          <LocationOn />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <form onSubmit={handleSubmit}> */}
        <DialogTitle id="location-dialog-title">
          {"Получить координаты места"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="location-dialog-description">
            Введите страну и город для получения координат
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Страна"
              onChange={(e) => setCountry(e.currentTarget.value)}
              value={country}
              size="small"
              fullWidth
            ></TextField>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Город"
              onChange={(e) => setSity(e.currentTarget.value)}
              value={city}
              size="small"
              autoFocus
              fullWidth
            ></TextField>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отменить</Button>
          <Button
            type="submit"
            onClick={() => {
              setPlace(city + ", " + country);
              setOpen(false);
            }}
            color="primary"
          >
            Применить
          </Button>
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </>
  );
}
