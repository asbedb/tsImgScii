import { useState, type ChangeEvent, useCallback } from 'react'
import { greyScaleFilter } from '../util/image-utils/greyscale'
import { resizeImage } from '../util/image-utils/resize'
import { luminanceMap } from '../util/image-utils/luminanceMap'
import { mapToCharCode } from '../util/image-utils/mapToCharCode'
import { getImageDimensions } from '../util/image-utils/getImageDimensions'
import { saveImagetoIndexedDB } from '../util/indexdb-utils/saveImageToIndexedDB'
import { fileToBase64 } from '../util/indexdb-utils/fileToBase64'
import { clearImageStore } from '../util/indexdb-utils/clearImageStore'

import { DEFAULT_SHADE_RAMP, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../const'

export function useImageConvertor(setFinalArt: (art: string | null) => void) {
    const [shadeRamp, setShadeRamp] = useState<string | null>(null)
    const [width, setWidth] = useState<number | null>(null)
    const [height, setHeight] = useState<number | null>(null)
    const [originalUrl, setOriginalUrl] = useState<string | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [greyScale, setGreyscale] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>(null)

    const handleGenerate = useCallback(async () => {
        setMessage(null)
        if (!width) return
        try {
            const generatedLuminanceMap = await luminanceMap()
            if (!generatedLuminanceMap) {
                setMessage('Could not generate lum map')
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
                setMessage('Couldnt generate string')
                setFinalArt(null)
            }
        } catch (e) {
            console.error(e)
            setMessage('Unknown error')
            setFinalArt(null)
        }
    }, [setFinalArt, shadeRamp, width])

    const applyResize = useCallback(async () => {
        const finalWidth = width && width > 0 ? width : DEFAULT_WIDTH
        const finalHeight = height && height > 0 ? height : DEFAULT_HEIGHT
        if (!originalUrl) {
            setMessage('Please select an image first.')
            return
        }
        if (!width || !height || width <= 0 || height <= 0) {
            setMessage(
                `Default dimensions applied: ${finalWidth}x${finalHeight}`
            )
            setWidth(finalWidth)
            setHeight(finalHeight)
        } else {
            setMessage(null)
        }
        try {
            const newResizeUrl = await resizeImage(finalWidth, finalHeight)
            if (newResizeUrl) {
                setPreviewUrl(newResizeUrl)
                await handleGenerate()
            } else {
                setMessage('Resize failed: No saved image found.')
            }
        } catch (e) {
            console.error('Resize error:', e)
            setMessage('An error occurred during resizing.')
        }
    }, [width, height, originalUrl, handleGenerate])

    const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHeight(Number(e.target.value) || 0)
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(null)
        setPreviewUrl(null)
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const dataUrl = await fileToBase64(file)
            await saveImagetoIndexedDB(dataUrl, false)
            const dimensions = await getImageDimensions(dataUrl)
            setOriginalUrl(dataUrl)
            setWidth(dimensions.width)
            setHeight(dimensions.height)
        } catch (e) {
            console.log(e)
            setMessage(`${e}`)
        }
    }

    const handleGreyscale = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            const isNowGreyscale = e.target.checked
            setGreyscale(isNowGreyscale)
            setMessage(null)
            if (isNowGreyscale) {
                try {
                    const newGreyScaleUrl = await greyScaleFilter()
                    if (newGreyScaleUrl) {
                        setPreviewUrl(newGreyScaleUrl)
                    } else {
                        setMessage('No image found to apply filter')
                    }
                } catch (e) {
                    console.log(e)
                    setMessage('Error')
                }
            } else {
                applyResize()
            }
        },
        [applyResize]
    )

    const handleReset = async () => {
        setMessage(null)
        setPreviewUrl(null)
        setOriginalUrl(null)
        setFinalArt(null)
        try {
            await clearImageStore()
            setMessage('Reset Complete')
        } catch (e) {
            setMessage(`${e}`)
        }
    }

    const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWidth(Number(e.target.value) || 0)
    }

    const handleShadeRampChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShadeRamp(String(e.target.value) || DEFAULT_SHADE_RAMP)
    }

    return {
        shadeRamp,
        width,
        height,
        originalUrl,
        previewUrl,
        message,
        greyScale,
        handleFileChange,
        handleWidthChange,
        handleHeightChange,
        handleShadeRampChange,
        handleGreyscale,
        handleReset,
        applyResize,
        handleGenerate,
    }
}
