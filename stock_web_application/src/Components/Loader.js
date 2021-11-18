import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Container = styled("div")`
    margin-top: 50px;
    display: flex;
    justify-content: center;
`

const Loader = () => (
    <>
    <Container>
        <ReactLoading type="spin" color= "#5b65a4" />
    </Container>
    <h2>Loading...</h2>
    </>
);

export default Loader;
