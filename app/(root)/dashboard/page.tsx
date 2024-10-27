"use client";

import DashProfile from "@/components/DashProfile";
import DashSidebar from "@/components/DashSidebar";
import React from "react";
import StoreProvider from "../../StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/lib/store";
import DashPosts from "@/components/DashPosts";

const page = ({ searchParams }: SearchParamProps) => {
  const page = searchParams.tab || "profile";
  const pageNumber = Number(searchParams.page || 1);
  return (
    <StoreProvider>
      <PersistGate persistor={persistor} loading={null}>
        <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900">
          <div className="md:w-56">
            <DashSidebar />
          </div>
          {page === "profile" && <DashProfile />}
          {page === "posts" && <DashPosts pageNumber={pageNumber} />}
        </div>
      </PersistGate>
    </StoreProvider>
  );
};

export default page;
