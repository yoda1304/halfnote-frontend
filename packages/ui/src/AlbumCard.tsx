import { Text, View } from "react-native";
import { fonts } from "./fonts";
import { Image } from "./Image";
import { shadowMd, tw } from "./tw";

interface AlbumCardProps {
  albumCover: string;
  albumName: string;
  artistName: string;
  size?: number;
}

export function AlbumCard({ albumCover, albumName, artistName, size = 175 }: AlbumCardProps) {
  return (
    <View style={[tw`items-center`, { width: size }]}>
      <View style={[tw`rounded-[10px] overflow-hidden border border-gray-300`, shadowMd, { width: size, height: size }]}>
        <Image source={albumCover} alt={`${albumName} cover`} width={size} height={size} fit="cover" stretch />
      </View>
      <Text role="heading" aria-level={2} numberOfLines={1} style={[tw`mt-3 text-[16px] font-semibold leading-tight text-black text-center`, { fontFamily: fonts.body }]}>
        {albumName}
      </Text>
      <Text numberOfLines={1} style={[tw`text-sm text-gray-600 text-center`, { fontFamily: fonts.body }]}>
        {artistName}
      </Text>
    </View>
  );
}
