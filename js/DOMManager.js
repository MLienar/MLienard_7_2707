export default class DOMManager {
    constructor () {
        this.recipesContainer = document.querySelector("main")
    }
// Refresh cards in the DOM
    refreshDOM(cardsArray) {
        while(this.recipesContainer.firstChild) {
            this.recipesContainer.removeChild(this.recipesContainer.firstChild)
        }
        if (cardsArray.length > 0) {
            for (const card of cardsArray) {
                const recipeCard = card.buildCard()
                this.recipesContainer.appendChild(recipeCard)
            }
        }
        else {
            const noRecipesDiv = document.createElement("h3")
            noRecipesDiv.innerText = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
            this.recipesContainer.appendChild(noRecipesDiv)
        }
    }

// Refresh filters on DOM
    refreshDOMFilters(currentDOMFilters) {
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
}