import styled from 'styled-components';

export const ListItemContainer = styled.div`

    /* width: 14rem; */
    /* border: 1px solid black; */
    margin: 0.2rem 0.1rem;
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
`