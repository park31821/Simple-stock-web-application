import React from "react";
import styled from "styled-components";
import {withRouter,NavLink} from "react-router-dom"

const Title = styled("h1")`
    color:#fff;
    justify-self: start;
    margin-left: 20px;
`

const Nav = styled("nav")`
  height: 80px;
  background-color: #5b65a4;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const List = styled("ul")`
    display: flex;
    list-style: none;
    text-align:center;
    width: 70vw;
    justify-content: flex-end;
    margin-right: 2rem; 
`;
const Item = styled("li")`
  
`;

const SLink = styled(NavLink)`
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: white;
  transition: 0.5s;

  &:hover{
      color:white;
      background-color:#7C84B6;
      border-radius: 10px;
  }
`;

const TitleLink = styled(NavLink)`
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: white;
`;

const activeStyle = {
    "fontweight": "bold",
    "background-color":"#7C84B6",
    "border-radius": "10px",
}

export default withRouter (({location: {pathname}}) => (
    <Nav>
        <Title><TitleLink exact to="/">Stock Explorer</TitleLink></Title>
        <List>
            <Item selected={pathname === "/" }>
                <SLink exact to="/" activeStyle={activeStyle} >Home</SLink>
            </Item>
            <Item selected={pathname ==="/stocks"}>
                <SLink to="/stocks" activeStyle={activeStyle}>Stocks</SLink>
            </Item>
            <Item selected={pathname === "/overview"}>
                <SLink to="/overview" activeStyle={activeStyle}>Company Overview</SLink>
            </Item >

        </List>
    </Nav>
));