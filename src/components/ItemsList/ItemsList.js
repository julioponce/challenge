import useUtils from '@/composables/useUtils'

const Character = () => import('@/components/Character/Character.vue')
const Pagination = () => import('@/components/Pagination/Pagination.vue')

export default {
  components: {
    Character,
    Pagination
  },
  props: [
    'loading',
    'error',
    'currentPage',
    'currentRow',
    'maxPageLimit',
    'goToPreviousPage',
    'goToNextPage',
    'characterInfo'
  ],
  setup () {
    const { screenSize } = useUtils()

    return {
      screenSize
    }
  }
}
