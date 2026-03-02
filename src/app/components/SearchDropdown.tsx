import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Icons } from "../icons/icons";
import { useRecentSearches } from "../hooks/useRecentSearches";
import { SearchResult } from "../types/types";
import SplitCard from "./splitCard";

import { useRouter } from "next/navigation";

// Give full data to search dropdown in case splitCard is requires all information for another component on click
export const SearchDropdown = ({
  newReleases,
  popularAlbums,
  searchResults,
  query,
  onClose,
  setSearchQuery,
}: {
  newReleases: SearchResult[];
  popularAlbums: SearchResult[];
  searchResults: SearchResult[];
  query: string;
  onClose: () => void;
  setSearchQuery: (query: string) => void;
}) => {
  const { recentSearches, removeSearch, addSearch } = useRecentSearches();
  const router = useRouter();

  const handleSearch = (searchTerm: string) => {
    addSearch(searchTerm);
    onClose();
    setSearchQuery("");
    const encodedQuery = encodeURIComponent(searchTerm);
    router.push(`/search?query=${encodedQuery}`);
  };

  const renderAutocompleteItem = (
    text: string,
    uniqueKey: string,
    isRawQuery: boolean = false
  ) => {
    let prefix = "";
    let suffix = text;

    if (!isRawQuery && text.toLowerCase().startsWith(query.toLowerCase())) {
      prefix = text.slice(0, query.length);
      suffix = text.slice(query.length);
    }

    return (
      <div
        key={uniqueKey}
        onClick={() => handleSearch(text)}
        className="flex items-center gap-3 p-2 hover:bg-gray-200 cursor-pointer rounded-lg group"
      >
        <Image
          src={Icons.search}
          alt="Search"
          width={20}
          height={20}
          className="opacity-60 group-hover:opacity-100"
        />
        <p className="another-heading4 text-black text-xl">
          {isRawQuery ? (
            text
          ) : (
            <>
              {prefix}
              <span className="font-bold">{suffix}</span>
            </>
          )}
        </p>
      </div>
    );
  };

  return (
    <motion.div
      onMouseDown={(e) => e.preventDefault()}
      className="absolute top-full left-0 w-full h-auto max-h-[70vh] overflow-y-auto p-4 bg-[var(--color-bg-gray)] border-x border-b border-black rounded-b-[2rem] rounded-t-none custom-scrollbar shadow-lg z-50"
      initial={{ opacity: 0, scaleY: 0.8, transformOrigin: "top" }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0.8, transition: { duration: 0.1 } }}
      transition={{ delay: 0.2, duration: 0.2, ease: "easeOut" }}
    >
      {query.length > 0 ? (
        <div className="flex flex-col gap-1 overflow-y-auto">
          {renderAutocompleteItem(query, "raw-query", true)}
          {searchResults
            .filter((item) => item.title.toLowerCase() !== query.toLowerCase())
            .map((item) => renderAutocompleteItem(item.title, item.id.toString()))}
        </div>
      ) : (
        <>
          <h1 className="another-heading2 text-3xl font-medium mb-2">
            Recent Searches
          </h1>
          <div className="flex flex-row gap-2 mb-2 flex-wrap">
            {recentSearches?.map((search, index) => (
              <div
                key={index}
                className="flex flex-row gap-2 w-auto h-7 border-black border-1 rounded-full items-center justify-center p-3 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSearch(search)}
              >
                <Image
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearch(search);
                  }}
                  src={Icons.close}
                  alt="Close"
                  width={10}
                  height={10}
                  className="hover:cursor-pointer"
                />
                {search}
              </div>
            ))}
          </div>
          <h1 className="another-heading2 text-3xl font-medium mb-2">
            New Releases
          </h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {newReleases?.map((album, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => router.push(`/albums/${album.id}`)}
              >
                <SplitCard
                  image={album.cover_image || ""}
                  albumName={album.title}
                  artistName={album.artist}
                  size="large"
                />
              </div>
            ))}
          </div>
          <h1 className="another-heading2 text-3xl font-medium mb-2">
            Popular Albums
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {popularAlbums?.map((album, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => router.push(`/albums/${album.id}`)}
              >
                <SplitCard
                  image={album.cover_image || ""}
                  albumName={album.title}
                  artistName={album.artist}
                  size="small"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};
