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

export interface User {
  username: string;
  email: string;
  password: string;
  id: string;
}

export interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export interface Tasks {
  id: string;
  title: string;
  description: string;
  userId: string;
  assignedToId?: string;
  status: string;
  priority: string;
  dueDate: Date;
}

export interface TaskContextType {
  tasks: Tasks[] | null;
  fetchTasks: () => Promise<void>;
  deleteTask: (taskId: string) => void;
}
