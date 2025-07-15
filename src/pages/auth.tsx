import Input from "@/components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const router = useRouter();
  //   const start = performance.now();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState<"register" | "login">("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles",
      });

      if (res?.ok) {
        router.push("/profiles");
      } else {
        setVariant("register");
      }
    } catch (error) {
      console.error(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", { email, name: username, password });
      login();
    } catch (error) {
      console.error(error);
    }
  }, [email, username, password, login]);

  //   console.log(`Render time: ${performance.now() - start}ms`);
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-70">
        <nav className="px-12 py-5">
          <Image
            alt="logo"
            src={"/images/logo.svg"}
            width={100}
            height={102}
            className="lg:h-10 h-6 w-auto cursor-pointer"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full text-center">
            <h2 className="text-white text-4xl mb-8 font-semibold text-start">
              {variant === "login" ? "Sign in" : "Create an account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  id="name"
                  value={username}
                />
              )}
              <Input
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 py-3 rounded-md text-white w-full mt-10 hover:bg-red-700 transition"
              onClick={variant === "login" ? login : register}
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <button
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="size-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="size-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </button>
            </div>
            <p className="text-neutral-500 mt-12 cursor-pointer">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
