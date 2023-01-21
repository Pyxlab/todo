import React, { createContext } from 'react';
import { trpc } from '~/utils/trpc';
import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@acme/api';
import { useCookies } from 'react-cookie';

type User = inferRouterOutputs<AppRouter['auth']>['session']['user'];

export const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cookies, setCookies, remove] = useCookies(['token']);
    const isAuthenticated = !!cookies.token;

    const { mutate, isLoading } = trpc.auth.session.useMutation();
    const { data = null } = trpc.auth.user.useQuery('');

    const handleLogin: SubmitHandler<AuthForm> = (data) => {
        mutate(data, {
            onSuccess: ({ token, expires_at }) => {
                setCookies('token', token, { path: '/', expires: new Date(expires_at!) });
            },
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
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    handleLogin: SubmitHandler<AuthForm>;
    handleLogout: () => void;
}

type SubmitHandler<T> = (data: T) => void;