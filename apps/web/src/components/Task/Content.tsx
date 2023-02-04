import { AppRouter } from "@acme/api";
import { inferRouterOutputs } from "@trpc/server";
import { Calendar } from "phosphor-react";
import React from "react";

type Task = inferRouterOutputs<AppRouter["todos"]>["create"];

interface ContentProps {
    task: Task;
    index: number;
    listView: "list" | "grid";
}

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const Content: React.FC<ContentProps> = ({ task, index, listView }) => {
    const [year, month, day] = task.dueDate
        .toISOString()
        .split("T")[0]
        .split("-");

    const formattedDate = `${monthNames[+month -1]} ${day}, ${year}`;

    return (
        <div className="flex flex-col flex-1">
            <h2
                className={`
                block font-medium dark:text-slate-200
                ${index === 0 ? "text-violet-100" : ""}
                ${listView === "list" ? "" : "mb-2"}
            `}
            >
                {task.title}
            </h2>
            <p
                className={`
                    mb-2 text-slate-500 line-clamp-3
                    ${index === 0 ? "text-violet-200" : ""}
                `}
            >
                {task.description}
            </p>
            <time
                className={`
                    mt-auto flex w-full items-center
                    ${index === 0 ? "text-violet-200" : ""}
                `}
            >
                <Calendar className="w-5 h-5 mr-2" />
                {formattedDate}
            </time>
        </div>
    );
};
