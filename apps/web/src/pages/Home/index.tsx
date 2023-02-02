import React from "react";
import { useStore } from "~/store";
import { ListTasks } from "~/templates/ListTasks";
import { trpc } from "~/utils/trpc";

export const Home: React.FC = () => {
    const sortBy = useStore(state => state.sortBy.value);
    const { data = [] } = trpc.todos.getByUser.useQuery({ sortBy });

    return <ListTasks tasks={data} />;
};
