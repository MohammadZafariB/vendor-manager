import React from "react";
import Footer from "./Footer.tsx";
import Header from "./header.tsx";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  hideHeader?: boolean;
}

export default function Layout({ children, hideFooter,hideHeader }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {!hideHeader && <Header />}

      <main className="flex-1">{children}</main>

      {!hideFooter && <Footer />}
    </div>
  );
}
