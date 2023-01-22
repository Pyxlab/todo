import { Popover } from "@headlessui/react";
import { Equals, Bell } from "phosphor-react";
import { Button } from "~/components/Button";
import { SearchInput } from "~/components/SearchInput";

export const Header: React.FC = () => {
    const date: Date = new Date();
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDate();

    const monthName: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const todayDate = `${year}, ${monthName[month].slice(0, 3)} ${day
        .toString()
        .padStart(2, "0")}`;

    return (
        <header className="items-center grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-0 md:flex">
            <button className="mr-6 block xl:hidden">
                <Equals size={24} />
            </button>
            <SearchInput />
            <div className="text-center">
                <span className="text-slate-600 dark:text-slate-200 uppercase font-bold text-sm block xl:hidden">
                    TO-DO LIST
                </span>
                <p>{todayDate}</p>
            </div>
            <div className="flex flex-1">
                <Popover className="sm:mr-4 md:mr-6 ml-auto grid place-items-center relative">
                    <Popover.Button className="relative">
                        <Bell className="text-xl md:text-2xl" weight="fill" />
                    </Popover.Button>
                    <Popover.Panel className="absolute bg-slate-100 dark:bg-slate-800 top-full mt-1 rounded-md right-0 p-3 w-52 border border-slate-300 dark:border-slate-700">
                        <p>Nothing to show here.</p>
                    </Popover.Panel>
                </Popover>
                <Button className="sm:static fixed bottom-3 right-3 z-10 sm:z-0 min-w-max shadow-lg shadow-slate-400  dark:shadow-slate-900 sm:shadow-transparent">Add new task</Button>
                <button className="block xl:hidden">
                    <img
                        src="data:image/jpeg;base64,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"
                        alt="This is a picture of a cat"
                        className="w-10 h-10 rounded-full ml-4"
                    />
                </button>
            </div>
        </header>
    );
};
