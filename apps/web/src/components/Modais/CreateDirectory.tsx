import { Dialog } from "@headlessui/react";
import { Plus, X } from "phosphor-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputField } from "~/components/FormFields";
import { queryClient } from "~/providers/trpc";
import { useErrorHandler } from "~/utils/error-handle";
import { trpc } from "~/utils/trpc";

export const CreateDirectory: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const { mutate } = trpc.directories.create.useMutation();

    const methods = useForm<{ name: string }>();

    const toggle = () => {
        setOpen((prev) => {
            if (prev) {
                methods.reset();
            }

            return !prev;
        });
    };
    
    const handleSubmit = methods.handleSubmit((data) => {
        mutate(data, {
            onSuccess: () => {
                const queryKey = trpc.directories.list.getQueryKey();

                toast.success("Your directory as sucessful created!");
                queryClient.invalidateQueries(queryKey);

                toggle();
            },
            onError: useErrorHandler(methods.setError),
        });
    });

    return (
        <React.Fragment>
            <div className="w-full px-5 mt-4">
                <button
                    onClick={toggle}
                    className="flex items-center justify-center w-full px-5 py-2 border-slate-300 dark:border-slate-700 border-2 rounded-md border-dashed hover:text-violet-500"
                >
                    <div className="mr-2">
                        <Plus weight="bold" />
                    </div>
                    New directory
                </button>
            </div>
            <Dialog open={open} onClose={toggle} className="relative z-30">
                <Dialog.Overlay className="fixed inset-0 bg-black/[.2]" />
                <Dialog.Panel className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white dark:bg-slate-800 rounded-md shadow-lg p-5 w-full"
                        >
                            <Dialog.Title className="text-xl font-medium text-gray-900 dark:text-slate-200">
                                Create a new directory
                                <button
                                    onClick={toggle}
                                    className="absolute right-5 top-5"
                                >
                                    <X weight="bold" />
                                </button>
                            </Dialog.Title>
                            <Dialog.Description className="mt-2 text-lg text-gray-500 dark:text-slate-400 line-clamp-6">
                                This directory will be created in the root of
                                your project.
                            </Dialog.Description>
                            <div className="flex w-full mt-4 flex-col text-slate-600 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
                                <InputField
                                    label="Name"
                                    name="name"
                                    placeholder="My directory"
                                    className="dark:bg-slate-900 border-slate-200 dark:border-violet-500"
                                    fullWidth
                                />
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <button
                                    onClick={toggle}
                                    className="mr-2 px-4 py-2 text-sm font-medium text-gray-500 bg-slate-200 dark:bg-slate-700 dark:text-slate-400 rounded-md hover:bg-gray-100 transition dark:hover:bg-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-md hover:bg-violet-600"
                                    type="submit"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </Dialog.Panel>
            </Dialog>
        </React.Fragment>
    );
};
