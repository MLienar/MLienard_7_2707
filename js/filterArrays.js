import { recipes } from './index.js'

export default function filterRecipes (filters) {
    const matchingRecipes = []
    const flatFilters = [... filters.finished, filters.typing].filter( e => e)
    const filterMatches = []
    if (filters.typing.length >= 3 || filters.finished.length > 0) {
        for (const recipe of recipes) {
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
            matchingRecipes.push(recipes[number])
        }
        return matchingRecipes
    } else {
        return recipes
    }
}   
   
  