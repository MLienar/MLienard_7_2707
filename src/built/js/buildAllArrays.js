"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAllArrays = void 0;
function buildPropertiesArray(card, array) {
    var types = ["ingredients", "appliances", "ustensils"];
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var type = types_1[_i];
        for (var i = 0; i < card[type].length; i++) {
            if (!array[type][i]) {
                var arrayObject = {
                    key: card[type][i],
                    card: [card.id]
                };
                array[type][card[type][i]] = arrayObject;
            }
            else {
                array[type][i].card.push(card.id);
            }
        }
        array[type].sort();
        // console.log(array);
    }
}
exports.buildAllArrays = buildPropertiesArray;
