import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'

const defaultProps = {
  // bgcolor: "background.paper",
  border: 1,
  m: 0.2,
  borderColor: "white",
  // style: { width: "5rem", height: "5rem" },
};

export default function WeatherNowDetail() {
  function data(name: string, value: string) {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Box
            component="span"
            sx={{
              textAlign: "center",
              fontSize: 10,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {name}
          </Box>
        </Grid>
        <Grid item>
          <Box
            component="span"
            sx={{
              textAlign: "center",
              fontSize: 10,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {value}
          </Box>
        </Grid>
      </Grid>
    );
  }
  return (
    <Box
      {...defaultProps}
      borderRight={0}
      borderLeft={0}
      sx={{ height: 50, mt: 5 }}
    >
      <Grid
        spacing={0}
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        {data("Облака", "25%")}
        {data("Осадки", "0.0 мм")}
      </Grid>
    </Box>
  );
}
