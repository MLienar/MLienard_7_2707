function GalleryCard(recipe) {

    this.ingredients = []
    this.appliance = [ recipe.appliance.toLowerCase() ]
    this.ustensils = []
    this.description = recipe.description
    this.title = recipe.name
    this.hide = false
    this.id = 0
    
    recipe.ingredients.forEach(ingredient => {
        this.ingredients.push(ingredient.ingredient.toLowerCase())
    })

    recipe.ustensils.forEach(ustensil => {
        this.ustensils.push(ustensil.toLowerCase())
    })
    
    const createBlock = function (block) {
        const createdBlock = document.createElement(block.type)
        createdBlock.classList.add(`recipe-card${block.class}`)
        if (block.content) {
            createdBlock.textContent = block.content
        }
        return createdBlock
    }

    const buildContainer = function (container, blocks) {
        for (const block of blocks) {
            container.appendChild(block)
        }
        return container
    }

    this.cardContainer = function () {
        const div = {
            type: "div",
            class: ""
        }
        if (this.hide) {
            div.class = "hidden"
        }
        const card = createBlock(div)
        return card
    } 

    const cardInfoPart = function () {
        const div = {
            type: "div",
            class: "_info"
        }
        const infoBlock = createBlock(div)
        return infoBlock
    }

    const cardImgPart = function () {
        const div = {
            type: "div",
            class: "_image"
        }
        const imageBlock = createBlock(div)
        return imageBlock
    }

    const cardTitle = function () {
        const titleDiv = {
            type: "h2",
            class: "_title",
            content: recipe.name
        }
        const title = createBlock(titleDiv)
        return title
    }

    const cardTime = function () {
        const time = {
            type: "p",
            class: "_time",
            content: `${recipe.time} min`
        }

        const div = {
            type: "div",
            class: "_time-section",
        }

        const clockImg = document.createElement("img")
        clockImg.setAttribute('src', "img/clock.svg")
        clockImg.setAttribute('alt', "Clock")

        const timeDiv = createBlock(time)
        const timeBlock = [ clockImg, timeDiv ]
        const container = createBlock(div)
        const timeContainer = buildContainer(container, timeBlock)
        return timeContainer
    }

    const cardInstructions = function () {
        const instructions = {
            type: "p",
            class: "_instructions",
            content: recipe.description
        }
        if (instructions.content.length > 190) {
            instructions.content = instructions.content.substring(0, 190)
            instructions.content += " ..."
        }
        const instructionsBlock = createBlock(instructions)
        return instructionsBlock
    }

    const cardIngredients = function () {
        const div = {
            type: "div",
            class: "_ingredients"
        }
        const ingredientsContainer = createBlock(div)

        const cardIngredients = []
        for (const ingredient of recipe.ingredients) {
            const name = {
                type: "span",
                class: "_ingredient--name",
                content: ingredient.ingredient
            }
            
            cardIngredients.push(ingredient.ingredient)

            const quantity = {
                type: "span",
                class: "_ingredient--quantity",
                content: ingredient.quantity
            }

            if (ingredient.unit) {
                quantity.content += ' ' + ingredient.unit
            }

            const nameBlock = createBlock(name)
            const quantityBlock = createBlock(quantity)
            
            const container = {
                type: "p",
                class: "_ingredient"
            }
            const ingredientContainer = createBlock(container)
           
            ingredientContainer.appendChild(nameBlock)
            ingredientContainer.appendChild(quantityBlock)
            ingredientsContainer.appendChild(ingredientContainer)
        }

        return ingredientsContainer
    }

    const mainPartBuilder = function (position, details) {
        const container = {
            type: "div",
            class: position
        }
        const div = createBlock(container)
        const mainPart = buildContainer(div, details)
        return mainPart
    }

    this.buildCard = function () {
        const card = this.cardContainer()
        const infoContainer = cardInfoPart()
        const imgContainer = cardImgPart()
        const ingredients = cardIngredients()
        const title = cardTitle()
        const instructions = cardInstructions()
        const time = cardTime();
        const topPartDetails = [title, time]
        const bottomPartDetails = [ingredients, instructions]
        const topPart = mainPartBuilder("_top", topPartDetails)
        const bottomPart = mainPartBuilder("_bottom", bottomPartDetails)
        infoContainer.appendChild(topPart)
        infoContainer.appendChild(bottomPart)
        card.appendChild(imgContainer)
        card.appendChild(infoContainer)
        return card
    }
}

export const galleryCard = GalleryCard 