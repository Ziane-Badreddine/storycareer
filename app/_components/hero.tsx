"use client";

import CountUp from "@/components/animation/CountUp";
import { Ripple } from "@/components/animation/ripple";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Pencil, StarIcon, TrendingUpIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import {
  FaRegEdit,
  FaRegCommentDots,
  FaBookOpen,
  FaChartBar,
  FaUsers,
  FaBookmark,
  FaArrowRight,
} from "react-icons/fa";
import { Spotlight } from "@/components/animation/Spotlight";

interface HeroProps {
  stats: {
    totalUsers: number;
    totalStories: number;
    totalComments: number;
    totalSaves: number;
  };
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function Hero({ stats }: HeroProps) {
  const isMobile = useIsMobile();
  const { totalUsers, totalStories, totalComments, totalSaves } = stats;

  return (
    <section className=" isolate pb-20 flex flex-col items-center justify-center gap-8 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Spotlight
          className="top-0 left-0 -translate-x-1/3 -translate-y-1/2 opacity-50"
          fill="white"
        />
      </motion.div>
      <div className="inline-flex mt-32  items-center gap-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-2 rounded-full border border-primary/20 animate-fade-in">
        <StarIcon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          Professional Story Sharing Platform
        </span>
      </div>

      {/* Main Heading */}
      <h1
        className={cn(
          "font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/80 to-primary/40 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl  sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl animate-fade-in [text-wrap:balance] leading-tight tracking-tighter capitalize"
        )}
      >
        Share your stories. Inspire the world.
      </h1>

      {/* Subtitle / Description */}
      <p className="text-muted-foreground/90 text-sm md:text-lg animate-fade-in-delay [text-wrap:balance] leading-relaxed text-center max-w-xs  sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl">
        Explore{" "}
        <strong className="font-bold text-foreground underline decoration-primary decoration-wavy underline-offset-4">
          real stories
        </strong>{" "}
        and{" "}
        <strong className="font-bold text-foreground underline decoration-primary   decoration-wavy underline-offset-4">
          genuine voices
        </strong>
        . Whether you&apos;re a storyteller or a reader,{" "}
        <strong className="font-bold text-foreground">share</strong>,{" "}
        <strong className="font-bold text-foreground">discover</strong>, and{" "}
        <strong className="font-bold text-foreground">connect</strong> through
        powerful words. Save your favorites, follow inspiring writers, and join
        a{" "}
        <strong className="font-bold underline text-foreground decoration-primary underline-offset-4   decoration-wavy">
          community built on empathy and creativity
        </strong>
        .
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <Link href={"/dashboard/stories/new"}>
          <Button
            size={"lg"}
            className="h-12 cursor-pointer rounded-full px-8 text-base shadow-md transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg"
          >
            <Pencil className=" w-5 h-5" />
            Start Writing
          </Button>
        </Link>
      </div>

      <div className="animate-float mt-8 relative group mb-20 md:mb-32  ">
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

      <div className="w-full bg-primary px-4  py-10 pt-20 relative ">
        <div className="custom-shape-divider-top-1760179879">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full py-10 max-w-4xl mx-auto  ">
          <div className="flex flex-col items-center justify-center gap-2 text-foreground">
            <div className=" rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 ">
              <FaUsers className="size-14 " />
            </div>
            <CountUp
              from={0}
              to={totalUsers}
              separator=","
              direction="up"
              duration={1}
              className="text-6xl font-bold "
            />
            <p className="font-semibold text-xl text-center">
              Professionals Connected
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-foreground">
            <div className=" rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 ">
              <FaBookOpen className="size-14 " />
            </div>
            <CountUp
              from={0}
              to={totalStories}
              separator=","
              direction="up"
              duration={1}
              className="text-6xl font-bold "
            />
            <p className="font-semibold text-xl text-center">
              Career Stories Shared
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-foreground">
            <div className=" rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 ">
              <TrendingUpIcon className="size-14 " />
            </div>
            <h3 className="text-6xl font-bold ">
              <CountUp
                from={0}
                to={totalComments + totalSaves}
                separator=","
                direction="up"
                duration={1}
                className="text-6xl font-bold "
              />
            </h3>
            <p className="font-semibold text-xl text-center">
              Total Interactions
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full  py-20 md:py-32 px-4">
        <div className="text-center space-y-4 mb-12 md:mb-22">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary text-center">
            Platform Features
          </h2>
          <p className=" text-lg md:text-xl ">
            Everything you need to share and discover career stories
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-12 px-4"
        >
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-gradient-to-br from-primary/5 hover:to-background transition-all duration-300 cursor-pointer border  border-primary/10 shadow-lg"
          >
            <div className="bg-primary/10 p-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 rounded-full">
              <FaRegEdit className="text-3xl text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                Share Stories
              </h4>
              <p className="text-muted-foreground">
                Write and publish your career experiences with rich formatting
                and media support
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-gradient-to-br from-primary/5 hover:to-background transition-all duration-300 cursor-pointer border  border-primary/10 shadow-lg"
          >
            <div className="bg-primary/10 rounded-full p-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
              <FaRegCommentDots className="text-3xl text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                Engage & Connect
              </h4>
              <p className="text-muted-foreground">
                Comment, interact, and build meaningful connections with other
                professionals
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-gradient-to-br from-primary/5 hover:to-background transition-all duration-300 cursor-pointer border  border-primary/10 shadow-lg"
          >
            <div className="bg-primary/10 rounded-full p-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
              <FaBookmark className="text-3xl text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                Save & Organize
              </h4>
              <p className="text-muted-foreground">
                Bookmark inspiring stories and organize them for future
                reference
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-gradient-to-br from-primary/5 hover:to-background transition-all duration-300 cursor-pointer border  border-primary/10 shadow-lg"
          >
            <div className="bg-primary/10 rounded-full p-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
              <FaChartBar className="text-3xl text-primary" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                Track Performance
              </h4>
              <p className="text-muted-foreground">
                Monitor your story&apos;s reach and engagement with detailed
                analytics
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="w-full py-20 md:py-32 px-6 flex flex-col items-center justify-center text-center gap-4 rounded-3xl relative ">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary">
            Ready to share your story?
          </h2>
          <p className=" text-base md:text-lg leading-relaxed">
            Join a community of professionals sharing their journeys. Inspire
            others, build your portfolio, and connect through meaningful
            experiences.
          </p>
        </div>

        <Link href={"/dashboard/stories/new"}>
          {" "}
          <Button
            size="lg"
            className="h-12 cursor-pointer rounded-full px-8 text-base shadow-md transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg"
          >
            Get Started Now
            <FaArrowRight />
          </Button>
        </Link>
        <Ripple />
      </div>
    </section>
  );
}
