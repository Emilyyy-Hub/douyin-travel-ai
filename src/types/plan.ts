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
  tripDays: string;
  gender: string;
}

export interface PlanRequest {
  caseId?: CaseId;
  douyinUrl?: string;
  destination?: string;
  styleKeywords?: string;
  sceneKeywords?: string;
  profile: UserProfile;
}

export interface OutfitItem {
  category: string;
  name: string;
  owned: boolean;
  price: number;
}

export interface Outfit {
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
  photoScore: boolean;
  comfortScore: boolean;
  slimScore: boolean;
  pose: string;
}

export interface PackingItem {
  id: string;
  title: string;
  items: string[];
  type: "mustBring" | "owned" | "toBuy";
}

export interface ActionItem {
  id: string;
  scene: string;
  time: string;
  cameraSpot: string;
  composition: string;
  pose: string;
  notes: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: "穿搭类" | "拍照类" | "旅行必备类";
  reason: string;
  priceRange: string;
  priority: "必买" | "推荐" | "可选";
  owned?: boolean;
  imageUrl?: string;
}

export interface EnhancedPackingItem {
  category: string;
  label: "必带" | "推荐" | "可选" | "拍照加分项";
  items: string[];
}

export interface PlanSummary {
  destination: string;
  tripDays: number;
  gender: string;
  highlights: string[];
  checklist: string[];
  totalBudget: number;
}

export interface Plan {
  id: string;
  destination: string;
  weather: string;
  outfits: Outfit[];
  packingList: PackingItem[];
  actions: ActionItem[];
  products: ProductItem[];
  enhancedPacking: EnhancedPackingItem[];
  analysis: string;
  tripDays: number;
  gender: string;
  summary: PlanSummary;
}

export interface GeneratePlanResponse {
  success: true;
  plan: Plan;
}

export interface GetPlanResponse {
  success: true;
  plan: Plan;
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

export interface PackingGroup {
  title: string;
  items: string[];
}

export interface LegacyPackingList {
  mustBring: PackingGroup[];
  owned: string[];
  toBuy: string[];
  estimatedBudget: number;
}

export interface TravelPlan {
  id: string;
  case: TravelCase;
  sceneAnalysis: SceneAnalysis;
  outfits: Outfit[];
  actionCards: ActionItem[];
  packingList: LegacyPackingList;
}

export type OutfitPlan = Outfit;
export type ActionCard = ActionItem;
