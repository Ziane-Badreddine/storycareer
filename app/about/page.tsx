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
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
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
    <div className="min-h-screen bg-background mt-10 py-20 lg:py-32 px-4 md:px-10">
      <div className=" mx-auto ">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
            The Story Behind <span className="text-primary">StoryCareer</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
            Discover the vision, people, and technologies shaping a platform
            that celebrates real career journeys and authentic professional
            growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x-1 divide-dashed divide-primary ">
          {/* Creator Section */}
          <Card className="rounded-none bg-background  shadow-none col-span-1  ">
            <CardHeader className="pb-4 justify-center">
              <CardTitle className="text-2xl font-bold text-center">
                Meet the Creator
              </CardTitle>
              <CardDescription className="text-lg">
                The mind behind StoryCareer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="flex flex-col  items-center justify-center gap-8">
                <div className="relative ">
                  <Avatar className="h-32 w-32 ring-4 ring-primary ">
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

                  <div className="flex gap-2 flex-wrap  items-center justify-center">
                    <Badge className="px-4 py-2 bg-primary text-primary-foreground">
                      S1T
                    </Badge>
                    <Badge className="px-4 py-2">Full Stack Developer</Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2  items-center justify-center">
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
          <Card className="rounded-none bg-background col-span-1 shadow-none">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="text-2xl font-bold ">
                Special Thanks
              </CardTitle>
              <CardDescription className="text-lg">
                Inspiration behind the project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col  items-center gap-6 text-center">
                <Avatar className="h-32 w-32 ring-4 ring-foreground">
                  <AvatarImage src="/ayman.jpg" alt="Ayman" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                    A
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-4 flex-1">
                  <h3 className="text-3xl font-bold mt-2">Ayman</h3>
                  <p className="text-muted-foreground  leading-relaxed ">
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
          <Card className="rounded-none bg-background  shadow-none col-span-1 md:col-span-2 xl:col-span-2 border-foreground border-t-0 lg:border-t border-dashed lg:border-l-0 ">
            <CardHeader className="pb-6 text-center">
              <CardTitle className="text-2xl font-bold ">
                Built with Modern Tech
              </CardTitle>
              <CardDescription className="text-lg">
                Powered by cutting-edge technologies for optimal performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-6">
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
                              <blockquote className="border-l-4 border-primary  pl-4 py-2 my-4 
           italic text-foreground/80 bg-muted/30 rounded-r text-lg">
                 &quot;Together, these technologies create a modern, reliable, and
                  efficient ecosystem that enables rapid development and
                  delivers a seamless user experience.&quot;
                </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
