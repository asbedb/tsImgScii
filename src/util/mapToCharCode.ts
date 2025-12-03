import { DEFAULT_SHADE_RAMP } from '../const'
export function mapToCharCode(
    luminanceMap: Array<number>,
    width: number,
    customShadeRamp?: string
): string | undefined {
    if (!luminanceMap || width <= 0) return undefined
    let SHADE_RAMP = ''
    if (customShadeRamp) {
        SHADE_RAMP = customShadeRamp
    } else {
        SHADE_RAMP = DEFAULT_SHADE_RAMP
    }
    const rampLength = SHADE_RAMP.length
    let convertedString: string = ''
    for (let i = 0; i < luminanceMap.length; i++) {
        const luminance = luminanceMap[i]
        const rampIndex = Math.floor((luminance / 256) * rampLength)
        convertedString += SHADE_RAMP[rampIndex]
        if ((i + 1) % width === 0 && i !== luminanceMap.length - 1) {
            convertedString += '\n'
        }
    }
    return convertedString
}
