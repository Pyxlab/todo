import { Route, Routes } from "react-router-dom";
import { Aside, Main, SideBar } from "~/templates";

function App() {
    return (
        <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<div className="flex-1">Home</div>} />
                    <Route path="/today" element={<div>Today</div>} />
                    <Route path="/important" element={<div>Important</div>} />
                    <Route path="/completed" element={<div>Completed</div>} />
                    <Route path="/uncompleted" element={<div>Uncompleted</div>} />
                </Route>
            </Routes>
        </div>
    )
}

function Layout() {
    return (
        <div className="flex max-xl:flex-col">
            <SideBar className="max-xl:hidden" />
            <Main />
            <Aside className="max-xl:hidden" />
        </div>
    )
}

export default App
