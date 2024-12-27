export const findOrder = (arr, id) => {
    const order = (arr.find((order) => order.id === id)!.status = "Complete");
    return order;
};
