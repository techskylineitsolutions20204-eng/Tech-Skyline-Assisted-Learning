
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {
  ShieldCheck,
  Cloud,
  Code,
  Database,
  Cpu,
  Link as LinkIcon,
  Atom,
  Briefcase,
  Layers,
  Users,
  Search,
  ChevronRight,
  ChevronDown,
  BookOpen,
  FlaskConical,
  Award,
  ArrowLeft,
  RefreshCw,
  Plus,
  X,
  Key,
  ArrowRight,
  Film,
  Video,
  Image,
  Settings2,
  Sparkles,
  Type,
  Monitor,
  RotateCcw,
  Download,
  FileImage
} from 'lucide-react';

const defaultProps = {
  strokeWidth: 2,
};

export const ShieldIcon = (props: any) => <ShieldCheck {...defaultProps} {...props} />;
export const CloudIcon = (props: any) => <Cloud {...defaultProps} {...props} />;
export const CodeIcon = (props: any) => <Code {...defaultProps} {...props} />;
export const DatabaseIcon = (props: any) => <Database {...defaultProps} {...props} />;
export const CpuIcon = (props: any) => <Cpu {...defaultProps} {...props} />;
export const BlockchainIcon = (props: any) => <LinkIcon {...defaultProps} {...props} />;
export const QuantumIcon = (props: any) => <Atom {...defaultProps} {...props} />;
export const EnterpriseIcon = (props: any) => <Briefcase {...defaultProps} {...props} />;
export const UXIcon = (props: any) => <Layers {...defaultProps} {...props} />;
export const PeopleIcon = (props: any) => <Users {...defaultProps} {...props} />;
export const SearchIcon = (props: any) => <Search {...defaultProps} {...props} />;
export const ChevronRightIcon = (props: any) => <ChevronRight {...defaultProps} {...props} />;
export const ChevronDownIcon = (props: any) => <ChevronDown {...defaultProps} {...props} />;
export const BookIcon = (props: any) => <BookOpen {...defaultProps} {...props} />;
export const LabIcon = (props: any) => <FlaskConical {...defaultProps} {...props} />;
export const CertIcon = (props: any) => <Award {...defaultProps} {...props} />;
export const BackIcon = (props: any) => <ArrowLeft {...defaultProps} {...props} />;
export const RefreshIcon = (props: any) => <RefreshCw {...defaultProps} {...props} />;
export const PlusIcon = (props: any) => <Plus {...defaultProps} {...props} />;
export const XIcon = (props: any) => <X {...defaultProps} {...props} />;

// Fix missing icon exports for video and dialog components
export const KeyIcon = (props: any) => <Key {...defaultProps} {...props} />;
export const ArrowRightIcon = (props: any) => <ArrowRight {...defaultProps} {...props} />;
export const FilmIcon = (props: any) => <Film {...defaultProps} {...props} />;
export const FramesModeIcon = (props: any) => <Video {...defaultProps} {...props} />;
export const RectangleStackIcon = (props: any) => <Layers {...defaultProps} {...props} />;
export const ReferencesModeIcon = (props: any) => <Image {...defaultProps} {...props} />;
export const SlidersHorizontalIcon = (props: any) => <Settings2 {...defaultProps} {...props} />;
export const SparklesIcon = (props: any) => <Sparkles {...defaultProps} {...props} />;
export const TextModeIcon = (props: any) => <Type {...defaultProps} {...props} />;
export const TvIcon = (props: any) => <Monitor {...defaultProps} {...props} />;
export const XMarkIcon = (props: any) => <X {...defaultProps} {...props} />;
export const ArrowPathIcon = (props: any) => <RotateCcw {...defaultProps} {...props} />;
export const DownloadIcon = (props: any) => <Download {...defaultProps} {...props} />;
export const FileImageIcon = (props: any) => <FileImage {...defaultProps} {...props} />;
