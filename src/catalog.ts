import { Order, Item } from "./types/Order";
// make it an array of Item objects
export const catalog: Item[] = [
    { id: "1", name: "iPhone 13", quantity: 100 },
    { id: "2", name: "Nexus 5", quantity: 100 },
];

export const outboundOrders: Record<string, Order> = {};

export const inboundOrders: Record<string, Order> = {};

export const incomingInventory: { [key: string]: number } = {};
