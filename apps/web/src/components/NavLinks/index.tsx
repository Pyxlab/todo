import { useNavigate, useLocation } from "react-router-dom";
import { links } from "~/utils/links";

export const NavLinks: React.FC = () => {
    const navigate = useNavigate();
    const route = useLocation();
    const currentPath = route.pathname;
    
    return (
        <ul className="grid gap-2">
            {links.map((link) => (
                <li
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="relative flex items-center"
                >
                    <input
                        id={link.name}
                        name="sidebar"
                        type="radio"
                        value={link.name}
                        checked={currentPath === link.path}
                        className="appearance-none cursor-pointer h-10 w-full block transition checked:bg-violet-100 checked:border-r-4 checked:border-rose-500 dark:checked:bg-slate-700/[.2] dark:checked:border-slate-200"
                    />
                    <label
                        htmlFor={link.name}
                        className={`absolute cursor-pointer px-4 text-gray-700 hover:text-rose-600 dark:hover:text-slate-200 dark:text-slate-400 transition
                            ${currentPath === link.path ? "text-rose-600 dark:text-slate-200" : ""}
                        `}
                    >{link.name}</label>
                </li>
            ))}
        </ul>
    );
};
