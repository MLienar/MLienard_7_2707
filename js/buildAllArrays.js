function buildPropertiesArray(card, array) {
    const types = ["ingredients", "appliances", "ustensils"]
    for (const type of types) {
        for (let i = 0 ; i < card[type].length ; i ++) {
            if (!array[type][i]) {
                const arrayObject = {
                    key: card[type][i],
                    card: [ card.id ]
                }
                array[type][card[type][i]] = arrayObject 
            } else {
                array[type][i].card.push(card.id)
        } 
    }
    array[type].sort() 
    // console.log(array);
    }
}

export { buildPropertiesArray as buildAllArrays } 