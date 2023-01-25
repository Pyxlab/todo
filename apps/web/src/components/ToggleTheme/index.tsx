import { Sun, Moon } from "phosphor-react";
import React from "react";
import { useThemeStore } from "~/store";

export const ToggleTheme: React.FC = () => {
    const mode = useThemeStore((state) => state.mode);
    const toggle = useThemeStore((state) => state.toggle);

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    function isDark() {
        return mode === "dark";
    }

    return (
        <button
            className="p-2 focus:outline-none rounded-full bg-slate-300 dark:bg-slate-800"
            onClick={toggle}
            aria-label="Theme toggle"
        >
            {isDark() ? (
                <Sun size={20} weight="fill" className="text-amber-400" />
            ) : (
                <Moon size={20} weight="fill" />
            )}
        </button>
    );
};
