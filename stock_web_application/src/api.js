import axios from "axios";

const api = axios.create({
  baseURL: "https://www.alphavantage.co/query",
  params:{
      apikey: "Placeholder"
  }
});

const api2 = axios.create({
    baseURL: "https://financialmodelingprep.com/api/v3",
    params:{
        apikey: "Placeholder"
    }
});

export const getAllStocks = () => api2.get("/nasdaq_constituent");

export const getStockHisory = (symbol) => api.get("/",{
    params: {
        function: "TIME_SERIES_DAILY",
        symbol: symbol,
    }
})

export const getOverview = (symbol) => api.get("/", {
    params: {
        function: "OVERVIEW",
        symbol: symbol,
    }
})

