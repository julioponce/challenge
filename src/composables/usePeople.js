import store from '@/store'
import axios from 'axios'
import useUtils from './useUtils'
import { SWAPI_API_URL } from '@/config/constants'

export default () => {
  let people = []
  const errorMessage = 'Sorry, the crew is in the middle of a battle, try in another moment, but meanwhile you can hire me :)'
  const { sort } = useUtils()

  const getPeople = () => {
    const thereArePeople = store.getters.rawPeople.length
    try {
      if (!thereArePeople) {
        store.dispatch('setPeopleLoading')
        requestPeople(`${SWAPI_API_URL}people/`)
      } else {
        organizePeople()
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const requestPeople = async (next) => {
    if (next) {
      try {
        const { data } = await axios.get(next)
        people.push(data.results)
        requestPeople(data.next)
      } catch (e) {
        console.log(e)
        store.dispatch('setPeopleFailure', errorMessage)
      }
    } else {
      organizePeople(people)
      return false
    }
  }

  const organizePeople = (data) => {
    const thereArePeople = store.getters.rawPeople.length
    const rawPeople = thereArePeople
      ? store.getters.rawPeople
      : data
    const sorter = store.getters.peopleSorter
    const filter = store.getters.peopleFilter
    try {
      if (!thereArePeople && !data) {
        throw new Error(errorMessage)
      }
      people = rawPeople.flat()
      people = filterPeople(people, filter)

      sort(people, sorter, 'asc')

      const peoplePaginated = paginatePeople(people, 4)

      store.dispatch('setPeopleSuccess', {
        data: rawPeople,
        flat: people,
        paginated: peoplePaginated
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  const filterPeople = (people, filter) => {
    const peopleFiltered = people.filter((item) => {
      return item.name.toUpperCase().includes(filter.toUpperCase())
    })
    return peopleFiltered
  }

  const setPeopleSorter = (sorter) => {
    store.dispatch('setPeopleSorter', sorter)
    store.dispatch('resetPeoplePage')
    organizePeople()
  }

  const setPeopleFilter = (filter) => {
    store.dispatch('setPeopleFilter', filter)
    store.dispatch('resetPeoplePage')
    organizePeople()
  }

  const paginatePeople = (people, pages) => {
    const peoplePaginated = []
    for (let i = 0; i < people.length; i += pages) {
      peoplePaginated.push(people.slice(i, i + pages))
    }
    return peoplePaginated
  }

  const goToPreviousPage = () => {
    store.dispatch('setPeoplePreviousPage')
  }

  const goToNextPage = () => {
    store.dispatch('setPeopleNextPage')
  }

  return {
    getPeople,
    goToPreviousPage,
    goToNextPage,
    setPeopleFilter,
    setPeopleSorter
  }
}
