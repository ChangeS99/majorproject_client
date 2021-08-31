import styled from 'styled-components';

export const EmployeeFormContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const EmployeeForm = styled.form`
    
    .employee-form-name-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-top: 2rem;

        .employee-form-name-item {
            display: flex;
            flex-direction: column;
            margin: 0.8rem 0.6rem;
            position: relative;
            width: 16rem;

            label {
                font-size: 0.88rem;
            }

            input {
                margin-top: 0.4rem;

                width: 100%;
                font-size: 0.9rem;
                padding: 0.4rem;
                border-radius: 0.3rem;   
            }

            .error {
                position: absolute;
                padding: 0;
                margin: 0;
                top: -1rem;
                font-size: 0.7rem;
                color: red;
            }
        }
    }

    .employee-form-detail-container {
        display: flex;
        flex-direction: row;
        /* justify-content: space-evenly; */
        margin-top: 0.2rem;

        .employee-form-detail-item {
            display: flex;
            flex-direction: column;
            margin: 0.8rem 0.6rem;
            position: relative;

            label {
                font-size: 0.88rem;
            }

            input {
                margin-top: 0.4rem;

                width: 16rem;
                font-size: 0.9rem;
                padding: 0.4rem;
                border-radius: 0.3rem;   
            }

            select {
                margin-top: 0.4rem;

                width: 16rem;
                font-size: 0.9rem;
                padding: 0.4rem;
                border-radius: 0.3rem;  
            }

            .error {
                position: absolute;
                padding: 0;
                margin: 0;
                top: -1rem;
                font-size: 0.7rem;
                color: red;
            }
        }
    }

    .timing-join-container {
        display: flex;
        flex-direction: row;

        margin-top: 0.2rem;

        justify-content: space-evenly;

        .timing-join-date-container {
            display: flex;
            flex-direction: column;

            .timing-join-day-container {
                display: flex;
                flex-direction: row;

                .timing-join-date-item {
                    margin: 0.2rem 0.3rem;

                    label {
                        font-size: 0.88rem;
                    }

                    input {
                        margin-top: 0.4rem;

                        width: 5rem;
                        font-size: 0.9rem;
                        padding: 0.4rem;
                        border-radius: 0.3rem;   
                    } 
                }   
            }

            .timing-join-calendar-container {
                display: flex;
                flex-direction: row;

                justify-content: center;

                .calendar-container {
                    margin-top: 0.2rem;
                    width: 18rem;
                    height: 18rem;

                    border-radius: 0.5rem;

                    .react-calendar {
                        outline: none;
                        border: none;
                        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
                    }
                }

            }
        }

        .timing-time-container {
            display: flex;
            flex-direction: column;

            .timing-time-arrival-container {
                display: flex;
                flex-direction: row;

                
            } 
            
            .timing-time-arrival-item, .timing-time-leaving-item {
                    display: flex;
                    flex-direction: row;

                    margin-top: 0.2rem;
                    div {
                        margin: 0rem 0.5rem;
                    }
                   
                    label {
                        font-size: 0.9rem;
                    }

                    input {
                        border-radius: 0.4rem;
                    }
                }
        }
    }

    .employee-form-btn-container {
        display: flex;
        justify-content: center;
        margin-top: 3rem;
        button {
            border-radius: 0.4rem;
            width: 6rem;
            height: 2rem;
            outline: none;
            border: none;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease 0s;
        }

        button:hover {
            background-color: #2EE59D;
            box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
            color: #fff;
            transform: translateY(-2px);
        }
    }

    margin-bottom: 2rem;

`;

export const PatientFormContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PatientForm = styled.form`
    
    .patient-form-name-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-top: 2rem;

        .patient-form-name-item {
            display: flex;
            flex-direction: column;
            margin: 0.8rem 0.6rem;
            position: relative;
            width: 16rem;

            label {
                font-size: 0.88rem;
            }

            input {
                margin-top: 0.4rem;

                width: 100%;
                font-size: 0.9rem;
                padding: 0.4rem;
                border-radius: 0.3rem;   
            }

            .error {
                position: absolute;
                padding: 0;
                margin: 0;
                top: -1rem;
                font-size: 0.7rem;
                color: red;
            }
        }
    }

    .patient-form-detail-container {
        display: flex;
        flex-direction: row;
        /* justify-content: space-evenly; */
        margin-top: 0.2rem;

        .patient-form-detail-item {
            display: flex;
            flex-direction: column;
            margin: 0.8rem 0.6rem;
            position: relative;

            label {
                font-size: 0.88rem;
            }

            input {
                margin-top: 0.4rem;

                width: 16rem;
                font-size: 0.9rem;
                padding: 0.4rem;
                border-radius: 0.3rem;   
            }

            select {
                margin-top: 0.4rem;

                width: 16rem;
                font-size: 0.9rem;
                padding: 0.4rem;
                border-radius: 0.3rem;  
            }

            .error {
                position: absolute;
                padding: 0;
                margin: 0;
                top: -1rem;
                font-size: 0.7rem;
                color: red;
            }
        }
    }

    .patient-form-contact-container {
        display: flex;
        flex-direction: row;
        /* justify-content: space-evenly; */
        margin-top: 0.4rem;

        .patient-form-detail-item {
            display: flex;
            flex-direction: column;
            margin: 0.8rem 0.6rem;
            position: relative;

            label {
                font-size: 0.88rem;
            }

            input {
                margin-top: 0.4rem;

                width: 16rem;
                font-size: 0.9rem;
                padding: 0.4rem;
                border-radius: 0.3rem;   
            }

            select {
                margin-top: 0.4rem;

                width: 16rem;
                font-size: 0.9rem;
                padding: 0.4rem;
                border-radius: 0.3rem;  
            }

            .error {
                position: absolute;
                padding: 0;
                margin: 0;
                top: -1.4rem;
                font-size: 0.7rem;
                color: red;
            }
        }
    }



    .patient-date-container {
        display: flex;
        flex-direction: row;

        margin-top: 0.2rem;

        justify-content: space-evenly;

        .patient-condition-container {
                display: flex;
                flex-direction: column;

                .condition-label {
                    font-size: 1.1rem;
                    font-weight: 300;

                    .condition-text {
                        display: inline;
                        font-size: 1.4rem;
                        font-weight: 600;
                    }
                }

               
                button {
                    width: 10rem;
                    padding: 0.2rem;
                    border-radius: 0.4rem;
                }

                button {
                    border-radius: 0.4rem;
                    width: 7rem;
                    height: 3rem;
                    outline: none;
                    border: none;
                    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease 0s;
                }

                button:hover {
                    background-color: #2EE59D;
                    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
                    color: #fff;
                    transform: translateY(-2px);
                }
            }

        .patient-admission-container {
            display: flex;
            flex-direction: column;

            .main-heading {
                font-size: 1.6rem;
            }

            .patient-admission-calendar-container {
                display: flex;
                flex-direction: row;

                justify-content: center;
                /* border: none; */

                .calendar-container {
                    margin-top: 0.2rem;
                    width: 18rem;
                    height: 5rem;

                    border-radius: 0.5rem;

                    .react-calendar {
                        outline: none;
                        border: none;
                        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }

        .patient-admission-date-container {
            display: flex;
            flex-direction: row;

            .patient-form-date-item {
                display: flex;
                flex-direction: column;
                margin: 0.8rem 0.6rem;
                position: relative;

                label {
                font-size: 0.88rem;
                }

                input {
                    margin-top: 0.4rem;

                    width: 5rem;
                    font-size: 0.9rem;
                    padding: 0.4rem;
                    border-radius: 0.3rem;   
                }

                select {
                margin-top: 0.4rem;

                width: 16rem;
                font-size: 0.9rem;
                padding: 0.4rem;
                border-radius: 0.3rem;  
                }

                .error {
                    position: absolute;
                    padding: 0;
                    margin: 0;
                    top: -1rem;
                    font-size: 0.7rem;
                    color: red;
                }
            }

            
        }

        .patient-admission-timing-container {
            display: flex;
            flex-direction: column;

            margin-top: 2rem;

            .header {
                font-size: 1.4rem;
            }
        }

        .patient-admission-admitted-container {
            display: flex;
            flex-direction: column;

            .label {
                font-size: 0.9rem;
            }

            .patient-admission-time-container {
                display: flex;
                flex-direction: row;

                .patient-admission-time-item {
                    margin: 0.2rem 0.3rem;

                    label {
                        font-size: 0.88rem;
                    }

                    input {
                        margin-top: 0.4rem;

                        width: 3rem;
                        font-size: 0.9rem;
                        padding: 0.4rem;
                        border-radius: 0.3rem;   
                    } 
                }   
            }
        }


        .patient-admission-calendar-container {
            display: flex;
            flex-direction: row;

            justify-content: center;
            border: none;

            .calendar-container {
                margin-top: 0.2rem;
                width: 18rem;
                height: 18rem;

                border-radius: 0.5rem;

                .react-calendar {
                    outline: none;
                    border: none;
                    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
                }
            }
        }

        .timing-time-container {
            display: flex;
            flex-direction: column;

            .timing-time-arrival-container {
                display: flex;
                flex-direction: row;

                
            } 
            
            .timing-time-arrival-item, .timing-time-leaving-item {
                    display: flex;
                    flex-direction: row;

                    margin-top: 0.2rem;
                    div {
                        margin: 0rem 0.5rem;
                    }
                   
                    label {
                        font-size: 0.9rem;
                    }

                    input {
                        border-radius: 0.4rem;
                    }
                }
            }
        }

    .patient-form-btn-container {
        display: flex;
        justify-content: center;
        margin-top: 3rem;
        button {
            border-radius: 0.4rem;
            width: 6rem;
            height: 2rem;
            outline: none;
            border: none;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease 0s;
        }

        button:hover {
            background-color: #2EE59D;
            box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
            color: #fff;
            transform: translateY(-2px);
        }
    }

    margin-bottom: 2rem;

`;