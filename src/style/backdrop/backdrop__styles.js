import styled from 'styled-components';

export const BackdropContainer = styled.div`
    display: ${props => props.backdrop ? "block" : "none"};
    background: ${props => props.theme.background.backdrop.transparent};
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    /* z-index: ${props => props.background ? "10" : "-10"}; */

    /* display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; */
    
`;

export const DetailSidebarCont = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 1rem;
    margin-left: 1rem;

    .detail-sidebar-item {
        padding: 0.4rem;
        border: 1px solid black;

        cursor: pointer;

        margin: 0.2rem 0rem;

        :hover {
            border: 1px solid blue;
        }
    }

    .detail-sidebar-active {
        background-color: aquamarine;
        color: white;
    }
`;

export const DetailMainCont = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    margin: 0.4rem;
    margin-top: 1rem;
    margin-left: 1rem;
`;

export const PatientDetailCont = styled.div`
    display: ${props => props.backdrop ? "flex": "none"};
    flex-direction: row;
    justify-content: center;
    align-items: center;
   
    width: 100vw;
    height: 100vh;
    /* background: white; */
    /* overflow-y: scroll; */

    .detail-container {
        width: 100%;
        height: 80%;

        margin: 5rem 2rem;
        /* margin-top: 5rem; */
        margin-top: 5rem;
        /* margin-bottom: 5rem; */

        border: 0.1rem solid ${props => props.theme.background.backdrop.transparent};
        border-radius: 0.7rem;

        background: white;

        display: flex;
        flex-direction: row;

        position: relative;
    }

    .detail-close-btn {
        width: 3rem;
        height: 3rem;

        position: relative;

        top: 0;
        right: 0;


        border: 0.1rem solid transparent;
        border-radius: 50%;

        background: transparent;
        /* opacity: 0.3; */
        color: black;

        :hover {
            background: ${props => props.theme.background.backdrop.transparent};
            color: white;  
        }
    }
`;