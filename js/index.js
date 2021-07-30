import { recettes as recipes } from "./recipes.js"
import { galleryCard } from "./galleryCard.js"

const propertiesArray = {
    ingredients: [],
    appliances: [],
    ustensils: []
}

function buildPropertiesArray(cardArray, domArray) {
    for (let i = 0; i < cardArray.length; i ++) {
        if (!domArray.includes(cardArray[i])) {
            domArray.push(cardArray[i])
        }
    }
    domArray.sort()
}

function buildGallery() {
    for (const recipe of recipes) {
    const card = new galleryCard(recipe)
    card.buildCard()
    // Add ingredients to page arrays
    buildPropertiesArray(card.ingredients, propertiesArray.ingredients)
    buildPropertiesArray(card.appliance, propertiesArray.appliances)
    buildPropertiesArray(card.ustensils, propertiesArray.ustensils)
    }
    console.log(propertiesArray.ingredients);
    console.log(propertiesArray.appliances);
    console.log(propertiesArray.ustensils);
}

buildGallery()
