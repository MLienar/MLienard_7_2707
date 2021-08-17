import { recipes } from './index.js'
import { fullSearch } from './fullSearch.js'

export default function filterRecipes (filters) {
    const matchingRecipes = []
    const flatFilters = [... filters.finished, filters.typing].filter( e => e )
    const filterMatches = []
    if (filters.typing.length >= 3 || filters.finished.length > 0) {
        for (const recipe of recipes) {
            const matchingIndexes = fullSearch(recipe, flatFilters)
            if (matchingIndexes) {
                filterMatches.push(matchingIndexes.id)
            }   
        }
        // Check common number between arrays
        if (filterMatches.length === 0) {
            console.log("no matches");
            const emptyArray = []
            return emptyArray
        }
        // add matching recipe cards to returned array
        for (const number of filterMatches) {
            matchingRecipes.push(recipes[number])
        }
        return matchingRecipes
    } else {
        return recipes
    }
}   