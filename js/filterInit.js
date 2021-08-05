const filters = {
    counter: 0,
    lastCounter: 0,
    finished : [],
    typing: []
}

function startFiltering (e) {
  if (filters.lastCounter >= filters.counter) {
      while (filters.lastCounter > filters.counter) {
          filters.typing.splice(filters.lastCounter, 1)
          filters.lastCounter --
      }
  }
  if (e.keyCode === 13) {
        filters.finished.push(e.target.value)
        e.target.value = ""
  }
  filters.lastCounter = filters.counter  
  filters.typing[filters.counter] = e.target.value
  return filters
}

export { startFiltering as handleFilters,
    filters as typedFilters }