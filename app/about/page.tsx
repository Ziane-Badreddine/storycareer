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
import { FiZap } from "react-icons/fi";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiPrisma,
  SiClerk,
  SiShadcnui,
  SiReacthookform,
  SiZod,
} from "react-icons/si";
import Link from "next/link";

const SOCIAL_LINKS = {
  github: "https://github.com/Ziane-Badreddine",
  linkedin: "https://www.linkedin.com/in/ziane-badr-eddine-baa394337",
  website: "https://ziane-badreddine.vercel.app",
};

export default async function AboutPage() {
  return (
    <div className="min-h-screen bg-background mt-10 py-20 lg:py-32 px-4">
      <div className="container mx-auto ">
         <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter capitalize">
            Building the Future of <span className=" text-primary mt-2">Career Storytelling</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connecting professionals through authentic career experiences and inspiring journeys
          </p>
        </div>
        <div className="max-w-5xl mx-auto  ">
          {/* Creator Section */}
          <Card className="rounded-none bg-background border-double border-b-foreground border-t-0 border-x-0 pb-10 shadow-none  ">
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
              <div className="flex flex-col sm:flex-row items-start justify-center gap-8">
                <div className="relative ">
                  <Avatar className="h-32 w-32 ring-4 ring-primary/10">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/183768832?v=4"
                      alt="Ziane Bader Eddine"
                    />
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
                    <Badge className="px-4 py-2">Full Stack Developer</Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
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
                        <FaGithub className="w-4 h-4" />
                        <span className="hidden md:block">GitHub</span>
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
                        <FaLinkedin className="w-4 h-4 " />
                        <span className="hidden md:block">LinkedIn</span>
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
                        <FaGlobe className="w-4 h-4 " />
                        <span className="hidden md:block">Portfolio</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inspiration Section */}
          <Card className="rounded-none bg-background border-double border-y-foreground border-x-0 py-10 shadow-none">
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
          <Card className="rounded-none bg-background border-double border-x-0 border-b-0 pt-10 shadow-none ">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <FiZap className="w-6 h-6 text-primary-foreground" />
                </div>
                Built with Modern Tech
              </CardTitle>
              <CardDescription className="text-lg">
                Powered by cutting-edge technologies for optimal performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group space-y-3 text-center p-4 md:p-6 rounded-xl bg-muted hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-background rounded-lg p-3 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <SiNextdotjs className="text-3xl" />
                  </div>
                  <Badge variant="secondary">Next.js 14</Badge>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">
                    React Framework
                  </p>
                </div>

                <div className="group space-y-3 text-center p-4 md:p-6 rounded-xl bg-muted hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-primary rounded-lg p-3 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <SiPrisma className="text-3xl text-primary-foreground" />
                  </div>
                  <Badge variant="secondary">Prisma</Badge>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">
                    Database & Backend
                  </p>
                </div>

                <div className="group space-y-3 text-center p-4 md:p-6 rounded-xl bg-muted hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-primary rounded-lg p-3 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <SiClerk className="text-3xl text-primary-foreground" />
                  </div>
                  <Badge variant="secondary">Clerk</Badge>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">
                    Authentication
                  </p>
                </div>

                <div className="group space-y-3 text-center p-4 md:p-6 rounded-xl bg-muted hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-primary rounded-lg p-3 w-fit mx-auto group-hover:scale-110 transition-transform">
                    <SiTailwindcss className="text-3xl text-primary-foreground" />
                  </div>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">
                    Utility-First CSS Framework
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Additional Technologies</h4>
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="outline"
                    className="px-4 py-2 flex items-center gap-2"
                  >
                    <SiTypescript className="w-4 h-4" />
                    TypeScript
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-4 py-2 flex items-center gap-2"
                  >
                    <SiReact className="w-4 h-4" />
                    React
                  </Badge>
                  <Badge
                    variant="outline"
                    className="px-4 py-2 flex items-center gap-2"
                  >
                    <SiShadcnui className="w-4 h-4" />
                    Shadcnui
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 gap-2">
                    <SiReacthookform className="w-4 h-4" />
                    React Hook Form
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">
                    <SiZod className="w-4 h-4" />
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
