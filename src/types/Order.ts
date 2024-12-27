export type OrderStatus = "Pending" | "Completed";

export type Item = {
    id: string;
    name: string;
    quantity: number;
};

export type Order = {
    id: string;
    items: Item[];
    status: OrderStatus;
};
