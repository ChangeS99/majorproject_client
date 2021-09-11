import styled from 'styled-components';

export const InfoCont = styled.div`
    height: 100%;
    /* border: 0.1rem solid black; */

    .info-name-cont {
        display: flex;
        flex-direction: column;

        .info-name-header {
            font-size: 0.9rem;
            font-weight: 600;
        }
    }

    .info-name-item-cont {
        display: flex;
    }

    .info-name-item {
        padding: 0.3rem;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .info-department-cont {
        display: flex;
        flex-direction: column;

        .info-department-header {
            font-size: 0.9rem;
            font-weight: 600;
        }
    }

    .info-department-item-cont {
        display: flex;
        flex-wrap: wrap;
        width: 30%;
    }

    .info-department-item {
        margin: 0;
        padding: 0.2rem;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .info-date-cont {
        display: flex;
        flex-direction: column;

        .info-date-header {
            font-size: 0.9rem;
            font-weight: 600;
        }
    }

    .info-date-item-cont {
        padding: 0.2rem;
        font-weight: 600;
        background: #f0f0f0;
        .react-datetime-picker, .react-datetime-picker--close, .react-datetime-picker--disabled {

            .react-datetime-picker__wrapper {
                border: none;
            }
        }

        width: fit-content;
    }
`;