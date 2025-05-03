import { AuthFormValues } from "@/types";

export function AuthForm({
  type,
  title,
  onSubmit,
  usernameRef,
  emailRef,
  passwordRef,
}: AuthFormValues) {
  if (type === "signup") {
    return (
      <form
        onSubmit={onSubmit}
        className="flex flex-col min-w-[550px] border border-white/20 p-10 gap-3"
      >
        <h2 className="text-2xl mb-2">{title}</h2>
        <div className="flex flex-col">
          <label htmlFor="username" className="my-2 mx-1 text">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border border-white/10 rounded-lg opacity-0.1 px-3 py-2"
            required
            placeholder="username"
            ref={usernameRef}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="my-2 mx-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-white/10 rounded-lg opacity-0.1 px-3 py-2"
            placeholder="email"
            required
            ref={emailRef}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="my-2 mx-1">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="border border-white/10 rounded-lg opacity-0.1 px-3 py-2"
            placeholder="password"
            required
            ref={passwordRef}
          />
        </div>

        <button
          className="self-start bg-white text-black px-5 py-2 rounded-md my-5 cursor-pointer"
          type="submit"
        >
          Sign up
        </button>
      </form>
    );
  } else {
    return (
      <form
        onSubmit={onSubmit}
        className="flex flex-col min-w-[550px] border border-white/20 p-10 gap-3"
      >
        <h2 className="text-2xl mb-2">{title}</h2>
        <div className="flex flex-col">
          <label htmlFor="username" className="my-2 mx-1 text">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border border-white/10 rounded-lg opacity-0.1 px-3 py-2"
            placeholder="username"
            required
            ref={usernameRef}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="my-2 mx-1">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="border border-white/10 rounded-lg opacity-0.1 px-3 py-2"
            placeholder="password"
            required
            ref={passwordRef}
          />
        </div>

        <button
          className="self-start bg-white text-black px-5 py-2 rounded-md my-5 cursor-pointer"
          type="submit"
        >
          Sign in
        </button>
      </form>
    );
  }
}
