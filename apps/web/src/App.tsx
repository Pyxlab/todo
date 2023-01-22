import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Aside, Main, SideBar } from "~/templates";
import { useAuth } from "./context/useAuth";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

function App() {
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
        </div>
    )
}

function PublicLayout() {
    const location = useLocation();
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/" state={{ location }} replace />
    }

    return (
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            <SideBar className="max-xl:hidden" />
            <Main />
            <Aside className="max-xl:hidden" />
        </div>
    )
}

export default App
