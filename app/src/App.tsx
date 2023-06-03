import * as C from "./App.styles";
import * as Photos from "./services/photos";
import React, { FormEvent } from "react";
import { Photo } from "./types/Photo";
import PhotoItem from "./components/PhotoItem";

const App = () => {
    const [uploading, setUploading] = React.useState(false);
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

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get("image") as File;

        if (file && file.size > 0) {
            setUploading(true);
            let result = await Photos.insert(file);
            setUploading(false);

            if (result instanceof Error) {
                alert(`${result.name}: ${result.message}`);
            } else {
                const newPhotoList = [...photoList];
                newPhotoList.push(result);
                setPhotoList(newPhotoList);
            }
        }
    };

    const handleRemove = async (photo: Photo) => {
        let result = await Photos.remove(photo);
        if (result instanceof Error) {
            alert(`${result.name}: ${result.message}`);
        } else {
            alert("Foto removida com sucesso.");
            setLoading(true);
            setPhotoList(await Photos.getAll());
            setLoading(false);
        }
    };

    return (
        <C.Container>
            <C.Area>
                <C.Header>Galeria de Fotos</C.Header>

                <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
                    <input type="file" name="image" />
                    <input type="submit" value="Enviar" />
                    {uploading && "Enviando..."}
                </C.UploadForm>

                {loading && (
                    <C.ScreenWarning>
                        <div className="emoji">✋</div>
                        <div>Carregando...</div>
                    </C.ScreenWarning>
                )}

                {!loading && photoList.length > 0 && (
                    <C.PhotoList>
                        {photoList.map((item, index) => (
                            <PhotoItem
                                key={index}
                                item={item}
                                remove={handleRemove}
                            />
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
