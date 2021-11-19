import styled from 'styled-components';

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
    height: 20vh;
    width: 25vw;
    background-color: pink;
    opacity: 0.6;
    border-radius: 15px;
    margin: 40px;
    padding: 10px;
`

const ItemW = styled.div`
    height: 60vh;
    width: 25vw;
    background-color: blueviolet;
    opacity: 0.6;
    border-radius: 15px;
    margin: 40px;
    padding: 10px;
`

export { Wrapper, Container, Item, ItemW }