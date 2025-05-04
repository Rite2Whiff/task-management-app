import { LucideIcon } from "lucide-react";
import { FormEvent, RefObject } from "react";

export interface AuthFormValues {
  type: "signup" | "login";
  title: string;
  usernameRef: RefObject<HTMLInputElement | null>;
  emailRef?: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
  onSubmit: (e: FormEvent) => void;
}

export interface TaskSummaryValues {
  title: string;
  info: string;
  tasksNumber: number;
  icon: LucideIcon;
  classname?: string;
}
