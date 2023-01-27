import React, { createContext } from 'react';
import { trpc } from '~/utils/trpc';
import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@acme/api';
import { useCookies } from 'react-cookie';
import { useErrorHandler } from '~/utils/error-handle';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRemember } from '~/store';

type User = inferRouterOutputs<AppRouter['auth']>['session']['user'];

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const rememberEmail = useRemember(state => state.remember);
    const [cookies, setCookies, remove] = useCookies(['token']);
    const isAuthenticated = !!cookies.token;

    const { mutate, isLoading } = trpc.auth.session.useMutation();
    const { data = null } = trpc.auth.user.useQuery();

    const handleLogin = (setter: UseFormSetError<any>): SubmitHandler<AuthForm> => ({ remember, ...data }) => {
        mutate(data, {
            onSuccess: ({ token, expires_at }) => {
                toast.success('Login successful');
                
                if (remember) {
                    rememberEmail(data.email);
                }

                setCookies('token', token, { path: '/', expires: new Date(expires_at!) });
            },
            onError: useErrorHandler(setter)
        });
    };

    const handleLogout = async () => {
        remove('token', { path: '/' });
    };

    return (
        <AuthContext.Provider
            value={{ user: data, isAuthenticated, isLoading, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export interface AuthForm {
    email: string;
    password: string;
    remember: boolean;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    handleLogin: (setter: UseFormSetError<any>) => SubmitHandler<AuthForm>;
    handleLogout: () => void;
}

type SubmitHandler<T> = (data: T) => void;