import React from 'react'
import { useThemeStore } from '~/store/useThemeStore'

export const SwitchTheme: React.FC = () => {
    const mode = useThemeStore((state) => state.mode)
    const toggle = useThemeStore((state) => state.toggle)

    React.useEffect(() => {
        const html = document.querySelector<HTMLHtmlElement>("html")!

        if (mode === "dark") {
            html.classList.add("dark");
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#0f172a");
        } else {
            html.classList.remove("dark")
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#e2e8f0");
        }

        return () => {
            html.classList.remove("dark")
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#e2e8f0");
        }
    }, [mode])

    return (
        <button
        className="mt-8 text-left flex items-center justify-between"
        onClick={toggle}
      >
        <span className="dark:text-slate-200">Darkmode</span>
        <div className="w-10 h-5 bg-slate-200 rounded-full px-0.5 dark:bg-slate-700/[.3] relative flex items-center dark:justify-end">
          <div className="w-4 h-4 rounded-full bg-violet-600 absolute"></div>
        </div>
      </button>
    );
};
