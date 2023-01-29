import { Dialog } from "@headlessui/react";
import { X } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "~/components/Button";
import { CheckboxField, InputField, SelectField, TextAreaField } from "~/components/FormFields";
import { useStore } from "~/store";

export const NewTaskModal: React.FC = () => {
    const isOpen = useStore((state) => state.newTaskOpen);
    const toggle = useStore((state) => state.toggleNewTask);

    const methods = useForm();

    const handleSubmit = methods.handleSubmit((data) => {
        console.log(data);
    });

    return (
        <Dialog
            className="relative z-30 text-slate-600 dark:text-slate-400 xl:text-base sm:text-sm text-xs"
            open={isOpen}
            onClose={toggle}
        >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-20"/>
            <Dialog.Panel className="fixed inset-0">
                <div className=" flex items-center justify-center h-full w-full px-2">
                    <div className="z-40 bg-slate-200 dark:bg-slate-900 max-w-lg w-full rounded-lg p-4 sm:p-5 flex flex-col justify-start">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl md:text-2xl font-semibold">
                                Add a task
                            </h2>
                            <button
                                onClick={toggle}
                                className="text-slate-600 dark:text-slate-400"
                                aria-label="Close dialog"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit} className="flex w-full mt-4 flex-col gap-1">
                                <InputField
                                    name="title"
                                    label="Title"
                                    placeholder="e.g, study for the test"
                                    fullWidth
                                />
                                <InputField
                                    name="date"
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
                                    name="directory"
                                    label="Select a directory"
                                    placeholder="e.g, study for the test"
                                    fullWidth
                                    defaultValue={"home"}
                                    options={[]}
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
                                    Add task
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
};
