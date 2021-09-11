import styled from 'styled-components';

export const DashContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 2rem;
    width: 100vw;

    .about-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .floor-room-management {
        display: flex;
        flex-direction: column;
        /* justify-content: space-around; */
        border: 0.1rem solid black;
        margin-top: 2rem;
        margin-bottom: 1rem;

        .header {
            margin-left: 2rem;
        }

        .floor-room-main-cont {
            display: flex;
            flex-direction: row;
        /* justify-content: space-around; */
        }

        .floor-item {
            border: 0.1rem solid black;
            flex: 3;
            margin-left: 2rem;
            margin-right: 2rem;
            padding-left: 2rem;
            padding-right: 2rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
            height: 23rem;

            .floor-item-content {
                display: flex;
                flex-direction: column;
                border: 0.1rem solid blue;
                height: 100%;

                .item-input-cont {
                    margin-top: auto;
                    height: 4rem;
                    padding: 0.3rem;
                    display: flex;
                    /* height: 100%; */
                    align-items: center;

                    .item-input-item {
                        label {
                            font-size: 0.9rem;
                            font-weight: 700;
                        }
                    }

                    .item-input-btn-item {
                        margin-left: auto;
                    }
                }
            }
        }

        .room-item {
            border: 0.1rem solid black;
            flex: 4;
            margin-left: 2rem;
            margin-right: 3rem;
            padding-left: 2rem;
            padding-right: 2rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
            height: 23rem;

            .room-item-content {
                display: flex;
                flex-direction: column;
                border: 0.1rem solid blue;
                height: 100%;

                .item-input-cont {
                    margin-top: auto;
                    height: 4rem;
                    padding: 0.3rem;
                    display: flex;
                    /* height: 100%; */
                    align-items: center;

                    .item-input-item {
                        label {
                            font-size: 0.9rem;
                            font-weight: 700;
                        }
                    }

                    .item-input-btn-item {
                        margin-left: auto;
                    }
                }
            }
        }

        .room-input-cont {
            display: flex;
        }

        .item-input-cont {
            .item-input-item{
                label {
                    font-size: 0.9rem;
                }

                input {
                    
                    padding: 0.2rem;
                    border-radius: 0.5rem;
                    outline:${props => props.theme.link.visited};
                    border: 2px solid ${props => props.theme.link.active};

                    :focus {
                        border: 2px solid ${props => props.theme.link.visited};
                    }
                }
            }

            .item-input-btn-item {
                /*  */
            }
        }
    }

    .about-detail-container {
        display: flex;
        flex-direction: column;

        .about-detail-header {
            font-size: 2rem;

            h1 {
                padding: 0;
                margin: 0;  
            }
        }

        .about-detail-main {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .about-detail-main-item {
                font-size: 1.2rem;
                height: 3rem;
                border-bottom: 0.1rem solid ${props => props.theme.link.visited};
            }
        }
    }

    .role-department-container {
        display: flex;
        flex-direction: row;
        width: 33rem;
        height: 23rem;
        justify-content: space-between;

        .role-container, .department-container {
            h1 {
                font-size: 1.5rem;
                margin: 0;
                padding: 0;
                margin-right: auto;
                margin-left: 0.3rem;
                color: ${props => props.theme.link.visited};
            }

            display: flex;
            flex-direction: column;
            align-items: center;
            border: 0.2rem solid ${props => props.theme.border.dark};
            width: 16rem;
            border-radius: 0.4rem;

            .role-input-cont, .department-input-cont {
                width: 100%;
                height: 1.7rem;
                /* background-color: bisque; */
                margin-bottom: 0.2rem;
                display: flex;
                flex-direction: row;
                padding: 0 0.2rem;
                input {
                    flex: 8
                }

                justify-content: space-between;

                input {
                    
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    outline:${props => props.theme.link.visited};
                    border: 2px solid ${props => props.theme.link.active};

                    :focus {
                        border: 2px solid ${props => props.theme.link.visited};
                    }
                }

                button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 0.2rem;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    outline: none;
                    border-color: ${props => props.theme.background.nav};
                    transition: all 0.2s ease 0s;
                }  

                button:hover {
                    background-color: ${props => props.theme.background.nav};
                    box-shadow: 0px 15px 30px ${props => props.theme.background.nav};
                    color: #fff;
                    transform: translateY(-2px);
                }
            }
        }

        .role-content, .department-content {
            flex: 1;
            /* width: 14rem;
            flex-wrap: 1; */
            word-wrap: break-word;
            /* height: 2rem; */
        }
    }
`;

export const ContentTabsCont = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 3rem;
    position: fixed;
    width: 100%;
    background-color: antiquewhite;
    z-index: 5;

    div {
        cursor: pointer;
    }
`;

export const ContentAdminCont = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;


export const ContentMainCont = styled.div`
    margin-top: 1.3rem;
    width: 100%;
    margin-bottom: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ContentUtilityCont = styled.div`
    display: flex;
    flex-direction: column;

    .filter-button-container {
        button {
            border: 1px solid ${props => props.theme.background.main};
            border-radius: 9999px;
            width: 3rem;
            transition: all 0.2s ease 0s;
        }

        button:hover {
            background-color: ${props => props.theme.background.nav};
            box-shadow: 0px 7px 10px ${props => props.theme.background.nav};
            color: #fff;
            transform: translateY(-2px);
        }
    }
`;

export const ContentListCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    /* background-color: greenyellow; */
`

export const SearchBarCont = styled.div`

    margin-top: 1rem;

    .searchbar_form .searchbar_form_component {
        input {
            width: 40rem;
            padding: 0.5rem;
            border-radius: 0.5rem;
            outline:${props => props.theme.link.visited};
            border: 2px solid ${props => props.theme.link.active};

            :focus {
                border: 2px solid ${props => props.theme.link.visited};
            }
        }

        button {
            margin-left: 0.2rem;
            padding: 0.5rem;
            border-radius: 0.5rem;
            outline: none;
            border-color: ${props => props.theme.background.nav};
            transition: all 0.2s ease 0s;
        }

        button:hover {
            background-color: ${props => props.theme.background.nav};
            box-shadow: 0px 15px 30px ${props => props.theme.background.nav};
            color: #fff;
            transform: translateY(-2px);
        }
    }
`;