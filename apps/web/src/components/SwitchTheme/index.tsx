import { Moon, Sun } from "phosphor-react";
import React from "react";
import { useThemeStore } from "~/store/useTheme";

export const SwitchTheme: React.FC = () => {
    const mode = useThemeStore((state) => state.mode);
    const toggle = useThemeStore((state) => state.toggle);

    return (
        <button className="mt-8 text-left flex items-center" onClick={toggle}>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-200 flex-1">
                {mode === "dark" ? "Light" : "Dark"} Mode
            </span>
            <div className="flex">
                <div className="mr-2 w-10 h-5 bg-slate-200 rounded-full px-0.5 dark:bg-slate-700/[.3] relative flex items-center dark:justify-end">
                    <div className="w-4 h-4 rounded-full bg-violet-600 absolute"></div>
                </div>
                {mode === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </div>
        </button>
    );
};
