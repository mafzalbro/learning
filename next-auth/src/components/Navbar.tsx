"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const session = useSession();
  const my_auth = session.data;
  const data = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Client",
      href: "/client",
    },
    {
      name: "Client 2",
      href: "/client-2",
    },
    my_auth?.user
      ? {
          name: "Signout",
          href: "/api/auth/signout",
          type: "button",
        }
      : {
          name: "Signin",
          href: "/api/auth/signin",
          type: "button",
        },
  ];
  return (
    <nav className="bg-gray-900 p-4 flex gap-4 justify-between items-center">
      <h2 className="text-2xl">Navbar</h2>
      <ul className="flex gap-4 justify-center">
        {session.status !== "loading"
          ? data?.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    item?.type === "button"
                      ? "bg-blue-800 rounded-full px-4 py-2"
                      : ""
                  }
                >
                  {item.name}
                </Link>
              </li>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-14 bg-gray-950 animate-pulse"
              ></div>
            ))}
      </ul>
    </nav>
  );
};

export default Navbar;
