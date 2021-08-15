import styled from 'styled-components';

export const InformationForm = styled.form`
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

    .submit {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .location_parts {
        display: flex;
        flex-direction: column;
    }

    .location_parts .location_part {
        display: flex;
        flex-direction: row;
    }

    .location_part .formComponent {
        margin: 0.2rem;
    }

    .contact_parts {
        display: flex;
        flex-direction: row;

        .formComponent {
            margin: 0.2rem;
        }
    }

`;