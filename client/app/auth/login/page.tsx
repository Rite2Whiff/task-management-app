"use client";
import { AuthForm } from "@/Components/AuthForm";
import Loader from "@/Components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

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
      console.log(response);
      toast.success(response.data.message, {
        onClose: () => {
          setLoading(true);
          timeoutRef.current = setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        },
      });
    } catch (error: any) {
      console.log(error);
      const message = error?.response?.data.message;
      toast.error(message);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
