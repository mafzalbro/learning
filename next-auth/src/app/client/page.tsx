/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const ClientLogin = () => {
  const session = useSession();
  const handleSubmit = () => {
    signIn("google");
  };

  return (
    <>
      {/* Skeleton Loading... */}
      {session?.status == "loading" && (
        <div className="p-8 h-60 w-full bg-gray-800 animate-pulse flex justify-center items-center gap-20">
          <div className="text-4xl !h-[100px] !w-[100px] rounded-full bg-gray-950 animate-pulse"></div>
          <h2 className="text-4xl h-20 w-full bg-gray-950 animate-pulse"></h2>
        </div>
      )}
      {session?.status == "authenticated" && (
        <div className="p-8 flex justify-center items-center gap-8">
          <img
            src={session?.data?.user?.image || "global.png"}
            alt={session?.data?.user?.name || "image"}
          />
          <div>
            <h2 className="text-4xl">{session?.data?.user?.name}</h2>
            <p>{session?.data?.user?.email}</p>
          </div>
        </div>
      )}
      <form
        action={handleSubmit}
        className="my-10 flex justify-center items-center"
      >
        {!session?.data?.user ? (
          <button
            type="submit"
            className="bg-blue-900 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-800 py-4 px-8"
          >
            Signin with Google
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            className="bg-blue-900 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-800 py-4 px-8"
          >
            Sign out
          </button>
        )}
      </form>
      <div>
        <pre className="bg-blue-950 m-4 p-4 whitespace-pre-wrap overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default ClientLogin;
