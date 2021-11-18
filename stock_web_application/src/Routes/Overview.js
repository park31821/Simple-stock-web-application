import React, {useState} from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import {useStocks} from "../Components/useStocks";

const Title = styled("h1")`
    margin-top: 60px;
`;

const Container = styled.div`
    display:flex;
    justify-content: center;
`;

const LinkContainer = styled.div`
    margin-bottom: 20px;
`;

const Input =styled.input`
    width: 60%;
    border: 3px solid #5b65a4;
    border-right: none;
    padding: 10px;
    height: 20px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: black;
    font-weight: bold;
    font-size: 20px;
`;

const Button =styled.button`
    width: 15%;
    border-left: none;
    border: 3px solid #5b65a4;
    background-color: #5b65a4;
    padding: 5px;
    border-radius: 0 5px 5px 0;
    outline: none;
    color: white;

    &:hover{
        background-color: #7C84B6;
        border: 3px solid #7C84B6;
        cursor: pointer;
    }
`;

const Form = styled.form`
    margin-bottom: 50px;
    margin-top: 50px;
    width:50%;
    display:flex;
    justify-content: center;
`;

const SLink = styled(Link)`
    font-size: 20px;
    text-decoration: none;

    &:hover{
        text-decoration: underline;
    }
`
const Overview = () =>{
    
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [exist, setExist] = useState(true);
    const {allStocks, loading} = useStocks();

    return(
        loading ? (
            <Loader />
        ) : (
            <>
            <Title>Company Overview</Title>
            <Container>
                <Form onSubmit={event => {
                    event.preventDefault();
                    let filteredResults = allStocks.filter(data => data.symbol.includes(search.toUpperCase()) || data.name.toUpperCase().includes(search.toUpperCase()));
                    setResults(filteredResults);
                    if(filteredResults.length === 0){
                        setExist(false);
                    }else{
                        setExist(true);
                    }
                }}>
                    <Input placeholder="Search company name or stock symbol..." value={search} onChange={event => setSearch(event.target.value)} />
                    <Button type="submit">Search</Button>
                </Form>
            </Container>
            <div>
                {exist === false ? (
                    <h1>No Results Found!</h1>
                ):(
                    results.map(result=>(
                        <LinkContainer key={Math.random()}> 
                            <SLink to={`/overview/${result.symbol}`}>{result.symbol}, {result.name}</SLink>
                        </LinkContainer>
                    ))
                )}
            </div>
            </>
            
        )
    )
}
export default Overview;