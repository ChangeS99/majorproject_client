import {css} from 'styled-components';

export const flexOrientation = (direction) => {
    return css`
        flex-direction: ${direction};
    `;
}

export const displaySize = (width="100vw", height="100vh") => {
    return css`
        width: ${width};
        height: ${height};
    `;
}

export const paddingValue = (direction="padding", value) => {

    return css`
        padding-${direction}: ${value}   
    `
}