
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export enum AppState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export enum TechDomain {
  CYBERSECURITY = 'Cybersecurity & Risk Management',
  CLOUD = 'Cloud Computing & Distributed Systems',
  DEV_DEVOPS = 'Software Development, DevOps & SRE',
  DATA_BIG_DATA = 'Data Engineering, Analytics & Big Data',
  IOT_EDGE = 'IoT, Edge Computing & Intelligent Systems',
  BLOCKCHAIN = 'Blockchain & Decentralized Technologies',
  QUANTUM = 'Quantum Computing & Emerging Paradigms',
  ENTERPRISE_MGMT = 'Enterprise & Management Technologies',
  HCI_EXPERIENCE = 'HCI & Digital Experience',
  SOFT_SKILLS = 'Soft & Human-Centric Skills'
}

export interface LearningStep {
  title: string;
  description: string;
  skills: string[];
  certifications: string[];
  timeline: 'Foundational' | 'Growth' | 'Future Frontier';
  timeCommitment: string;
  prerequisites: string[];
}

export interface Lab {
  name: string;
  platform: string;
  description: string;
  isLive?: boolean;
}

export interface CareerRoadmap {
  goal: string;
  summary: string;
  steps: LearningStep[];
  labs: Lab[];
}

export interface AppConfig {
  domain: TechDomain | 'ALL';
}

export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
}

export enum Resolution {
  P720 = '720p',
  P1080 = '1080p',
  P4K = '4K',
}

export enum VeoModel {
  VEO = 'veo-3.1-generate-preview',
  VEO_FAST = 'veo-3.1-fast-generate-preview',
}

export enum GenerationMode {
  TEXT_TO_VIDEO = 'Text-to-Video',
  FRAMES_TO_VIDEO = 'Frames-to-Video',
  REFERENCES_TO_VIDEO = 'References-to-Video',
  EXTEND_VIDEO = 'Extend-Video',
}

export interface ImageFile {
  file: File;
  base64: string;
}

export interface VideoFile {
  file: File;
  base64: string;
}

export interface GenerateVideoParams {
  prompt: string;
  model: VeoModel;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  mode: GenerationMode;
  startFrame: ImageFile | null;
  endFrame: ImageFile | null;
  referenceImages: ImageFile[];
  styleImage: ImageFile | null;
  inputVideo: VideoFile | null;
  inputVideoObject: any | null;
  isLooping: boolean;
}
