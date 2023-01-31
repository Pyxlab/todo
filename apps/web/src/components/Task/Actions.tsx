import { AppRouter } from "@acme/api";
import { inferRouterOutputs } from "@trpc/server";
import { DotsThreeOutlineVertical, Star, Trash } from "phosphor-react";
import React from "react";
import { toast } from "react-toastify";
import { queryClient } from "~/providers/trpc";
import { trpc } from "~/utils/trpc";

type Task = inferRouterOutputs<AppRouter["todos"]>["create"];

interface ActionsProps {
    task: Task;
    index: number;
    listView: "list" | "grid";
    handleUpdate: (id: string, data: Partial<Task>) => void;
}

export const Actions: React.FC<ActionsProps> = ({
    task,
    index,
    listView,
    handleUpdate,
}) => (
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
        >
            <Trash className="w-5 h-5 sm:w-6 sm:h-6" weight="fill" />
        </button>
        <button
            title="More options"
            className={`
                transition ml-1
                ${index === 0 ? "text-slate-100 hover:text-slate-300" : ""}
            `}
        >
            <DotsThreeOutlineVertical
                className="w-5 h-5 sm:w-6 sm:h-6"
                weight="fill"
            />
        </button>
    </div>
);
