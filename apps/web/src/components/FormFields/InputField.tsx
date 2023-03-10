import {
    Controller,
    UseControllerProps,
    useFormContext,
} from "react-hook-form";

export type InputFieldProps = Omit<UseControllerProps, "control"> &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> & {
        label: string;
        fullWidth?: boolean;
        helperText?: string;
    };

export const InputField: React.FC<InputFieldProps> = ({
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
    ...props
}) => {
    const { control } = useFormContext();

    const inputId = id || `input-${name}-field`;

    function handleChange(callback: (...event: any[]) => void) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            callback(event);
            onChange?.(event);
        };
    }

    if (props.type === "checkbox" || props.type === "radio") {
        throw new Error(
            `InputField does not support ${props.type} inputs. Please use CheckboxField or RadioField instead.`
        );
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue || ""}
            shouldUnregister={shouldUnregister}
            render={({
                field: { onChange, ...field },
                fieldState: { error, isDirty },
            }) => (
                <div>
                    <label
                        htmlFor={inputId}
                        className={placeholder ? "" : "sr-only"}
                    >
                        {label}
                    </label>
                    <input
                        {...props}
                        {...field}
                        onChange={handleChange(onChange)}
                        id={inputId}
                        name={name}
                        className={`form-input ${
                            !!error
                                ? "input-style-error"
                                : isDirty
                                ? "input-style-dirty"
                                : "input-style"
                        } ${className} ${fullWidth ? "w-full" : ""} ${
                            placeholder ? "mt-2" : ""
                        }`}
                        placeholder={placeholder || label}
                    />
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
