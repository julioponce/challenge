import useUtils from '@/composables/useUtils'

const Button = () => import('@/components/ui/Button/Button.vue')

export default {
  components: {
    Button
  },
  props: [
    'currentPage',
    'goToNextPage',
    'goToPreviousPage',
    'maxPageLimit'
  ],
  setup () {
    const { screenSize } = useUtils()

    return {
      screenSize
    }
  }
}
