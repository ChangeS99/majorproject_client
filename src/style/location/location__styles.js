import styled from 'styled-components';

export const LocationCont = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.9rem;

    .heading_location h1 {
        font-size: 3rem;
        font-weight: 400;
        margin: 0;
        padding: 0;
        margin-bottom: 0.7rem;
    }
    
    .map_main_container {
        display: flex;
        flex-direction: row;
    }
`;

export const MapCont = styled.div`
    border: 2px solid black;

    .map-container {
        width: 35rem;
        height: 30rem;
    }
`;

export const SearchCont = styled.div`

    margin-left: 0.5rem;

    .searchbox_container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        /* border: 2px solid black; */
        width: 100%;

        input {
            padding: 0.4rem;
            width: 18rem;
        }
    }

    /* border: 2px solid black; */
    width: 20rem;
    display: flex;
    flex-direction: column;
`;

export const ResultCont = styled.div`
    display: flex;
    flex-direction: column;
    /* border: 2px solid blue; */
    /* height: 27.5rem; */
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }
 
    &::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
    }
 
    &::-webkit-scrollbar-thumb {
        background-color: #d4aa70;
        border-radius: 100px;
    }
`;

export const ResultItemCont = styled.div`
    padding: 0.5rem;
    border: 2px solid yellow;
    margin: 0.3rem;
    cursor: pointer;
`;