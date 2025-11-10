"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Icons } from "../icons/icons";
import { AnotherNavButton } from "./AnotherNavButton";
import Form from "next/form";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/app/hooks";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { SkeletonNavBar } from "./skeletons/SkeletonNavBar";
import { AnimatePresence, motion } from "framer-motion";
export const NavBar = () => {
  const qc = useQueryClient();
  const router = useRouter();
  const path = usePathname();
  const { data: userData, isLoading: isUserLoading } = useUser();
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [onAlbum, setOnAlbum] = useState<boolean>(false);

  useEffect(() => {
    if (path.startsWith("/search")) {
      setOnSearch(true);
      setOnAlbum(false);
    } else if (path.startsWith("/albums")) {
      setOnAlbum(true);
      setOnSearch(false);
    } else {
      setOnSearch(false);
      setOnAlbum(false);
    }
  }, [path]);

  const getActivityButtonLabel = () => {
    if (onSearch) return "Go back";
    if (onAlbum) return "Go back to search";
    return "Activity";
  };

  const shouldMerge = onSearch || onAlbum;

  // Hide navbar on landing/register
  if (path === "/register" || path === "/") return null;
  if (isUserLoading || !userData) return <SkeletonNavBar />;

  return (
    <nav className="rounded-full outline-solid outline-2 outline-black grid grid-cols-3 items-center bg-white p-4 w-full">
      {/* Logo */}
      <Image
        className="w-[200px] h-[55px] justify-self-start"
        priority
        src={Icons.halfnote}
        alt="Another"
      />

      <ul className="flex justify-center gap-7 relative">
        <AnimatePresence mode="popLayout">
          <motion.div
            key="discover"
            layout
            initial={shouldMerge ? { x: 85, opacity: 0 } : { x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: shouldMerge ? 0 : 1 }}
            exit={{ x: 85, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 400,
              mass: 0.5,
            }}
            style={{
              position: shouldMerge ? "absolute" : "relative",
              pointerEvents: shouldMerge ? "none" : "auto",
            }}
          >
            <Link href="/discovery">
              <AnotherNavButton label="Discover" />
            </Link>
          </motion.div>

          <motion.div
            key="activity"
            layout
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 400,
              mass: 0.5,
            }}
          >
            <button
              onClick={() => {
                if (shouldMerge) {
                  router.back();
                } else {
                  router.replace("/activity");
                }
              }}
            >
              <AnotherNavButton label={getActivityButtonLabel()} />
            </button>
          </motion.div>

          <motion.div
            key="profile"
            layout
            initial={
              shouldMerge ? { x: -85, opacity: 0 } : { x: 0, opacity: 1 }
            }
            animate={{ x: 0, opacity: shouldMerge ? 0 : 1 }}
            exit={{ x: -85, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 400,
              mass: 0.5,
            }}
            style={{
              position: shouldMerge ? "absolute" : "relative",
              pointerEvents: shouldMerge ? "none" : "auto",
            }}
          >
            <Link href={`/profile/${userData.username}`}>
              <AnotherNavButton label="Profile" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </ul>
      {/* Search bar */}
      <div className="justify-self-end mr-2">
        <Form
          action={(formData: FormData) => {
            const query = formData.get("search") as string;
            if (!query || query.length === 0) return;
            const encodedQuery = encodeURIComponent(query);
            router.push(`/search?query=${encodedQuery}`);
          }}
          className="flex flex-row justify-between border bg-[var(--color-bg-gray)] border-black rounded-full p-3 w-40 focus-within:w-80 transition-all duration-300 ease-in-out focus:outline-none"
        >
          <button type="submit">
            <Image
              src={Icons.search}
              alt="Search Icon"
              width={24}
              height={24}
            />
          </button>
          <input
            name="search"
            type="text"
            placeholder="Search"
            className="w-full focus:outline-none another-heading4 text-black ml-5 placeholder:text-black bg-transparent"
          />
        </Form>
      </div>
    </nav>
  );
};
