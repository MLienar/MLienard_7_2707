import { recettes as recipes } from "./recipes.js"
import { galleryCard } from "./galleryCard.js"
import { handleFilters } from "./filterInit.js"
import { buildAllArrays } from "./buildAllArrays.js"
import { typedFilters as filters } from './filterInit.js'
import filterRecipes from "./filterArrays.js"

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
        console.log("no cards to show");
    }
}

// filters on DOM
const ingredients = document.getElementById("ingredients-list") 
const appliances = document.getElementById("appliances-list") 
const ustensils = document.getElementById("ustensils-list") 

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
            filterDivLists[type].push(filterDiv)
        }
    }
    refreshDOMFilters(filterDivLists)
}

// store all recipes in an array
function allRecipesToArray() {
    let id = 0
    for (const recipe of recipes) {
        const card = new galleryCard(recipe)
        allRecipeCards[card.id] = card 
            // Add ingredients to page arrays
        buildAllArrays(card.ingredients, propertiesArray.ingredients, card.id)
        buildAllArrays(card.appliance, propertiesArray.appliances, card.id)
        buildAllArrays(card.ustensils, propertiesArray.ustensils, card.id)
    }
    buildFilters(propertiesArray)
    refreshDOM(allRecipeCards)
}

allRecipesToArray()

// Main Search

const mainInput = document.getElementById("main-search")

mainInput.addEventListener("keyup", (e) => {
    const currentFilter = handleFilters(e)
    if (filters.typing.length >= 3 || filters.finished.length > 0) {
        const matchingRecipes =  filterRecipes(currentFilter, allRecipeCards)
        refreshDOM(matchingRecipes)
    }
})