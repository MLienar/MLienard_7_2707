class Recipe {

    ingredients: {
        "ingredient": string,
        "quantity": number,
        "unit": string
    }[];
    appliances: string[];
    ustensils: string[];
    description: string;
    title: string;
    hide: boolean;
    id: number;
    time: number;
    searchText: string;
    
    constructor (recipe) {
        this.ingredients = []
        this.appliances = [ recipe.appliance.toLowerCase() ]
        this.ustensils = []
        this.description = recipe.description
        this.title = recipe.name
        this.time = recipe.time
        this.hide = false
        this.id = recipe.id - 1
        this.searchText = this.title.toLowerCase() + ' ' + this.description.toLowerCase() + ' ' + recipe.appliance.toLowerCase()

        recipe.ingredients.forEach(ingredient => {
            this.ingredients.push(ingredient)
            this.searchText += " " + ingredient.ingredient.toLowerCase()
        })
    
        recipe.ustensils.forEach(ustensil => {
            this.ustensils.push(ustensil.toLowerCase())
            this.searchText += " " + ustensil.toLowerCase()
        })
    }
    
    
    createBlock (block) {
        const createdBlock = document.createElement(block.type)
        createdBlock.classList.add(`recipe-card${block.class}`)
        if (block.content) {
            createdBlock.textContent = block.content
        }
        return createdBlock
    }

    buildContainer (container, blocks) {
        for (const block of blocks) {
            container.appendChild(block)
        }
        return container
    }

    cardContainer () {
        const div = {
            type: "div",
            class: ""
        }
        if (this.hide) {
            div.class = "hidden"
        }
        const card = this.createBlock(div)
        return card
    } 

    cardInfoPart () {
        const div = {
            type: "div",
            class: "_info"
        }
        const infoBlock = this.createBlock(div)
        return infoBlock
    }

    cardImgPart () {
        const div = {
            type: "div",
            class: "_image"
        }
        const imageBlock = this.createBlock(div)
        return imageBlock
    }

    cardTitle () {
        const titleDiv = {
            type: "h2",
            class: "_title",
            content: this.title
        }
        const title = this.createBlock(titleDiv)
        return title
    }

    cardTime () {
        const time = {
            type: "p",
            class: "_time",
            content: `${this.time} min`
        }

        const div = {
            type: "div",
            class: "_time-section",
        }

        const clockImg = document.createElement("img")
        clockImg.setAttribute('src', "../img/clock.svg")
        clockImg.setAttribute('alt', "Clock")

        const timeDiv = this.createBlock(time)
        const timeBlock = [ clockImg, timeDiv ]
        const container = this.createBlock(div)
        const timeContainer = this.buildContainer(container, timeBlock)
        return timeContainer
    }

    cardInstructions () {
        const instructions = {
            type: "p",
            class: "_instructions",
            content: this.description
        }
        if (instructions.content.length > 190) {
            instructions.content = instructions.content.substring(0, 190)
            instructions.content += " ..."
        }
        const instructionsBlock = this.createBlock(instructions)
        return instructionsBlock
    }

    cardIngredients () {
        const div = {
            type: "div",
            class: "_ingredients"
        }
        const ingredientsContainer = this.createBlock(div)
        const cardIngredients = []
        for (const ingredient of this.ingredients) {
            const name = {
                type: "span",
                class: "_ingredient--name",
                content: ingredient.ingredient
            }
            
            cardIngredients.push(ingredient.ingredient.toLowerCase())

            const container = {
                type: "p",
                class: "_ingredient"
            }

            const ingredientContainer = this.createBlock(container)
            const nameBlock = this.createBlock(name)

            ingredientContainer.appendChild(nameBlock)
            
            if (ingredient.quantity) {
                const quantity = {
                    type: "span",
                    class: "_ingredient--quantity",
                    content: ingredient.quantity.toString()
                }
    
                if (ingredient.unit) {
                    quantity.content += ' ' + ingredient.unit
                }
                const quantityBlock = this.createBlock(quantity)
                ingredientContainer.appendChild(quantityBlock)
                
            }            
            ingredientsContainer.appendChild(ingredientContainer)
        }
        return ingredientsContainer
    }

    mainPartBuilder (position, details) {
        const container = {
            type: "div",
            class: position
        }
        const div = this.createBlock(container)
        const mainPart = this.buildContainer(div, details)
        return mainPart
    }

    buildCard () {
        const card = this.cardContainer()
        const infoContainer = this.cardInfoPart()
        const imgContainer = this.cardImgPart()
        const ingredients = this.cardIngredients()
        const title = this.cardTitle()
        const instructions = this.cardInstructions()
        const time = this.cardTime();
        const topPartDetails = [title, time]
        const bottomPartDetails = [ingredients, instructions]
        const topPart = this.mainPartBuilder("_top", topPartDetails)
        const bottomPart = this.mainPartBuilder("_bottom", bottomPartDetails)
        infoContainer.appendChild(topPart)
        infoContainer.appendChild(bottomPart)
        card.appendChild(imgContainer)
        card.appendChild(infoContainer)
        return card
    }
}

export { Recipe as galleryCard }