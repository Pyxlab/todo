import React from "react";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "~/context/Auth";
import { TrpcProvider } from "./trpc";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <CookiesProvider>
            <TrpcProvider>
                <AuthContextProvider>
                    <BrowserRouter basename="/">{children}</BrowserRouter>
                </AuthContextProvider>
            </TrpcProvider>
        </CookiesProvider>
    );
};
