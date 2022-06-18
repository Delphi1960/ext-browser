import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AppBar() {
  // const [isDrawerOpen, setDrawerIsOpen] = useRecoilState(drawerState);
  // const handleToggleDrawer = () => setDrawerIsOpen(!isDrawerOpen);

  const navigate = useNavigate();
  const handleCurrentClick = () => {
    navigate("/");
  };
  const handleDaylyClick = () => {
    navigate("/weathertable");
  };
  const handleChartClick = () => {
    navigate("/chart");
  };

  const location = useLocation();
  const isActiveFontColor = (path: string) =>
    location.pathname === path ? "yellow" : "white";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
        <Button
          onClick={handleCurrentClick}
          sx={{
            color: isActiveFontColor("/"),
            display: "block",
          }}
        >
          сейчас
        </Button>
        <Button
          onClick={handleDaylyClick}
          sx={{
            color: isActiveFontColor("/weathertable"),
            display: "block",
          }}
        >
          прогноз
        </Button>
        <Button
          onClick={handleChartClick}
          sx={{
            color: isActiveFontColor("/chart"),
            display: "block",
          }}
        >
          график
        </Button>
      </Box>
    </Box>
  );
}
