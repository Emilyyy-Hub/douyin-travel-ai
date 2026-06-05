import { demoPlan, travelCases } from "@/data/mock-plan";
import type { CaseId, PlanRequest, TravelCase, TravelPlan } from "@/types/plan";

const NETWORK_DELAY = 450;

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function fetchTravelCases(): Promise<TravelCase[]> {
  await wait(NETWORK_DELAY);
  return travelCases;
}

export async function fetchTravelCase(id: CaseId): Promise<TravelCase | null> {
  await wait(NETWORK_DELAY);
  return travelCases.find((item) => item.id === id) ?? null;
}

export async function createDemoPlan(request: PlanRequest): Promise<TravelPlan> {
  await wait(NETWORK_DELAY);
  const selectedCase =
    travelCases.find((item) => item.id === request.caseId) ?? travelCases[0];

  return {
    ...demoPlan,
    case: selectedCase
  };
}

export async function fetchPlan(id: string): Promise<TravelPlan | null> {
  await wait(NETWORK_DELAY);
  if (id !== "demo") {
    return null;
  }

  return demoPlan;
}
