"use client";
import "@/css/style.css";
import Loader from "@/components/comon/Loader";
import { useEffect, useState } from "react";

export default function EmptyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(()=>setLoading(false), 1000)
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {loading ? <Loader/> : children}
      </body>
    </html>
  );
}
