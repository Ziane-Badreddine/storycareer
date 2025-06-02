import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function page() {
  const user = await currentUser();
  const comments = await prisma.save.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      createdAt: true,
      story: true
    },
  });

  return (
    <div className="container mx-auto py-10 px-5">
      <DataTable columns={columns} data={comments} />
    </div>
  );
}
