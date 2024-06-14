import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const apiKey = "API key";

const fetchData = async (symbol) => {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`
  );
  const data = await response.json();
  return data[0];
};

const fetchHangangTemperature = async () => {
  const response = await fetch("http://api.hangang.life/");
  const data = await response.json();
  return data.DATAs.DATA.HANGANG["중랑천"].TEMP;
};

export default function FinancialDashboard() {
  const [bitcoin, setBitcoin] = useState(null);
  const [hangangTemp, setHangangTemp] = useState(null);
  useEffect(() => {
    const fetchDataAsync = async () => {
      const bitcoinData = await fetchData("BTCUSD");
      const hangangTempData = await fetchHangangTemperature();
      setBitcoin(bitcoinData);
      setHangangTemp(hangangTempData);
    };

    fetchDataAsync();
  }, []);

  const renderCard = (title, data, temp) => (
    <Grid item>
      <Card className="mt-4 w-[150px] mr-2">
        <CardContent className="bg-sky-200/70 ">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {data ? (
            <>
              <Typography variant="h6" component="div">
                {data.price}
              </Typography>
              <Typography color={data.change >= 0 ? "red" : "green"}>
                {data.change >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                {data.change.toFixed(2)} ({data.changesPercentage.toFixed(2)}%)
              </Typography>
            </>
          ) : (
            <CircularProgress />
          )}
        </CardContent>
        <div className="pl-2 bg-sky-200/70 ">
          <p className="">한강 온도 : {temp}°C</p>
        </div>
      </Card>
    </Grid>
  );
  return (
    <Container>
      <Grid container>{renderCard("비트코인", bitcoin, hangangTemp)}</Grid>
    </Container>
  );
}
