const recipesContainer = document.querySelector("main")

function GalleryCard(recipe) {
    this.title = recipe.name
    this.time = recipe.time
    this.instructions = recipe.description
    this.ingredients = recipe.ingredients
    this.appliance = recipe.appliance
    this.ustensils = recipe.ustensils

    const createBlock = function (block) {
        const createdBlock = document.createElement(block.type)
        createdBlock.classList.add(`recipe-card_${block.class}`)
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

    const cardContainer = function () {
        const div =  {
            type: "div",
            class: ""
        }
        const container = createBlock(div)
        return container
    } 

    const cardInfoPart = function () {
        const div = {
            type: "div",
            class: "info"
        }
        const infoPart = createBlock(div)
        return infoPart
    }

    const cardImgPart = function () {
        const div = {
            type: "div",
            class: "image"
        }
        const imagePart = createBlock(div)
        return imagePart
    }

    const cardTitle = function () {
        const title = {
            type: "h2",
            class: "title",
            content: recipe.name
        }
        const titleBlock = createBlock(title)
        return titleBlock
    }

    const cardTime = function () {
        const time = {
            type: "p",
            class: "time",
            content: `${recipe.time} min`
        }

        const div = {
            type: "div",
            class: "time-section",
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
            class: "instructions",
            content: recipe.description
        }
        const instructionsBlock = createBlock(instructions)
        return instructionsBlock
    }

    const cardIngredients = function () {
        const div = {
            type: "div",
            class: "ingredients"
        }
        const ingredientsContainer = createBlock(div)

        for (const ingredient of recipe.ingredients) {
            const name = {
                type: "span",
                class: "ingredient--name",
                content: ingredient.ingredient
            }
            const quantity = {
                type: "span",
                class: "ingredient--quantity",
                content: ingredient.quantity
            }
            const nameBlock = createBlock(name)
            const quantityBlock = createBlock(quantity)
            
            const container = {
                type: "p",
                class: "ingredient"
            }
            const ingredientContainer = createBlock(container)
           
            ingredientContainer.appendChild(nameBlock)
            ingredientContainer.appendChild(quantityBlock)
            ingredientsContainer.appendChild(ingredientContainer)
        }
        return ingredientsContainer
    }

    const topPart = function(title, time) {
        const container = {
            type: "div",
            class: "top"
        }
        const topPart = createBlock(container)
        const topDetails = [title, time]
        const cardTop = buildContainer(topPart, topDetails)
        return cardTop
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
        const card = cardContainer()
        const infoContainer = cardInfoPart()
        const imgContainer = cardImgPart()
        const ingredients = cardIngredients()
        const title = cardTitle()
        const instructions = cardInstructions()
        const time = cardTime();
        const topPartDetails = [title, time]
        const bottomPartDetails = [ingredients, instructions]
        const topPart = mainPartBuilder("top", topPartDetails)
        const bottomPart = mainPartBuilder("bottom", bottomPartDetails)
        infoContainer.appendChild(topPart)
        infoContainer.appendChild(bottomPart)
        card.appendChild(imgContainer)
        card.appendChild(infoContainer)
        recipesContainer.appendChild(card)
    }
}

export const galleryCard = GalleryCard 