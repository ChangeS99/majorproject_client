import styled from 'styled-components';

export const RegisterCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 25rem;
    align-items: center;
    margin-top: 2rem;
    border-color: blue;
    border: 2px solid black;
    height: 40rem;

    .heading_register {
        margin-top: 1rem;
        padding: 1.2rem;
    }

    .heading_register h1 {
        font-size: 3rem;
        font-weight: 400;
    }

    .instruction_register {
        width: 20rem;
        text-align: center;
    }
`;

export const ConfigureCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;

    .conf_button_cont {
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
`;

export const InformationCont = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 25rem; */
    align-items: center;
    margin-top: 2rem;
    border-color: blue;
    border: 2px solid black;
    height: 47rem;
    padding: 0 0.7rem;

    .heading_information {
        margin-top: 1rem;
        padding: 1.2rem;
    }

    .heading_information h1 {
        font-size: 3rem;
        font-weight: 400;
    }

    .heading_information .instruction_information {
        font-size: 0.9rem;
        text-align: center;
    }
`;