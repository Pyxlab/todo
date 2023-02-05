import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "~/store";
import { ListTasks } from "~/templates/ListTasks";
import { trpc } from "~/utils/trpc";

export const Results: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sortBy = useStore((state) => state.sortBy.value);

    const directoryId = searchParams.get("directoryId");
    const query = searchParams.get("q");

    const { data = [] } = trpc.todos.getByUser.useQuery({
        sortBy,
        directoryId,
        query
    });

    useStore.setState({ total: data.length })

    React.useEffect(() => {
        if(!query) {
            navigate({
                pathname: "/",
                search: searchParams.toString()
            });
        }
    }, [query]);

    return <ListTasks tasks={data} />;
};
