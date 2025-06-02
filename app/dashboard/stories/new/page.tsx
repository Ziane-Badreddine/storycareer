"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,   
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CategoryCommandSelect } from "./_components/CategoryCommandSelect";
import { Switch } from "@/components/ui/switch";
import ImageForm from "./_components/ImageForm";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().trim().min(3, "Title is required").max(50),
  content: z.string().trim().min(200),
  tags: z.array(z.string()).optional(),
  category: z.string().min(3).max(50).optional(),
  isPublished: z.boolean(),
  image: z.string().url().optional(),
});

const TagInput = ({ value, onChange }: { value: string[], onChange: (value: string[]) => void }) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Input
        type="text"
        placeholder="Add a tag..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value?.map((tag, i) => (
        <Badge
          key={i}
          className="h-8"
          variant={"secondary"}
          onClick={() => removeTag(tag)}
        >
          <h1 className="text-base pr-2">{tag}</h1>
          <X className="mt-[2px] w-5 h-5" />
        </Badge>
      ))}
    </div>
  );
};

export default function NewStoryPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      isPublished: true,
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post("/api/story", {
        ...values,
      });

      if (res.status === 201) {
        toast.success("story are created");
        router.push("/dashboard/stories");
      } else {
        toast.error(res.statusText);
      }
      console.log(res);
    } catch      {
      toast.error("something be wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 px-10 py-5  "
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start rounded-lg border p-3 shadow-sm w-full lg:w-1/2">
              <div className="space-y-1 w-full">
                <FormLabel>Story Image</FormLabel>
                <FormDescription>
                  Upload an image that represents your story
                </FormDescription>
                <ImageForm
                  value={field.value}
                  onChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Your story title" {...field} />
              </FormControl>
              <FormDescription>
                The catchy title of your story (5 to 50 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your full story here..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The main body of your story (minimum 200 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-5 md:w-full items-start">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <CategoryCommandSelect
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormDescription>
                  Select the most relevant category for your story.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="md:col-span-1 lg:col-span-2 xl:col-span-3">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput value={field.value || []} onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  Add keywords relevant to your story.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-1">
                <FormLabel>Publish story</FormLabel>
                <FormDescription>
                  If enabled, your story will be visible to the public
                  immediately after submission.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          Submit
          {loading && <Loader className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
