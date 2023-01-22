import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { MagnifyingGlass } from 'phosphor-react';

export const SearchInput: React.FC = () => {
    const [query, setQuery] = useState('')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
    }
    return (
        <div className='flex-1 col-span-3 row-start-2 md:pr-10'>
            <Combobox as="form" className="relative md:max-w-xs w-full" autoComplete='off'>
                <Combobox.Label htmlFor='search' className="sr-only"></Combobox.Label>
                <Combobox.Input
                    id="search"
                    type="search"
                    placeholder="Search task"
                    value={query}
                    onChange={handleChange}
                    className="w-full bg-slate-100 text-slate-600 dark:text-slate-200 rounded-lg py-3 pl-3 pr-10 outline-transparent border-2 border-transparent hover:border-violet-600 focus:border-violet-600 focus:outline-none transition dark:bg-slate-800"
                />
                <MagnifyingGlass className="absolute w-4 text-base sm:w-5 sm:text-xl right-4 top-3.5 text-slate-400" />
            </Combobox>
        </div>
    );
};
