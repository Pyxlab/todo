import { useStore } from "~/store";
import { ListTasks } from "~/templates/ListTasks";
import { trpc } from "~/utils/trpc";

export const Today: React.FC = () => {
    const sortBy = useStore((state) => state.sortBy.value);

    const { data = [] } = trpc.todos.getByUser.useQuery({
        sortBy,
        filterBy: "today",
    });

    return <ListTasks tasks={data} />;
};
