import { Dialog } from "@headlessui/react";
import { X } from "phosphor-react";
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "~/components/Button";
import {
    InputField,
    TextAreaField,
    SelectField,
    CheckboxField,
} from "~/components/FormFields";
import { queryClient } from "~/providers/trpc";
import { useErrorHandler } from "~/utils/error-handle";
import { RouterInputs, RouterOutputs, trpc } from "~/utils/trpc";

type CreateTodoInput = RouterInputs["todos"]["update"];

export const EditTaskModal: React.FC = () => {
    const params = useParams();
    const { pathname, search } = useLocation();
    const navigate = useNavigate();

    const { data: task } = trpc.todos.getById.useQuery({ id: params.id! });
    const { data: directories } = trpc.directories.list.useQuery();

    const { mutate: updateTodo } = trpc.todos.update.useMutation();

    const [open, setOpen] = React.useState(false);

    function handleClose() {
        setOpen(false);
        const path = pathname.split("/")[1];

        navigate({
            pathname: `/${path === "all" ? "" : path}`,
            search,
        });
    }

    const methods = useForm<CreateTodoInput>();

    const handleSubmit = methods.handleSubmit((data) =>
        updateTodo(data, {
            onSuccess: () => {
                toast.success("Task updated successfully");

                queryClient.invalidateQueries({
                    queryKey: trpc.todos.getByUser.getQueryKey(),
                });
            },
            onError: useErrorHandler(methods.setError),
        })
    );

    useEffect(() => {
        if (!open && task && directories) {
            methods.setValue("id", task.id);
            methods.setValue("title", task.title);
            methods.setValue("description", task.description);
            methods.setValue("directoryId", task.directoryId);
            methods.setValue("completed", task.completed);
            methods.setValue("important", task.important);

            const dueDate = task.dueDate.toISOString().split("T")[0];

            methods.setValue("dueDate", dueDate);

            setOpen(true);
        }
    }, [task, directories, open]);

    return (
        <Dialog
            className="relative z-30 text-slate-600 dark:text-slate-400 xl:text-base sm:text-sm text-xs"
            open={open}
            onClose={handleClose}
        >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
            <Dialog.Panel className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 dark:bg-slate-900 max-w-lg w-full rounded-lg p-4 sm:p-5">
                <Dialog.Title className="text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-100">
                    Edit task
                    <button
                        className="absolute right-5 top-5"
                        onClick={handleClose}
                    >
                        <X size={20} />
                    </button>
                </Dialog.Title>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full mt-4 flex-col gap-1"
                    >
                        <InputField
                            name="title"
                            label="Title"
                            placeholder="e.g, study for the test"
                            fullWidth
                        />
                        <InputField
                            name="dueDate"
                            label="Date"
                            placeholder="e.g, 2021-12-31"
                            type="date"
                            fullWidth
                        />
                        <TextAreaField
                            name="description"
                            label="Description (optional)"
                            placeholder="e.g, study for the test"
                            fullWidth
                        />
                        <SelectField
                            name="directoryId"
                            label="Select a directory"
                            placeholder="e.g, study for the test"
                            fullWidth
                            options={
                                directories?.map((directory) => ({
                                    value: directory.id,
                                    label: directory.name,
                                })) ?? []
                            }
                        />
                        <CheckboxField
                            name="important"
                            label="Mark as important"
                            className="mb-4"
                        />
                        <CheckboxField
                            name="completed"
                            label="Mark as completed"
                            className="mb-4"
                        />

                        <Button type="submit" className="w-full">
                            Update task
                        </Button>
                    </form>
                </FormProvider>
            </Dialog.Panel>
        </Dialog>
    );
};
