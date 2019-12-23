import useUtils from '@/composables/useUtils'

export default {
  setup () {
    const { screenSize } = useUtils()

    return {
      screenSize
    }
  }
}
