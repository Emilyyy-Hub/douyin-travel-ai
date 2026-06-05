import { demoPlan, travelCases } from "@/data/mock-plan";
import type {
  CaseId,
  GeneratePlanResponse,
  GetPlanResponse,
  PackingItem,
  Plan,
  PlanRequest,
  TravelCase,
  TravelPlan
} from "@/types/plan";

const MOCK_NETWORK_DELAY = 1500;
const SHORT_NETWORK_DELAY = 450;

// TODO: Replace Mock API With Real Backend
// Reserved backend contracts:
// POST /api/analyze-video
// POST /api/generate-plan
// GET /api/result/:id

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
  });
}

function toPackingItems(plan: TravelPlan): PackingItem[] {
  const mustBring = plan.packingList.mustBring.map((group, index) => ({
    id: `must-bring-${index + 1}`,
    title: group.title,
    items: group.items,
    type: "mustBring" as const
  }));

  return [
    ...mustBring,
    {
      id: "owned",
      title: "已拥有",
      items: plan.packingList.owned,
      type: "owned"
    },
    {
      id: "to-buy",
      title: "需要购买",
      items: plan.packingList.toBuy,
      type: "toBuy"
    }
  ];
}

function toPlan(plan: TravelPlan): Plan {
  return {
    id: plan.id,
    destination: plan.case.location,
    weather: "晴到多云，傍晚光线柔和，建议准备轻薄外套。",
    outfits: plan.outfits,
    packingList: toPackingItems(plan),
    actions: plan.actionCards,
    analysis: [
      plan.sceneAnalysis.name,
      plan.sceneAnalysis.moodKeywords.join(" / "),
      plan.sceneAnalysis.bestTime,
      plan.sceneAnalysis.compositionTips.join("；")
    ].join("。")
  };
}

function getMockTravelPlan(id: string): TravelPlan | null {
  if (id !== "demo") {
    return null;
  }

  return demoPlan;
}

export async function fetchTravelCases(): Promise<TravelCase[]> {
  await wait(SHORT_NETWORK_DELAY);
  return travelCases;
}

export async function fetchTravelCase(id: CaseId): Promise<TravelCase | null> {
  await wait(SHORT_NETWORK_DELAY);
  return travelCases.find((item) => item.id === id) ?? null;
}

export async function generatePlan(request?: PlanRequest): Promise<GeneratePlanResponse> {
  await wait(MOCK_NETWORK_DELAY);

  const selectedCase =
    travelCases.find((item) => item.id === request?.caseId) ?? demoPlan.case;
  const travelPlan: TravelPlan = {
    ...demoPlan,
    id: "demo",
    case: selectedCase
  };

  return {
    success: true,
    plan: toPlan(travelPlan)
  };
}

export async function getPlanById(id: string): Promise<GetPlanResponse | null> {
  await wait(SHORT_NETWORK_DELAY);
  const plan = getMockTravelPlan(id);

  if (!plan) {
    return null;
  }

  return {
    success: true,
    plan: toPlan(plan)
  };
}

export async function createDemoPlan(request: PlanRequest): Promise<TravelPlan> {
  const response = await generatePlan(request);
  const selectedCase =
    travelCases.find((item) => item.id === request.caseId) ?? demoPlan.case;

  return {
    ...demoPlan,
    id: response.plan.id,
    case: selectedCase
  };
}

export async function fetchPlan(id: string): Promise<Plan | null> {
  const response = await getPlanById(id);
  return response?.plan ?? null;
}
