"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Welcome to TaskFlow
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-xl">
        Streamline your workflow, stay organized, and manage your tasks with
        ease.
      </p>
      <div className="flex gap-6">
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-white cursor-pointer text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/auth/signup")}
          className="bg-transparent border cursor-pointer border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
