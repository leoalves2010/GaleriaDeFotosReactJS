import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { getDownloadURL, ref, listAll, uploadBytes } from "firebase/storage";

export const getAll = async () => {
    let list: Photo[] = [];

    const listRef = ref(storage, "images");

    const photoList = await listAll(listRef);

    for (let i in photoList.items) {
        const photoUrl = await getDownloadURL(photoList.items[i]);
        list.push({
            name: photoList.items[i].name,
            url: photoUrl,
        });
    }

    return list;
};

export const insert = async (file: File) => {
    if (["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        const newFile = ref(storage, `images/${file.name}`);
        const upload = await uploadBytes(newFile, file);
        const photoUrl = await getDownloadURL(upload.ref);
        return {
            name: upload.ref.name,
            url: photoUrl,
        } as Photo;
    } else {
        return new Error("Tipo de arquivo não permitido.");
    }
};
