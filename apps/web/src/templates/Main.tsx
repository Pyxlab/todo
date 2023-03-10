import React from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useStore } from "~/store";
import { links } from "~/utils/links";
import { Header } from "./Header";
import { Hero } from "./Hero";

export const Main: React.FC = () => {
    const route = useLocation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    
    const [, base] = route.pathname.split("/");
    const currentPath = base === "all" || !base ? "/" : `/${base}`;

    const total = useStore((state) => state.total);

    const title = links.find((link) => link.path === currentPath)?.name;

    return (
        <main className="pt-5 pb-8 sm:pb-16 px-3 md:px-8 md:w-full xl:w-8/12 min-h-screen m-auto max-xl:m-0">
            <Header />
            <section>
                {currentPath === "/results" ? (
                    <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg dark:text-slate-200">
                        Results for "{query}" {`( ${total} tasks )`}
                    </h1>
                ) : (
                    <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg dark:text-slate-200">
                        {`${title} ( ${total} tasks )`}
                    </h1>
                )}
                <Hero />
                <Outlet />
            </section>
        </main>
    );
};
