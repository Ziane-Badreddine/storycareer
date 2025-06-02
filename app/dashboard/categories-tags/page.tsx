import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderOpen, Tags } from "lucide-react";

export default async function CategoriesTagsPage() {
  const user = await currentUser();
  if (!user) return <div className="p-6">Unauthorized</div>;

  // --- Récupère les catégories ---
  const categories = await prisma.story.groupBy({
    by: ['category'],
    where: {
      userId: user.id,
      category: { not: null },
    },
    _count: true,
    orderBy: { category: 'asc' },
  });

  // --- Récupère les tags ---
  const storiesWithTags = await prisma.story.findMany({
    where: {
      userId: user.id,
      tags: { isEmpty: false },
    },
    select: { tags: true },
  });

  const tagMap = new Map<string, number>();
  for (const story of storiesWithTags) {
    for (const tag of story.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  const tags = Array.from(tagMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Page Header */}
      <div className="space-y-2 bg-sidebar px-5 py-2 rounded-lg">
        <p className="text-xs md:text-lg">
          Explorez vos histoires par catégories et tags
        </p>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4" />
            Catégories
          </TabsTrigger>
          <TabsTrigger value="tags" className="flex items-center gap-2">
            <Tags className="w-4 h-4" />
            Tags
          </TabsTrigger>
        </TabsList>

        {/* --- Onglet catégories --- */}
        <TabsContent value="categories">
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map(({ category, _count }) => (
                <Link
                  key={category ?? "Uncategorized"}
                  href={`/dashboard/stories?category=${encodeURIComponent(
                    category ?? "Uncategorized"
                  )}`}
                  className="group"
                >
                  <div className="bg-muted/30 border border-muted rounded-xl p-6 hover:bg-muted/50 hover:shadow-md transition-all duration-200 group-hover:scale-[1.02] h-full">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          {category ?? "Uncategorized"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {_count} story{_count > 1 ? "ies" : "y"}
                        </p>
                      </div>
                      <FolderOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Aucune catégorie trouvée.</p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Créez votre première histoire avec une catégorie pour commencer
              </p>
            </div>
          )}
        </TabsContent>

        {/* --- Onglet tags --- */}
        <TabsContent value="tags">
          {tags.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tags.map(([tag, count]) => (
                <Link
                  key={tag}
                  href={`/dashboard/stories?tag=${encodeURIComponent(tag)}`}
                  className="group"
                >
                  <div className="bg-muted/30 border border-muted rounded-xl p-6 hover:bg-muted/50 hover:shadow-md transition-all duration-200 group-hover:scale-[1.02] h-full">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          #{tag}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {count} story{count > 1 ? "ies" : "y"}
                        </p>
                      </div>
                      <Tags className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Tags className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Aucun tag trouvé.</p>
              <p className="text-sm text-muted-foreground/70 mt-2">
                Ajoutez des tags à vos histoires pour les organiser
              </p>
            </div>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}