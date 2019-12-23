import {
  ref
} from '@vue/composition-api'
import useUtils from '@/composables/useUtils'

export default {
  model: {
    prop: 'model',
    event: 'input'
  },
  props: [
    'filter',
    'placeholder',
    'setFilter'
  ],
  setup ({ filter }) {
    const search = ref(filter)
    const { screenSize } = useUtils()

    return {
      search,
      screenSize
    }
  }
}
