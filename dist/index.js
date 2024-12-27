"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catalog_1 = require("./catalog");
// import cors from "cors";
const app = (0, express_1.default)();
const port = 3000;
// Middleware
// app.use(cors()); // Enable CORS for all routes
app.use(express_1.default.json());
// used by sales rep to see all the products
app.get("/inventory", (req, res) => {
    res.json(catalog_1.catalog);
});
// used by warehouse worker to see all the outbound orders
app.get("/outbound/orders", (req, res) => {
    res.json(catalog_1.outboundOrders);
});
// used by sales rep to create an order for outbound shipment
app.post("/outbound/createOrder", (req, res) => {
    console.log(req.body);
    const { items } = req.body;
    console.log(items);
    // Validate and decrement stock
    // Update catalog and create order
    for (const [item, count] of Object.entries(items)) {
        catalog_1.catalog[item] -= count;
    }
    const order = {
        id: `${Object.keys(catalog_1.outboundOrders).length + 1}`,
        items,
        status: "Pending",
    };
    catalog_1.outboundOrders[order.id] = order;
    res.json(order);
});
// used by warehouse worker to finish an outbound order
app.post("/outbound/finishOrder", (req, res) => {
    const id = req.body.orderId;
    // remove that order from the list
    delete catalog_1.outboundOrders[id];
    res.send("Order completed");
});
// sales rep can order inventory
app.post("/inbound/createOrder", (req, res) => {
    const { items } = req.body;
    const order = {
        id: `${Object.keys(catalog_1.inboundOrders).length + 1}`,
        items,
        status: "Pending",
    };
    catalog_1.inboundOrders[order.id] = order;
    res.json(order);
});
// warehouse worker can receive inventory and scan it and stow it
app.post("/inbound/receiveInventory", (req, res) => {
    const id = req.body.orderId;
    delete catalog_1.inboundOrders[id];
    res.send("Inventory received");
});
// used by warehouse worker to see all the inbound orders
app.get("/inbound/orders", (req, res) => {
    res.json(catalog_1.inboundOrders);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
