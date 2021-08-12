import { recettes as recipes } from "./recipes.js"
import { galleryCard } from "./galleryCard.js"
import { handleFilters } from "./filterInit.js"
import { buildAllArrays } from "./buildAllArrays.js"
import { typedFilters as filters } from './filterInit.js'
import filterRecipes from "./filterArrays.js"
import preciseFilter from "./preciseFilter.js"
import filterTagsCreator from "./filterTags.js"

// Build properties lists

const propertiesArray = {
    ingredients: [],
    appliances: [],
    ustensils: [] 
}

const allRecipeCards = []  

// Build DOM Recipes
const recipesContainer = document.querySelector("main")

function refreshDOM(cardsArray) {
    while(recipesContainer.firstChild) {
        recipesContainer.removeChild(recipesContainer.firstChild)
    }
    if (cardsArray.length > 0) {
        for (const card of cardsArray) {
            const recipeCard = card.buildCard()
            recipesContainer.appendChild(recipeCard)
        }
    }
    else {
        const noRecipesDiv = document.createElement("h3")
        noRecipesDiv.innerText = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        recipesContainer.appendChild(noRecipesDiv)
    }
}

// filters on DOM
function refreshDOMFilters(currentDOMFilters) {
    for (const key in currentDOMFilters) {
        const filterListDiv = document.getElementById(`${key}-list`)
        while (filterListDiv.firstChild) {
            filterListDiv.removeChild(filterListDiv.firstChild)
        }
        for (const div of currentDOMFilters[key]) {
            filterListDiv.appendChild(div)
        }
    }
}

// filters to object
function buildFilters(currentProperties) {
    const filterDivLists = {
        ingredients: [],
        appliances: [],
        ustensils: []
    }

    for (const filterType in currentProperties) {
        const type = filterType.toString()
        for (const filter in currentProperties[type]) {
            const filterDiv = document.createElement("li")
            filterDiv.classList.add("dropdown_list-item")
            filterDiv.innerText = filter
            filterDiv.addEventListener("click", (e) => {
                const value = e.target.innerText.toLowerCase()
                if (!filters.finished.includes(value)) {
                    filters.finished.push(value)
                }
                mainFilterFunction(filters)  
                filterTagsCreator(value)
            })
            filterDivLists[type].push(filterDiv)
        }
    }
    refreshDOMFilters(filterDivLists)
}

// store all recipes in an array
function allRecipesToArray() {
    for (const recipe of recipes) {
        const card = new galleryCard(recipe)
        allRecipeCards[card.id] = card 
            // Add ingredients to page arrays
        buildAllArrays(card, propertiesArray)
    }
    buildFilters(propertiesArray)
    refreshDOM(allRecipeCards)
}

allRecipesToArray()

// Main Search

const mainInput = document.getElementById("main-search")

function mainFilterFunction(currentFilter) {
    const currentProperties = {
        ingredients: [],
        appliances: [],
        ustensils: [] 
    }
    const matchingRecipes =  filterRecipes(currentFilter, allRecipeCards)
    refreshDOM(matchingRecipes)
    for (const card of matchingRecipes) {
        buildAllArrays(card, currentProperties)
    }
    buildFilters(currentProperties) 
}

mainInput.addEventListener("keyup", (e) => {
    const currentFilter = handleFilters(e)
    mainFilterFunction(currentFilter)
})

// Precise Search

const preciseInputs = document.querySelectorAll(".dropdown_input")
preciseInputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        const preciseTag = preciseFilter(e)
        buildFilters(preciseTag)
    })
})

preciseInputs.forEach(input => {
    input.addEventListener("focus", (e) => {
        const itemList = e.path[2].children[1]
        itemList.classList.remove("hidden")
    })
})

preciseInputs.forEach(input => {
    input.addEventListener("focusout", (e) => {
        const itemList = e.path[2].children[1]
        itemList.classList.add("hidden")
    })
})

export { allRecipeCards as recipes }
export { mainFilterFunction as filterFunction } 
export { propertiesArray as tagList }