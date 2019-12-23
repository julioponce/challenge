import store from '@/store'
import axios from 'axios'
import useUtils from './useUtils'
import { SWAPI_API_URL } from '@/config/constants'

export default () => {
  let species = []
  const errorMessage = 'Sorry, battles across the universe have exterminated all the species, but meanwhile you can hire me :)'
  const { sort } = useUtils()

  const getSpecies = () => {
    const thereAreSpecies = store.getters.rawSpecies.length
    try {
      if (!thereAreSpecies) {
        store.dispatch('setSpeciesLoading')
        requestSpecies(`${SWAPI_API_URL}species/`)
      } else {
        organizeSpecies()
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const requestSpecies = async (next) => {
    if (next) {
      try {
        const { data } = await axios.get(next)
        species.push(data.results)
        requestSpecies(data.next)
      } catch (e) {
        console.log(e)
        store.dispatch('setSpeciesFailure', errorMessage)
      }
    } else {
      organizeSpecies(species)
      return false
    }
  }

  const organizeSpecies = (data) => {
    const thereAreSpecies = store.getters.rawSpecies.length
    const rawSpecies = thereAreSpecies
      ? store.getters.rawSpecies
      : data
    const sorter = store.getters.speciesSorter
    const filter = store.getters.speciesFilter
    try {
      if (!thereAreSpecies && !data) {
        throw new Error(errorMessage)
      }
      species = rawSpecies.flat()
      species = filterSpecies(species, filter)

      sort(species, sorter, 'asc')

      const speciesPaginated = paginateSpecies(species, 4)

      store.dispatch('setSpeciesSuccess', {
        data: rawSpecies,
        flat: species,
        paginated: speciesPaginated
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  const filterSpecies = (species, filter) => {
    const speciesFiltered = species.filter((item) => {
      return item.name.toUpperCase().includes(filter.toUpperCase())
    })
    return speciesFiltered
  }

  const setSpeciesSorter = (sorter) => {
    store.dispatch('setSpeciesSorter', sorter)
    store.dispatch('resetSpeciesPage')
    organizeSpecies()
  }

  const setSpeciesFilter = (filter) => {
    store.dispatch('setSpeciesFilter', filter)
    store.dispatch('resetSpeciesPage')
    organizeSpecies()
  }

  const paginateSpecies = (species, pages) => {
    const speciesPaginated = []
    for (let i = 0; i < species.length; i += pages) {
      speciesPaginated.push(species.slice(i, i + pages))
    }
    return speciesPaginated
  }

  const goToPreviousPage = () => {
    store.dispatch('setSpeciesPreviousPage')
  }

  const goToNextPage = () => {
    store.dispatch('setSpeciesNextPage')
  }

  return {
    getSpecies,
    goToPreviousPage,
    goToNextPage,
    setSpeciesFilter,
    setSpeciesSorter
  }
}
