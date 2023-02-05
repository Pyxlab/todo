import React from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useStore } from "~/store";
import { ListTasks } from "~/templates/ListTasks";
import { trpc } from "~/utils/trpc";

export const Home: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sortBy = useStore((state) => state.sortBy.value);

    const directoryId = searchParams.get("directoryId");
    
    const { data = [] } = trpc.todos.getByUser.useQuery({
        sortBy,
        directoryId,
    });

    useStore.setState({ total: data.length })

    return (
        <React.Fragment>
            <ListTasks tasks={data} />
            <Outlet /> 
        </React.Fragment>
    );
};
