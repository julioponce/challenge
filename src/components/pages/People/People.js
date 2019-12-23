import {
  computed,
  onMounted
} from '@vue/composition-api'
import usePeople from '@/composables/usePeople'
import useUtils from '@/composables/useUtils'

const ItemsList = () => import('@/components/ItemsList/ItemsList.vue')
const SearchBar = () => import('@/components/SearchBar/SearchBar.vue')
const Sorter = () => import('@/components/Sorter/Sorter.vue')

export default {
  components: {
    ItemsList,
    SearchBar,
    Sorter
  },
  setup (props, { root: { $store } }) {
    const {
      getPeople,
      goToPreviousPage,
      goToNextPage,
      setPeopleSorter,
      setPeopleFilter
    } = usePeople()
    const { screenSize } = useUtils()

    const currentRow = computed(() => {
      const currentIndex = $store.getters.peoplePage
      const row = $store.getters.peoplePaginated
      return row[currentIndex]
    })
    const loading = computed(() => $store.getters.peopleLoading)
    const currentPage = computed(() => $store.getters.peoplePage)
    const maxPageLimit = computed(() => $store.getters.peoplePaginated.length - 1)
    const peopleError = computed(() => $store.getters.peopleError)

    const sortOptions = $store.getters.peopleSortOptions
    const currentSorter = computed(() => $store.getters.peopleSorter)
    const placeholderFilter = 'Search people...'
    const peopleFilter = computed(() => $store.getters.peopleFilter)

    onMounted(() => {
      getPeople()
    })

    return {
      loading,
      peopleError,
      currentPage,
      currentRow,
      maxPageLimit,
      sortOptions,
      currentSorter,
      placeholderFilter,
      peopleFilter,
      goToNextPage,
      goToPreviousPage,
      setPeopleSorter,
      setPeopleFilter,
      screenSize
    }
  }
}
