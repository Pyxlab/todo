import { AppRouter } from "@acme/api";
import { Dialog } from "@headlessui/react";
import { inferRouterOutputs } from "@trpc/server";
import { DotsThreeOutlineVertical, Star, Trash } from "phosphor-react";
import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { queryClient } from "~/providers/trpc";
import { TaskForm } from "~/templates/TaskForm";
import { useErrorHandler } from "~/utils/error-handle";
import { RouterInputs, RouterOutputs, trpc } from "~/utils/trpc";

type Task = RouterOutputs["todos"]["create"];
type CreateTodoInput = RouterInputs["todos"]["update"];

interface ActionsProps {
    task: Task;
    index: number;
    listView: "list" | "grid";
    handleUpdate: (id: string, data: Partial<Task>) => void;
    handleDelete: (id: string) => void;
}

export const Actions: React.FC<ActionsProps> = ({
    task,
    index,
    listView,
    handleUpdate,
    handleDelete,
}) => {
    const [open, setOpen] = React.useState(false);

    function toggle() {
        setOpen((prev) => !prev);
    }

    const methods = useForm<CreateTodoInput>({ 
        defaultValues: {
            ...task,
            dueDate: task.dueDate.toISOString().split("T")[0] as any,
        },
    });

    const { mutate: updateTodo } = trpc.todos.update.useMutation();

    const handleSubmit = methods.handleSubmit((data) =>
        updateTodo(data, {
            onSuccess: () => {
                toast.success("Task updated successfully");

                queryClient.invalidateQueries({
                    queryKey: trpc.todos.getByUser.getQueryKey(),
                });
            },
            onError: useErrorHandler(methods.setError),
        })
    );

    return (
        <div
            className={`
                flex border-dashed border-slate-200 dark:border-slate-700/[.3]
                ${
                    listView === "list"
                        ? "items-center"
                        : "border-t-2 w-full pt-4 mt-4"
                }
                ${index === 0 ? "border-violet-400 dark:border-violet-400" : ""}
            `}
        >
            <button
                title="Mark as completed"
                className={`
                    mr-4 rounded-full font-medium
                    ${listView === "list" ? "" : "order-0"}
                    ${
                        task.completed
                            ? "bg-emerald-200 text-emerald-800"
                            : "bg-amber-200 text-amber-800"
                    }
                `}
                onClick={() => {
                    handleUpdate(task.id, {
                        completed: !task.completed,
                    });
                }}
            >
                <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
                    {task.completed ? "completed" : "uncompleted"}
                </span>
            </button>
            <button
                title="Mark as important"
                className={`
                    transition ml-auto
                    ${
                        index === 0 && !task.important
                            ? "text-slate-100 hover:text-slate-300"
                            : ""
                    }
                    ${task.important ? "text-rose-500 hover:text-rose-400" : ""}
                `}
                onClick={() => {
                    handleUpdate(task.id, {
                        important: !task.important,
                    });
                }}
            >
                <Star
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    weight={task.important ? "fill" : "regular"}
                />
            </button>
            <button
                title="Delete task"
                className={`
                    transition ml-2
                    ${index === 0 ? "text-slate-100 hover:text-slate-300" : ""}
                `}
                onClick={() => {
                    handleDelete(task.id);
                }}
            >
                <Trash className="w-5 h-5 sm:w-6 sm:h-6" weight="fill" />
            </button>
            <button
                title="More options"
                className={`
                    transition ml-1
                    ${index === 0 ? "text-slate-100 hover:text-slate-300" : ""}
                `}
                onClick={toggle}
            >
                <DotsThreeOutlineVertical
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    weight="fill"
                />
            </button>
            <Dialog
                className="relative z-30 text-slate-600 dark:text-slate-400 xl:text-base sm:text-sm text-xs"
                open={open}
                onClose={toggle}
            >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
                <Dialog.Panel className="fixed inset-0">
                    <FormProvider {...methods}>
                        <TaskForm type="edit" handleSubmit={handleSubmit} toggle={toggle} />
                    </FormProvider>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};
