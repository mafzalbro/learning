import React from "react";

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

export async function generateStaticParams() {
  return await getAllDataIds();
}

const ids = ["1", "2", "3"];
const getAllDataIds = async () => {
  return ids.map((id) => ({ params: { id } }));
};

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
