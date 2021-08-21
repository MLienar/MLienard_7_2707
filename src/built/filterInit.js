"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedFilters = exports.handleFilters = void 0;
const filterTags_js_1 = require("./filterTags.js");
const filters = {
    finished: [],
    typing: ""
};
exports.typedFilters = filters;
function startFiltering(e) {
    if (e.keyCode === 13) {
        if (!filters.finished.includes(e.target.value)) {
            filters.finished.push(e.target.value.toLowerCase());
            filterTags_js_1.default(e.target.value.toLowerCase());
        }
        e.target.value = "";
        filters.typing = "";
    }
    if (e.target.value.length > 2) {
        filters.typing = e.target.value.toLowerCase();
    }
    else {
        filters.typing = "";
    }
    return filters;
}
exports.handleFilters = startFiltering;
