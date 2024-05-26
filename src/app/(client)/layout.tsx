"use client";
import "@/css/style.css";
import Loader from "@/components/comon/Loader";
import React, {useEffect, useState} from "react";
import AuthProvider from "@/context/AuthContext";
import 'react-toastify/dist/ReactToastify.min.css';
import {Bounce, ToastContainer} from "react-toastify";

export default function ClientLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, []);

    return (
        <html lang="en">
        <body suppressHydrationWarning={true}>
        <AuthProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Bounce}
            />
            {loading ? <Loader/> : children}
        </AuthProvider>
        </body>
        </html>
    );
}
