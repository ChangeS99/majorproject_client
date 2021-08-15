import styled from 'styled-components';

export const AuthForm = styled.form`

    .formComponent {
        display: flex;
        position: relative;
        flex-direction: column;
        width: 20rem;
        align-items: center;
        padding: 0.9rem 0;
    }

    .formComponent .error {
        position: absolute;
        padding: 0;
        margin: 0;
        top: 1px;
        font-size: 0.8rem;
    }
    
    .formComponent .input {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        input {
            margin-top: 0.4rem;

            width: 100%;
            font-size: 0.9rem;
            padding: 0.6rem;
            border-radius: 0.3rem;
        }
    }
`;