import { AppRouter } from "@acme/api";
import { inferRouterOutputs } from "@trpc/server";
import React, { memo } from "react";
import { toast } from "react-toastify";
import { Task } from "~/components/Task";
import { queryClient } from "~/providers/trpc";
import { useStore } from "~/store";
import { trpc } from "~/utils/trpc";

type Task = inferRouterOutputs<AppRouter["todos"]>["create"];

type ListTasksProps = {
    tasks: Task[];
};

export const ListTasks: React.NamedExoticComponent<ListTasksProps> = memo(
    ({ tasks }) => {
        const listView = useStore((state) => state.listView);
        const toggleNewTask = useStore((state) => state.toggleNewTask);

        const { mutate } = trpc.todos.update.useMutation();

        const handleUpdate = (id: string, data: Partial<Task>) => {
            mutate(
                { ...data, id },
                {
                    onSuccess: () => {
                        toast.success("Task updated successfully");

                        queryClient.invalidateQueries({
                            queryKey: trpc.todos.getByUser.getQueryKey(),
                        });
                    },
                    onError: () => {
                        toast.error("Something went wrong");
                    },
                }
            );
        };

        return (
            <ul
                className={`
                mt-4 grid gap-2 sm:gap-4 xl:gap-6
                ${
                    listView === "list"
                        ? "grid-cols-1"
                        : "2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end"
                }
            `}
            >
                {tasks.map((task, index) => (
                    <Task
                        key={task.id}
                        task={task}
                        index={index}
                        listView={listView}
                        handleUpdate={handleUpdate}
                    />
                ))}
                <li>
                    <button
                        className={`
                        border-2 border-slate-300 text-slate-400 w-full rounded-lg border-dashed transition
                        hover:bg-slate-300 hover:text-slate-500
                        dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300
                        ${listView === "list" ? "h-20 sm:h-32" : "h-52 sm:h-64"}
                    `}
                        onClick={toggleNewTask}
                    >
                        Add new task
                    </button>
                </li>
            </ul>
        );
    },
);
