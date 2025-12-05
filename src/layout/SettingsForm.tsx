import { useState, type ChangeEvent } from 'react'
import { saveImageToLocal } from '../util/storage-utils/save'
import { greyScaleFilter } from '../util/image-utils/greyscale'
import { resizeImage } from '../util/image-utils/resize'
import { luminanceMap } from '../util/image-utils/luminanceMap'
import { mapToCharCode } from '../util/image-utils/mapToCharCode'
import {
    DEFAULT_HEIGHT,
    DEFAULT_SHADE_RAMP,
    DEFAULT_WIDTH,
    LOCAL_STORAGE_KEY,
    MODIFIED_STORAGE_KEY,
} from '../const'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { ImageComponent } from '../components/ImageComponent'
import { getImageDimensions } from '../util/image-utils/getImageDimensions'

interface FileInputProps {
    setFinalArt: (art: string | null) => void
    toggleAbout: () => void
}

export function SettingsForm({ setFinalArt, toggleAbout }: FileInputProps) {
    const [shadeRamp, setShadeRamp] = useState<string>(DEFAULT_SHADE_RAMP)
    const [greyScale, toggleGreyScale] = useState<boolean>(false)
    const [width, setWidth] = useState<number | null>(null)
    const [height, setHeight] = useState<number | null>(null)

    const [originalUrl, setOriginalUrl] = useState<string | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const [error, setError] = useState<string | null>(null)

    const applyResize = async () => {
        const finalWidth = width && width > 0 ? width : DEFAULT_WIDTH
        const finalHeight = height && height > 0 ? height : DEFAULT_HEIGHT
        if (!originalUrl) {
            setError('Please select an image first.')
            return
        }
        if (!width || !height || width <= 0 || height <= 0) {
            setError(`Default dimensions applied: ${finalWidth}x${finalHeight}`)
            setWidth(finalWidth)
            setHeight(finalHeight)
        } else {
            setError(null)
        }
        try {
            const newResizeUrl = await resizeImage(finalWidth, finalHeight)
            if (newResizeUrl) {
                setPreviewUrl(newResizeUrl)
                handleGenerate()
            } else {
                setError('Resize failed: No saved image found.')
            }
        } catch (e) {
            console.error('Resize error:', e)
            setError('An error occurred during resizing.')
        }
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setPreviewUrl(null)
        const file = event.target.files?.[0]
        if (!file) return
        try {
            const dataUrl = await saveImageToLocal(file)
            if (dataUrl) {
                const dimensions = await getImageDimensions(dataUrl)
                setOriginalUrl(dataUrl)
                setWidth(dimensions.width)
                setHeight(dimensions.height)
            } else {
                setError('Not a valid image')
            }
        } catch (e) {
            console.log(e)
            setError(`${e}`)
        }
    }

    // Grayscale Handler (To be used later with contrast slider etc)
    const handleGreyscale = async (e: ChangeEvent<HTMLInputElement>) => {
        const isNowGreyscale = e.target.checked
        toggleGreyScale(isNowGreyscale)
        setError(null)
        if (!greyScale) {
            try {
                const newGreyScaleUrl = await greyScaleFilter()
                if (newGreyScaleUrl) {
                    setPreviewUrl(newGreyScaleUrl)
                } else {
                    setError('No image found to apply filter')
                }
            } catch (e) {
                console.log(e)
                setError('Error')
            }
        } else {
            applyResize()
        }
    }

    const handleGenerate = async () => {
        setError(null)
        if (!width) return
        try {
            const generatedLuminanceMap = await luminanceMap()
            if (!generatedLuminanceMap) {
                setError('Could not generate lum map')
                setFinalArt(null)
                return
            }
            const newAsciiString = mapToCharCode(
                generatedLuminanceMap,
                width,
                shadeRamp
            )
            if (newAsciiString) {
                setFinalArt(newAsciiString)
            } else {
                setError('Couldnt generate string')
                setFinalArt(null)
            }
        } catch (e) {
            console.error(e)
            setError('Unknown error')
            setFinalArt(null)
        }
    }

    const handleReset = async () => {
        setError(null)
        setPreviewUrl(null)
        setOriginalUrl(null)
        setFinalArt(null)
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        localStorage.removeItem(MODIFIED_STORAGE_KEY)
        setError('Reset Complete')
    }

    const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWidth(Number(e.target.value) || 0)
    }

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHeight(Number(e.target.value) || 0)
    }

    const handleShadeRampChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShadeRamp(String(e.target.value) || DEFAULT_SHADE_RAMP)
    }

    return (
        <div className="flex h-full flex-col gap-4">
            <div className="flex w-full flex-col gap-4 border border-white/10 p-2">
                <span className="text-center font-bold">{`Select your Image`}</span>
                <div className="flex flex-col justify-center gap-2 md:flex-row">
                    {originalUrl ? (
                        <ImageComponent
                            label="Original:"
                            sourceUrl={originalUrl}
                        />
                    ) : (
                        ''
                    )}
                    {previewUrl ? (
                        <ImageComponent
                            label="Modified:"
                            sourceUrl={previewUrl}
                        />
                    ) : (
                        ''
                    )}
                </div>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    label="Select Image:"
                    responsive
                />
            </div>
            <div className="flex w-full flex-col gap-4 border border-white/10 p-2">
                <span className="text-center font-bold">{`Update Shaderamp (Bright -> Dark)`}</span>
                <Input
                    type="text"
                    label="Shade Ramp:"
                    customPlaceholder={
                        shadeRamp
                            ? shadeRamp
                            : `${DEFAULT_SHADE_RAMP} (default)`
                    }
                    onChange={handleShadeRampChange}
                    isTextInput
                />
                <Button label="Apply Shaderamp" onClick={handleGenerate} />
            </div>
            <div className="flex w-full flex-col gap-4 border border-white/10 p-2">
                <span className="text-center font-bold">{`Size: (1px = 1 Character)`}</span>
                <Input
                    type="number"
                    onChange={handleWidthChange}
                    value={width ? width : ''}
                    label="Width"
                    isTextInput
                />
                <Input
                    type="number"
                    onChange={handleHeightChange}
                    label="Height"
                    value={height ? height : ''}
                    isTextInput
                />
                <Button label="Apply Resize" onClick={applyResize} />
            </div>
            <Button label="Generate" onClick={handleGenerate} />
            <Button label="Reset" onClick={handleReset} />
            <div className="flex w-full flex-col gap-4 border border-white/10 p-2">
                <span className="text-center font-bold">{`Experimental (for planned future features)`}</span>
                <Input
                    type="checkbox"
                    label="Toggle Greyscale:"
                    onChange={handleGreyscale}
                    isChecked={greyScale}
                />
            </div>
            <Button label="About" onClick={toggleAbout} />
            {error && (
                <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
            )}
        </div>
    )
}
