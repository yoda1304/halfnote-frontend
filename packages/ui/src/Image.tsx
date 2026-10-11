import { Image as RNImage } from "react-native";

/** A URL, or a bundler static import ({ src, width, height }) such as Next's StaticImageData. */
export type ImageSource = string | { src: string; width: number; height: number };

export interface ImageProps {
  source: ImageSource;
  alt: string;
  width: number;
  height: number;
  fit: "cover" | "contain";
  /** Fill the parent box instead of rendering at width x height. */
  stretch?: boolean;
}

export function Image({ source, alt, width, height, fit, stretch }: ImageProps) {
  const uri = typeof source === "string" ? source : source.src;
  return (
    <RNImage
      // Search results often carry "" for covers and photos; RN warns on an empty uri, so render the empty box instead.
      source={uri ? { uri } : undefined}
      accessibilityLabel={alt}
      resizeMode={fit}
      style={stretch ? { width: "100%", height: "100%" } : { width, height }}
    />
  );
}
