"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  BookOpenIcon,
  Pencil,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface HeroProps {
  stats: {
    totalUsers: number;
    totalStories: number;
    totalComments: number;
    totalSaves: number;
  };
}

export default function Hero({ stats }: HeroProps) {
  const isMobile = useIsMobile();
  const { totalUsers, totalStories, totalComments, totalSaves } = stats;

  return (
    <section className="mt-32 mb-7 flex flex-col items-center justify-center gap-8 px-10 overflow-hidden">
      <div  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-2 rounded-full border border-primary/20 animate-fade-in">
        <StarIcon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          Professional Story Sharing Platform
        </span>
      </div>

      <h1 className="font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary text-2xl md:text-3xl lg:text-4xl md:max-w-4xl animate-fade-in [text-wrap:balance]">
        Share your stories. Inspire the world.
      </h1>

      <p className="text-center text-xs md:text-base max-w-xl md:max-w-5xl animate-fade-in-delay text-muted-foreground/90 [text-wrap:balance] leading-relaxed">
        Explore real stories and genuine voices. Whether you&apos;re a
        storyteller or a reader, share, discover, and connect through powerful
        words. Save your favorites, follow inspiring writers, and join a
        community built on empathy and creativity.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <Link href={"/dashboard/stories/new"}>
          <Button className="bg-gradient-to-r from-primary via-primary/90 to-primary hover:opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/25">
            <Pencil className="mr-2 w-5 h-5" />
            Start Writing
          </Button>
        </Link>
      </div>

      <div className="animate-float mt-8 relative group mb-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/50 to-primary opacity-30 blur-xl group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative">
          <Image
            src={"/reading.svg"}
            alt="hero"
            width={isMobile ? 300 : 400}
            height={isMobile ? 200 : 300}
            className="drop-shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full py-10 max-w-4xl">
        <Card className="border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-primary/5">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
              <UsersIcon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary">{totalUsers}</h3>
            <p className="text-muted-foreground">Professionals Connected</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-primary/5">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
              <BookOpenIcon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary">{totalStories}</h3>
            <p className="text-muted-foreground">Career Stories Shared</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-primary/5">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
              <TrendingUpIcon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary">
              {totalComments + totalSaves}
            </h3>
            <p className="text-muted-foreground">Total Interactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="w-full max-w-4xl">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            Platform Features
          </h2>
          <p className="text-muted-foreground text-sm">Everything you need to share and discover career stories</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-8 px-4">
          <div className="group flex items-start gap-4 p-6 rounded-xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-background transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/10 hover:shadow-lg">
            <div className="bg-primary/10 rounded-xl p-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
              <span className="text-3xl">📝</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Share Stories</h4>
              <p className="text-muted-foreground">
                Write and publish your career experiences with rich formatting
                and media support
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 p-6 rounded-xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-background transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/10 hover:shadow-lg">
            <div className="bg-primary/10 rounded-xl p-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
              <span className="text-3xl">💬</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Engage & Connect</h4>
              <p className="text-muted-foreground">
                Comment, interact, and build meaningful connections with other
                professionals
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 p-6 rounded-xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-background transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/10 hover:shadow-lg">
            <div className="bg-primary/10 rounded-xl p-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
              <span className="text-3xl">🔖</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Save & Organize</h4>
              <p className="text-muted-foreground">
                Bookmark inspiring stories and organize them for future
                reference
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-4 p-6 rounded-xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-background transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/10 hover:shadow-lg">
            <div className="bg-primary/10 rounded-xl p-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
              <span className="text-3xl">📊</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Track Performance</h4>
              <p className="text-muted-foreground">
                Monitor your story&apos;s reach and engagement with detailed
                analytics
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
