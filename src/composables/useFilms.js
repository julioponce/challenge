import store from '@/store'
import axios from 'axios'

export default () => {
  const films = []

  const getFilms = async (character) => {
    const charactersFilms = store.getters.charactersFilms
    const filmsFound = charactersFilms.find(currentCharacter => {
      return currentCharacter.name === character.name
    })
    try {
      if (!filmsFound) {
        await requestFilms(character, 0)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const requestFilms = async (character, pos) => {
    if (pos !== null) {
      try {
        const { data } = await axios.get(character.films[pos])
        films.push(data.title)
        const nextPos = pos + 1 < character.films.length ? pos + 1 : null
        await requestFilms(character, nextPos)
      } catch (e) {
        console.log(e.message)
      }
    } else {
      saveFilms(character)
      return false
    }
  }

  const saveFilms = (character) => {
    store.dispatch('setCharacterFilms', { character, films })
  }

  const returnFilms = (character) => {
    const charactersFilms = store.getters.charactersFilms
    const filmsFound = charactersFilms.find(currentCharacter => {
      return currentCharacter.name === character.name
    })
    return filmsFound
  }

  return {
    getFilms,
    returnFilms
  }
}
