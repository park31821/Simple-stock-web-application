import styled from "styled-components";
import React from "react";


const Container = styled("div")`
    display: flex;
    justify-content: center;
    margin-top: 5%;
`;

const Image = styled("img")`
    display: inline;
    width: 100px;
`

const Header = styled("h1")`
    display: flex;
    margin-right: 20px;
    align-items: center;
`
const Text = styled("p")`
    display: flex;
    justify-content: left;
    margin: 2% 10% 0 10%;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
`


const Home = () =>{
    return(

        <>
        <Container>
            <Header>Stock Explorer</Header>
            <Image src="https://static.thenounproject.com/png/161182-200.png" />
            
        </Container>
        <Text>
            Welcome to Stock Explorer! 
            <br/>From the navigation bar, you may choose Stocks to search for stocks by symbol or industry and 
            view their price history for recent 100 days, or choose Company Overview to search for company details.
            <br/> You can always choose Home to return to the landing page.
        </Text>
        </>        
    )
    
}
export default Home;