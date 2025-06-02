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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Story } from "@/lib/generated/prisma";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Comment {
  story: Story;
  id: string;
  content: string;
  createdAt: Date;
}

const CellAction = ({ comment }: { comment: Comment }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/${comment.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast("Échec de la suppression");
        return;
      }

      toast("Commentaire supprimé avec succès");
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
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(comment.content)}
        >
          Copier le commentaire
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/stories/${comment.story.id}`}>
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

export const columns: ColumnDef<Comment>[] = [
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
    accessorKey: "content",
    header: "Commentaire",
    cell: ({ getValue }) => (
      <p className="max-w-xs truncate font-bold">{getValue<string>()}</p>
    ),
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
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => new Date(getValue<Date>()).toDateString(),
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const comment = row.original;
      return <CellAction comment={comment} />;
    },
  },
];
