import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeftEndOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { userSignOut } from "@/lib/actions/user.actions";
import { signOutSuccess } from "@/lib/features/user/userSlice";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Image from "next/image";

const HeaderProfile = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const theme = "light";
  const handleSignOut = async () => {
    try {
      await userSignOut();
      dispatch(signOutSuccess());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-2 ">
      <div className="p-2 border border-gray-300 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 duration-200 dark:border-gray-600  dark:text-white flex-center cursor-pointer">
        <ThemeSwitcher />
      </div>
      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {currentUser?.profilePicture ? (
              <img
                src={currentUser?.profilePicture}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full"
              />
            ) : (
              "Profile"
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute top-0 -right-10">
            <DropdownMenuLabel className="!font-normal !text-[13px]">
              {currentUser?.username}
            </DropdownMenuLabel>
            <DropdownMenuLabel>{currentUser.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={"/dashboard"}
                className="flex items-center gap-1 w-full"
              >
                <UserIcon width={20} />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div
                className="flex items-center gap-1 w-full"
                onClick={handleSignOut}
              >
                <ArrowLeftEndOnRectangleIcon width={20} />
                Sign out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/sign-in"
          className="text-16 rounded-md font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-900  py-2 px-3"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default HeaderProfile;
