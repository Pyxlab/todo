import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { TrpcProvider } from './trpc';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <CookiesProvider>
            <TrpcProvider>
                <BrowserRouter basename="/">
                    {children}
                </BrowserRouter>
            </TrpcProvider>
        </CookiesProvider>
    );
};