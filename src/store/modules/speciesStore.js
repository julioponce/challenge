import {
  SET_SPECIES_SUCCESS,
  SET_SPECIES_FAILURE,
  SET_SPECIES_LOADING,
  SET_SPECIES_PAGE,
  SET_SPECIES_SORTER,
  SET_SPECIES_FILTER
} from '@/store/mutation-types'

const state = {
  rawData: [],
  species: {
    flat: [],
    paginated: [],
    loading: false,
    error: null
  },
  speciesPage: 0,
  speciesFilter: '',
  speciesSorter: 'name',
  speciesSortOptions: ['name', 'classification']
}

const getters = {
  rawSpecies: state => state.rawData,
  species: ({ species }) => species.flat,
  speciesPaginated: ({ species }) => species.paginated,
  speciesLoading: ({ species }) => species.loading,
  speciesError: ({ species }) => species.error,
  speciesPage: state => state.speciesPage,
  speciesSorter: state => state.speciesSorter,
  speciesSortOptions: state => state.speciesSortOptions,
  speciesFilter: state => state.speciesFilter
}

const mutations = {
  [SET_SPECIES_LOADING]: state => {
    state.rawData = []
    state.species = {
      flat: [],
      paginated: [],
      loading: true,
      error: null
    }
  },
  [SET_SPECIES_SUCCESS]: (state, species) => {
    state.rawData = species.data
    state.species = {
      flat: species.flat,
      paginated: species.paginated,
      loading: false,
      error: null
    }
  },
  [SET_SPECIES_FAILURE]: (state, { data, flat, paginated, error }) => {
    state.rawData = data
    state.species = {
      flat,
      paginated,
      loading: false,
      error
    }
  },
  [SET_SPECIES_PAGE]: (state, page) => {
    state.speciesPage = page
  },
  [SET_SPECIES_SORTER]: (state, sorter) => {
    state.speciesSorter = sorter
  },
  [SET_SPECIES_FILTER]: (state, filter) => {
    state.speciesFilter = filter
  }
}

const actions = {
  setSpeciesLoading: ({ commit }) => {
    commit(SET_SPECIES_LOADING)
  },
  setSpeciesSuccess: async ({ commit }, species) => {
    commit(SET_SPECIES_SUCCESS, species)
  },
  setSpeciesFailure: async ({ commit, state }, error) => {
    const data = state.rawData
    const flat = state.species.flat
    const paginated = state.species.paginated
    commit(SET_SPECIES_FAILURE, { data, flat, paginated, error })
  },
  setSpeciesNextPage: ({ commit, getters }) => {
    const nextPage = getters.speciesPage + 1
    commit(SET_SPECIES_PAGE, nextPage)
  },
  setSpeciesPreviousPage: ({ commit, getters }) => {
    const previousPage = getters.speciesPage - 1
    commit(SET_SPECIES_PAGE, previousPage)
  },
  resetSpeciesPage: ({ commit }) => {
    commit(SET_SPECIES_PAGE, 0)
  },
  setSpeciesSorter: ({ commit }, sorter) => {
    commit(SET_SPECIES_SORTER, sorter)
  },
  setSpeciesFilter: ({ commit }, filter) => {
    commit(SET_SPECIES_FILTER, filter)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
