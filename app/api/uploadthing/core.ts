// lib/uploadthing/core.ts
import { getAuth } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { NextRequest } from "next/server";

const f = createUploadthing();

const auth = (req: NextRequest) => {
  const { userId } = getAuth(req);
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  profileImageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 }
  })
    .middleware(async ({ req }) => {
      return auth(req);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);
      
      // Here you would typically update your database
      // For example:
      // await prisma.user.update({
      //   where: { id: metadata.userId },
      //   data: { imageUrl: file.url }
      // });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;