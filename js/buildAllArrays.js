// Build arrays containing all ingredients, appliances and ustenstils
function buildPropertiesArray(cardArray, domArray, cardId) {
    for (let i = 0; i < cardArray.length; i ++) {
        const indexOfIngredient = domArray[cardArray[i]]
        if (!indexOfIngredient) {
            const arrayObject = {
                key: cardArray[i],
                card: [ cardId ]
            }
            domArray[cardArray[i]] = (arrayObject)
        } else {
            domArray[cardArray[i]].card.push(cardId)
        }
    }
    domArray.sort()
}

export { buildPropertiesArray as buildAllArrays } 