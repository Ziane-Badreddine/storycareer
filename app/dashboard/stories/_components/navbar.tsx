"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";

interface NavbarProps {
  currentCategory: string;
  currentTag: string;
  categories: (string | null)[];
  tags: string[];
}

export default function Navbar({ categories, tags }: NavbarProps) {
const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();

const [openCategories, setOpenCategories] = React.useState(false);
const [openTags, setOpenTags] = React.useState(false);
const [selectedCategory, setSelectedCategory] = React.useState<string>("");
const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

const [searchQuery, setSearchQuery] = React.useState(
  searchParams.get("search") || ""
);

// Fonction utilitaire pour modifier les searchParams
const updateSearchParam = React.useCallback((key: string, value: string | string[] | null) => {
  const params = new URLSearchParams(searchParams.toString());

  if (!value || value === "All" || (Array.isArray(value) && value.length === 0)) {
    params.delete(key);
  } else {
    const formatted = Array.isArray(value) ? value.join(",") : value;
    params.set(key, formatted);
  }

  router.push(`${pathname}?${params.toString()}`);
}, [router, pathname, searchParams]);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchQuery(value);
  updateSearchParam("search", value || null);
};

const handleCategorySelect = (value: string) => {
  setSelectedCategory(value);
  updateSearchParam("category", value === "All" ? null : value);
  setOpenCategories(false);
};

const handleTagSelect = (value: string) => {
  if (value === "All") {
    setSelectedTags([]);
  } else {
    setSelectedTags((prev) =>
      prev.includes(value) ? prev.filter((tag) => tag !== value) : [...prev, value]
    );
  }
  setOpenTags(false)
};

// Mettre à jour l'URL quand les tags changent
React.useEffect(() => {
  updateSearchParam("tag", selectedTags.length ? selectedTags : null);
}, [selectedTags, updateSearchParam]);

  return (
    <nav className="flex flex-col lg:flex-row gap-4 items-start md:items-center justify-between w-full">
      <Input
        type="text"
        placeholder="Search stories..."
        className="w-full md:w-1/2 lg:w-1/4"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full md:1/2 lg:w-1/4 ">
        <Popover open={openCategories} onOpenChange={setOpenCategories}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-1/2 justify-between"
            >
              {selectedCategory || "Category"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full  p-0">
            <Command>
              <CommandInput placeholder="Search category..." className="h-9" />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="All"
                    onSelect={() => handleCategorySelect("All")}
                  >
                    All
                    <Check
                      className="ml-auto"
                      style={{
                        opacity: selectedCategory === "All" ? 1 : 0,
                      }}
                    />
                  </CommandItem>
                  {categories.map((category) =>
                    category ? (
                      <CommandItem
                        key={category}
                        value={category}
                        onSelect={() => handleCategorySelect(category)}
                      >
                        {category}
                        <Check
                          className="ml-auto"
                          style={{
                            opacity: selectedCategory === category ? 1 : 0,
                          }}
                        />
                      </CommandItem>
                    ) : null
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Dropdown Menu for Tags */}
        <Popover open={openTags} onOpenChange={setOpenTags}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-1/2 justify-between text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {selectedTags.length > 0 ? selectedTags.join(", ") : "Tag"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search tag..." className="h-9" />
              <CommandList>
                <CommandEmpty>No tag found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    value="All"
                    onSelect={() => handleTagSelect("All")}
                  >
                    All
                    <Check
                      className="ml-auto"
                      style={{
                        opacity: selectedTags.length === 0 ? 1 : 0,
                      }}
                    />
                  </CommandItem>
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={() => handleTagSelect(tag)}
                    >
                      {tag}
                      <Check
                        className="ml-auto"
                        style={{
                          opacity: selectedTags.includes(tag) ? 1 : 0,
                        }}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
