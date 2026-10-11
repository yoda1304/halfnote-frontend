import { Pressable, Text } from "react-native";
import { fonts } from "./fonts";
import { tw } from "./tw";

interface ButtonProps {
  children: string;
  onClick?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
}

export function Button({ children, onClick, isSelected, disabled }: ButtonProps) {
  return (
    <Pressable
      role="button"
      onPress={onClick}
      disabled={disabled}
      style={({ hovered }: { pressed: boolean; hovered?: boolean }) => [
        tw`rounded-full border border-black items-center justify-center h-10 px-4`,
        tw.style(isSelected ? "bg-black" : hovered ? "bg-gray-200" : "bg-white", disabled && "opacity-50"),
      ]}
    >
      <Text style={[tw`text-[20px] leading-[30px] tracking-[-0.6px]`, tw.style(isSelected ? "text-white" : "text-black"), { fontFamily: fonts.sans }]}>
        {children}
      </Text>
    </Pressable>
  );
}
