import type { StoredAnalysis, TravelPlan, UserProfile } from "../types";

export interface GeneratePlanInput {
  planId: string;
  storedAnalysis: StoredAnalysis;
  userProfile: UserProfile;
}

export interface PlanGenerator {
  generate(input: GeneratePlanInput): Promise<TravelPlan>;
}
