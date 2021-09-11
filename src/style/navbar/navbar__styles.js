import styled from 'styled-components';

export const LinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    /* background-color: ${props => props.theme.background.main}; */
    height: 5rem;
    width: 100%;

    .link-item-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* :hover {
            margin: auto 0rem;
            padding: 0.4rem 0.8rem;
            background-color : aliceblue;
            border: 1px solid aliceblue;
            border-radius: 9999px;
        } */
    }

    .link-item-profile-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: auto;
        margin-right: 2rem;
        /* :hover {
            background-color : aliceblue;
            border: 1px solid aliceblue;
            border-radius: 9999px;
        } */

    }

    .link-items {
        margin: auto 1rem;
        padding: 0.4rem 0.8rem;
        text-decoration: none;
        /* border-radius: 9999px; */
        border-color: black;
        font-size: 1.4rem;

        background-color : ${props => props.theme.background.nav};
        border: 1px solid ${props => props.theme.background.nav};;
        border-radius: 9999px;

        :visited {
            color: ${props => props.theme.link.active};
        }

        :hover {
            color: white;
            background-color : ${props => props.theme.link.transparentHover};
            border: 1px solid  ${props => props.theme.link.transparentHover};
            border-radius: 9999px;
        }

        
    }

    .active-link-items {
        color: ${props => props.theme.link.active};
        background-color : aliceblue;
        border: 1px solid aliceblue;
        border-radius: 9999px;
    }
`;

export const DashLinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.background.nav};
    height: 4rem;

    .dash-link-item-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 4rem;
        padding: 0.2rem 0rem;
        a {
            font-size: 1.1rem; 
        }
        
    }

    .link-items {

        margin: 0rem 1rem;
        text-decoration: none;
        border-radius: 9999px;
        border-color: black;
        font-size: 1.4rem;
        padding: 0.6rem 1.5rem;

        background-color : ${props => props.theme.background.nav};
        border: 1px solid ${props => props.theme.background.nav};;
        border-radius: 9999px;

        :visited {
            color: ${props => props.theme.link.active};
        }

        :hover {
            color: white;
            background-color : ${props => props.theme.link.transparentHover};
            border: 1px solid  ${props => props.theme.link.transparentHover};
            border-radius: 9999px;
        }
        /* background-color: greenyellow; */
    }

    .link-items:active {
        color: white;
    }

    .active-link-items {
        color: ${props => props.theme.link.active};
        background-color : aliceblue;
        border: 1px solid aliceblue;
        border-radius: 9999px;
    }
`;

export const CrudLinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${props => props.theme.background.main};
    height: 2rem;

    .crud-link-item-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        /* padding: 0.5rem 0.4rem; */
        a {
            font-size: 1.1rem; 
        }
    }

    .link-items {
        margin: 0rem 1rem;
        padding: 0rem 0.5rem;
        text-decoration: none;
        border-radius: 9999px;
        border-color: black;
        font-size: 1.4rem;

        background-color : ${props => props.theme.background.main};
        border: 1px solid ${props => props.theme.background.main};;
        border-radius: 9999px;

        :visited {
            color: ${props => props.theme.link.active};
        }

        :hover {
            color: white;
            background-color : ${props => props.theme.link.transparentHover};
            border: 1px solid  ${props => props.theme.link.transparentHover};
            border-radius: 9999px;
        }
        /* padding: 0.6rem 1.5rem; */
        /* background-color: greenyellow; */
    }

    /* .link-items:active {
        color: ${props => props.theme.link.visited};
    } */

    .active-link-items {
        color: ${props => props.theme.link.visited};
        background-color : aliceblue;
        /* border: 1px solid aliceblue; */
        border-radius: 9999px;
        padding: 0rem 0.5rem;
    }
`