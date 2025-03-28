/* eslint-disable @next/next/no-img-element */
import { signIn, auth } from "@/auth";
import Link from "next/link";

export default async function SignIn() {
  const session = await auth();
  return (
    <>
      {session?.user && (
        <div className="p-8 flex justify-center items-center gap-8">
          <img
            src={session?.user?.image || "global.png"}
            alt={session?.user?.name || "image"}
          />
          <div>
            <h2 className="text-4xl">{session?.user?.name}</h2>
            <p>{session?.user?.email}</p>
          </div>
        </div>
      )}
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
        className="my-10 flex justify-center items-center"
      >
        {!session?.user ? (
          <button
            type="submit"
            className="bg-blue-900 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-800 py-4 px-8"
          >
            Signin with Google
          </button>
        ) : (
          <Link
            href={"/api/auth/signout"}
            className="bg-blue-900 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-800 py-4 px-8"
          >
            Sign out
          </Link>
        )}
      </form>
      <div>
        <pre className="bg-blue-950 m-4 p-4 whitespace-pre-wrap overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </>
  );
}
