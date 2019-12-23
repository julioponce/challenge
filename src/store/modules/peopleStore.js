import {
  SET_PEOPLE_SUCCESS,
  SET_PEOPLE_FAILURE,
  SET_PEOPLE_LOADING,
  SET_PEOPLE_PAGE,
  SET_PEOPLE_SORTER,
  SET_PEOPLE_FILTER
} from '@/store/mutation-types'

const state = {
  rawData: [],
  people: {
    flat: [],
    paginated: [],
    loading: false,
    error: null
  },
  peoplePage: 0,
  peopleFilter: '',
  peopleSorter: 'name',
  peopleSortOptions: ['name', 'gender']
}

const getters = {
  rawPeople: state => state.rawData,
  people: ({ people }) => people.flat,
  peoplePaginated: ({ people }) => people.paginated,
  peopleLoading: ({ people }) => people.loading,
  peopleError: ({ people }) => people.error,
  peoplePage: state => state.peoplePage,
  peopleSorter: state => state.peopleSorter,
  peopleSortOptions: state => state.peopleSortOptions,
  peopleFilter: state => state.peopleFilter
}

const mutations = {
  [SET_PEOPLE_LOADING]: state => {
    state.rawData = []
    state.people = {
      flat: [],
      paginated: [],
      loading: true,
      error: null
    }
  },
  [SET_PEOPLE_SUCCESS]: (state, people) => {
    state.rawData = people.data
    state.people = {
      flat: people.flat,
      paginated: people.paginated,
      loading: false,
      error: null
    }
  },
  [SET_PEOPLE_FAILURE]: (state, { data, flat, paginated, error }) => {
    state.rawData = data
    state.people = {
      flat,
      paginated,
      loading: false,
      error
    }
  },
  [SET_PEOPLE_PAGE]: (state, page) => {
    state.peoplePage = page
  },
  [SET_PEOPLE_SORTER]: (state, sorter) => {
    state.peopleSorter = sorter
  },
  [SET_PEOPLE_FILTER]: (state, filter) => {
    state.peopleFilter = filter
  }
}

const actions = {
  setPeopleLoading: ({ commit }) => {
    commit(SET_PEOPLE_LOADING)
  },
  setPeopleSuccess: async ({ commit }, people) => {
    commit(SET_PEOPLE_SUCCESS, people)
  },
  setPeopleFailure: async ({ commit, state }, error) => {
    const data = state.rawData
    const flat = state.people.flat
    const paginated = state.people.paginated
    commit(SET_PEOPLE_FAILURE, { data, flat, paginated, error })
  },
  setPeopleNextPage: ({ commit, getters }) => {
    const nextPage = getters.peoplePage + 1
    commit(SET_PEOPLE_PAGE, nextPage)
  },
  setPeoplePreviousPage: ({ commit, getters }) => {
    const previousPage = getters.peoplePage - 1
    commit(SET_PEOPLE_PAGE, previousPage)
  },
  resetPeoplePage: ({ commit }) => {
    commit(SET_PEOPLE_PAGE, 0)
  },
  setPeopleSorter: ({ commit }, sorter) => {
    commit(SET_PEOPLE_SORTER, sorter)
  },
  setPeopleFilter: ({ commit }, filter) => {
    commit(SET_PEOPLE_FILTER, filter)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
