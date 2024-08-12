"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import HeaderProfile from "./HeaderProfile";
import StoreProvider from "@/app/StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/lib/store";
const Navbar = () => {
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <SessionProvider>
      <StoreProvider>
        <PersistGate persistor={persistor} loading={null}>
          <nav className="bg-primary-50 border-gray-200 dark:bg-gray-800 w-full">
            <div className="max-w-screen-xl flex items-center justify-between flex-wrap mx-auto p-4">
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-gray-700 dark:text-white"
              >
                <span className="px-2 py-1  logo-gradient rounded-lg text-white">
                  Dev&apos;s
                </span>
                Blog
              </Link>
              <div className="flex max-md:order-1">
                <button
                  type="button"
                  className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
                >
                  <MagnifyingGlassIcon type="button" className="w-5 h-5 " />
                </button>

                <div className="relative hidden md:block">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <MagnifyingGlassIcon
                      type="button"
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    />
                  </div>
                  <input
                    type="text"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search..."
                  />
                </div>

                <button
                  onClick={() => setIsCollapse(!isCollapse)}
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <Bars3Icon className="w-5 h-5" />
                </button>
              </div>

              <div
                className={`w-full md:flex-center md:w-auto max-md:order-4 ${
                  isCollapse && "max-md:hidden"
                }`}
              >
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
                  <li>
                    <Link
                      href="/"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>
              <HeaderProfile />
            </div>
          </nav>
        </PersistGate>
      </StoreProvider>
    </SessionProvider>
  );
};

export default Navbar;
