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
            // console.log("title");
            includes = true
            continue
        } else if (recipe.appliances[0].includes(patterns[i])) {
            // console.log("appliance");
            includes = true
            continue
        } else if (recipe.description.includes(patterns[i])) {
            // console.log('desc');
            includes = true
            continue
        } else if (arraysInclude(recipe.ingredients, patterns[i])) {
            // console.log(ing);
            includes = true
            continue
        } else if (arraysInclude(recipe.ustensils, patterns[i])) {
            // console.log(ust);
            includes = true
            continue
        } else {
            includes = false 
            break
        }
    }
    if (includes) {
        return recipe
    } else {
        return false
    }
}

  export { recipeSearch as fullSearch }