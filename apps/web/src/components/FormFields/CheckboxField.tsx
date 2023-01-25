import React from "react";
import {
    UseControllerProps,
    Controller,
    useFormContext,
} from "react-hook-form";

export type CheckboxFieldProps = Omit<UseControllerProps, "control"> &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "type"> & {
        label: string;
        isChecked?: (value: boolean) => void;
    };

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
    name,
    rules,
    defaultValue,
    shouldUnregister,
    id,
    label,
    defaultChecked = false,
    onChange,
    isChecked,
    ...props
}) => {
    const { control } = useFormContext();

    const inputId = id || `input-${name}-field`;

    function handleChange(callback: (...event: any[]) => void) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            callback(event);
            onChange?.(event);
            isChecked?.(event.target.checked);
        };
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultChecked}
            shouldUnregister={shouldUnregister}
            render={({ field: { onChange, value, ...field } }) => (
                <div className="flex items-center">
                    <input
                        {...field}
                        {...props}
                        id={inputId}
                        checked={value}
                        defaultChecked={defaultChecked}
                        onChange={handleChange(onChange)}
                        name={name}
                        type="checkbox"
                        className="bg-slate-100 dark:bg-slate-900 dark:border-violet-600 checked:dark:bg-violet-600 text-violet-600 rounded outline-transparent border-2 border-violet-500 hover:border-violet-600 focus:border-violet-600 focus:outline-none transition"
                    />
                    <label
                        htmlFor={name}
                        className="ml-2 block text-sm text-gray-900 dark:text-gray-400"
                    >
                        {label}
                    </label>
                </div>
            )}
        />
    );
};
