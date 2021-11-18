import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import Stocks from "../Routes/Stocks";
import Overview from "../Routes/Overview";
import History from "../Routes/History";
import Details from "../Routes/Details";


const Routers = () => {
    return(
        <Router>
            <Header/>
            <Route path="/" exact component={Home} />
            <Route path="/stocks" exact component={Stocks} />
            <Route path="/overview" exact component={Overview}/>
            <Route path="/overview/:symbol" component={Details} />
            <Route path="/history/:symbol?" component={History}/>          
        </Router>
    );
};

export default Routers;