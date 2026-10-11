import NextImage from "next/image";
import type { ImageProps } from "./Image";

export function Image({ source, alt, width, height, fit, stretch }: ImageProps) {
  return (
    <NextImage
      src={source}
      alt={alt}
      width={width}
      height={height}
      style={{ objectFit: fit, ...(stretch && { width: "100%", height: "100%" }) }}
    />
  );
}
