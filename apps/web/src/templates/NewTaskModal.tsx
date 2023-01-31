import { AppRouter } from "@acme/api";
import { Dialog } from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { trpc } from "~/utils/trpc";
import { useErrorHandler } from "~/utils/error-handle";
import { useStore } from "~/store";
import { TaskForm } from "./TaskForm";
import { inferRouterInputs } from "@trpc/server";
import { queryClient } from "~/providers/trpc";

type CreateTodoInput = inferRouterInputs<AppRouter["todos"]>["create"]

export const NewTaskModal: React.FC = () => {
    const isOpen = useStore((state) => state.newTaskOpen);
    const toggle = useStore((state) => state.toggleNewTask);
    
    const { mutate } = trpc.todos.create.useMutation();

    const methods = useForm<CreateTodoInput>();

    const handleSubmit = methods.handleSubmit(
        (data) => {
            const transformdData = {
                ...data,
                dueDate: new Date(data.dueDate),
            };

            mutate(transformdData, {
                onSuccess: () => {
                    toast.success("Your task as sucessful created!");
                    queryClient.invalidateQueries({
                        queryKey: trpc.todos.getByUser.getQueryKey(),
                    });
                    toggle();
                },
                onError: useErrorHandler(methods.setError),
            });
        },
        (err) => console.log(err)
    );

    return (
        <Dialog
            className="relative z-30 text-slate-600 dark:text-slate-400 xl:text-base sm:text-sm text-xs"
            open={isOpen}
            onClose={toggle}
        >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
            <Dialog.Panel className="fixed inset-0">
                <FormProvider {...methods}>
                    <TaskForm type="create" handleSubmit={handleSubmit} />
                </FormProvider>
            </Dialog.Panel>
        </Dialog>
    );
};
