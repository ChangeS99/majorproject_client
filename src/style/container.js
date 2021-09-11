import styled from 'styled-components';

export const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    /* margin-top: 5rem; */
    /* width: 100vw; */
    min-height: 100vh;
`;

export const MainContainer = styled.div`
    flex: 1;
    flex-grow: 1;
    /* margin-top: 5rem; */
    /* margin-bottom: 1rem; */
    background-color: ${props => props.theme.background.main};
    /* width: 100vw; */
    height: 100vh;
    /* display: flex; */
`;

export const NavContainer = styled.nav`
    display: flex;
    /* position: fixed;
    top: 0;
    left: 0; */
    /* flex-direction: column; */
    height: 5rem;
    width: 100vw;
    z-index: 5;
    /* margin-bottom: 5rem; */
    background-color: ${props => props.theme.background.nav};
    justify-content: flex-start;
    align-items: center;
`;

export const DashNavCont = styled.nav`
    display: flex;
    /* position: fixed;
    top: 0;
    left: 0; */
    /* flex-direction: column; */
    background-color: ${props => props.theme.background.nav};
    height: 4rem;
    /* margin-bottom: 0rem; */
    width: 100vw;
    z-index: 4;
    /* background-color: aliceblue; */
    justify-content: center;
    align-items: center;
`;

export const ContentNavBar = styled.nav`
    display: flex;
    
    /* position: fixed;
    top: 0;
    left: 0; */
    /* flex-direction: column; */
    border-top: 1px solid ${props => props.theme.link.visited};
    height: 2rem;
    width: 100vw;
    z-index: 4;
    /* margin-bottom: 5rem; */
    /* background-color: aquamarine; */
    justify-content: center;
    align-items: center;
`;

export const Header = styled.header`
    display:flex;
    flex-direction: row;

    position: fixed;
    top: 0;
    left: 0;

    height: 5rem;
    flex-basis: 100%;
    z-index: 5;
`

export const SubHeader = styled.header`
    border-top: 1px solid ${props => props.theme.link.visited};
    display: flex;
    flex-direction: row;
    margin-top: 5rem;
    height: 4rem;
    background-color: antiquewhite;
    /* flex-basis: 100%; */
    z-index: 4;
`;

export const FixedMargin = styled.div`
    width: 100%;
    height: ${props => props.value ? props.value : "0rem"};
`;



export const Footer = styled.footer`
    /* margin-top: -3rem; */
    height: 3rem;
    background-color: blue;
    /* flex-wrap: wrap; */
    flex-grow: 0;
    flex-shrink: 0;
    /* position: fixed;
    bottom: 0; */
    background-color: ${props => props.theme.background.nav};
    width: 100vw;
    display: flex;
    flex-direction: row;

    .footer-github-logo {
        height: 100%;
        display: flex;
        align-items: center; 
        padding-left: 1rem;

        a:visited {
            color: black
        }

        a:hover {
            color: ${props => props.theme.link.active}
        }

        i {
            font-size: 2rem;
        }
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    /* height: 100vh; */
    /* margin-top: 5rem; */
`;

export const AuthContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    flex: 1;
    justify-content: center;
    /* margin-top: 5rem; */
`;

export const HospitalContainer = styled.div`
    display: flex;
    flex-direction: row;
    /* width: 100%;
    height: 100vh; */
    justify-content: center; 
`;

export const DashboardContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    /* height: 100vh; */
    justify-content: center; 
`;

export const SignInCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 25rem;
    align-items: center;
    margin-top: 2rem;
    border-color: blue;
    border: 2px solid black;
    height: 32rem;

    .heading {
        margin-top: 1rem;
        padding: 1.2rem;
    }

    .heading h1 {
        font-size: 3rem;
        font-weight: 400;
    }

    margin-bottom: 2rem;
`;

export const SignupCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 25rem;
    align-items: center;
    margin-top: 2rem;
    border-color: blue;
    border: 2px solid black;
    height: 36rem;

    .heading {
        margin-top: 1rem;
        padding: 1.2rem;
    }

    .heading h1 {
        font-size: 3rem;
        font-weight: 400;
    }
    margin-bottom: 2rem;
`;

export const AdminCreateCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 25rem;
    align-items: center;
    margin-top: 2rem;
    border-color: blue;
    border: 2px solid black;
    height: 30rem;

    .heading {
        margin-top: 1rem;
        padding: 1.2rem;
    }

    .heading h1 {
        font-size: 3rem;
        font-weight: 400;
    }

    margin-bottom: 2rem;
`;

//==============================

