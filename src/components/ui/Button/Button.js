import {
  computed,
  onMounted,
  onBeforeUnmount
} from '@vue/composition-api'

export default {
  name: 'Button',
  props: {
    name: String,
    blank: Boolean,
    theme: String,
    to: String,
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup ({ to, blank, name }, { root, listeners, refs }) {
    const hasClickEvent = computed(() => {
      return listeners.click !== undefined
    })

    const goTo = () => {
      if (to) {
        const isRoute = to.indexOf('http') < 0
        if (isRoute) {
          root.$router.push({
            path: `${to}`
          })
        } else {
          if (blank) {
            window.open(to, '_blank')
          } else {
            window.location = to
          }
        }
      }
    }

    onMounted(() => {
      if (!hasClickEvent.value) {
        if (to) {
          if (refs[name]) {
            refs.search.addEventListener('click', goTo)
          } else {
            console.log('This button element needs a name attr to work properly')
          }
        }
      }
    })

    onBeforeUnmount(() => {
      if (!hasClickEvent.value) {
        if (refs[name]) {
          refs.search.removeEventListener('click', goTo)
        }
      }
    })
  }
}
