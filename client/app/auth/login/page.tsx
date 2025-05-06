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
        "http://localhost:3000/api/user/signin",
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
    } catch (error: any) {
      console.log(error);
      const message = error?.response?.data.message;
      toast.error(message);
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
