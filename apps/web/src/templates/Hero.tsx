import { Listbox, Transition } from "@headlessui/react";
import { ListDashes, SquaresFour, CaretDown, Check } from "phosphor-react";
import React from "react";
import { useStore } from "~/store";
import { sortList } from "~/utils/sort-list";

export const Hero: React.FC = () => {
    const sortBy = useStore(state => state.sortBy)
    const handleSortChange = useStore(state => state.handleSortChange)
    
    return (
        <div className="flex gap-2 items-center">
            <ListDashes size={24} />
            <SquaresFour size={24} />
            <div className="ml-auto">
                <Listbox value={sortBy} onChange={handleSortChange}  >
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
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {sortList.map((sortItem, sortIndex) => (
                                    <Listbox.Option
                                        key={sortIndex}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-violet-100 text-violet-600' : 'text-gray-900'
                                            }`
                                        }
                                        value={sortItem}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {sortItem.title}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                                                        <Check className="h-5 w-5" aria-hidden="true" />
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
            </div>
        </div>
    );
};
