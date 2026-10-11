import { Text, View } from "react-native";
import { fonts } from "./fonts";
import { Image, type ImageSource } from "./Image";
import { tw } from "./tw";

interface TitleProps {
  src: ImageSource;
  alt: string;
  name: string;
}

export function Title({ src, alt, name }: TitleProps) {
  return (
    <View style={tw`flex-row items-center gap-3`}>
      <Image source={src} alt={alt} width={40} height={40} fit="contain" />
      <Text role="heading" aria-level={1} style={[tw`text-[42px] leading-[63px] tracking-[-1.26px]`, { fontFamily: fonts.serif }]}>
        {name}
      </Text>
    </View>
  );
}
