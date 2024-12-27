import express, { Request, Response } from "express";
import { catalog, outboundOrders, inboundOrders } from "./catalog";
import { findOrder } from "./helpers";
import { Order, Item, OrderStatus } from "./types/Order";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// used by sales rep to see all the products
app.get("/inventory", (req: Request, res: Response) => {
    res.json(catalog);
});

// used by warehouse worker to see all the outbound orders
app.get("/outbound/orders", (req: Request, res: Response) => {
    res.json(outboundOrders);
});

// used by sales rep to create an order for outbound shipment
app.post("/outbound/createOrder", (req: Request, res: Response) => {
    console.log(req.body);
    const { items } = req.body;
    console.log(items);
    // Validate and decrement stock

    // Update catalog and create order
    for (const [item, count] of Object.entries(items)) {
        catalog[item] -= count as number;
    }

    const order = {
        id: `${Object.keys(outboundOrders).length + 1}`,
        items,
        status: "Pending" as const,
    };
    outboundOrders[order.id] = order;

    res.json(order);
});

// used by warehouse worker to finish an outbound order
app.post("/outbound/finishOrder", (req: Request, res: Response) => {
    const id = req.body.orderId;

    // remove that order from the list
    delete outboundOrders[id];

    res.send("Order completed");
});

// sales rep can order inventory
app.post("/inbound/createOrder", (req: Request, res: Response) => {
    const { items } = req.body;

    const order: Order = {
        id: `${Object.keys(inboundOrders).length + 1}`,
        items,
        status: "Pending" as const,
    };
    inboundOrders[order.id] = order;

    res.json(order);
});

// warehouse worker can receive inventory and scan it and stow it
app.post("/inbound/receiveInventory", (req: Request, res: Response) => {
    const id = req.body.orderId;

    delete inboundOrders[id];

    res.send("Inventory received");
});

// used by warehouse worker to see all the inbound orders
app.get("/inbound/orders", (req: Request, res: Response) => {
    res.json(inboundOrders);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
