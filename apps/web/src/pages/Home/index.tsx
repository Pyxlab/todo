import React from "react";
import { ListTasks } from "~/templates/ListTasks";
import { trpc } from "~/utils/trpc";

export const Home: React.FC = () => {
    const { data = [] } = trpc.todos.getByUser.useQuery();

    return <ListTasks tasks={data} />;
};
