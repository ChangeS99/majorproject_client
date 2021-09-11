import styled from 'styled-components';

export const FloorListCont = styled.div`
    display: flex;
    flex-direction: column;
    height: 15rem;
    overflow-y: auto;
    padding: 0.2rem;
    /* border: 0.1rem solid yellow; */
    border-bottom: 0.1rem solid ${props => props.theme.border.light};

    .floor-item-container {
        display: flex;
        margin: 0.2rem;

        padding: 0.2rem;
        border-radius: 0.5rem;

        :hover {
            background: ${props => props.theme.background.hover.light}
        }
    }

    .active-floor {
        color: white;
        background: ${props => props.theme.background.hover.light}
    }

    .floor-item-detail-container {
        font-size: 1.1rem;
        font-weight: 700;
    }

    .floor-item-btn-container {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
`;

export const RoomListCont = styled.div`
    display: flex;
    flex-direction: column;
    height: 15rem;
    overflow-y: auto;
    padding: 0.2rem;
    
    border-bottom: 0.1rem solid ${props => props.theme.border.light};

    .room-item-container {
        display: flex;
        margin: 0.2rem;

        padding: 0.2rem;
        border-radius: 0.5rem;

        :hover {
            background: ${props => props.theme.background.hover.light}
        }
    }

    .room-item-detail-container {
        font-size: 1.1rem;
        font-weight: 700;
    }

    .room-item-btn-container {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
`;