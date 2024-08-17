"use client";

import DashProfile from "@/components/DashProfile";
import DashSidebar from "@/components/DashSidebar";
import React from "react";
import StoreProvider from "../../StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/lib/store";

const page = () => {
  return (
    <StoreProvider>
      <PersistGate persistor={persistor} loading={null}>
        <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900">
          <div className="md:w-56">
            <DashSidebar />
          </div>
          <DashProfile />
        </div>
      </PersistGate>
    </StoreProvider>
  );
};

export default page;
