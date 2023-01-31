import { Listbox, Transition } from "@headlessui/react";
import { CaretDown, Check } from "phosphor-react";
import React from "react";
import { useStore } from "~/store";
import { sortList } from "~/utils/sort-list";

export const SortBy: React.FC = () => {
    const sortBy = useStore((state) => state.sortBy);
    const handleSortChange = useStore((state) => state.handleSortChange);

    return (
        <Listbox value={sortBy} onChange={handleSortChange}>
            <div className="relative ">
                <Listbox.Button className="input-style text-left w-48">
                    <span className="block truncate">{sortBy.title}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <CaretDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {sortList.map((sortItem, sortIndex) => (
                            <Listbox.Option
                                key={sortIndex}
                                className={({ selected }) =>
                                    `
                                            py-2 pl-10 pr-4 cursor-pointer select-none relative
                                            ${
                                                selected
                                                    ? "font-semibold text-violet-600 bg-violet-100 dark:bg-slate-800 dark:text-violet-500"
                                                    : ""
                                            }
                                        }`
                                }
                                value={sortItem}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {sortItem.title}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                                                <Check
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};
