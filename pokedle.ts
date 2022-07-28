import { colorLetter } from './colors.ts'

const MAX_TRIES = 6

const previousGuesses: Array<string> = []

const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
    .then(res => res.json())
    .then(res => res.results)

console.log(pokemons)
const randomId = Math.floor(Math.random() * pokemons.length)
const pokemon = pokemons[randomId].name.toUpperCase()


let globalResults = ''

function askWord() {
    const response = prompt('The pokemon is: ')?.toUpperCase()

    console.clear()

    if (response == null) {
        return { error: '💭 You must provide a posible pokemon name' }
    } else if (response.length !== pokemon.length) {
        return { error: `📏 The pokemon name must be ${pokemon.length} characthers long` }
    } else if (previousGuesses.includes(response)) {
        return { error: '📝 You already tried this pokemon name' }
    } else if (!/^[a-zA-Z-]+$/.test(response)) {
        return { error: '📝 The pokemon name must contain letters or dash' }
    }

    return { response }
}

function print(guess: string) {
    console.clear()

    let results = ''

    const letters: Array<string> = [...guess]

    letters.forEach((letter, index) => {
        if (letter === pokemon[index]) {
            results += colorLetter('green', letter)
        } else if (pokemon.includes(letter)) {
            results += colorLetter('yellow', letter)
        } else {
            results += colorLetter('gray', letter)
        }
    })

    globalResults += `${results} \n\n`
    console.log(globalResults)
}

function start(tries: number) {
    if (tries >= MAX_TRIES) {
        console.log('%c💔 You lost!', 'color: red')
        console.log(`%cThe pokemon was ${pokemon}`, 'color: red')
        return
    }

    let guess = ''
    while (guess === '') {
        const { error, response } = askWord()

        if (error) {
            console.log(`%c${error}`, 'color: yellow')
            continue
        }

        if (response) guess = response
    }

    if (guess === pokemon) {
        print(guess)
        console.log(`%c🎉 You won!`, 'color: green')
    } else {
        print(guess)
        console.log('')
        tries++
        start(tries)
    }
}

console.clear()
console.log(`%c🎉 Welcome to the pokemon game!`, 'color: blue')
console.log(`%c💡 Hint: the pokemon name is ${pokemon.length} characthers long \n\n`, 'color: yellow')
start(0)