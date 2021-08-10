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

const currentProperties = {
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

function updateFiltersObject(currentRecipes) {
    const filterDivLists = {
        ingredients: [],
        appliances: [],
        ustensils: []
    }
    for (const recipe of currentRecipes) {
        filterDivLists.appliances.push(recipe.appliance)
        recipe.ingredients.forEach(ingredient => {
            filterDivLists.ingredients.push(ingredient)
        })
        recipe.ustensils.forEach(ustensil => {
            filterDivLists.ustensils.push(ustensil)
        })
    }
    buildFilters(filterDivLists)
}

mainInput.addEventListener("keyup", (e) => {
    const currentFilter = handleFilters(e)
    if (filters.typing.length >= 3 || filters.finished.length > 0) {
        const matchingRecipes =  filterRecipes(currentFilter, allRecipeCards)
        refreshDOM(matchingRecipes)
        for (const card of matchingRecipes) {
            buildAllArrays(card, currentProperties)
        }
        buildFilters(currentProperties) 
    }
})