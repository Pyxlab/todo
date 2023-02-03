import { X } from "phosphor-react";
import React from "react";
import { Button } from "~/components/Button";
import { InputField, TextAreaField, SelectField, CheckboxField } from "~/components/FormFields";
import { trpc } from "~/utils/trpc";

type TaskFormProps = {
    type: "create" | "edit";
    handleSubmit: () => void;
    toggle: () => void;
};

export const TaskForm: React.FC<TaskFormProps> = ({ type, handleSubmit, toggle }) => {
    const { data: directories } = trpc.directories.list.useQuery();

    return (
        <div className=" flex items-center justify-center h-full w-full px-2">
            <div className="z-40 bg-slate-200 dark:bg-slate-900 max-w-lg w-full rounded-lg p-4 sm:p-5 flex flex-col justify-start">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-semibold">
                        {type === "create" ? "Add a task" : "Edit task"}
                    </h2>
                    <button
                        onClick={toggle}
                        className="text-slate-600 dark:text-slate-400"
                        aria-label="Close dialog"
                    >
                        <X size={24} />
                    </button>
                </div>
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
                            options={directories?.map((directory) => ({
                                value: directory.id,
                                label: directory.name,
                            })) ?? []}
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
            </div>
        </div>
    );
};
