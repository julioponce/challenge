import '@babel/polyfill'
import { shallowMount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'

describe('SearchBar', () => {
  test('Renders', () => {
    const wrapper = shallowMount(SearchBar)
    expect(wrapper.isVisible()).toBeTruthy()
  })

  test('Receives a filter prop', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        filter: 'Luke'
      }
    })
    expect(wrapper.props('filter')).toBe('Luke')
  })

  test('Receives a placeholder prop', () => {
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        placeholder: 'Search people...'
      }
    })
    expect(wrapper.props('placeholder')).toBe('Search people...')
  })

  test('Calls setFilter function on input event', () => {
    const setFilter = jest.fn()
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        setFilter
      }
    })
    wrapper.find('.search-input').setValue('L')
    expect(setFilter).toHaveBeenCalled()
  })

  test('Updates model search prop on input event', () => {
    const setFilter = jest.fn()
    const wrapper = shallowMount(SearchBar, {
      propsData: {
        setFilter
      }
    })
    wrapper.find('.search-input').setValue('Luke')
    expect(wrapper.vm.search).toBe('Luke')
  })
})
