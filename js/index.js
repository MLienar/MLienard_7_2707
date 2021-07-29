import { recettes as recipes } from "./recipes.js"
import { galleryCard } from "./galleryCard.js"

function buildGallery() {
    for (const recipe of recipes) {
    const card = new galleryCard(recipe)
    card.buildCard()
    }
}

buildGallery()