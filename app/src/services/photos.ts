import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { getDownloadURL, ref, listAll } from "firebase/storage";

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
