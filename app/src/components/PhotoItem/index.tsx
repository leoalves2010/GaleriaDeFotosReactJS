import React from "react";
import * as C from "./styles";
import { Photo } from "../../types/Photo";

type Props = {
    item: Photo;
};

const PhotoItem = ({ item }: Props) => {
    return (
        <C.Container>
            <img src={item.url} alt={item.name} />
            {item.name}
        </C.Container>
    );
};

export default PhotoItem;
