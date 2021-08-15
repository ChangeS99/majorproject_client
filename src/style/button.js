import styled from 'styled-components';

export const SubmitButton = styled.button`
    outline: none;
    border: none;
    padding: 0.7rem 2rem;
    border-radius: 9999px;
    border: 0.2rem solid ${props => props.theme.background.main};
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: ${props=> props.theme.background.nav};
        box-shadow: 0px 7px 10px ${props=> props.theme.background.nav};
        color: #fff;
        transform: translateY(-2px);
    }

`;

export const ConfButton = styled.button`
    outline: none;
    border: none;
    padding: 0.7rem 2rem;
    border-radius: 0.5rem;
    border: 0.2rem solid black;

    margin-bottom: 4rem;

    &:hover {
        background-color: yellow;
    }
`;