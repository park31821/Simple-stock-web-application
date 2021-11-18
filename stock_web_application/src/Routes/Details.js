import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Components/Loader";
import {getOverview} from "../api";

const USER_LS = "allOverview";

const Container = styled("div")`
    text-align: left;
    margin: 5% 15% 15% 15%;
`

const Title = styled("h1")`
    margin-top: 5%;
`

const useOverview = () => {
    const symbol = useParams().symbol;
    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const getAllOverview = async () =>{
        try{
            if(!localStorage.getItem(USER_LS)){
                const {data} = await getOverview(symbol);
                let allOverview = [];
                if(Object.entries(data).length > 0){
                    allOverview.push(data);
                }          
                localStorage.setItem(USER_LS, JSON.stringify(allOverview));
                setOverview(data);
               
            } else {
                let allOverview = JSON.parse(localStorage.getItem(USER_LS));
                let currentOverview = allOverview.filter(overview => overview['Symbol'] === symbol);

                if(currentOverview.length === 0){
                    const {data} = await getOverview(symbol);
                    if(Object.entries(data).length > 0){
                        allOverview.push(data);
                    }
                    localStorage.setItem(USER_LS, JSON.stringify(allOverview));
                    setOverview(data);
                } else {
                    const data = currentOverview[0];
                    setOverview(data);
                }
            }

        } catch(e){
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllOverview();
    },[]);

    return { overview, loading};
}

const Details = () => {
    const {overview, loading} = useOverview();

    return(
        loading ? (
            <Loader/>
        ) : (
            Object.entries(overview).length === 0 ? (
                <Redirect to="/overview"/>
            ) : (
                <>
                <Title>{overview.Name} ({overview.Symbol})</Title>     
                <Container>
                    <h4>Description</h4>
                    <p>{overview.Description}</p>
                    <h4>Address : {overview.Address}</h4>
                    <h4>Full Time Employees : {overview.FullTimeEmployees}</h4>
                    <h4>Sector : {overview.Sector}</h4>
                    <h4>Asset Type : {overview.AssetType}</h4>
                    <h4>Currency : {overview.Currency}</h4>
                </Container>    
                </>  
            )
            
        )
    )
}
export default Details;