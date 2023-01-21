import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { TrpcProvider } from './trpc';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <CookiesProvider>
            <TrpcProvider>
                {children}
            </TrpcProvider>
        </CookiesProvider>
    );
};