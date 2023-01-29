import {
    Controller,
    UseControllerProps,
    useFormContext,
} from "react-hook-form";

export type TextAreaFieldProps = Omit<UseControllerProps, "control"> &
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> & {
        label: string;
        fullWidth?: boolean;
        helperText?: string;
    };

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
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
        return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            callback(event);
            onChange?.(event);
        };
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue || ""}
            shouldUnregister={shouldUnregister}
            render={({ field: { onChange, ...field }, fieldState: { error, isDirty } }) => (
                <div>
                    <label
                        htmlFor={inputId}
                        className={placeholder ? "" : "sr-only"}
                    >
                        {label}
                    </label>
                    <textarea
                        {...props}
                        {...field}
                        onChange={handleChange(onChange)}
                        id={inputId}
                        name={name}
                        defaultValue={defaultValue || ""}
                        className={`form-textarea ${
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
