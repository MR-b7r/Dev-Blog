"use client";

import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { authFormSchema, handleError, updateProfile } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomForm from "./CustomForm";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  deleteUserEnd,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateEnd,
  updateFailure,
  updateSuccess,
} from "@/lib/features/user/userSlice";
import {
  deleteUser,
  updateUser,
  userSignOut,
} from "@/lib/actions/user.actions";
import Image from "next/image";
import closeButton from "@/public/close.svg";

const DashProfile = () => {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const dispatch = useAppDispatch();
  const {
    loading,
    error: errorMessage,
    currentUser,
  } = useAppSelector((state) => state.user);
  const router = useRouter();

  const formSchema = updateProfile();
  // 1. Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Update Account
      if (data) {
        const updateData = {
          _id: currentUser?._id!,
          username: data.username || currentUser?.username,
          email: data.email || currentUser?.username,
          password: data.password || currentUser?.password,
          profilePicture: data?.profilePicture || currentUser?.profilePicture,
          __v: currentUser?.__v!,
        };
        const updatedUser = await updateUser(updateData);

        dispatch(updateSuccess(updatedUser));
      }
    } catch (error) {
      dispatch(updateFailure(error));
    } finally {
      dispatch(updateEnd());
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      console.log(imageFileUrl);
    }
  };
  // useEffect(() => {
  //   if (imageFile) {
  //     uploadImage();
  //   }
  // }, [imageFile]);

  const handleSignOut = async () => {
    try {
      await userSignOut();
      dispatch(signOutSuccess());
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      await deleteUser(currentUser);
      dispatch(deleteUserSuccess());
      router.push("/");
    } catch (error) {
      dispatch(deleteUserFailure(error));
    } finally {
      dispatch(deleteUserEnd());
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!currentUser || currentUser == null) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img
              src={currentUser?.profilePicture}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-4 border-[lightgray]
              `}
            />

            <CustomForm
              control={form.control}
              name="profilePicture"
              label="profile picture"
              handleImageChange={handleImageChange}
            />
          </div>

          {/* IMAGE ERROR */}
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>

          <CustomForm control={form.control} name="username" label="username" />
          <CustomForm control={form.control} name="email" label="email" />
          <CustomForm control={form.control} name="password" label="password" />
          <Button
            disabled={loading}
            type="submit"
            className="text-16 rounded-lg  logo-gradient font-semibold text-white"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
              </>
            ) : (
              "Update"
            )}
          </Button>
          {/* {currentUser.isAdmin && (
            <Link to={"/create-post"}>
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                className="w-full"
              >
                Create a post
              </Button>
            </Link>
          )} */}
        </form>
      </Form>
      <div className="text-red-500 flex justify-between mt-5">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-100 dark:bg-gray-800 border-gray-900 space-y-5 outline-none ">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center justify-between text-base mb-5 text-gray-700 dark:text-gray-200">
                Are you sure you want to delete your account?
                <Image
                  src={closeButton}
                  alt="close"
                  width={20}
                  height={20}
                  onClick={() => closeModal()}
                  className="cursor-pointer bg-gray-800 rounded-full"
                />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center gap-4">
              <AlertDialogCancel>No, Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                className="bg-red-600 hover:bg-red-700 duration-200 dark:text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      {/* {updcateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )} */}
      {/* {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )} */}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DashProfile;
