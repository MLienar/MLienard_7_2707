let itemsThatMatch = []
let lastCounter = 0

export default function filterArrays (filters, properties) {
    const types = ['ingredients', 'appliances', 'ustensils']
    if (lastCounter > filters.counter) {
        console.log("yo");
        itemsThatMatch = []
    }
    // Loop over the three types of properties
    if (itemsThatMatch.length === 0) {
        for (const type of types) {
            // Loop over each item in each type
            for (const item in properties[type]) {
                // Add card number to array if property matches
                if(properties[type][item].key.includes(filters.typing[filters.counter])) {
                    itemsThatMatch.push(properties[type][item])
                    console.log(type);
                }
            }
        }
    } else {
        itemsThatMatch.forEach(item => {
            if (!item.key.includes(filters.typing[filters.counter])) {
                itemsThatMatch.splice(item)
            }
        })
    }
    lastCounter = filters.counter
    return itemsThatMatch
}   
   
  