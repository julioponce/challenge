import {
  computed,
  reactive,
  toRefs
} from '@vue/composition-api'
import { ADORABLE_API_URL } from '@/config/constants'
import useFilms from '@/composables/useFilms'
import useUtils from '@/composables/useUtils'

const Tooltip = () => import('@/components/Tooltip/Tooltip.vue')

export default {
  components: {
    Tooltip
  },
  props: [
    'character',
    'characterInfo'
  ],
  setup ({ character, characterInfo }) {
    const state = reactive({
      tooltip: {
        content: {
          heading: 'Has appeared in the films:',
          films: []
        },
        error: '',
        loading: false,
        show: false
      }
    })
    const { getFilms, returnFilms } = useFilms()
    const { screenSize } = useUtils()

    const avatar = computed(() => `${ADORABLE_API_URL}${character.name}.png`)
    const heading = computed(() => character[characterInfo[0]])
    const subheading = computed(() => character[characterInfo[1]])
    const tooltipHeading = computed(() => state.tooltip.content.heading)
    const tooltipContent = computed(() => state.tooltip.content.films.join(', '))
    const tooltipLoading = computed(() => state.tooltip.loading)
    const tooltipShow = computed(() => state.tooltip.show)
    const tooltipError = computed(() => state.tooltip.error)

    const showTooltip = async () => {
      state.tooltip.show = true
      if (!state.tooltip.loading) {
        try {
          state.tooltip.loading = true
          await getFilms(character)
          const { films } = returnFilms(character)
          state.tooltip.loading = false
          state.tooltip.content.films = films
        } catch (e) {
          console.log(e.message)
          state.tooltip.loading = false
          state.tooltip.error = 'The dark side is powerful, we can not get the films!'
        }
      }
    }

    const hideTooltip = () => {
      state.tooltip.show = false
    }

    return {
      ...toRefs(state),
      avatar,
      heading,
      subheading,
      tooltipHeading,
      tooltipContent,
      tooltipLoading,
      tooltipShow,
      tooltipError,
      showTooltip,
      hideTooltip,
      screenSize
    }
  }
}
