"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../index.js");
function filterRecipes(filters) {
    var matchingRecipes = [];
    var flatFilters = __spreadArray(__spreadArray([], filters.finished), [filters.typing]).filter(function (e) { return e; });
    var filterMatches = [];
    if (filters.typing.length < 3 || filters.finished.length < 0) {
        return index_js_1.recipes;
    }
    for (var _i = 0, recipes_1 = index_js_1.recipes; _i < recipes_1.length; _i++) {
        var recipe = recipes_1[_i];
        for (var i = 0; i < flatFilters.length; i++) {
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
        var emptyArray = [];
        return emptyArray;
    }
    var testArray = filterMatches.shift().filter(function (v) {
        return filterMatches.every(function (a) {
            return a.indexOf(v) !== -1;
        });
    });
    // add matching recipe cards to returned array
    for (var _a = 0, testArray_1 = testArray; _a < testArray_1.length; _a++) {
        var number = testArray_1[_a];
        matchingRecipes.push(index_js_1.recipes[number]);
    }
    return matchingRecipes;
}
exports.default = filterRecipes;
