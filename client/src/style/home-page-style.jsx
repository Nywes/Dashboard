import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin: 0;
    padding: 0;
`
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;
    height: 90vh;
    width:95vw;
    background-color: black;
    opacity: 0.8;
    border-radius: 15px;
`

const Item = styled.div`
    height: 22vh;
    width: 25vw;
    background-color: pink;
    opacity: 0.6;
    border-radius: 15px;
    margin: 2vh;
    padding: 1vh;
`

const WidgetManager = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22vh;
    width: 25vw;
    background-color: grey;
    opacity: 1;
    border-radius: 15px;
    margin: 2vh;
    padding: 1vh;
`

export { Wrapper, Container, Item, WidgetManager }