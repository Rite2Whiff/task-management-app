import { FormEvent, RefObject } from "react";

export interface AuthFormValues {
  type: "signup" | "login";
  title: string;
  usernameRef: RefObject<HTMLInputElement | null>;
  emailRef?: RefObject<HTMLInputElement | null>;
  passwordRef: RefObject<HTMLInputElement | null>;
  onSubmit: (e: FormEvent) => void;
}
