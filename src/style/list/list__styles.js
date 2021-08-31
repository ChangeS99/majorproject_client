import styled from 'styled-components';

export const ListContainer = styled.div`

    padding-left: 5rem;
    padding-right: 5rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* flex-wrap: wrap; */
`;

export const ListItemContainer = styled.div`

    /* width: 14rem; */
    /* border: 1px solid black; */
    margin: 0.2rem 0.4rem;
    margin-right: 0.2rem;

    .about-item-container {
        border: 0.15rem solid ${props => props.theme.border.dark};
        border-radius: 0.3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        /* width: 14rem; */
        /* margin-right: 0.4rem; */

        .about-item-name {
            margin-left: 0.11rem;
            min-height: 2rem;
            word-break: break-all;
            p {
                word-wrap: break-word;
                font-size: 1.1rem;
            }
            
        }

        .about-item-delete-btn-cont {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-right: 0.3rem;

            button {
                border: 2px solid ${props => props.theme.background.main};
                outline: none;
                background-color: ${props => props.theme.background.main};
            }

            button:hover {
                border-radius: 0.5rem;
                color: white;
                padding: 0.4rem;
                background-color: ${props => props.theme.link.transparentHover};
            }
        }
    }

    .item-container {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;

        user-select: none;
        cursor: pointer;

        color: ${props => props.theme.link.visited};

        width: 20rem;
        border: 0.1rem solid ${props => props.theme.background.nav};
        border-radius: 0.6rem;
        transition: all 0.2s ease 0s;

        :hover {
            border: 0.1rem solid black;
            border-radius: 0.6rem;
            background-color: ${props => props.theme.link.transparentHover};
            box-shadow: 0px 15px 30px ${props=> props.theme.background.nav};
            border: 0.1rem solid ${props => props.theme.background.nav};
            color: white;
            transform: translateY(-2px);
        }

        .item-detail-container {
            /* display: inherit; */

            .item-name-container {
                display: flex;
                flex-direction: row;
               

                justify-content: space-between;

            }
            .item-name-container {
                div {
                    margin-right: 0.5rem;
                }
            }
        }

        .item-id-container {
            margin-top: 0.3rem;
        }

        .item-department-container {
            margin-top: 0.3rem;
        }

        .item-btn-container {
            margin-top: 0.3rem;
            margin-left: auto;
            /* border: 0.1rem solid ${props => props.theme.background.main}; */
            border: none;
            outline: none;
            /* background: ${props => props.theme.background.main}; */
            button {
                margin-left: 0.2rem;
                padding: 0.5rem;
                border-radius: 0.5rem;
                outline: none;
                background: ${props => props.theme.background.main};
                border-color: ${props => props.theme.background.nav};
                transition: all 0.2s ease 0s;
            }  
            
            button:hover {
                background-color: ${props=> props.theme.background.nav};
                border-color: ${props => props.theme.background.nav};
                box-shadow: 0px 15px 30px ${props=> props.theme.background.nav};
                color: #fff;
                transform: translateY(-3px);
            }
        }
    }
`