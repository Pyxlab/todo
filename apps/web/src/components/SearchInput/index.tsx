import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlass, X } from "phosphor-react";
import { useDebounce } from "~/hooks/useDebounce";
import { trpc } from "~/utils/trpc";
import _uniqBy from "lodash/uniqBy";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchInput: React.FC = () => {
    const navigate = useNavigate();
    const [searchParam, setSearchParam] = useSearchParams();
    const directoryId = searchParam.get("directoryId");

    const [query, setQuery] = useState("");

    const { data: tasks } = trpc.todos.getByUser.useQuery(
        {
            sortBy: "order-added",
            directoryId,
            query,
        },
        {
            enabled: query.length > 3,
        }
    );

    const [searchTerm, setSearchTerm] = useState(() => {
        return searchParam.get("q") || "";
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
    }

    const queryTerm = useDebounce(searchTerm);

    React.useEffect(() => {
        setQuery(queryTerm);
    }, [queryTerm]);

    return (
        <div className="flex-1 col-span-3 row-start-2 md:pr-10">
            <Combobox
                as="form"
                className="relative md:max-w-xs w-full"
                autoComplete="off"
            >
                <Combobox.Label
                    htmlFor="search"
                    className="sr-only"
                ></Combobox.Label>
                <Combobox.Input
                    id="search"
                    type="search"
                    placeholder="Search task"
                    value={searchTerm}
                    onChange={handleChange}
                    className="w-full input-style pr-10"
                />
                <button
                    type="button"
                    className="absolute right-0 top-0 h-full w-10 flex items-center justify-center"
                    onClick={() => {
                        setSearchTerm("");
                        setSearchParam((prev) => {
                            prev.delete("q");

                            return prev;
                        });
                    }}
                >
                    {query.length > 3 ? (
                        <X className="absolute w-4 text-base sm:w-5 sm:text-xl right-4 top-3.5 text-slate-400" />
                    ) : (
                        <MagnifyingGlass className="absolute w-4 text-base sm:w-5 sm:text-xl right-4 top-3.5 text-slate-400" />
                    )}
                </button>
                <Combobox.Options className="absolute overflow-hidden bg-slate-100 rounded-md w-full top-14 dark:bg-slate-800 z-10">
                    {_uniqBy(tasks || [], "title").map((task) => (
                        <Combobox.Option
                            key={task.id}
                            value={task.title}
                            className="p-3 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
                            onClick={() => {
                                setSearchTerm(task.title);
                                searchParam.set("q", task.title);
                                navigate({
                                    pathname: "/results",
                                    search: searchParam.toString(),
                                });
                            }}
                        >
                            {task.title}
                        </Combobox.Option>
                    ))}
                    {tasks?.length === 0 && (
                        <div className="p-3 hover:bg-slate-200 dark:hover:bg-slate-700">
                            No results found
                        </div>
                    )}
                </Combobox.Options>
            </Combobox>
        </div>
    );
};
