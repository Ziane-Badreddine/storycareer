"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Story } from "@/lib/generated/prisma";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Save {
  story: Story;
  id: string;
  createdAt: Date;
}

const CellAction = ({ save }: { save: Save }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/save/${save.story.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast("Échec de la suppression");
        return;
      }

      toast("save supprimé avec succès");
      router.refresh();
    } catch {
      toast("Une erreur est survenue");
    } 
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/stories/${save.story.id}`}>
            Voir l&apos;histoire
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Save>[] = [
  {
    id: "#",
    header: () => (
       <div>#</div>
    ),
    cell: ({ row }) => (
      <div>{row.index + 1}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "story",
    header: "Story",
    cell: ({ row }) => {
      const story = row.original.story;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={story.image!} alt={story.title} />
            <AvatarFallback>
              {story.title.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-primary">{story.title}</span>
            <span className="text-sm text-muted-foreground truncate max-w-xs">
              {story.content}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date save
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => new Date(getValue<Date>()).toDateString(),
    enableSorting: true,
  },
    {
    accessorKey: "story.createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date story
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => new Date(getValue<Date>()).toDateString(),
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const save = row.original;
      return <CellAction save={save} />;
    },
  },
];
