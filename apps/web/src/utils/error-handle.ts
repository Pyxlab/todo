import { TRPCClientError } from "@trpc/react-query";
import { UseFormSetError } from "react-hook-form";
import { toast } from "react-toastify";

export function useErrorHandler(setter: UseFormSetError<any>) {
    return function (error: Omit<TRPCClientError<any>, 'meta' | 'cause' | 'name'>) {
        try {
            const message = JSON.parse(error.message);
            message.forEach((err: { message: string; path: string[] }) => {
                setter(err.path[0], { message: err.message.replace("A string precisa", "O campo precisa") });
            })
        } catch {
            toast.error(error.message);
        }
    }
}