import { recipes } from './index.js'
import { kmpSearch } from './kmpSearch.js'

export default function filterRecipes (filters) {
    const matchingRecipes = []
    const flatFilters = [... filters.finished, filters.typing].filter( e => e)
    const filterMatches = []
    if (filters.typing.length >= 3 || filters.finished.length > 0) {
        for (const recipe of recipes) {
            for (let i = 0; i < flatFilters.length ; i ++) {
                const matchingIndexes = kmpSearch(recipe.searchText, flatFilters[i])
                if (matchingIndexes.length > 0) {
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
   
  