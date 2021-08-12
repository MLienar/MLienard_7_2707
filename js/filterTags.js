import { typedFilters } from "./filterInit.js"
import { filterFunction } from "./index.js"
import { tagList } from "./index.js"

export default function filterTagsCreator (tag) {
    let tagType = ""
    for (const type in tagList) {
        for (const item in tagList[type]) {
            if (tag == item) {
                tagType = type
                break
            }
        }
    }
    const tagsContainer = document.querySelector(".search_current-tags")
    const searchTag = document.createElement('li')
    searchTag.classList.add("search_tag")
    searchTag.innerHTML = `<p>${tag}</p><div class="close"></div>`
    switch (tagType) {
            case 'ingredients' :
                searchTag.classList.add("blue")
                break
            case 'appliances' :
                searchTag.classList.add("green")
                break
            case 'ustensils' : 
                searchTag.classList.add("orange")
                break
            default :
                searchTag.classList.add("grey")
    }
    searchTag.addEventListener("click", (e) => {
        typedFilters.finished.splice(e.target.value, 1)
        searchTag.remove()
        filterFunction(typedFilters)
    })
    tagsContainer.appendChild(searchTag)
}