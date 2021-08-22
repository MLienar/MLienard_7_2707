import FiltersHandler from "./filtersHandler.js"
import { handleFilters } from "./filterInit.js"
const filtersHandler = new FiltersHandler()

export default function inputHandler() {
    const mainInput = document.getElementById("main-search")
    const preciseInputs = document.querySelectorAll(".dropdown_input")

    mainInput.addEventListener("keyup", (e) => {
        console.log("tyo");
        const currentFilter = handleFilters(e)
        filtersHandler.mainFilterFunction(currentFilter)
    })

    preciseInputs.forEach(input => {
        input.addEventListener('keyup', (e) => {
            const preciseTag = filtersHandler.preciseFilter(e)
            filtersHandler.buildFilters(preciseTag)
        })
    })

    preciseInputs.forEach(input => {
        input.addEventListener("focus", (e) => {
            const itemList = e.path[2].children[1]
            itemList.classList.remove("hidden")
        })
    })
    
    preciseInputs.forEach(input => {
        input.addEventListener("focusout", (e) => {
            const itemList = e.path[2].children[1]
            itemList.classList.add("hidden")
        })
    })
}