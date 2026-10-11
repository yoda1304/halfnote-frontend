import { Pressable, Text, View } from "react-native";
import { Image } from "./Image";
import { tw } from "./tw";

interface SmallArtistCardProps {
  name: string;
  photo: string;
  onPress: () => void;
}

// Tailwind v4 shadow-sm.
const shadowSm = { boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" };

export function SmallArtistCard({ name, photo, onPress }: SmallArtistCardProps) {
  return (
    <Pressable role="button" onPress={onPress} style={[tw`w-full h-[80px] flex-row items-center border border-black rounded-2xl bg-white overflow-hidden`, shadowSm]}>
      <View style={tw`w-[80px] h-[80px] border-r border-black`}>
        <Image source={photo} alt={name} width={80} height={80} fit="cover" stretch />
      </View>
      <View style={tw`flex-1 px-3`}>
        <Text numberOfLines={1} style={tw`another-heading4 font-bold leading-[25px] text-[#767676]`}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
}
