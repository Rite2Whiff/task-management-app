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
  getAllUsers: () => void;
  allUsers: User[] | null;
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

export type TaskContextType = {
  tasks: Tasks[];
  assignedTasks: Tasks[];
  fetchTasks: () => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, taskStatus: string) => void;
  getAssignedTasks: () => void;
  setAssignedTasks: (tasks: Tasks[]) => void;
};

export type ViewOption = "myTasks" | "assignedTasks" | "overdueTasks";

export interface SidebarProps {
  onSelect: (view: ViewOption) => void;
  view: ViewOption;
}

export interface Notification {
  title: string;
  assignedBy: string;
}
