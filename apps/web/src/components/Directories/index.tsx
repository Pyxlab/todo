import { Disclosure } from "@headlessui/react";
import { CaretDown, CaretRight } from "phosphor-react";
import { trpc } from "~/utils/trpc";

export const Directories: React.FC = () => {
    const { data: directories } = trpc.directories.list.useQuery();

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
                    <Disclosure.Panel className="text-gray-500">
                        {directories?.map((directory) => (
                            <ul key={directory.id} className="max-h-36 overflow-auto">
                                <li className="flex items-center pr-4 pl-9 py-2">
                                    {directory.name}
                                </li>
                            </ul>
                        ))}
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
};
