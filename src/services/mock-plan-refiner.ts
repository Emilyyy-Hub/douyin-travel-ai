import type { OutfitPlan, PlanRevision, ProductItem, TravelPlan } from "../types";
import { createId } from "../utils/ids";

interface RefinementResult {
  plan: TravelPlan;
  revision: PlanRevision;
}

function includesAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function parseBudget(text: string): number | null {
  const match = text.match(/(?:预算|控制|不超过|以内|少于)\D{0,6}(\d{2,5})/);
  return match ? Number(match[1]) : null;
}

function withUniqueNote(notes: string[], note: string): string[] {
  return notes.includes(note) ? notes : [...notes, note];
}

function tuneForHeight(outfit: OutfitPlan): OutfitPlan {
  return {
    ...outfit,
    reason: `${outfit.reason} 已按“比例更利落”调整：提高腰线、减少横向分割，拍照时让脚尖靠近画面下沿。`,
    pose: `${outfit.pose} 站姿增加一脚向前延伸，镜头略低于腰线，比例会更修长。`,
    colorScheme: outfit.colorScheme.includes("高腰线") ? outfit.colorScheme : `${outfit.colorScheme} + 高腰线`
  };
}

function tuneCoverage(outfit: OutfitPlan): OutfitPlan {
  const items = outfit.items.map((item) => {
    if (item.category.includes("上") || item.category.includes("外") || item.name.includes("吊带")) {
      return {
        ...item,
        name: item.name
          .replace(/吊带/g, "方领")
          .replace(/露肩/g, "小圆领")
          .replace(/背心/g, "短袖上衣")
      };
    }

    return item;
  });

  return {
    ...outfit,
    items,
    reason: `${outfit.reason} 已降低露肤度：肩颈位置改为小圆领、方领或轻薄外搭，保留清爽感但不露肩。`
  };
}

function tuneMood(outfit: OutfitPlan): OutfitPlan {
  return {
    ...outfit,
    style: outfit.style.includes("电影感") ? outfit.style : `${outfit.style} / 电影感`,
    reason: `${outfit.reason} 氛围改得更像电影截图：降低网红感，增加低饱和配色、侧逆光和留白构图。`
  };
}

function tuneBudgetItem(item: ProductItem, budget: number, index: number): ProductItem {
  if (item.owned) return item;

  const maxPrice = Math.max(39, Math.floor(budget / 3));
  return {
    ...item,
    price: index > 2 ? 0 : Math.min(item.price, maxPrice),
    owned: index > 2,
    name: index > 2 ? `${item.name}（建议从衣橱替代）` : item.name
  };
}

function tuneBudget(outfit: OutfitPlan, budget: number): OutfitPlan {
  const items = outfit.items.map((item, index) => tuneBudgetItem(item, budget, index));
  const totalPrice = items.reduce((sum, item) => sum + (item.owned ? 0 : item.price), 0);

  return {
    ...outfit,
    items,
    totalPrice,
    reason: `${outfit.reason} 已按${budget}元预算收紧：优先复用已有衣物，只保留最影响出片的低价补充项。`
  };
}

function rebuildPackingList(plan: TravelPlan, budget: number | null): TravelPlan["packingList"] {
  const uniqueItems = new Map<string, ProductItem>();

  for (const outfit of plan.outfits) {
    for (const item of outfit.items) {
      if (!uniqueItems.has(item.name)) {
        uniqueItems.set(item.name, item);
      }
    }
  }

  const items = Array.from(uniqueItems.values()).map((item) => ({
    id: item.id,
    category: item.category,
    name: item.name,
    quantity: 1,
    owned: item.owned ?? false,
    estimatedPrice: item.owned ? 0 : item.price
  }));
  const ownedItems = items.filter((item) => item.owned);
  const toBuyItems = items.filter((item) => !item.owned);
  const estimatedBudget = Math.min(
    toBuyItems.reduce((sum, item) => sum + item.estimatedPrice, 0),
    budget ?? Number.POSITIVE_INFINITY
  );

  return {
    ...plan.packingList,
    items,
    ownedItems,
    toBuyItems,
    estimatedBudget,
    owned: ownedItems.map((item) => item.name),
    toBuy: toBuyItems.map((item) => item.name)
  };
}

export class MockPlanRefiner {
  public refine(plan: TravelPlan, instruction: string): RefinementResult {
    const normalized = instruction.toLowerCase();
    const budget = parseBudget(instruction);
    const wantsHeight = includesAny(instruction, ["显高", "显腿长", "比例", "修长"]);
    const wantsCoverage = includesAny(instruction, ["不露肩", "少露肤", "不露腿", "保守", "遮肉"]);
    const wantsMood = includesAny(instruction, ["电影感", "不想太网红", "不要太网红", "高级", "低调"]);
    const appliedChanges: string[] = [];

    let outfits = plan.outfits;
    if (wantsHeight) {
      outfits = outfits.map(tuneForHeight);
      appliedChanges.push("比例更利落");
    }

    if (wantsCoverage) {
      outfits = outfits.map(tuneCoverage);
      appliedChanges.push("降低露肤度");
    }

    if (wantsMood || normalized.includes("cinematic")) {
      outfits = outfits.map(tuneMood);
      appliedChanges.push("降低网红感并增强电影感");
    }

    if (budget !== null) {
      outfits = outfits.map((outfit) => tuneBudget(outfit, budget));
      appliedChanges.push(`预算控制在${budget}元以内`);
    }

    if (appliedChanges.length === 0) {
      outfits = outfits.map((outfit) => ({
        ...outfit,
        reason: `${outfit.reason} 已根据你的要求做轻量微调：保留原风格，减少执行负担。`
      }));
      appliedChanges.push("按自然语言要求做轻量微调");
    }

    const revisedPlan: TravelPlan = {
      ...plan,
      outfits,
      actionCards: plan.actionCards.map((action) => ({
        ...action,
        notes: withUniqueNote(action.notes, `本轮调整：${appliedChanges.join("、")}。`)
      })),
      revisions: [
        ...(plan.revisions ?? []),
        {
          id: createId("revision"),
          instruction,
          summary: `已按你的要求完成调整：${appliedChanges.join("、")}。`,
          appliedChanges,
          createdAt: new Date().toISOString()
        }
      ]
    };

    revisedPlan.packingList = rebuildPackingList(revisedPlan, budget);

    return {
      plan: revisedPlan,
      revision: revisedPlan.revisions?.[revisedPlan.revisions.length - 1] as PlanRevision
    };
  }
}
