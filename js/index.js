import { recettes as recipes } from "./recipes.js"
import { galleryCard } from "./galleryCard.js"
import { buildAllArrays } from "./buildAllArrays.js"
import DOMManager from "./DOMManager.js"
import { PropertiesObject }  from "./propertiesArray.js"
import FiltersHandler from "./filtersHandler.js"
import inputHandler from "./inputHandlers.js"

// Build properties lists
const propertiesObject = new PropertiesObject()
const allRecipeCards = []  

// Initialise DOM Manager
const DOMHandler = new DOMManager()

// Initialise Filters Handler
const filtersHandler = new FiltersHandler()

// store all recipes in an array
function allRecipesToArray() {
    for (const recipe of recipes) {
        const card = new galleryCard(recipe)
        allRecipeCards[card.id] = card 
            // Add ingredients to page arrays
        buildAllArrays(card, propertiesObject)
    }
    filtersHandler.buildFilters(propertiesObject)
    DOMHandler.refreshDOM(allRecipeCards)
}

allRecipesToArray()

// Add Listeners to all Inputs
inputHandler()


export { allRecipeCards as recipes }
export { propertiesObject as tagList }