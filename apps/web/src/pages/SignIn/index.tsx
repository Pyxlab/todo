import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Button } from "~/components/Button";
import { CheckboxField, InputField } from "~/components/FormFields";
import { AuthForm } from "~/context/Auth";
import { useAuth } from "~/hooks/useAuth";
import { useRemember } from "~/store";

export const SignIn: React.FC = () => {
    const forget = useRemember((state) => state.forget);
    const email = useRemember((state) => state.email);
    
    const methods = useForm<AuthForm>({ defaultValues: { remember: email.length > 0, email } });

    const { handleLogin } = useAuth();

    const handleSubmit = methods.handleSubmit(handleLogin(methods.setError));

    function handleChangeCheckbox(checked: boolean) {
        if (checked && email.length > 0) {
            forget();
        }
    }

    return (
        <FormProvider {...methods}>
            <div className="w-full max-w-sm space-y-8">
                <div>
                    <hgroup className="flex flex-col items-center justify-center mt-[-2rem] ">
                        <img
                            className="h-20"
                            src="https://avatars.githubusercontent.com/u/60629982?s=400&u=87b71f1227797d533f85fd772c4de3aa42a35b48&v=4"
                            alt="Your Company"
                        />
                        <h1 className="text-2xl mt-2">TO-DO LIST</h1>
                    </hgroup>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-400">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <NavLink
                            to="/sign-up"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            sign up for free
                        </NavLink>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6" >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px flex flex-col gap-2">
                        <InputField name="email" label="Email address" fullWidth />
                        <InputField name="password" label="Password" type="password" fullWidth />
                    </div>

                    <div className="flex items-center justify-between">
                        <CheckboxField name="remember" label="Remember me" isChecked={handleChangeCheckbox} />

                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            </div>
        </FormProvider>
    );
};
