import styled from "styled-components";

export const UpdatePatientCont = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const UpdateTopBarCont = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;

    div {
        margin: 0rem 0.3rem;
        padding: 0.2rem 0.2rem;

        cursor: pointer;

        border-radius: 0.5rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        /* :hover {
            background: blue;
        } */
    }

    .active-tab {
        background: bisque;
    }
`;

export const PatientUpdateMainCont = styled.div`
    border: 0.3rem solid bisque;
    border-radius: 0.5rem;
    height: 100%;
    overflow-y: auto;
`;

export const NameUpdateCont = styled.div`
    /* border: 0.1rem solid blue; */

    margin: 1rem 2rem;

    .update-item-cont {
        display: flex;
        flex-direction: column;

        margin: 1rem 0rem;

        label {
            font-size: 0.9rem;
        }

        input {
            width: 25rem;

            font-size: 0.9rem;
            padding: 0.4rem;
            border-radius: 0.3rem;  
        }
    }
`;

export const DetailUpdateCont = styled.div`
    /* border: 0.1rem solid blue; */

    margin: 1rem 2rem;

    .update-item-cont {
        display: flex;
        flex-direction: column;

        margin: 1rem 0rem;

        /* label {
            font-size: 0.9rem;
        }

        input {
            width: 25rem;

            font-size: 0.9rem;
            padding: 0.4rem;
            border-radius: 0.3rem;  
        } */

        .dob-cont {
            z-index: 50;  
        }
    }
`;

export const HospitalUpdateCont = styled.div`
    /* border: 0.1rem solid blue; */

    margin: 1rem 2rem;

    .update-item-cont {
        display: flex;
        flex-direction: column;

        margin: 1rem 0rem;
        

        label {
            font-size: 0.9rem;
        }

        input {
            width: 25rem;

            font-size: 0.9rem;
            padding: 0.4rem;
            border-radius: 0.3rem;  
        }
    }
`;

export const DatesUpdateCont = styled.div`
    /* border: 0.1rem solid blue; */

    margin: 1rem 2rem;

    .update-item-cont {
        display: flex;
        flex-direction: column;

        margin: 1rem 0rem;

        /* label {
            font-size: 0.9rem;
        }

        input {
            width: 25rem;

            font-size: 0.9rem;
            padding: 0.4rem;
            border-radius: 0.3rem;  
        } */
    }
`;

export const ContactUpdateCont = styled.div`
    /* border: 0.1rem solid blue; */

    margin: 1rem 2rem;

    .update-item-cont {
        display: flex;
        flex-direction: column;

        margin: 1rem 0rem;

        label {
            font-size: 0.9rem;
        }

        input {
            width: 25rem;

            font-size: 0.9rem;
            padding: 0.4rem;
            border-radius: 0.3rem;  
        }
    }
`;

export const StageUpdateCont = styled.div`
    margin: 1rem 2rem;

    .update-item-cont {
        display: flex;
        flex-direction: column;

        margin: 1rem 0rem;

        label {
            font-size: 0.9rem;
        }

        input {
            width: 25rem;

            font-size: 0.9rem;
            padding: 0.4rem;
            border-radius: 0.3rem;  
        }
    }
`;