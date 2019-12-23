import {
  SET_CHARACTER_FILMS
} from '@/store/mutation-types'

const state = {
  charactersFilms: []
}

const getters = {
  charactersFilms: state => state.charactersFilms
}

const mutations = {
  [SET_CHARACTER_FILMS]: (state, { character, films }) => {
    state.charactersFilms.push({ name: character.name, films: films })
  }
}

const actions = {
  setCharacterFilms: ({ commit }, { character, films }) => {
    commit(SET_CHARACTER_FILMS, { character, films })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
