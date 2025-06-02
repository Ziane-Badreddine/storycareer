import React from "react";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
  

interface Props {
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ImageForm = ({ value, onChange,disabled }: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="border border-secondary rounded-md p-4 bg-secondary  mx-auto">
      <div className="flex items-center justify-between font-medium text-primary">
        Image
        <Button variant={"ghost"} type="button" onClick={toggleEdit}   disabled={disabled}>
          {isEditing && <>Cancel</>}
          {!isEditing && !value && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add image
            </>
          )}
          {!isEditing && value && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing ? (
        !value ? (
          <div className="h-60 border-2 border-gray-300 rounded-md flex items-center justify-center">
            <ImageIcon className="h-10 w-10 text-primary" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={value}
              alt="Story image"
              fill
              className="rounded-md object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )
      ) : (
        <>
          <FileUploader
            endPoint="profileImageUploader"
            onChange={(url) => {
              if (url) {
                onChange(url);
                toggleEdit();
              }
            }}
          />
          <p className="text-xs text-muted-foreground mt-4">
            16:9 recommended aspect ratio
          </p>
        </>
      )}
    </div>
  );
};

export default ImageForm;
