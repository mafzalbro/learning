import Link from "next/link";
import React from "react";

const Client2 = () => {
  return (
    <div className="my-40 text-center">
      <p className="my-10">Hey, This is Client 2</p>
      <div>
        <h1 className="my-10">Client 2</h1>
        <div className="flex flex-wrap justify-center items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Link
              href={`/client-2/${i + 1}`}
              className="m-2 p-8 rounded-3xl bg-gray-800"
              key={i}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Client2;
