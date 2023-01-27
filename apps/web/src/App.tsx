import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Aside, Main, SideNav } from "~/templates";
import { ToggleTheme } from "./components/ToggleTheme";
import { useAuth } from "./hooks/useAuth";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { useThemeStore } from "./store";

function App() {
    const mode = useThemeStore(state => state.mode)

    React.useEffect(() => {
        const html = document.querySelector<HTMLHtmlElement>("html")!;

        if (mode === "dark") {
            html.classList.add("dark");
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#0f172a");
        } else {
            html.classList.remove("dark");
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#e2e8f0");
        }

        return () => {
            html.classList.remove("dark");
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", "#e2e8f0");
        };
    }, [mode]);
    
    return (
        <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
            <Routes>
                <Route element={<PrivateLayout />}>
                    <Route path="/" element={<div className="flex-1">Home</div>} />
                    <Route path="/today" element={<div>Today</div>} />
                    <Route path="/important" element={<div>Important</div>} />
                    <Route path="/completed" element={<div>Completed</div>} />
                    <Route path="/uncompleted" element={<div>Uncompleted</div>} />
                </Route>
                <Route element={<PublicLayout />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>
            </Routes>
            <ToastContainer
                toastClassName="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
                bodyClassName="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800"
                progressClassName="bg-slate-600 dark:bg-slate-400"
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={mode}
            />
        </div>
    )
}

function PublicLayout() {
    const location = useLocation();
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/" state={{ location }} replace />
    }

    // add toggle theme button top right

    return (
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute right-4 top-4">
                <ToggleTheme />
            </div>
            <Outlet />
        </div>
    )
}

function PrivateLayout() {
    const location = useLocation();
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" state={{ location }} replace />
    }

    return (
        <div className="flex max-xl:flex-col">
            <SideNav className="max-xl:hidden" />
            <Main />
            <Aside className="max-xl:hidden" />
        </div>
    )
}

export default App
