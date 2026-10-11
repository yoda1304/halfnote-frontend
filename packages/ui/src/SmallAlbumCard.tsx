import { Pressable, Text, View } from "react-native";
import { Image } from "./Image";
import { tw } from "./tw";

interface SmallAlbumCardProps {
  coverImage: string;
  title: string;
  artist: string;
  year?: number;
  onPress: () => void;
}

export function SmallAlbumCard({ coverImage, title, artist, year, onPress }: SmallAlbumCardProps) {
  return (
    <Pressable role="button" onPress={onPress} style={tw`w-[330px] h-[450px] border border-black overflow-hidden rounded-2xl`}>
      {/* shrink: the parts add up to 452px; on web the cover gives up the 2px, so it must here too. */}
      <View style={tw`w-full h-[340px] shrink`}>
        <Image source={coverImage} alt={title} width={328} height={340} fit="cover" stretch />
      </View>
      <View style={tw`p-2 gap-y-7`}>
        <Text numberOfLines={1} style={tw`another-heading1 text-[30px] leading-[36px] tracking-[-0.9px] text-black`}>
          {title}
        </Text>
        <View style={tw`flex-row justify-between`}>
          <Text numberOfLines={1} style={tw`another-heading4 font-bold leading-[30px] text-gray-500 shrink`}>
            {artist}
          </Text>
          <Text style={tw`another-heading4 leading-[28.57px] text-gray-500`}>{year}</Text>
        </View>
      </View>
    </Pressable>
  );
}
