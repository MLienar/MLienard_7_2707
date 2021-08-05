import { recettes as recipes } from "./recipes.js"
import { galleryCard } from "./galleryCard.js"
import { handleFilters } from "./filterInit.js"
import { buildAllArrays } from "./buildAllArrays.js"
import { typedFilters as filters } from './filterInit.js'
import filterArrays from "./filterArrays.js"

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
    while(recipesContainer.length) {
        recipesContainer.removeChild(recipesContainer[recipesContainer.length - 1])
    }
    for (const card of cardsArray) {
        const recipeCard = card.buildCard()
        recipesContainer.appendChild(recipeCard)
    }
}

// filters on DOM
const ingredientsDOMList = document.getElementById("ingredients-list") 
const appliancesDOMList = document.getElementById("appliances-list") 
const ustensilsDOMList = document.getElementById("ustensils-list") 

function buildFilters(filterType, div) {
    for (const filter in propertiesArray[filterType]) {
        const filterDiv = document.createElement("li")
        filterDiv.classList.add("dropdown_list-item")
        filterDiv.innerText = filter
        div.appendChild(filterDiv)
    }
}

function allRecipesToArray() {
    let id = 0
    for (const recipe of recipes) {
        const card = new galleryCard(recipe)
        card.id = id
        id ++
        allRecipeCards.push(card) 
            // Add ingredients to page arrays
        buildAllArrays(card.ingredients, propertiesArray.ingredients, card.id)
        buildAllArrays(card.appliance, propertiesArray.appliances, card.id)
        buildAllArrays(card.ustensils, propertiesArray.ustensils, card.id)
    }
    buildFilters("ingredients", ingredientsDOMList)
    buildFilters("appliances", appliancesDOMList)
    buildFilters("ustensils", ustensilsDOMList)
    refreshDOM(allRecipeCards)
}

allRecipesToArray()

// Main Search

const mainInput = document.getElementById("main-search")


mainInput.addEventListener("keyup", (e) => {
    filters.counter = e.target.value.length
    if (filters.counter < 3) {
        while(filters.typing.length) {
            filters.typing.pop()
        }
    } else {
    const currentFilters = handleFilters(e)
    const matchingCards = filterArrays(currentFilters, propertiesArray)
    console.log(matchingCards);
    }
})