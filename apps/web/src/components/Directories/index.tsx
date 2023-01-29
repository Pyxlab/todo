import { Disclosure } from "@headlessui/react";
import { CaretDown, CaretRight } from "phosphor-react";

export const Directories: React.FC = () => {
    return (
        <Disclosure>
            {({ open }) => (
                <div className="py-4">
                    <Disclosure.Button className="flex items-center w-full pl-3 dark:text-slate-200">
                        <div className={`mr-1 transition-transform ${open ? "transform rotate-90" : ""}`}>
                            <CaretRight weight="bold" />
                        </div>
                        Directories
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500">
                        <ul className="max-h-36 overflow-auto">
                            <li className="flex items-center pr-4 pl-9 py-2">
                                Main
                            </li>
                        </ul>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
};
