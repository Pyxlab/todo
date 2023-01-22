
import React from 'react'
import { Button } from '~/components/Button'
import { Directories } from '~/components/Directories';
import { NavLinks } from '~/components/NavLinks';

export const SideBar: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <nav className={`bg-slate-100 h-screen w-60 xl:w-2/12 dark:bg-slate-800 z-20 ${className}`}>
            <header className="flex flex-col">
                <h1 className="font-bold uppercase text-center mt-8 text-lg tracking-wide">
                    To-do list
                </h1>
                <Button className="my-8 mx-4">Add new task</Button>
            </header>
            <NavLinks />
            <Directories />
        </nav>  
    )
}

