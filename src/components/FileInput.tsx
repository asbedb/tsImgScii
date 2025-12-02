import { useState, type ChangeEvent } from "react";
import { saveImageToLocal } from "../util/save";
import { greyScaleFilter } from "../util/greyscale";
import { resizeImage } from "../util/resize";
import { luminanceMap } from "../util/luminanceMap";
import { mapToCharCode } from "../util/mapToCharCode";
import { LOCAL_STORAGE_KEY, MODIFIED_STORAGE_KEY } from "../const";

interface FileInputProps {
    setFinalArt: (art: string | null) => void;
}

export function FileInput({ setFinalArt }: FileInputProps) {
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [originalUrl, setOriginalUrl] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    const applyResize = async () => {
        if (!width || !height || width <= 0 || height <= 0 || !originalUrl) {
            setError("Set valid dimensions and upload an image first.");
            return;
        }
        setError(null);
        try {
            const newResizeUrl = await resizeImage(width, height);

            if (newResizeUrl) {
                setPreviewUrl(newResizeUrl);
            } else {
                setError("Resize failed: No saved image found.");
            }
        } catch (e) {
            console.error("Resize error:", e);
            setError("An error occurred during resizing.");
        }
    };
    // File Input Handler
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setPreviewUrl(null);
        const file = event.target.files?.[0];
        if (file) {
            saveImageToLocal(file)
                .then((dataUrl) => {
                    if (dataUrl) {
                        setOriginalUrl(dataUrl);
                    } else {
                        setError("Not a valid image");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    setError("Failed to save image. Might be too large");
                });
        }
    };
    // Grayscale Handler
    const handleGreyscale = async () => {
        setError(null);
        try {
            const newGreyScaleUrl = await greyScaleFilter();
            if (newGreyScaleUrl) {
                setPreviewUrl(newGreyScaleUrl);
            } else {
                setError("No image found to apply filter");
            }
        } catch (e) {
            console.log(e);
            setError("Error");
        }
    };

    const handleGenerate = async () => {
        setError(null);
        if (!width) return;
        try {
            const generatedLuminanceMap = await luminanceMap();
            if (!generatedLuminanceMap) {
                setError("Could not generate lum map");
                setFinalArt(null);
                return;
            }
            const newAsciiString = mapToCharCode(generatedLuminanceMap, width);
            if (newAsciiString) {
                setFinalArt(newAsciiString);
            } else {
                setError("Couldnt generate string");
                setFinalArt(null);
            }
        } catch (e) {
            console.error(e);
            setError("Unknown error");
            setFinalArt(null);
        }
    };

    const handleReset = async () => {
        setError(null);
        setPreviewUrl(null);
        setOriginalUrl(null);
        setFinalArt(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(MODIFIED_STORAGE_KEY);
        setError("Reset Complete");
    };
    const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWidth(Number(e.target.value) || 0);
    };

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHeight(Number(e.target.value) || 0);
    };

    return (
        <div className="flex w-full h-full flex-col">
            {originalUrl ? (
                <div>
                    <span>Original:</span>
                    <img
                        src={originalUrl}
                        alt="Upload Preview"
                        className="flex w-20 h-20 max-w-full"
                    />
                </div>
            ) : (
                ""
            )}
            {previewUrl ? (
                <div>
                    <span>Modified:</span>
                    <img
                        src={previewUrl}
                        alt="Upload Preview"
                        className="flex w-20 h-20 max-w-full"
                    />
                </div>
            ) : (
                ""
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleGreyscale}>Grey</button>
            <button onClick={handleGenerate}>convert</button>
            <button onClick={applyResize} disabled={!originalUrl}>
                Resize
            </button>
            <label>Width:</label>
            <input type="number" onBlur={handleWidthChange} />
            <label>Height:</label>
            <input type="number" onBlur={handleHeightChange} />
            <button onClick={handleReset}>Reset</button>
            {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
        </div>
    );
}
