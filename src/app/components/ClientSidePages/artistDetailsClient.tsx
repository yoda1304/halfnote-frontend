"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../../icons/icons";

interface ArtistDetailsClientProps {
  artistName: string;
}

const ArtistDetailsClient = ({ artistName }: ArtistDetailsClientProps) => {
  // Placeholder data for now as requested
  const albums = [
    { title: "Ö", artist: "Fcukers", cover: "/sample_images/lorde.jpeg" },
    {
      title: "I Like It Like That",
      artist: "Fcukers",
      cover: "/sample_images/lorde.jpeg",
    },
    { title: "Play Me", artist: "Fcukers", cover: "/sample_images/lorde.jpeg" },
    { title: "Mothers", artist: "Fcukers", cover: "/sample_images/lorde.jpeg" },
    { title: "Bon Bon", artist: "Fcukers", cover: "/sample_images/lorde.jpeg" },
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 gap-8 pb-20">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1">
          <h1 className="another-heading1 text-[120px] leading-tight mb-8">
            {artistName}
          </h1>

          {/* About Box */}
          <div className="border border-black rounded-2xl p-6 bg-[#f9f9f9] max-w-md shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-black p-1 rounded-sm size-8 flex items-center justify-center">
                <Image
                  src={Icons.halfnote}
                  alt="About"
                  width={20}
                  height={20}
                  className="invert"
                />
              </div>
              <h2 className="another-heading2 text-2xl font-bold italic">
                About
              </h2>
            </div>
            <p className="another-body text-gray-800 leading-relaxed italic text-base">
              {artistName} is a New York City-based electronic duo consisting of
              vocalist Shanny Wise and producer/DJ Jackson Walker Lewis. Formed
              in 2022, the two connected through a mutual friend after both had
              grown disillusioned with their previous indie rock projects.
            </p>
            <p className="another-body text-gray-800 mt-4 italic text-base">
              Drawing on a shared vision rooted in 90s/00s house music, trip
              hop, big beat, and indie rock, {artistName} have carved out their
              own frequency on the dancefloor.
            </p>
          </div>
        </div>

        {/* Artist Image */}
        <div className="w-full lg:w-[450px] aspect-square relative border-2 border-black rounded-sm overflow-hidden mt-10">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="another-heading1 text-4xl opacity-20">
              Artist Photo
            </span>
          </div>
        </div>
      </div>

      {/* Albums Section */}
      <div className="border border-black rounded-3xl p-8 bg-white overflow-hidden shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Image src={Icons.vinylStack} alt="Albums" width={40} height={40} />
            <h2 className="another-heading1 text-4xl italic uppercase">
              Albums
            </h2>
          </div>
          <button className="another-heading6 border border-black rounded-full px-8 py-2 font-bold hover:bg-black hover:text-white transition-colors">
            View All
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {albums.map((album, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-52 border border-black rounded-3xl overflow-hidden bg-white shadow-sm flex flex-col items-center p-4"
            >
              <div className="w-full aspect-square relative rounded-2xl overflow-hidden mb-4 border border-black">
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <span className="text-xs opacity-30 italic">Cover</span>
                </div>
              </div>
              <h3 className="another-heading1 text-center text-xl font-bold leading-tight">
                {album.title}
              </h3>
              <p className="another-heading6 text-gray-500 italic mt-1 uppercase text-xs tracking-wider">
                {album.artist}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Takes Section */}
      <div className="border border-black rounded-3xl p-8 bg-white shadow-sm">
        <h2 className="another-heading1 text-4xl mb-8 uppercase tracking-widest italic">
          Top Takes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="border border-gray-300 rounded-2xl p-6 flex flex-col gap-6 shadow-sm hover:border-black transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-gray-100 border border-black overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] opacity-20">
                      User
                    </div>
                  </div>
                  <div>
                    <h4 className="another-heading1 text-lg font-bold">
                      Debi Tirar Mas Fotos
                    </h4>
                    <p className="another-heading6 text-sm text-gray-400 italic">
                      Bad Bunny
                    </p>
                  </div>
                </div>
                <div className="size-12 rounded-full border-2 border-dashed border-green-400 flex items-center justify-center text-green-500 font-bold text-xl">
                  9
                </div>
              </div>
              <p className="another-body italic text-base text-gray-700 leading-relaxed">
                "he is good bunny to me"
              </p>
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  <button className="another-heading6 text-[10px] border border-black rounded-full px-4 py-1.5 font-bold uppercase tracking-tighter">
                    "Devil's Cut"
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="size-5 relative cursor-pointer">
                      <Image
                        src={Icons.unlikedHeart}
                        alt="Like"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="another-heading6 text-xs text-black">
                      0
                    </span>
                  </div>
                  <button className="another-heading1 text-[12px] border border-black rounded-full px-6 py-1.5 font-bold uppercase hover:bg-black hover:text-white transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailsClient;
