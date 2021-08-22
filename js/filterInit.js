import filterTagsCreator from "./filterTags.js"

const filters = {
    finished : [],
    typing: ""
}

function startFiltering (e) {
  if (e.keyCode === 13) {
        if (!filters.finished.includes(e.target.value)) {
            filters.finished.push(e.target.value.toLowerCase())
            filterTagsCreator(e.target.value.toLowerCase())
        }
        e.target.value = ""
        filters.typing = ""
  }
  if (e.target.value.length < 3) { 
    filters.typing = ""
    return filters
  }
  filters.typing = e.target.value.toLowerCase()
  return filters
}

export { startFiltering as handleFilters,
    filters as typedFilters }