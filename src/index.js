"use strict";
exports.__esModule = true;
exports.tagList = exports.filterFunction = exports.recipes = void 0;
var recipes_js_1 = require("./js/recipes.js");
var galleryCard_js_1 = require("./js/galleryCard.js");
var filterInit_js_1 = require("./js/filterInit.js");
var buildAllArrays_js_1 = require("./js/buildAllArrays.js");
var filterInit_js_2 = require("./js/filterInit.js");
var filterArrays_js_1 = require("./js/filterArrays.js");
var preciseFilter_js_1 = require("./js/preciseFilter.js");
var filterTags_js_1 = require("./js/filterTags.js");
require("./sass/main.scss");
// Build properties lists
var propertiesArray = {
    ingredients: [],
    appliances: [],
    ustensils: []
};
exports.tagList = propertiesArray;
var allRecipeCards = [];
exports.recipes = allRecipeCards;
// Build DOM Recipes
var recipesContainer = document.querySelector("main");
function refreshDOM(cardsArray) {
    while (recipesContainer.firstChild) {
        recipesContainer.removeChild(recipesContainer.firstChild);
    }
    if (cardsArray.length > 0) {
        for (var _i = 0, cardsArray_1 = cardsArray; _i < cardsArray_1.length; _i++) {
            var card = cardsArray_1[_i];
            var recipeCard = card.buildCard();
            recipesContainer.appendChild(recipeCard);
        }
    }
    else {
        var noRecipesDiv = document.createElement("h3");
        noRecipesDiv.innerText = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
        recipesContainer.appendChild(noRecipesDiv);
    }
}
// filters on DOM
function refreshDOMFilters(currentDOMFilters) {
    for (var key in currentDOMFilters) {
        var filterListDiv = document.getElementById(key + "-list");
        while (filterListDiv.firstChild) {
            filterListDiv.removeChild(filterListDiv.firstChild);
        }
        for (var _i = 0, _a = currentDOMFilters[key]; _i < _a.length; _i++) {
            var div = _a[_i];
            filterListDiv.appendChild(div);
        }
    }
}
// filters to object
function buildFilters(currentProperties) {
    var filterDivLists = {
        ingredients: [],
        appliances: [],
        ustensils: []
    };
    for (var filterType in currentProperties) {
        var type = filterType.toString();
        for (var filter in currentProperties[type]) {
            var filterDiv = document.createElement("li");
            filterDiv.classList.add("dropdown_list-item");
            filterDiv.innerText = filter;
            filterDiv.addEventListener("click", function (e) {
                var event = e.target;
                var value = event.innerText.toLowerCase();
                if (!filterInit_js_2.typedFilters.finished.includes(value)) {
                    filterInit_js_2.typedFilters.finished.push(value);
                    for (var _i = 0, preciseInputs_1 = preciseInputs; _i < preciseInputs_1.length; _i++) {
                        var input = preciseInputs_1[_i];
                        if (input.value) {
                            input.value = "";
                        }
                    }
                }
                mainFilterFunction(filterInit_js_2.typedFilters);
                filterTags_js_1["default"](value);
            });
            filterDivLists[type].push(filterDiv);
        }
    }
    refreshDOMFilters(filterDivLists);
}
// store all recipes in an array
function allRecipesToArray() {
    for (var _i = 0, recipes_1 = recipes_js_1.recettes; _i < recipes_1.length; _i++) {
        var recipe = recipes_1[_i];
        var card = new galleryCard_js_1.galleryCard(recipe);
        allRecipeCards[card.id] = card;
        // Add ingredients to page arrays
        buildAllArrays_js_1.buildAllArrays(card, propertiesArray);
    }
    buildFilters(propertiesArray);
    refreshDOM(allRecipeCards);
}
allRecipesToArray();
// Main Search
var mainInput = document.getElementById("main-search");
function mainFilterFunction(currentFilter) {
    var currentProperties = {
        ingredients: [],
        appliances: [],
        ustensils: []
    };
    var matchingRecipes = filterArrays_js_1["default"](currentFilter);
    refreshDOM(matchingRecipes);
    for (var _i = 0, matchingRecipes_1 = matchingRecipes; _i < matchingRecipes_1.length; _i++) {
        var card = matchingRecipes_1[_i];
        buildAllArrays_js_1.buildAllArrays(card, currentProperties);
    }
    buildFilters(currentProperties);
}
exports.filterFunction = mainFilterFunction;
mainInput.addEventListener("keyup", function (e) {
    var currentFilter = filterInit_js_1.handleFilters(e);
    mainFilterFunction(currentFilter);
});
// Precise Search
var preciseInputs = document.querySelectorAll(".dropdown_input");
preciseInputs.forEach(function (input) {
    input.addEventListener('keyup', function (e) {
        var preciseTag = preciseFilter_js_1["default"](e);
        buildFilters(preciseTag);
    });
});
preciseInputs.forEach(function (input) {
    input.addEventListener("focus", function (e) {
        var itemList = e.composedPath[2].children[1];
        itemList.classList.remove("hidden");
    });
});
preciseInputs.forEach(function (input) {
    input.addEventListener("focusout", function (e) {
        var itemList = e.composedPath[2].children[1];
        itemList.classList.add("hidden");
    });
});
