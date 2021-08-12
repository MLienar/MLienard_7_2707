function arraysInclude(array, pattern) {
    for (const item of array) {
        if (item.includes(pattern)) {
            return true
        } else {
            continue
        }
    }
}

function recipeSearch(recipe, patterns) {
    let includes = false
    for (let i  = 0; i < patterns.length; i ++) {
        if (recipe.title.includes(patterns[i])) {
            includes = true
            continue
        } else if (recipe.appliances[0].includes(patterns[i])) {
            includes = true
            continue
        } else if (recipe.description.includes(patterns[i])) {
            includes = true
            continue
        } else if (arraysInclude(recipe.ingredients, patterns[i])) {
            includes = true
            continue
        } else if (arraysInclude(recipe.ustensils, patterns[i])) {
            includes = true
            continue
        } else {
            includes = false 
            break
        }
    }
    if (includes) {
        return recipe.id
    } else {
        return false
    }
}

  export { recipeSearch as fullSearch }