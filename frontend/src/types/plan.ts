export type CaseId = "dali-sunset" | "suzhou-lanes" | "shanghai-night";

export interface TravelCase {
  id: CaseId;
  title: string;
  source: string;
  coverImage: string;
  coverAlt: string;
  location: string;
  description: string;
}

export interface UserProfile {
  height: string;
  size: string;
  stylePreference: string;
  budget: string;
  photoGoal: string;
  shoePreference: string;
  skinExposure: string;
  skinTone?: string;
  outfitEffect?: string;
  hasUploadedPhoto: boolean;
}

export interface PlanRequest {
  caseId?: CaseId;
  douyinUrl?: string;
  profile: UserProfile;
}

export interface SceneAnalysis {
  name: string;
  image: string;
  imageAlt: string;
  moodKeywords: string[];
  palette: string[];
  bestTime: string;
  cameraSpots: string[];
  compositionTips: string[];
}

export type ProductCategory =
  | "头饰"
  | "耳饰"
  | "上衣"
  | "下装"
  | "连衣裙"
  | "袜子"
  | "鞋子"
  | "包";

export interface OutfitItem {
  category: ProductCategory;
  name: string;
  owned: boolean;
  price: number;
}

export interface OutfitPlan {
  id: string;
  previewImage: string;
  previewAlt: string;
  name: string;
  scene: string;
  cameraSpot: string;
  style: string;
  colorScheme: string;
  reason: string;
  items: OutfitItem[];
  totalPrice: number;
  pose: string;
}

export interface ActionCard {
  id: string;
  scene: string;
  time: string;
  cameraSpot: string;
  composition: string;
  pose: string;
  notes: string[];
}

export interface PackingGroup {
  title: string;
  items: string[];
}

export interface PackingList {
  mustBring: PackingGroup[];
  owned: string[];
  toBuy: string[];
  estimatedBudget: number;
}

export interface TravelPlan {
  id: string;
  case: TravelCase;
  sceneAnalysis: SceneAnalysis;
  outfits: OutfitPlan[];
  actionCards: ActionCard[];
  packingList: PackingList;
}
