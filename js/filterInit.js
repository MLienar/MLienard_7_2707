import filterTagsCreator from "./filterTags.js"

const filters = {
    finished : [],
    typing: ""
}

function startFiltering (e) {
  if (e.keyCode === 13) {
        if (!filters.finished.includes(e.target.value)) {
            filters.finished.push(e.target.value)
            filterTagsCreator(e.target.value)
        }
        e.target.value = ""
        filters.typing = ""
  }
  
  if (e.target.value.length > 2) {
    filters.typing = e.target.value.toLowerCase()
  } else {
    filters.typing = ""
  }

  return filters
}

export { startFiltering as handleFilters,
    filters as typedFilters }