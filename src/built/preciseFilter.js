"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
function preciseFilter(e) {
    const currentProperties = Object.assign({}, index_js_1.tagList);
    const tagType = e.target.id;
    currentProperties[tagType] = [];
    const input = e.target.value.toLowerCase();
    for (const item in index_js_1.tagList[tagType]) {
        if (item.includes(input)) {
            currentProperties[tagType][item] = item;
        }
    }
    return currentProperties;
}
exports.default = preciseFilter;
