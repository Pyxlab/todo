export type SortItem = {
    value: 'order-added' | 'min-date' | 'max-date' | 'completed-first' | 'uncompleted-first';
    title: string;
}

export const sortList = [
    { value: "order-added", title: "Order added" },
    { value: "min-date", title: "Earlier first" },
    { value: "max-date", title: "Later first" },
    { value: "completed-first", title: "Completed first" },
    { value: "uncompleted-first", title: "Uncompleted first" },
];