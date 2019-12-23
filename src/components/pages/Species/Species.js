import {
  computed,
  onMounted
} from '@vue/composition-api'
import useSpecies from '@/composables/useSpecies'
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
      getSpecies,
      goToPreviousPage,
      goToNextPage,
      setSpeciesSorter,
      setSpeciesFilter
    } = useSpecies()
    const { screenSize } = useUtils()

    const currentRow = computed(() => {
      const currentIndex = $store.getters.speciesPage
      const row = $store.getters.speciesPaginated
      return row[currentIndex]
    })
    const loading = computed(() => $store.getters.speciesLoading)
    const currentPage = computed(() => $store.getters.speciesPage)
    const maxPageLimit = computed(() => $store.getters.speciesPaginated.length - 1)
    const speciesError = computed(() => $store.getters.speciesError)

    const sortOptions = $store.getters.speciesSortOptions
    const currentSorter = computed(() => $store.getters.speciesSorter)
    const placeholderFilter = 'Search species...'
    const speciesFilter = computed(() => $store.getters.speciesFilter)

    onMounted(() => {
      getSpecies()
    })

    return {
      loading,
      speciesError,
      currentPage,
      currentRow,
      maxPageLimit,
      sortOptions,
      currentSorter,
      placeholderFilter,
      speciesFilter,
      goToNextPage,
      goToPreviousPage,
      setSpeciesSorter,
      setSpeciesFilter,
      screenSize
    }
  }
}
