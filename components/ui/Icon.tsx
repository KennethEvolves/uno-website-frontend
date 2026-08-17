import { ElementType } from "react";
import {
  QuestionIcon,
  ChevronDownIcon,
  ThreeBarsIcon,
  XIcon,
  PersonIcon,
} from "@primer/octicons-react";

const ICON_MAP: Record<string, ElementType> = {
  chevronDown: ChevronDownIcon,
  menu: ThreeBarsIcon,
  close: XIcon,
  person: PersonIcon,
};

export type IconName = keyof typeof ICON_MAP;

interface IconProps {
  iconName?: IconName | string;
  size?: number;
  className?: string;
}

export const Icon = ({ iconName, size = 16, className = "" }: IconProps) => {
  const SelectedIcon =
    iconName && ICON_MAP[iconName] ? ICON_MAP[iconName] : QuestionIcon;
  return <SelectedIcon size={size} className={className} />;
};
