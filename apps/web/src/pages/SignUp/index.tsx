import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Button } from "~/components/Button";
import { InputField } from "~/components/FormFields";
import { trpc } from "~/utils/trpc";
import { AppRouter } from "@acme/api";
import { inferRouterInputs } from "@trpc/server";
import { useErrorHandler } from "~/utils/error-handle";

type CreateUserInput = inferRouterInputs<AppRouter>["users"]["create"];

export const SignUp: React.FC = () => {
    const methods = useForm<CreateUserInput>();

    const { mutate } = trpc.users.create.useMutation();

    const handleSubmit = methods.handleSubmit((data) => {
        mutate(data, {
            onSuccess: (data) => {
                console.log("data", data);
            },
            onError: useErrorHandler(methods.setError)
        });
    });

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
                        Sign up for free
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <NavLink
                            to="/sign-in"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            sign in to your account
                        </NavLink>
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >
                    <div className="-space-y-px flex flex-col gap-2">
                        <InputField name="name" label="Full name" fullWidth />
                        <InputField
                            name="email"
                            label="Email address"
                            fullWidth
                        />
                        <InputField
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Sign up
                    </Button>
                </form>
            </div>
        </FormProvider>
    );
};
