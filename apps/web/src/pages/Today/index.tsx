import { useSearchParams } from "react-router-dom";
import { useStore } from "~/store";
import { ListTasks } from "~/templates/ListTasks";
import { trpc } from "~/utils/trpc";

export const Today: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sortBy = useStore((state) => state.sortBy.value);

    const directoryId = searchParams.get("directoryId");

    const { data = [] } = trpc.todos.getByUser.useQuery({
        sortBy,
        filterBy: "today",
        directoryId,
    });

    return <ListTasks tasks={data} />;
};
