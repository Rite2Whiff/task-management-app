"use client";
import { AuthForm } from "@/Components/AuthForm";
import Loader from "@/Components/Loader";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  async function handleLogin(e: FormEvent) {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    e.preventDefault();
    try {
      const response = await axios.post(
        "https://task-management-app-production-0bf2.up.railway.app/api/signin",
        {
          username,
          password,
        }
      );
      const { accessToken, user } = response.data;
      login(accessToken, user);
      console.log(user.username);
      toast.success(response.data.message, {
        onClose: async () => {
          setLoading(true);
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve("promise has been resolved");
            }, 3000)
          );
          router.push("/dashboard");
        },
      });
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response: { data: { message: string } } };
        const message = err.response.data.message;
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  if (loading) {
    return <Loader loading={loading} />;
  } else {
    return (
      <div>
        <AuthForm
          onSubmit={handleLogin}
          type="login"
          title="Login Form"
          usernameRef={usernameRef}
          passwordRef={passwordRef}
        />
      </div>
    );
  }
}
