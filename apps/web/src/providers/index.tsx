import React from 'react';
import { CookiesProvider } from 'react-cookie';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <CookiesProvider>
            {children}
        </CookiesProvider>
    );
};