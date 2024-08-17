import React from "react";
import {
  ArrowLeftEndOnRectangleIcon,
  ChatBubbleBottomCenterIcon,
  DocumentIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  updateEnd,
  updateFailure,
  updateSuccess,
} from "@/lib/features/user/userSlice";
const DashSidebar = () => {
  const dispatch = useAppDispatch();
  const {
    loading,
    error: errorMessage,
    currentUser,
  } = useAppSelector((state) => state.user);
  return (
    <aside className="md:w-56 h-screen bg-primary-50 dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-600">
      <div className="h-full px-3 py-4 overflow-y-auto ">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <UserIcon width={20} />
              <span className="ms-3">Profile</span>
              <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                {currentUser?.isAdmin ? "Admin" : "User"}
              </span>
            </a>
          </li>
          {currentUser?.isAdmin && (
            <>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <DocumentIcon width={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Posts</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <UsersIcon width={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <ChatBubbleBottomCenterIcon width={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Comments
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                </a>
              </li>
            </>
          )}

          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <ArrowLeftEndOnRectangleIcon width={20} />
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashSidebar;
