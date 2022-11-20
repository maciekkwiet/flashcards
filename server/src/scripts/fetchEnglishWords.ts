import * as fs from 'fs'

const axios = require('axios')


// example usage:
// yarn ts-node src/scripts/fetchEnglishWords.ts

interface Word {
    link: string,
    englishTranslation: string,
    polishTranslation?: string
    index?: number
}

const allWords: Word[] = []

const getAllWords = async () => {
    try {
        for (let i = 0; i <= 15; i++) {
            const response = await axios.get(`https://pl.wiktionary.org/wiki/Indeks:Angielski_-_Najpopularniejsze_s%C5%82owa_${i*2000 + 1}-${(i + 1)*2000}`)
            const data = response.data.toString()
    
            const regex = /<a href="\/wiki[^].*en<\/a>/g
            const hyperlinks = data.match(regex)
            allWords.push(...hyperlinks.map((hyperlink: string) => ({
                link: hyperlink,
                englishTranslation: hyperlink.substring(hyperlink.indexOf('title=\"en:') + 10, hyperlink.indexOf('\">en')),
            })))
        }
    } catch (err){
        console.log(err)
    }
}

const getTranslations = async () => {
    for (const [index, word] of allWords.entries()) {
        try {
            const response = await axios.get(`https://www.tlumaczangielskopolski.pl/wp-content/themes/translatica/inc/translator.php?from=en&to=pl&text=${word.englishTranslation}`)

            word.polishTranslation = response.data.text?.[0] ?? ''
            word.index = index + 1

            if (index % 20 === 0) {
                console.log(`${index} / ${allWords.length}`)
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const start = async () => {
    await getAllWords()
    await getTranslations()

    fs.writeFileSync('englishMostPopularWords.json', JSON.stringify(allWords, null, 2))
}

start()
