import { MODIFIED_STORAGE_KEY } from "../const";
import { loadImageFromLocal } from "./load";

export async function resizeImage(
    width: number,
    height: number
): Promise<string | undefined> {
    const img = await loadImageFromLocal();
    if (!img) return undefined;
    try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return undefined;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const newBase64String = canvas.toDataURL("image/png");
        localStorage.setItem(MODIFIED_STORAGE_KEY, newBase64String);
        return newBase64String;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
