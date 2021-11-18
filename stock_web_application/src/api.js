import axios from "axios";

const api = axios.create({
  baseURL: "https://www.alphavantage.co/query",
  params:{
      apikey: "4N7PWZO4K5KEQ83G"
  }
});

const api2 = axios.create({
    baseURL: "https://financialmodelingprep.com/api/v3",
    params:{
        apikey:"1d1a86fa49e866279effef61ce0990fd"
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

