import { Pencil, UserCircle } from "phosphor-react";
import { ProgressTasks } from "~/components/ProgressTasks";
import { Button } from "~/components/Button";
import { SwitchTheme } from "~/components/SwitchTheme";
import { useAuth } from "~/hooks/useAuth";
import { firstLastName } from "~/utils/first-last-name";
import { trpc } from "~/utils/trpc";

export const Aside: React.FC<{ className?: string }> = ({ className }) => {
    const { handleLogout } = useAuth();
    const { data } = trpc.auth.user.useQuery();
    const { mutateAsync } = trpc.users.updateAvatar.useMutation();

    const name = data?.name ? firstLastName(data.name) : "Guest";

    const handleUpdateAvatar = async () => {
        await mutateAsync({ avatar: "https://i.pravatar.cc/150?img=56" });
    };

    return (
        <aside
            className={`bg-slate-100 h-screen w-60 xl:w-2/12 dark:bg-slate-800 z-20 ${className}`}
        >
            <section className="p-5 flex flex-col h-full">
                <span className="flex items-center">
                    {data?.avatar ? (
                        <img
                            className="w-10 rounded-full ml-4"
                            src={data.avatar}
                        />
                    ): (
                        <UserCircle size={40} weight="fill" />
                    )}
                    <span className="font-medium mx-3 line-clamp-1">
                        Hi, {name}!
                    </span>
                    <Button className="ml-auto px-[14px]">
                        <Pencil className="max-xl:font-medium font-semibold" />
                    </Button>
                </span>
                <SwitchTheme />
                <div className="flex-1">
                    <ProgressTasks />
                </div>
                <Button
                    onClick={handleLogout}
                    className="w-full bg-rose-100 text-rose-600 transition hover:bg-rose-200 dark:bg-slate-700/[.3] dark:text-slate-200"
                >
                    Sign Out
                </Button>
            </section>
        </aside>
    );
};
