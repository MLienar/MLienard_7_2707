import DOMManager from "./DOMManager.js"
import { PropertiesObject } from "./propertiesArray.js"
import filterTagsCreator from "./filterTags.js"
import { typedFilters as filters } from "./filterInit.js"
import { recipes as allRecipeCards } from "./index.js"
import { buildAllArrays } from "./buildAllArrays.js"
import { tagList } from "./index.js"

export default class FiltersHandler {
    constructor() {
        this.DOMHandler = new DOMManager()
    }

    buildFilters(currentProperties) {
        const filterDivLists = new PropertiesObject()
        for (const filterType in currentProperties) {
            const type = filterType.toString()
            for (const filter in currentProperties[type]) {
                const filterDiv = document.createElement("li")
                filterDiv.classList.add("dropdown_list-item")
                filterDiv.innerText = filter
                filterDiv.addEventListener("click", (e) => {
                    const value = e.target.innerText.toLowerCase()
                    const preciseInputs = document.querySelectorAll(".dropdown_input")
                    if (!filters.finished.includes(value)) {
                        filters.finished.push(value)
                        for (const input of preciseInputs) {
                            if (input.value) {
                                input.value = ""
                            }
                        } 
                    }
                    this.mainFilterFunction(filters)  
                    filterTagsCreator(value)
                })
                filterDivLists[type].push(filterDiv)
            }
        }
        this.DOMHandler.refreshDOMFilters(filterDivLists)
    }

    startFiltering (e) {
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


    mainFilterFunction(currentFilter) {
        const currentProperties = new PropertiesObject()
        const matchingRecipes = this.filterRecipes(currentFilter, allRecipeCards)
        this.DOMHandler.refreshDOM(matchingRecipes)
        for (const card of matchingRecipes) {
            buildAllArrays(card, currentProperties)
        }
        this.buildFilters(currentProperties) 
    }


    // Filter Recipes that match input and return array of matching cards
    filterRecipes (filters) {
        const matchingRecipes = []
        const flatFilters = [... filters.finished, filters.typing].filter( e => e)
        const filterMatches = []
        if (filters.typing.length >= 3 || filters.finished.length > 0) {
            for (const recipe of allRecipeCards) {
                for (let i = 0; i < flatFilters.length ; i ++) {
                    if (recipe.searchText.includes(flatFilters[i])) {
                        if (!filterMatches[i]) {
                            filterMatches[i] = [ recipe.id ]
                        } else {
                            filterMatches[i].push(recipe.id)
                        }     
                    }
                }
            }
            
            // Check common number between arrays
            if (filterMatches.length === 0) {
                console.log("no matches");
                const emptyArray = []
                return emptyArray
            }
            const testArray = filterMatches.shift().filter(function(v) {
                return filterMatches.every(function(a) {
                    return a.indexOf(v) !== -1
                })
            })
            // add matching recipe cards to returned array
            for (const number of testArray) {
                matchingRecipes.push(allRecipeCards[number])
            }
            return matchingRecipes
        } else {
            return allRecipeCards
        }
    }   
    
    // 
    preciseFilter(e) {
        const currentProperties = { ... tagList }
        const tagType = e.target.id  
        currentProperties[tagType] = []
        const input = e.target.value.toLowerCase()
        for (const item in tagList[tagType]) {
            if (item.includes(input)) {
                currentProperties[tagType][item] = item
            }
        }
        return currentProperties
    }
}