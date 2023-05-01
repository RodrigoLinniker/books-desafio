import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "../assets/thesis-animate.svg";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { redirect } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Home</title>
      </Head>
      <div className="w-full">
        <div className="flex items-center flex-col p-3 m-auto max-w-md ">
          <h1 className="text-5xl font-bold tracking-tight">
            Books
            <span className="ml-1 text-blue-500 ">.</span>
          </h1>
          <Image src={Logo} alt="Logo" className="font-bold " />
          <div></div>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <h1 className="font-bold text-center text-black text-2xl mb-5">
                Faça o login para votar
              </h1>
              <div className="flex justify-between gap-1 mt-2">
                <button
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: redirect ? String(redirect) : undefined,
                    })
                  }
                  className="flex gap-3 m-auto justify-center items-center transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50  w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center"
                >
                  <BsGoogle size={21} />
                  Google
                </button>
                <button
                  onClick={() =>
                    signIn("github", {
                      callbackUrl: redirect ? String(redirect) : undefined,
                    })
                  }
                  className="flex gap-3 m-auto justify-center items-center transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50  w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center"
                >
                  <BsGithub size={21} />
                  Github
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
