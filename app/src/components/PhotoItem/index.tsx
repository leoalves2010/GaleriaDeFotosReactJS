import React from "react";
import * as C from "./styles";
import { Photo } from "../../types/Photo";

type Props = {
    item: Photo;
    remove: (photo: Photo) => void;
};

const PhotoItem = ({ item, remove }: Props) => {
    return (
        <C.Container>
            <img src={item.url} alt={item.name} />
            <div>{item.name}</div>
            <div className="excluir" onClick={() => remove(item)}>
                Excluir
            </div>
        </C.Container>
    );
};

export default PhotoItem;
