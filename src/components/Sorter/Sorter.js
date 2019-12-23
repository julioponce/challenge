import useUtils from '@/composables/useUtils'

const Button = () => import('@/components/ui/Button/Button.vue')

export default {
  components: {
    Button
  },
  props: [
    'options',
    'active',
    'setSorter'
  ],
  setup () {
    const { screenSize } = useUtils()

    return {
      screenSize
    }
  }
}
