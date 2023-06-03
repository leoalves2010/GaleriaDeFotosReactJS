import styled from "styled-components";

export const Container = styled.div`
    background-color: #3d3f43;
    border-radius: 10px;
    padding: 10px;

    img {
        max-width: 100%;
        display: block;
        margin-bottom: 10px;
        border-radius: 10px;
    }

    .excluir {
        display: inline-block;
        background-color: #ca1e1e;
        border-radius: 5px;
        padding: 7px;
        font-size: 10px;
        cursor: pointer;
        margin-top: 5px;

        &:hover {
            opacity: 0.9;
        }
    }
`;
