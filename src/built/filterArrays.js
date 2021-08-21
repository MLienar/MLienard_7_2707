"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
function filterRecipes(filters) {
    const matchingRecipes = [];
    const flatFilters = [...filters.finished, filters.typing].filter(e => e);
    const filterMatches = [];
    if (filters.typing.length < 3 || filters.finished.length < 0) {
        return index_js_1.recipes;
    }
    for (const recipe of index_js_1.recipes) {
        for (let i = 0; i < flatFilters.length; i++) {
            if (recipe.searchText.includes(flatFilters[i])) {
                if (!filterMatches[i]) {
                    filterMatches[i] = [recipe.id];
                }
                else {
                    filterMatches[i].push(recipe.id);
                }
            }
        }
    }
    // Check common number between arrays
    if (filterMatches.length === 0) {
        const emptyArray = [];
        return emptyArray;
    }
    const testArray = filterMatches.shift().filter(function (v) {
        return filterMatches.every(function (a) {
            return a.indexOf(v) !== -1;
        });
    });
    // add matching recipe cards to returned array
    for (const number of testArray) {
        matchingRecipes.push(index_js_1.recipes[number]);
    }
    return matchingRecipes;
}
exports.default = filterRecipes;
