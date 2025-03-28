import React from "react";

export const revalidate = 86400;

export const fetchCache = "force-cache";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return {
    title: `ID: ${id}`,
  };
}

const ids = ["1", "2", "3"];

const getDataById = async (_id: string) => {
  const id = ids.find((id) => id === _id);
  return id || "-1";
};

const SlugPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params)?.id;
  const data = await getDataById(id);
  return (
    <>
      <div className="my-40 text-center">ID: {id}</div>
      {data === "-1" ? (
        <div className="my-40 text-center text-2xl text-red-500">
          <h1>😟 Not Found</h1>
        </div>
      ) : (
        <div className="my-40 text-center">
          Data: {JSON.stringify(data, null, 2)}
        </div>
      )}
    </>
  );
};

export default SlugPage;
