"use client";
import Header from "@/components/Header";
import StoreProvider from "../StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/lib/store";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <PersistGate persistor={persistor} loading={null}>
        <div className="flex h-screen flex-col bg-primary-50 dark:bg-gray-900">
          <SessionProvider>
            <Header />
          </SessionProvider>
          <main className="flex-1">{children}</main>
        </div>
      </PersistGate>
    </StoreProvider>
  );
}
