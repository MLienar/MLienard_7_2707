import { tagList } from "./index.js";

export default function preciseFilter(e) {
    const currentProperties = { ... tagList }
    const tagType = e.target.id  
    currentProperties[tagType] = []
    const input = e.target.value.toLowerCase()
    for (const item in tagList[tagType]) {
        if (item.includes(input)) {
            currentProperties[tagType][item] = item
        }
    }
    return currentProperties
}