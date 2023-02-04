import { Disclosure, RadioGroup } from "@headlessui/react";
import { CaretRight } from "phosphor-react";
import React from "react";
import {  useSearchParams } from "react-router-dom";
import { trpc } from "~/utils/trpc";
import { CreateDirectory } from "../Modais/CreateDirectory";
import { DeleteDirectoryModal } from "../Modais/DeleteDirectoryModal";
import { EditDirectoryModal } from "../Modais/EditDirectoryModal";

export const Directories: React.FC = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [isTouch, setIsTouch] = React.useState(false);

    const value = searchParam.get("directoryId") || null;

    const { data: directories } = trpc.directories.list.useQuery();

    function handleChange(id: string | null) {
        setSearchParam((prev) => {
            if (id) {
                prev.set("directoryId", id);
            } else {
                prev.delete("directoryId");
            }

            return prev;
        });
    }

    React.useEffect(() => {
        setIsTouch("ontouchstart" in window);
    }, []);

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
                                                        All directories
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
                                                    <div
                                                        className={`
                                                            ${
                                                                !isTouch
                                                                    ? "text-transparent"
                                                                    : "text-gray-600 dark:text-slate-400"
                                                            }
                                                            flex flex-1 items-center transition hover:text-gray-600 hover:dark:text-slate-400
                                                        `}
                                                    >
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className="font-normal text-gray-600 dark:text-slate-400"
                                                        >
                                                            {directory.name}
                                                        </RadioGroup.Label>
                                                        {checked && (
                                                            <EditDirectoryModal />
                                                        )}
                                                        {checked &&
                                                            directories.length >
                                                                1 && (
                                                                <DeleteDirectoryModal />
                                                            )}
                                                    </div>
                                                </div>
                                                <div
                                                    className={`${
                                                        checked
                                                            ? "border-violet-500 border-r-4"
                                                            : "border-transparent"
                                                    } absolute -inset-px pointer-events-none`}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                        <CreateDirectory />
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
};
