"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Clairo from "../../../public/sample_images/813adHqElhL.jpg";

type NewRelease = {
  albumName: string;
  artistName: string;
};

type ListCarouselProps = {
  items: NewRelease[];
};

// Approximates the old Swiper coverflow (rotate 15, depth 200, 7 per view, centered).
const ROTATE_DEG = 15;
const DEPTH_PX = 200;

export const NewReleasesCarousel = ({ items }: ListCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      className="max-w-[750px] h-full relative overflow-hidden cursor-grab active:cursor-grabbing"
      ref={emblaRef}
    >
      <div className="flex h-full" style={{ perspective: "1200px" }}>
        {items.map((item, index) => {
          const offset = index - selectedIndex;
          const isActive = offset === 0;
          return (
            <div
              key={index}
              className="flex-[0_0_calc((100%-60px)/7)] mr-[10px] h-full flex justify-center transition-transform duration-300"
              style={{
                transform: `translateZ(${-DEPTH_PX * Math.abs(offset)}px) rotateY(${-ROTATE_DEG * offset}deg)`,
                zIndex: items.length - Math.abs(offset),
              }}
            >
              <div className="relative w-[245px] h-full flex flex-col items-center shrink-0">
                <div className="relative w-[245px] h-[245px]">
                  <Image
                    src={Clairo}
                    alt={item.albumName}
                    width={245}
                    height={245}
                    className="object-cover border-2 border-black"
                  />
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-white pointer-events-none transition-opacity duration-300"
                    style={{ opacity: isActive ? 0 : 0.2 }}
                  />
                </div>

                {isActive && (
                  <div className="w-full text-center mt-5 mb-6">
                    <h1 className="another-top-rated-album whitespace-nowrap">
                      {item.albumName}
                    </h1>
                    <h2 className="another-heading4 whitespace-nowrap">
                      {item.artistName}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
