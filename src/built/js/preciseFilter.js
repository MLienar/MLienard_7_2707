"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("../index.js");
function preciseFilter(e) {
    var currentProperties = __assign({}, index_js_1.tagList);
    var tagType = e.target.id;
    currentProperties[tagType] = [];
    var input = e.target.value.toLowerCase();
    for (var item in index_js_1.tagList[tagType]) {
        if (item.includes(input)) {
            currentProperties[tagType][item] = item;
        }
    }
    return currentProperties;
}
exports.default = preciseFilter;
