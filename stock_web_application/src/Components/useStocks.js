import {useState, useEffect} from "react";
import { getAllStocks } from "../api";


const USER_LS = "allStocks";

export const useStocks = () =>{
    const [allStocks, setAllStocks] = useState([]);
    const [loading, setLoading] = useState([true]);

    const getData = async () => {

        try{
            if(!localStorage.getItem(USER_LS)){
                const {data} = await getAllStocks();
                data.sort((a,b) => {
                    if(a.symbol < b.symbol){
                        return -1;
                    }else{
                        return 1;
                    }
                })
                localStorage.setItem(USER_LS, JSON.stringify(data));
                setAllStocks(data);
            }else{
                let data = JSON.parse(localStorage.getItem(USER_LS));
                setAllStocks(data);
            }
            
        }catch(e){
            console.log(e);
            setLoading(false);
        }finally{
            setLoading(false);
        } 
    };

    useEffect(()=>{
        getData();
    },[]);

    return {allStocks, loading};
};

