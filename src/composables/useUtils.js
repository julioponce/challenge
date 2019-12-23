export default () => {
  const screenResolution = {
    width: window.screen.width,
    height: window.screen.height
  }

  const isSmallScreen = screenResolution.width <= 1280
  const isMediumScreen = screenResolution.width > 1280 && screenResolution.width <= 2048

  const screenSize = isSmallScreen
    ? 'small'
    : isMediumScreen
      ? 'medium'
      : ''

  const sort = (array, key, order) => {
    array.sort((a, b) => {
      const itemA = a[key].toUpperCase()
      const itemB = b[key].toUpperCase()

      if (order === 'asc') {
        if (itemA < itemB) { return -1 }
        if (itemA > itemB) { return 1 }
      }
      if (order === 'desc') {
        if (itemA < itemB) { return 1 }
        if (itemA > itemB) { return -1 }
      }
      return 0
    })
  }

  return {
    screenSize,
    sort
  }
}
