export default function filterRecipes (filters, recipes) {
    const matchingRecipes = []
    const flatFilters = [... filters.finished, filters.typing].filter( e => e)
    console.log(flatFilters);
    const filterMatches = []
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
}   
   
  