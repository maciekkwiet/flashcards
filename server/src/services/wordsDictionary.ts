import * as fs from 'fs'

export const getAllWords = async () => {
    return fs.readFileSync('englishMostPopularWords.json')
}
