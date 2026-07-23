import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-input bg-white px-3 py-2 text-base text-gray-900 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-500 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-red-200 md:text-sm dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-900/50 dark:disabled:bg-gray-700 dark:aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
