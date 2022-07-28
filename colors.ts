import { bgGreen, bgYellow, bgBrightBlack } from 'colors'


const colorMethods = {
    green: bgGreen,
    yellow: bgYellow,
    gray: bgBrightBlack
}

export function colorLetter(color: 'green' | 'yellow' | 'gray', letter: string) {
    const bg = colorMethods[color]
    const colorizedLetter = bg(` ${letter} `)
    return ` ${colorizedLetter} `
}