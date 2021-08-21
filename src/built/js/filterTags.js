"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filterInit_js_1 = require("./filterInit.js");
var index_js_1 = require("../index.js");
var index_js_2 = require("../index.js");
function filterTagsCreator(tag) {
    var tagType = "";
    for (var type in index_js_2.tagList) {
        for (var item in index_js_2.tagList[type]) {
            if (tag == item) {
                tagType = type;
                break;
            }
        }
    }
    var tagsContainer = document.querySelector(".search_current-tags");
    var searchTag = document.createElement('li');
    searchTag.classList.add("search_tag");
    searchTag.innerHTML = "<p>" + tag + "</p><div class=\"close\"></div>";
    switch (tagType) {
        case 'ingredients':
            searchTag.classList.add("blue");
            break;
        case 'appliances':
            searchTag.classList.add("green");
            break;
        case 'ustensils':
            searchTag.classList.add("orange");
            break;
        default:
            searchTag.classList.add("grey");
    }
    searchTag.addEventListener("click", function (e) {
        filterInit_js_1.typedFilters.finished.splice(e.target.value, 1);
        searchTag.remove();
        index_js_1.filterFunction(filterInit_js_1.typedFilters);
    });
    tagsContainer.appendChild(searchTag);
}
exports.default = filterTagsCreator;
