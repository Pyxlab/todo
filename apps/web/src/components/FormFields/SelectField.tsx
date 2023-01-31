import { Listbox, Transition } from "@headlessui/react";
import React from "react";
import {
    Controller,
    UseControllerProps,
    useFormContext,
} from "react-hook-form";

export type SelectFieldProps = Omit<UseControllerProps, "control"> &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "name" | "children"> & {
        label: string;
        fullWidth?: boolean;
        helperText?: string;
        options: { value: string; label: string, }[];
    };

export const SelectField: React.FC<SelectFieldProps> = ({
    name,
    rules,
    defaultValue,
    shouldUnregister,
    label,
    id,
    className,
    onChange,
    fullWidth,
    helperText,
    placeholder,
    options,
    ...props
}) => {
    const { control } = useFormContext();

    const inputId = id || `input-${name}-field`;

    function handleChange(callback: (...event: any[]) => void) {
        return (event: React.ChangeEvent<HTMLButtonElement>) => {
            callback(event);
            onChange?.(event);
        };
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={options.length > 0 ? defaultValue : ""}
            shouldUnregister={shouldUnregister}
            render={({
                field: { value, onChange, ...field },
                fieldState: { error, isDirty },
            }) => (
                <div>
                    <label
                        htmlFor={inputId}
                        className={placeholder ? "" : "sr-only"}
                    >
                        {label}
                    </label>
                    <Listbox value={value} onChange={onChange}>
                        <div className="relative ">
                            <Listbox.Button
                                {...props}
                                {...field}
                                id={inputId}
                                name={name}
                                defaultValue={options.length > 0 ? defaultValue : ""}
                                onChange={handleChange(onChange)}
                                className={`
                                    text-left
                                ${
                                    !!error
                                        ? "input-style-error"
                                        : isDirty
                                        ? "input-style-dirty"
                                        : "input-style"
                                } ${className} ${fullWidth ? "w-full" : ""} ${
                                    placeholder ? "mt-2" : ""
                                }`}
                                placeholder={placeholder}
                            >
                                {value ? options.find((option) => option.value === value)?.label || "No options" : "Select an option"}
                            </Listbox.Button>
                            <Transition
                                as={React.Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 w-full mt-1 overflow-auto text-base bg-white dark:bg-slate-900 rounded-md shadow-lg max-h-60 focus:outline-none sm:text-sm">
                                    {options.length === 0 && (
                                        <Listbox.Option 
                                            className="py-4 pl-3 cursor-pointer select-none relative"
                                            value=""
                                            disabled
                                        >
                                            No options
                                        </Listbox.Option>
                                    )}
                                    {options?.map((option, key) => (
                                        <Listbox.Option
                                            key={key}
                                            className={({
                                                disabled,
                                                selected,
                                            }) =>
                                                `
                                                py-4 pl-3 pr-9 cursor-pointer select-none relative
                                                ${
                                                    disabled
                                                        ? "opacity-50 dark:opacity-30 cursor-not-allowed"
                                                        : ""
                                                }
                                                ${
                                                    selected
                                                        ? "font-semibold text-white bg-violet-600"
                                                        : ""
                                                }
                                            }`
                                            }
                                            value={option.value}
                                            // disabled={option.props.disabled}
                                        >
                                            {option.label}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                    {!!error ? (
                        <p className="text-red-500 text-xs mt-1">
                            {error.message}
                        </p>
                    ) : (
                        <p className="text-gray-500 text-xs mt-1">
                            {helperText} &nbsp;
                        </p>
                    )}
                </div>
            )}
        />
    );
};

/*
<select
                        {...props}
                        {...field}
                        onChange={handleChange(onChange)}
                        id={inputId}
                        name={name}
                        className={`form-select ${
                            !!error
                                ? "input-style-error"
                                : isDirty
                                ? "input-style-dirty"
                                : "input-style"
                        } ${className} ${fullWidth ? "w-full" : ""} ${
                            placeholder ? "mt-2" : ""
                        }`}
                        placeholder={placeholder}
                    >
                        {options.map((option: any) => (
                            <option
                                className="appearance-none"
                                {...option.props}
                            >
                                <div className="flex items-center py-8">
                                    {option.props.children}
                                </div>
                            </option>
                        ))}
                    </select>
                    */
