import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiPrisma,
  SiSupabase,
} from "react-icons/si";
import Link from "next/link";

const SOCIAL_LINKS = {
  github: "https://github.com/Ziane-Badreddine",
  linkedin: "https://www.linkedin.com/in/ziane-badr-eddine-baa394337",
  website: "https://badreddine-zianee.vercel.app",
};

export default async function AboutPage() {
  return (
    <div className="min-h-screen bg-background mt-20">
      <div className="container mx-auto p-2 sm:p-4 lg:p-6 space-y-8 pt-20 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Creator Section */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <StarIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                Meet the Creator
              </CardTitle>
              <CardDescription className="text-lg">
                The mind behind StoryCareer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start gap-8">
                <div className="relative">
                  <Avatar className="h-32 w-32 ring-4 ring-primary/10">
                    <AvatarImage src="/ziane.jpg" alt="Ziane Bader Eddine" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                      ZB
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-primary rounded-full w-8 h-8 border-4 border-background flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">✓</span>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-3xl font-bold">Ziane Bader Eddine</h3>
                    <p className="text-lg text-primary font-medium">
                      Student at FST SETTAT • Full Stack Developer
                    </p>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      Passionate about connecting professionals and sharing
                      career experiences. Building platforms that inspire and
                      guide the next generation of tech professionals.
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Badge className="px-4 py-2 bg-primary text-primary-foreground">
                      S1T
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2">
                      Full Stack Developer
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-4 py-2 flex items-center gap-1"
                    >
                      <SiNextdotjs className="w-4 h-4" />
                      Next.js Expert
                    </Badge>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Link
                      href={SOCIAL_LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:text-black dark:hover:text-white"
                      >
                        <FaGithub className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    </Link>
                    <Link
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:text-[#0077b5]"
                      >
                        <FaLinkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    </Link>
                    <Link
                      href={SOCIAL_LINKS.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:text-primary"
                      >
                        <FaGlobe className="w-4 h-4 mr-2" />
                        Portfolio
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inspiration Section */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <StarIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                Special Thanks
              </CardTitle>
              <CardDescription className="text-lg">
                Inspiration behind the project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                  <AvatarImage src="/ayman.jpg" alt="Ayman" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                    A
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-bold">Ayman</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Special thanks to Ayman for the inspiration and guidance in
                    creating StoryCareer. His insights and mentorship were
                    invaluable in shaping this project into what it is today.
                    This platform exists because of visionaries who believe in
                    the power of shared experiences.
                  </p>
                  <Badge variant="outline">Inspiration</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card>
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <span className="text-primary-foreground">⚡</span>
                </div>
                Built with Modern Tech
              </CardTitle>
              <CardDescription className="text-lg">
                Powered by cutting-edge technologies for optimal performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="group space-y-3 text-center p-6 rounded-xl bg-muted hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-background rounded-lg p-3 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <SiNextdotjs className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary">Next.js 14</Badge>
                  <p className="text-xs text-muted-foreground font-medium">
                    React Framework
                  </p>
                </div>

                <div className="group space-y-3 text-center p-6 rounded-xl bg-muted hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-primary rounded-lg p-3 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <SiSupabase className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary">Supabase</Badge>
                  <p className="text-xs text-muted-foreground font-medium">
                    Database & Backend
                  </p>
                </div>

                <div className="group space-y-3 text-center p-6 rounded-xl bg-muted hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-primary rounded-lg p-3 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-primary-foreground font-bold text-sm">
                      🔐
                    </span>
                  </div>
                  <Badge variant="secondary">Clerk</Badge>
                  <p className="text-xs text-muted-foreground font-medium">
                    Authentication
                  </p>
                </div>

                <div className="group space-y-3 text-center p-6 rounded-xl bg-muted hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-primary rounded-lg p-3 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <SiPrisma className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary">Prisma</Badge>
                  <p className="text-xs text-muted-foreground font-medium">
                    Database ORM
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Additional Technologies</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="outline"
                    className="px-4 py-2 flex items-center gap-1"
                  >
                    <SiTypescript className="w-4 h-4" />
                    TypeScript
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-4 py-2 flex items-center gap-1"
                  >
                    <SiReact className="w-4 h-4" />
                    React
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-4 py-2 flex items-center gap-1"
                  >
                    <SiTailwindcss className="w-4 h-4" />
                    Tailwind CSS
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    shadcn/ui
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    React Hook Form
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    Zod
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
