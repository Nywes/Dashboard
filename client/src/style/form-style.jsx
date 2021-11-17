import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`
const Title = styled.h1`
    margin: 100px;
    font-size: 500%;
`

const InputText = styled.input`
    vertical-align: middle;
    text-align: center;
    margin: 15px;
    padding: 5px 15px 5px 15px;
    border-radius: 25px;
    font-size: 200%;
    opacity: 0.8;
`

const Button = styled.button`
    margin: 15px;
    padding: 5px 15px 5px 15px;
    border-radius: 25px;
    font-size: 150%;

`

const FormButtons = styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
`

const HorBar = styled.div`
    height:10px;
    width:90%;
    margin: 100px 0px 20px 0px;
    border-radius: 5px;
    background-color: black;
    opacity: 0.4;
`

export {Wrapper, Title, InputText, Button, FormButtons, HorBar}