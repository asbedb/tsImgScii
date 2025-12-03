interface ImageDimensions {
    width: number
    height: number
}

export function getImageDimensions(dataUrl: string): Promise<ImageDimensions> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight,
            })
        }
        img.onerror = () => {
            reject(new Error('Failed to load image dimensions'))
        }
        img.src = dataUrl
    })
}
