"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrder = void 0;
const findOrder = (arr, id) => {
    const order = (arr.find((order) => order.id === id).status = "Complete");
    return order;
};
exports.findOrder = findOrder;
