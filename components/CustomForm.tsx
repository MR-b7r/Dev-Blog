import React from "react";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");
interface CustomFormProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  errorMessage: string;
  children?: React.ReactNode;
}
const CustomForm = (props: CustomFormProps) => {
  const { control, name, label, placeholder, errorMessage } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="w-full">
          <FormLabel className="text-[14px] w-full max-w-[280px] font-medium text-gray-700 dark:text-white mb-1">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={name === "password" ? "password" : "text"}
                className="text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-500 placeholder:text-gray-500 dark:text-white dark:border-gray-200 dark:placeholder:text-white focus-visible:ring-blue-400 dark:bg-gray-700 focus:border-none"
                {...field}
              />
            </FormControl>
          </div>
          <FormMessage className="text-[12px] text-red-500 mt-1" />
        </div>
      )}
    />
  );
};

export default CustomForm;
