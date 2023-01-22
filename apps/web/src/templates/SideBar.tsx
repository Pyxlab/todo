import { Disclosure, Popover } from '@headlessui/react';
import { CaretRight, CaretDown } from 'phosphor-react';
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '~/components/Button'


const links = [
    {
        name: "Today's tasks",
        path: "/today",
    },
    {
        name: "All tasks",
        path: "/",
    },
    {
        name: "Important tasks",
        path: "/important",
    },
    {
        name: "Completed tasks",
        path: "/completed",
    },
    {
        name: "Uncompleted tasks",
        path: "/uncompleted",
    },
];

export const SideBar: React.FC<{ className?: string }> = ({ className }) => {
    const route = useLocation();
    const currentPath = route.pathname;

    console.log(currentPath);

    return (
        <nav className={`bg-slate-100 h-screen w-60 xl:w-2/12 dark:bg-slate-800 z-20 ${className}`}>
            <header className="flex flex-col">
                <h1 className="font-bold uppercase text-center mt-8 text-lg tracking-wide">
                    To-do list
                </h1>
                <Button className="my-8 mx-4">Add new task</Button>
            </header>
            <ul className="grid gap-2">
                {links.map((link) => (
                    <li key={link.path}>
                        <NavLink
                            to={link.path}
                            className={`
                                px-4 py-2 w-full block transition hover:text-rose-600 dark:hover:text-slate-200
                                ${currentPath === link.path ? 'text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200' : ''}
                            `}
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
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
        </nav>
    )
}

//text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200