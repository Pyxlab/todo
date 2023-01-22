export type SortItem = typeof sortList[number];

export const sortList = [
    { value: "order-added", title: "Order added" },
    { value: "min-date", title: "Earlier first" },
    { value: "max-date", title: "Later first" },
    { value: "completed-first", title: "Completed first" },
    { value: "uncompleted-first", title: "Uncompleted first" },
];