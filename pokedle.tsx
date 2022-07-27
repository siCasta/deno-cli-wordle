const MAX_TRIES = 6
const previousGuesses: Array<string> = []

let globalResults = ''
const pokemon = 'pikachu'
let tries = 0

function askWord() {
    const response = prompt('The pokemon is: ')

    if (response == null) {
        return { error: '💭 You must provide a posible pokemon name' }
    } else if (response.length !== pokemon.length) {
        return { error: `📏 The pokemon name must be ${pokemon.length} characthers long` }
    } else if (previousGuesses.includes(response)) {
        return { error: '📝 You already tried this pokemon name' }
    } else if (!/^[a-zA-Z]+$/.test(response)) {
        return { error: '📝 The pokemon name must contain letters' }
    }

    return { response }
}

function print(guess: string) {
    console.clear()
}

function start(tries: number) {
    const { length } = pokemon

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

start(tries)