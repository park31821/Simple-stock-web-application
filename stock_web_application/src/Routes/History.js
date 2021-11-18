import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Components/Loader";
import {getStockHisory} from "../api";
import LineChart from "../Components/LineChart";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const Container = styled("div")`
    justify-content: center;
`

const DateTitle = styled("h3")`
    display: inline;    
    margin-right: 20px;
`

const DateContainer = styled("div")`
    margin-bottom: 20px;

`

const StockTitle = styled("h1")`
    display: flex;    
    justify-content: center;
    margin-top: 60px;
    margin-bottom: 50px;

`

const TableContainer = styled("div")`
    display: flex;
    justify-content: center;
`;

const USER_LS = "allHistory";


const extractHistory = obj => {
    let savedData = Object.entries(obj['Time Series (Daily)']);
    savedData.map(x => {
        x[1]['date'] = x[0];
        x.shift();
        return x;
    });
    savedData = savedData.map(data => data[0]);
    return savedData;
}

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const useStockHistory = () => {
    let query = useQuery();
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    let symbol = query.get("symbol");
    
    const getHistory = async () =>{
        try{
            if(!localStorage.getItem(USER_LS)){
                const {data} = await getStockHisory(symbol);
                let allStocks = [];
                setHistory(extractHistory(data));
                allStocks.push(data);
                localStorage.setItem(USER_LS, JSON.stringify(allStocks));
            } else {
                let allStocks = JSON.parse(localStorage.getItem(USER_LS));
                let currentStock = allStocks.filter(stock => stock['Meta Data']['2. Symbol'] === symbol);

                if(currentStock.length === 0){
                    const {data} = await getStockHisory(symbol);
                    setHistory(extractHistory(data));
                    allStocks.push(data);
                    localStorage.setItem(USER_LS, JSON.stringify(allStocks));
                    
                } else {
                    const data = currentStock[0];
                    setHistory(extractHistory(data));
                }
            }

        } catch(e){
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHistory();
    }, []);

    return {symbol, history, loading};
}



const History = () => {
    const query = useQuery();
    const {symbol, history, loading} = useStockHistory();
    const [date, setDate] = useState(query.get("from"));

    let stockData = JSON.parse(localStorage.getItem("allStocks"));
    let pathLocation = useHistory();

    const table = {
        columns :[
            {headerName: "Date", field: "date", sortable: true},
            {headerName: "Open", cellRenderer: (params=>params.data['1. open'])},
            {headerName: "High", cellRenderer: (params=>params.data['2. high'])},
            {headerName: "Low", cellRenderer: (params=>params.data['3. low'])},
            {headerName: "Close", cellRenderer: (params=>params.data['4. close'])},
            {headerName: "Volume", cellRenderer: (params=>params.data['5. volume'])},
        ]
    };


    return(
        loading ? (
            <Loader/>
        ) : (
            (date && !Date.parse(date)) || !history ? (
                <Redirect to="/stocks" />
            ) : (
                <>
                <Container>
                    <StockTitle>History for {(stockData).map(stock => {
                        if(stock.symbol === symbol){
                            return(stock.name);
                        }
                    })}</StockTitle>

                    <DateContainer>
                        <DateTitle>Filter results from (Date) : </DateTitle>
                        <input
                            name="searchIndustry"
                            id="searchIndustry"
                            type="date"
                            value={date === null ? "" : date}
                            placeholder="Please enter Industry"
                            min={history[history.length-1].date}
                            max={history[0].date}
                            onChange={(event) => {
                                setDate(event.target.value);
                                if(date === null){
                                    query.append("from", event.target.value);
                                }else{
                                    query.set("from", event.target.value);
                                }
                                pathLocation.push({
                                    pathname: pathLocation.location.pathname,
                                    search: query.toString()
                                })
                            }}
                        /> 
                    </DateContainer>
                    
                    <TableContainer> 
                        <div 
                            className="ag-theme-balham"
                            style={{
                                height:"70vh", 
                                width: "135vh",  
                                textAlign:"end"           
                            }}
                        >
                            {date === null ? (
                                <>
                                <AgGridReact
                                    columnDefs={table.columns}
                                    rowData={history}
                                    pagination={true}
                                    paginationPageSize={20}
                                    overlayNoRowsTemplate="No Results were Found!"
                                />

                                <LineChart object={history}/>

                                </>
                            ) : (
                                <>
                                <AgGridReact
                                    columnDefs={table.columns}
                                    rowData={history.filter(x => Date.parse(x.date) > Date.parse(date))}
                                    pagination={true}
                                    paginationPageSize={20}
                                    overlayNoRowsTemplate="No Results were Found!"

                                />

                                <LineChart object={history.filter(x => Date.parse(x.date) > Date.parse(date))}/>
                                </>
                            )}
                        </div>
                    </TableContainer>
                </Container>          
                </>
            )
            
        )
    )
}
export default History;