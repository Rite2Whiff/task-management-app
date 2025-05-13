"use client";
import { AuthForm } from "@/Components/AuthForm";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Loader";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function handleSignup(e: FormEvent) {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    e.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-3-111-39-63.ap-south-1.compute.amazonaws.com:3000/api/user/signup",
        {
          username,
          email,
          password,
        }
      );
      console.log(response);
      toast.success(response.data.message, {
        onClose: async () => {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          router.push("/auth/login");
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
          onSubmit={handleSignup}
          type="signup"
          title="Signup Form"
          usernameRef={usernameRef}
          emailRef={emailRef}
          passwordRef={passwordRef}
        />
      </div>
    );
  }
}
