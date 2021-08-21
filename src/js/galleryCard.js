"use strict";
exports.__esModule = true;
exports.galleryCard = void 0;
var Recipe = /** @class */ (function () {
    function Recipe(recipe) {
        var _this = this;
        this.ingredients = [];
        this.appliances = [recipe.appliance.toLowerCase()];
        this.ustensils = [];
        this.description = recipe.description;
        this.title = recipe.name;
        this.time = recipe.time;
        this.hide = false;
        this.id = recipe.id - 1;
        this.searchText = this.title.toLowerCase() + ' ' + this.description.toLowerCase() + ' ' + recipe.appliance.toLowerCase();
        recipe.ingredients.forEach(function (ingredient) {
            _this.ingredients.push(ingredient.ingredient.toLowerCase());
            _this.searchText += " " + ingredient.ingredient.toLowerCase();
        });
        recipe.ustensils.forEach(function (ustensil) {
            _this.ustensils.push(ustensil.toLowerCase());
            _this.searchText += " " + ustensil.toLowerCase();
        });
    }
    Recipe.prototype.createBlock = function (block) {
        var createdBlock = document.createElement(block.type);
        createdBlock.classList.add("recipe-card" + block["class"]);
        if (block.content) {
            createdBlock.textContent = block.content;
        }
        return createdBlock;
    };
    Recipe.prototype.buildContainer = function (container, blocks) {
        for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
            var block = blocks_1[_i];
            container.appendChild(block);
        }
        return container;
    };
    Recipe.prototype.cardContainer = function () {
        var div = {
            type: "div",
            "class": ""
        };
        if (this.hide) {
            div["class"] = "hidden";
        }
        var card = this.createBlock(div);
        return card;
    };
    Recipe.prototype.cardInfoPart = function () {
        var div = {
            type: "div",
            "class": "_info"
        };
        var infoBlock = this.createBlock(div);
        return infoBlock;
    };
    Recipe.prototype.cardImgPart = function () {
        var div = {
            type: "div",
            "class": "_image"
        };
        var imageBlock = this.createBlock(div);
        return imageBlock;
    };
    Recipe.prototype.cardTitle = function () {
        var titleDiv = {
            type: "h2",
            "class": "_title",
            content: this.title
        };
        var title = this.createBlock(titleDiv);
        return title;
    };
    Recipe.prototype.cardTime = function () {
        var time = {
            type: "p",
            "class": "_time",
            content: this.time + " min"
        };
        var div = {
            type: "div",
            "class": "_time-section"
        };
        var clockImg = document.createElement("img");
        clockImg.setAttribute('src', "../img/clock.svg");
        clockImg.setAttribute('alt', "Clock");
        var timeDiv = this.createBlock(time);
        var timeBlock = [clockImg, timeDiv];
        var container = this.createBlock(div);
        var timeContainer = this.buildContainer(container, timeBlock);
        return timeContainer;
    };
    Recipe.prototype.cardInstructions = function () {
        var instructions = {
            type: "p",
            "class": "_instructions",
            content: this.description
        };
        if (instructions.content.length > 190) {
            instructions.content = instructions.content.substring(0, 190);
            instructions.content += " ...";
        }
        var instructionsBlock = this.createBlock(instructions);
        return instructionsBlock;
    };
    Recipe.prototype.cardIngredients = function () {
        var div = {
            type: "div",
            "class": "_ingredients"
        };
        var ingredientsContainer = this.createBlock(div);
        var cardIngredients = [];
        for (var _i = 0, _a = this.ingredients; _i < _a.length; _i++) {
            var ingredient = _a[_i];
            var name_1 = {
                type: "span",
                "class": "_ingredient--name",
                content: ingredient.ingredient
            };
            cardIngredients.push(ingredient.ingredient);
            var container = {
                type: "p",
                "class": "_ingredient"
            };
            var ingredientContainer = this.createBlock(container);
            var nameBlock = this.createBlock(name_1);
            ingredientContainer.appendChild(nameBlock);
            console.log("top");
            if (ingredient.quantity) {
                var quantity = {
                    type: "span",
                    "class": "_ingredient--quantity",
                    content: ingredient.quantity.toString()
                };
                if (ingredient.unit) {
                    quantity.content += ' ' + ingredient.unit;
                }
                var quantityBlock = this.createBlock(quantity);
                ingredientContainer.appendChild(quantityBlock);
                console.log(ingredientsContainer);
            }
            ingredientsContainer.appendChild(ingredientContainer);
        }
        return ingredientsContainer;
    };
    Recipe.prototype.mainPartBuilder = function (position, details) {
        var container = {
            type: "div",
            "class": position
        };
        var div = this.createBlock(container);
        var mainPart = this.buildContainer(div, details);
        return mainPart;
    };
    Recipe.prototype.buildCard = function () {
        var card = this.cardContainer();
        var infoContainer = this.cardInfoPart();
        var imgContainer = this.cardImgPart();
        var ingredients = this.cardIngredients();
        var title = this.cardTitle();
        var instructions = this.cardInstructions();
        var time = this.cardTime();
        var topPartDetails = [title, time];
        var bottomPartDetails = [ingredients, instructions];
        var topPart = this.mainPartBuilder("_top", topPartDetails);
        var bottomPart = this.mainPartBuilder("_bottom", bottomPartDetails);
        infoContainer.appendChild(topPart);
        infoContainer.appendChild(bottomPart);
        card.appendChild(imgContainer);
        card.appendChild(infoContainer);
        return card;
    };
    return Recipe;
}());
exports.galleryCard = Recipe;
