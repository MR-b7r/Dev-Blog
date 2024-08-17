// "use client";
import StoreProvider from "../StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/lib/store";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <StoreProvider>
    //   <PersistGate persistor={persistor} loading={null}>
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
    //   </PersistGate>
    // </StoreProvider>
  );
}
