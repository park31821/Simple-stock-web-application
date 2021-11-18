import React, {useState} from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import {useStocks} from "../Components/useStocks";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const Title = styled("h1")`
    margin-top: 60px;
`;


const Container = styled("div")`
    display: flex;
    justify-content: center;
`;

const SearchContainer = styled("div")`
    margin-top: 20px;
    margin-left: 40px;
`;

const Search = styled("input")`
    width: 180px;
    height: 20px;
    margin-bottom: 30px;
`;

const SearchTitle = styled("h3")`
    display: inline;
    margin-right: 20px;
`;


const itemLink = params =>{
    let code = params.data.symbol;
    return (<Link to={`/history?symbol=${code}`}>{code}</Link>);
}


const Stocks = () =>{
    const {allStocks, loading} = useStocks();
    const [search, setSearch] = useState("");
    const [industry, setIndustry] = useState("");
    
    const table = {
        columns :[
            {headerName: "Symbol", field: "symbol", sortable: true, cellRenderer: "itemLink"},
            {headerName: "Name", field: "name"},
            {headerName: "Industry", field: "sector", sortable: true},
            {headerName: "Head Quarter", field: "headQuarter"}
    
        ]
    };
    
    const handleSymbol = event => {
        setSearch(event.target.value);
    };

    const handleIndustry = event => {
        setIndustry(event.target.value);
    };

    return(
        loading?(
            <Loader/>
        ) : (
            <>
            <Title>Choose your Stock</Title>
            <Container>
                <SearchContainer>
                    <SearchTitle>Search by Symbol</SearchTitle>
                    <Search
                        name="searchSymbol"
                        id="searchSymbol"
                        type="search"
                        placeholder="Please enter stock symbol"
                        value={search}
                        onChange={handleSymbol}
                    /> 
                </SearchContainer>
                <SearchContainer>
                    <SearchTitle>Search by Industry</SearchTitle>
                    <Search
                        name="searchIndustry"
                        id="searchIndustry"
                        type="search"
                        placeholder="Please enter Industry"
                        value={industry}
                        onChange={handleIndustry}
                    /> 
                </SearchContainer>
                
            </Container>
    
            <Container>
                <div 
                    className="ag-theme-balham"
                    style={{
                        height: "70vh",
                        width: "800px",     
                        textAlign:"end"           
                    }}
                >
                    {!search && !industry ? (
                        <AgGridReact
                        columnDefs={table.columns}
                        rowData={allStocks}
                        pagination={true}
                        paginationPageSize={20}
                        frameworkComponents={{itemLink}}
                        overlayNoRowsTemplate="No Results were found!"
                    />
                    ) : (
                        <AgGridReact
                            columnDefs={table.columns}
                            rowData={allStocks.filter(stock => stock.symbol.includes(search.toUpperCase()) && stock.sector.toLowerCase().includes(industry.toLowerCase()))}
                            pagination={true}
                            paginationPageSize={20}
                            frameworkComponents={{itemLink}}
                            overlayNoRowsTemplate="No Results were found!"
                            />
                    )}
                </div>
            </Container>
            </>
        )

    )
}
export default Stocks;