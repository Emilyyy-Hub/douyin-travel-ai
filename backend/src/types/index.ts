export type DemoCaseId = "dali-lake" | "suzhou-lanes" | "shanghai-night";
export type SourceType = "demo" | "douyin_url";
export type InferenceType = "extracted" | "inferred";
export type PlanStatus = "processing" | "completed";

export interface DemoCase {
  id: DemoCaseId;
  title: string;
  destination: string;
  coverUrl: string;
  description: string;
  keywords: string[];
}

export interface AnalysisSource {
  sourceType: SourceType;
  title: string;
  coverUrl: string;
  isMock: true;
  videoUrl?: string;
}

export interface SceneAnalysis {
  id: string;
  name: string;
  imageUrl: string;
  keywords: string[];
  palette: string[];
  lighting: string;
  bestTime: string;
  shotPosition: string;
  composition: string;
  recommendedStyles: string[];
  recommendedColors: string[];
  avoidColors: string[];
  poses: string[];
  sourceEvidence: string;
  inferenceType: InferenceType;
}

export interface VideoAnalysis {
  destination: string;
  source: AnalysisSource;
  scenes: SceneAnalysis[];
}

export interface StoredAnalysis {
  id: string;
  status: "completed";
  analysis: VideoAnalysis;
  createdAt: string;
}

export interface UserProfile {
  heightCm: number;
  usualSize: string;
  preferredStyle: string;
  budget: number;
  photoGoal: string;
  shoePreference: string;
  coveragePreference: string;
  skinTone?: string;
}

export interface ProductItem {
  id: string;
  category: string;
  name: string;
  imageUrl: string;
  price: number;
  purchaseUrl: string;
  owned?: boolean;
}

export interface OutfitPlan {
  id: string;
  title: string;
  sceneId: string;
  previewImageUrl: string;
  style: string;
  palette: string[];
  reason: string;
  totalPrice: number;
  pose: string;
  items: ProductItem[];
  previewImage: string;
  previewAlt: string;
  name: string;
  scene: string;
  cameraSpot: string;
  colorScheme: string;
}

export interface PackingChecklistItem {
  id: string;
  category: string;
  name: string;
  quantity: number;
  owned: boolean;
  estimatedPrice: number;
}

export interface PackingGroup {
  title: string;
  items: string[];
}

export interface PackingList {
  items: PackingChecklistItem[];
  ownedItems: PackingChecklistItem[];
  toBuyItems: PackingChecklistItem[];
  estimatedBudget: number;
  mustBring: PackingGroup[];
  owned: string[];
  toBuy: string[];
}

export interface TravelCaseCompat {
  id: "dali-sunset" | "suzhou-lanes" | "shanghai-night";
  title: string;
  source: string;
  coverImage: string;
  coverAlt: string;
  location: string;
  description: string;
}

export interface SceneAnalysisCompat {
  name: string;
  image: string;
  imageAlt: string;
  moodKeywords: string[];
  palette: string[];
  bestTime: string;
  cameraSpots: string[];
  compositionTips: string[];
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

export interface TravelPlan {
  planId: string;
  destination: string;
  sourceVideo: AnalysisSource;
  scenes: SceneAnalysis[];
  outfits: OutfitPlan[];
  packingList: PackingList;
  id: string;
  case: TravelCaseCompat;
  sceneAnalysis: SceneAnalysisCompat;
  actionCards: ActionItem[];
}

export interface PlanTask {
  id: string;
  status: PlanStatus;
  progress: number;
  currentStep: string;
  plan?: TravelPlan;
  createdAt: string;
  updatedAt: string;
}
