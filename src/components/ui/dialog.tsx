"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({
  children,
  className,
  closeLabel = "Close dialog",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  closeLabel?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-50 bg-foreground/25 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "dialog-content fixed right-0 top-0 z-50 flex h-dvh w-full max-w-sm flex-col bg-background p-7 shadow-xl",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-md hover:bg-secondary"
          aria-label={closeLabel}
        >
          <X size={22} aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
