import type {
  ActionItem,
  CaseId,
  GenerateImagePlanResponse,
  GeneratePlanResponse,
  GetImagePlanResponse,
  GetPlanResponse,
  ImagePlan,
  Outfit,
  OutfitItem,
  PackingItem,
  Plan,
  PlanRequest,
  PlanRevision,
  RefinePlanResponse,
  TravelCase,
  TravelPlan
} from "@/types/plan";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const POLL_INTERVAL_MS = 500;
const MAX_POLL_ATTEMPTS = 30;

interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    details?: unknown[];
  };
}

interface BackendDemoCase {
  id: string;
  title: string;
  destination: string;
  coverUrl: string;
  description: string;
  keywords: string[];
}

interface AnalyzeVideoResponse {
  analysisId: string;
  status: "completed";
}

interface GeneratePlanTaskResponse {
  planId: string;
  status: "processing";
  resultUrl: string;
}

interface GenerateImagePlanTaskResponse {
  planId: string;
  status: "processing";
  resultUrl: string;
}

interface BackendSourceVideo {
  sourceType: "demo" | "douyin_url" | "manual_keywords";
  title: string;
  coverUrl: string;
  isMock: true;
  videoUrl?: string;
}

interface BackendSceneAnalysis {
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
  inferenceType: "extracted" | "inferred";
}

interface BackendProductItem {
  id: string;
  category: string;
  name: string;
  imageUrl: string;
  price: number;
  purchaseUrl: string;
  owned?: boolean;
}

interface BackendOutfit {
  id: string;
  title?: string;
  sceneId: string;
  previewImageUrl?: string;
  style: string;
  palette: string[];
  reason: string;
  totalPrice: number;
  pose: string;
  items: BackendProductItem[];
  previewImage?: string;
  previewAlt?: string;
  name?: string;
  scene?: string;
  cameraSpot?: string;
  colorScheme?: string;
}

interface BackendPackingChecklistItem {
  id: string;
  category: string;
  name: string;
  quantity: number;
  owned: boolean;
  estimatedPrice: number;
}

interface BackendPackingGroup {
  title: string;
  items: string[];
}

interface BackendPackingList {
  items: BackendPackingChecklistItem[];
  ownedItems: BackendPackingChecklistItem[];
  toBuyItems: BackendPackingChecklistItem[];
  estimatedBudget: number;
  mustBring: BackendPackingGroup[];
  owned: string[];
  toBuy: string[];
}

interface BackendTravelCaseCompat {
  id: CaseId;
  title: string;
  source: string;
  coverImage: string;
  coverAlt: string;
  location: string;
  description: string;
}

interface BackendSceneCompat {
  name: string;
  image: string;
  imageAlt: string;
  moodKeywords: string[];
  palette: string[];
  bestTime: string;
  cameraSpots: string[];
  compositionTips: string[];
}

interface BackendTravelPlan {
  planId: string;
  destination: string;
  sourceVideo: BackendSourceVideo;
  scenes: BackendSceneAnalysis[];
  outfits: BackendOutfit[];
  packingList: BackendPackingList;
  id: string;
  case: BackendTravelCaseCompat;
  sceneAnalysis: BackendSceneCompat;
  actionCards: ActionItem[];
  revisions?: PlanRevision[];
}

interface RefinePlanBackendResponse {
  planId: string;
  status: "completed";
  revision: PlanRevision;
  plan: BackendTravelPlan;
}

interface ProcessingResultResponse {
  id: string;
  status: "processing";
  progress: number;
  currentStep: string;
}

interface CompletedResultResponse {
  id: string;
  status: "completed";
  progress: 100;
  plan: BackendTravelPlan;
}

type ResultResponse = ProcessingResultResponse | CompletedResultResponse;

interface CompletedImagePlanResponse {
  id: string;
  status: "completed";
  progress: 100;
  plan: ImagePlan;
}

interface FailedImagePlanResponse {
  id: string;
  status: "failed";
  progress: 0;
  currentStep: string;
}

type ImagePlanResultResponse = ProcessingResultResponse | CompletedImagePlanResponse | FailedImagePlanResponse;

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (!response.ok) {
    let message = "请求后端失败，请稍后重试。";
    try {
      const body = (await response.json()) as ApiErrorBody;
      message = body.error?.message ?? message;
    } catch {
      // Keep the default user-facing message when the response is not JSON.
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
  });
}

function toTravelCase(item: BackendDemoCase): TravelCase {
  return {
    id: item.id as CaseId,
    title: item.title,
    source: "抖音旅行灵感案例",
    coverImage: item.coverUrl,
    coverAlt: `${item.destination}旅行灵感封面`,
    location: item.destination,
    description: item.description
  };
}

function parseNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const matched = value.match(/\d+/);
  return matched ? Number(matched[0]) : fallback;
}

function toUserProfile(profile: PlanRequest["profile"]) {
  return {
    heightCm: parseNumber(profile.height, 165),
    usualSize: profile.size,
    preferredStyle: profile.stylePreference || "自然松弛",
    budget: parseNumber(profile.budget, 800),
    photoGoal: profile.photoGoal || "自然出片",
    shoePreference: profile.shoePreference || "舒适优先",
    coveragePreference: profile.skinExposure || "适度露肤",
    skinTone: profile.skinTone || undefined,
    tripDays: parseNumber(profile.tripDays, 3),
    gender: profile.gender || "不限"
  };
}

function buildAnalyzePayload(request?: PlanRequest) {
  if (request?.douyinUrl) {
    return {
      sourceType: "douyin_url" as const,
      videoUrl: request.douyinUrl
    };
  }

  if (request?.destination) {
    return {
      sourceType: "manual_keywords" as const,
      destination: request.destination,
      styleKeywords: request.styleKeywords || undefined,
      sceneKeywords: request.sceneKeywords || undefined
    };
  }

  return {
    sourceType: "demo" as const,
    demoCaseId: request?.caseId ?? "dali-lake"
  };
}

function toPackingItems(plan: BackendTravelPlan): PackingItem[] {
  return [
    ...plan.packingList.mustBring.map((group, index) => ({
      id: `must-bring-${index + 1}`,
      title: group.title,
      items: group.items,
      type: "mustBring" as const
    })),
    {
      id: "owned",
      title: "已有单品",
      items: plan.packingList.owned,
      type: "owned" as const
    },
    {
      id: "to-buy",
      title: "需要补充",
      items: plan.packingList.toBuy,
      type: "toBuy" as const
    }
  ];
}

function toOutfitItem(item: BackendProductItem): OutfitItem {
  return {
    category: item.category,
    name: item.name,
    owned: item.owned ?? false,
    price: item.price
  };
}

function toOutfit(outfit: BackendOutfit, scenes: BackendSceneAnalysis[]): Outfit {
  const scene = scenes.find((item) => item.id === outfit.sceneId);

  return {
    id: outfit.id,
    previewImage: outfit.previewImage ?? outfit.previewImageUrl ?? "",
    previewAlt: outfit.previewAlt ?? outfit.title ?? outfit.name ?? "穿搭预览",
    name: outfit.name ?? outfit.title ?? "旅行穿搭方案",
    scene: outfit.scene ?? scene?.name ?? "旅行场景",
    cameraSpot: outfit.cameraSpot ?? scene?.shotPosition ?? "现场选择顺光机位",
    style: outfit.style,
    colorScheme: outfit.colorScheme ?? outfit.palette.join(" + "),
    reason: outfit.reason,
    items: outfit.items.map(toOutfitItem),
    totalPrice: outfit.totalPrice,
    photoScore: true,
    comfortScore: true,
    slimScore: outfit.palette.length > 0,
    pose: outfit.pose
  };
}

function toPlan(plan: BackendTravelPlan): Plan {
  const outfits = plan.outfits.map((outfit) => toOutfit(outfit, plan.scenes));
  const tripDays = Math.max(1, Math.min(30, plan.actionCards.length || 3));

  return {
    id: plan.id,
    destination: plan.destination,
    weather: "请在出发前一天确认当地天气，并按方案准备轻薄外套、防晒和雨具。",
    outfits,
    packingList: toPackingItems(plan),
    actions: plan.actionCards,
    products: [],
    enhancedPacking: [],
    analysis: [
      plan.sceneAnalysis.name,
      plan.sceneAnalysis.moodKeywords.join(" / "),
      plan.sceneAnalysis.bestTime,
      plan.sceneAnalysis.compositionTips.join("；")
    ].join("。"),
    tripDays,
    gender: "不限",
    summary: {
      destination: plan.destination,
      tripDays,
      gender: "不限",
      highlights: [
        "已从后端获取场景拆解、穿搭方案和拍摄行动卡。",
        "穿搭优先标记已有单品，补充项集中在打包清单中。",
        "每个场景包含机位、构图和动作提示，可直接照着执行。"
      ],
      checklist: [
        "出发前确认天气和日落时间。",
        "按打包清单核对已有单品和需要补充的物品。",
        "拍摄前先选顺光或侧逆光机位，再执行动作卡。"
      ],
      totalBudget: plan.packingList.estimatedBudget
    },
    revisions: plan.revisions
  };
}

async function pollPlan(planId: string): Promise<BackendTravelPlan> {
  for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt += 1) {
    const result = await requestJson<ResultResponse>(`/api/result/${planId}`);

    if (result.status === "completed") {
      return result.plan;
    }

    await wait(POLL_INTERVAL_MS);
  }

  throw new Error("方案生成超时，请稍后重试。");
}

async function pollImagePlan(planId: string): Promise<ImagePlan> {
  for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt += 1) {
    const result = await requestJson<ImagePlanResultResponse>(`/api/image-plan-result/${planId}`);

    if (result.status === "completed") {
      return result.plan;
    }

    if (result.status === "failed") {
      throw new Error(result.currentStep || "图片方案生成失败，请检查豆包配置后重试。");
    }

    await wait(POLL_INTERVAL_MS);
  }

  throw new Error("图片方案生成超时，请稍后重试。");
}

export async function fetchTravelCases(): Promise<TravelCase[]> {
  const cases = await requestJson<BackendDemoCase[]>("/api/demo-cases");
  return cases.map(toTravelCase);
}

export async function fetchTravelCase(id: CaseId): Promise<TravelCase | null> {
  const cases = await fetchTravelCases();
  return cases.find((item) => item.id === id) ?? null;
}

export async function generatePlan(request?: PlanRequest): Promise<GeneratePlanResponse> {
  if (!request?.profile) {
    throw new Error("请先填写个人信息。");
  }

  const analysis = await requestJson<AnalyzeVideoResponse>("/api/analyze-video", {
    method: "POST",
    body: JSON.stringify(buildAnalyzePayload(request))
  });

  const task = await requestJson<GeneratePlanTaskResponse>("/api/generate-plan", {
    method: "POST",
    body: JSON.stringify({
      analysisId: analysis.analysisId,
      userProfile: toUserProfile(request.profile),
      destination: request.destination || undefined,
      styleKeywords: request.styleKeywords || undefined,
      sceneKeywords: request.sceneKeywords || undefined
    })
  });

  const plan = await pollPlan(task.planId);
  return { success: true, plan: toPlan(plan) };
}

export async function generateImagePlan(request?: PlanRequest): Promise<GenerateImagePlanResponse> {
  if (!request?.profile) {
    throw new Error("请先填写个人信息。");
  }

  const task = await requestJson<GenerateImagePlanTaskResponse>("/api/generate-image-plan", {
    method: "POST",
    body: JSON.stringify({
      destination: request.destination || undefined,
      demoCaseId: request.caseId || undefined,
      styleKeywords: request.styleKeywords || undefined,
      sceneKeywords: request.sceneKeywords || undefined,
      userProfile: toUserProfile(request.profile)
    })
  });

  const plan = await pollImagePlan(task.planId);
  return { success: true, plan };
}

export async function getImagePlanById(id: string): Promise<GetImagePlanResponse | null> {
  const result = await requestJson<ImagePlanResultResponse>(`/api/image-plan-result/${id}`);

  if (result.status === "processing") {
    return null;
  }

  if (result.status === "failed") {
    throw new Error(result.currentStep || "图片方案生成失败，请检查豆包配置后重试。");
  }

  return { success: true, plan: result.plan };
}

export async function getPlanById(id: string): Promise<GetPlanResponse | null> {
  const result = await requestJson<ResultResponse>(`/api/result/${id}`);

  if (result.status === "processing") {
    return null;
  }

  return { success: true, plan: toPlan(result.plan) };
}

export async function refinePlan(planId: string, instruction: string): Promise<RefinePlanResponse> {
  const result = await requestJson<RefinePlanBackendResponse>("/api/refine-plan", {
    method: "POST",
    body: JSON.stringify({ planId, instruction })
  });

  return {
    success: true,
    plan: toPlan(result.plan),
    revision: result.revision
  };
}

export async function createDemoPlan(request: PlanRequest): Promise<TravelPlan> {
  const response = await generatePlan(request);
  return {
    id: response.plan.id,
    case: {
      id: request.caseId ?? "dali-lake",
      title: response.plan.destination,
      source: "后端生成方案",
      coverImage: "",
      coverAlt: response.plan.destination,
      location: response.plan.destination,
      description: response.plan.analysis
    },
    sceneAnalysis: {
      name: response.plan.destination,
      image: "",
      imageAlt: response.plan.destination,
      moodKeywords: [],
      palette: [],
      bestTime: "",
      cameraSpots: [],
      compositionTips: []
    },
    outfits: response.plan.outfits,
    actionCards: response.plan.actions,
    packingList: {
      mustBring: response.plan.packingList
        .filter((item) => item.type === "mustBring")
        .map((item) => ({ title: item.title, items: item.items })),
      owned: response.plan.packingList.find((item) => item.type === "owned")?.items ?? [],
      toBuy: response.plan.packingList.find((item) => item.type === "toBuy")?.items ?? [],
      estimatedBudget: response.plan.summary.totalBudget
    }
  };
}

export async function fetchPlan(id: string): Promise<Plan | null> {
  const response = await getPlanById(id);
  return response?.plan ?? null;
}
