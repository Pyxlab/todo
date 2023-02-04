import { Disclosure, RadioGroup } from "@headlessui/react";
import { CaretRight, Plus } from "phosphor-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { trpc } from "~/utils/trpc";

export const Directories: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const search = new URLSearchParams(location.search);
    const value = search.get("directoryId") || null;

    const { data: directories } = trpc.directories.list.useQuery();

    function handleChange(id: string | null) {
        if (id) {
            search.set("directoryId", id);
        } else {
            search.delete("directoryId");
        }

        navigate({
            pathname: location.pathname,
            search: search.toString(),
        });
    }

    return (
        <Disclosure>
            {({ open }) => (
                <div className="py-4">
                    <Disclosure.Button className="flex items-center w-full pl-3 dark:text-slate-200">
                        <div
                            className={`mr-1 transition-transform ${
                                open ? "transform rotate-90" : ""
                            }`}
                        >
                            <CaretRight weight="bold" />
                        </div>
                        Directories
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500 font-semibold mt-2">
                        <RadioGroup value={value} onChange={handleChange}>
                            <RadioGroup.Label className="sr-only">
                                Directory
                            </RadioGroup.Label>
                            <div className="space-y-1">
                                <RadioGroup.Option
                                    value={null}
                                    className={({ checked }) => `
                                    ${
                                        checked
                                            ? "bg-violet-100 dark:bg-slate-700/[.2] text-violet-900"
                                            : "text-gray-600 dark:text-slate-400"
                                    }
                                    relative px-5 py-2 cursor-pointer flex focus:outline-none
                                `}
                                >
                                    {({ checked }) => (
                                        <>
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className="font-normal text-gray-600 dark:text-slate-400"
                                                    >
                                                        All
                                                    </RadioGroup.Label>
                                                </div>
                                                <div
                                                    className={`${
                                                        checked
                                                            ? "border-violet-500 border-r-4"
                                                            : "border-transparent"
                                                    } absolute -inset-px pointer-events-none`}
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </>
                                    )}
                                </RadioGroup.Option>
                                {directories?.map((directory) => (
                                    <RadioGroup.Option
                                        key={directory.id}
                                        value={directory.id}
                                        className={({ checked }) => `
                                        ${
                                            checked
                                                ? "bg-violet-100 dark:bg-slate-700/[.2] text-violet-900"
                                                : "text-gray-600 dark:text-slate-200"
                                        }
                                        relative px-5 py-2 cursor-pointer flex focus:outline-none
                                    `}
                                    >
                                        {({ checked }) => (
                                            <>
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="flex items-center">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className="font-normal text-gray-600 dark:text-slate-400"
                                                        >
                                                            {directory.name}
                                                        </RadioGroup.Label>
                                                    </div>
                                                    <div
                                                        className={`${
                                                            checked
                                                                ? "border-violet-500 border-r-4"
                                                                : "border-transparent"
                                                        } absolute -inset-px pointer-events-none`}
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                        <div className="w-full px-5 mt-2">
                            <button className="flex items-center justify-center w-full px-5 py-2 border-slate-300 dark:border-slate-700 border-2 rounded-md border-dashed hover:text-violet-500">
                                <div className="mr-2">
                                    <Plus weight="bold" />
                                </div>
                                New directory
                            </button>
                        </div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
};
