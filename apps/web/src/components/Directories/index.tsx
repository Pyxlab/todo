import { Disclosure } from "@headlessui/react";
import { CaretDown, CaretRight } from "phosphor-react";

export const Directories: React.FC = () => {
    return (
        <Disclosure>
            {({ open }) => (
                <div className='py-4'>
                    <Disclosure.Button
                        className={`flex items-center w-full mx-4 mb-2 ${open ? "dark:text-slate-200" : ""}`}
                    >
                        {open ? <CaretDown className='mr-1 transition-transform' /> : <CaretRight className='mr-1' />}
                        Directories
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500">
                        <ul className="max-h-36 overflow-auto">
                            <li className='flex items-center pr-4 pl-9 py-2'>Main</li>
                        </ul>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
};
