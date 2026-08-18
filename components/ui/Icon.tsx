import { ElementType } from "react";
import {
  ThreeBarsIcon,
  XIcon,
  PersonIcon,
  QuestionIcon,
  CheckCircleIcon,
  HourglassIcon,
  LocationIcon,
  MortarBoardIcon,
  SyncIcon,
  MilestoneIcon,
  BookmarkIcon,
  BookIcon,
  ToolsIcon,
  HeartIcon,
  ChevronDownIcon,
  CheckIcon,
  DotFillIcon,
  BriefcaseIcon,
  EyeIcon,
  PeopleIcon,
  SparkleIcon,
  RocketIcon,
  MinimizeIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpRightIcon,
  FileIcon,
  DownloadIcon,
  ShieldIcon,
} from "@primer/octicons-react";

const ICON_MAP: Record<string, ElementType> = {
  mortarboard: MortarBoardIcon,
  hourglass: HourglassIcon,
  sync: SyncIcon,
  location: LocationIcon,
  check: CheckCircleIcon,
  milestone: MilestoneIcon,
  bookmark: BookmarkIcon,
  book: BookIcon,
  tools: ToolsIcon,
  heart: HeartIcon,
  chevronDown: ChevronDownIcon,
  checkicon: CheckIcon,
  doticon: DotFillIcon,
  briefcase: BriefcaseIcon,
  eye: EyeIcon,
  people: PeopleIcon,
  sparkle: SparkleIcon,
  rocket: RocketIcon,
  skip: MinimizeIcon,
  arrowr: ArrowRightIcon,
  arrowl: ArrowLeftIcon,
  arrowupr: ArrowUpRightIcon,
  document: FileIcon,
  download: DownloadIcon,
  shield: ShieldIcon,
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
