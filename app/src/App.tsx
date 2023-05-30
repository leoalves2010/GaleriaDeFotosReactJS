import * as C from "./App.styles";
import * as Photos from "./services/photos";
import React from "react";
import { Photo } from "./types/Photo";

const App = () => {
    const [loading, setLoading] = React.useState(false);
    const [photoList, setPhotoList] = React.useState<Photo[]>([]);

    React.useEffect(() => {
        const getPhotos = async () => {
            setLoading(true);
            setPhotoList(await Photos.getAll());
            setLoading(false);
        };

        getPhotos();
    }, []);

    return (
        <C.Container>
            <C.Area>
                <C.Header>Galeria de Fotos</C.Header>

                {loading && (
                    <C.ScreenWarning>
                        <div className="emoji">✋</div>
                        <div>Carregando...</div>
                    </C.ScreenWarning>
                )}

                {!loading && photoList.length > 0 && (
                    <C.PhotoList>
                        {photoList.map((item, index) => (
                            <div>{item.name}</div>
                        ))}
                    </C.PhotoList>
                )}

                {!loading && photoList.length === 0 && (
                    <C.ScreenWarning>
                        <div className="emoji">😞</div>
                        <div>Nenhuma foto cadastrada.</div>
                    </C.ScreenWarning>
                )}
            </C.Area>
        </C.Container>
    );
};

export default App;
