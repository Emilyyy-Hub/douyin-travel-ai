import { getDemoCaseById } from "../data/demo-cases";
import type {
  ActionItem,
  DemoCaseId,
  PackingChecklistItem,
  PackingList,
  ProductItem,
  SceneAnalysis,
  StoredAnalysis,
  TravelCaseCompat,
  TravelPlan
} from "../types";
import { createId } from "../utils/ids";
import type { GeneratePlanInput, PlanGenerator } from "./plan-generator";

const imageBaseByDestination: Record<string, string> = {
  "云南大理": "/demo/dali-outfit",
  "江苏苏州": "/demo/suzhou-outfit",
  "上海": "/demo/shanghai-outfit"
};

const stylePresets: Record<string, Array<{ title: string; style: string; palette: string[]; pose: string }>> = {
  "云南大理": [
    {
      title: "湖风奶白松弛套装",
      style: "清透法式度假",
      palette: ["奶白", "雾蓝", "银色"],
      pose: "一只手压住发带，身体朝湖面，回头看镜头。"
    },
    {
      title: "落日步道轻法式",
      style: "轻法式旅行",
      palette: ["燕麦色", "牛仔蓝", "暖金"],
      pose: "身体侧向栏杆，脚尖向前延伸，视线看向湖面远处。"
    },
    {
      title: "蓝调时刻温柔层次",
      style: "温柔浅色层次",
      palette: ["米灰", "浅驼", "银灰"],
      pose: "手扶包带微微低头，另一只手整理袖口。"
    }
  ],
  "江苏苏州": [
    {
      title: "月白竹青新中式",
      style: "温婉新中式",
      palette: ["月白", "竹青", "墨灰"],
      pose: "手扶白墙慢走，回头看向巷口光线。"
    },
    {
      title: "藕粉水巷轻复古",
      style: "轻复古文艺",
      palette: ["藕粉", "烟灰", "檀木色"],
      pose: "一手轻搭桥栏，侧脸看向水面。"
    },
    {
      title: "灰瓦街巷低饱和",
      style: "低饱和文艺通勤",
      palette: ["米白", "石灰", "淡杏"],
      pose: "低头整理手包，脚步停在青石路中线。"
    }
  ],
  "上海": [
    {
      title: "外滩银灰利落套装",
      style: "都市利落夜景",
      palette: ["炭黑", "银灰", "冷白"],
      pose: "侧身扶栏看向灯光，肩线打开。"
    },
    {
      title: "霓虹酒红短外套",
      style: "轻熟高反差",
      palette: ["酒红", "黑色", "金属银"],
      pose: "单手插袋，另一只手拿小包自然下垂。"
    },
    {
      title: "街角机能抓拍",
      style: "机能都市感",
      palette: ["黑色", "电光蓝", "番茄红"],
      pose: "走过街角自然回头，外套搭在肩上。"
    }
  ]
};

const itemTemplates: Record<string, Array<Omit<ProductItem, "id" | "imageUrl" | "purchaseUrl">>> = {
  "云南大理": [
    { category: "头饰", name: "奶白防风发带", price: 49, owned: false },
    { category: "耳饰", name: "小号珍珠耳钉", price: 0, owned: true },
    { category: "上衣", name: "轻薄针织短开衫", price: 189, owned: false },
    { category: "连衣裙", name: "雾蓝吊带长裙", price: 329, owned: false },
    { category: "袜子", name: "低筒浅灰棉袜", price: 0, owned: true },
    { category: "鞋子", name: "米色玛丽珍平底鞋", price: 259, owned: false },
    { category: "包", name: "小号编织托特包", price: 199, owned: false },
    { category: "外搭", name: "浅燕麦防晒披肩", price: 129, owned: false }
  ],
  "江苏苏州": [
    { category: "头饰", name: "竹青细发簪", price: 59, owned: false },
    { category: "耳饰", name: "米白玉石耳坠", price: 89, owned: false },
    { category: "上衣", name: "月白盘扣短衫", price: 239, owned: false },
    { category: "下装", name: "墨灰高腰半身裙", price: 269, owned: false },
    { category: "袜子", name: "米色薄款短袜", price: 0, owned: true },
    { category: "鞋子", name: "软底浅口单鞋", price: 299, owned: false },
    { category: "包", name: "檀木色手提小包", price: 219, owned: false },
    { category: "外搭", name: "淡杏薄纱外衫", price: 169, owned: false }
  ],
  "上海": [
    { category: "头饰", name: "银色细发箍", price: 69, owned: false },
    { category: "耳饰", name: "金属几何耳环", price: 99, owned: false },
    { category: "上衣", name: "冷白修身打底衫", price: 159, owned: false },
    { category: "下装", name: "炭黑高腰直筒裤", price: 329, owned: false },
    { category: "袜子", name: "黑色薄棉中筒袜", price: 0, owned: true },
    { category: "鞋子", name: "方头低跟短靴", price: 399, owned: false },
    { category: "包", name: "银扣腋下小包", price: 289, owned: false },
    { category: "外搭", name: "酒红短款西装外套", price: 459, owned: false }
  ]
};

const frontendCaseIdByDemoCaseId: Record<DemoCaseId, "dali-sunset" | "suzhou-lanes" | "shanghai-night"> = {
  "dali-lake": "dali-sunset",
  "suzhou-lanes": "suzhou-lanes",
  "shanghai-night": "shanghai-night"
};

function safePurchaseUrl(name: string): string {
  return `https://example.com/mock-search?q=${encodeURIComponent(name)}`;
}

function buildItems(destination: string, outfitIndex: number): ProductItem[] {
  const templates = itemTemplates[destination] ?? itemTemplates["云南大理"];

  return templates.map((item, index) => ({
    ...item,
    id: `item_${outfitIndex + 1}_${index + 1}`,
    imageUrl: `${imageBaseByDestination[destination] ?? "/demo/item"}-${outfitIndex + 1}-${index + 1}.jpg`,
    purchaseUrl: safePurchaseUrl(item.name)
  }));
}

function buildPackingList(outfits: Array<{ items: ProductItem[] }>): PackingList {
  const uniqueItems = new Map<string, PackingChecklistItem>();

  for (const outfit of outfits) {
    for (const item of outfit.items) {
      if (!uniqueItems.has(item.name)) {
        uniqueItems.set(item.name, {
          id: createId("item"),
          category: item.category,
          name: item.name,
          quantity: 1,
          owned: item.owned ?? false,
          estimatedPrice: item.price
        });
      }
    }
  }

  const items = Array.from(uniqueItems.values());
  const ownedItems = items.filter((item) => item.owned);
  const toBuyItems = items.filter((item) => !item.owned);
  const estimatedBudget = toBuyItems.reduce((sum, item) => sum + item.estimatedPrice * item.quantity, 0);

  return {
    items,
    ownedItems,
    toBuyItems,
    estimatedBudget,
    mustBring: [
      { title: "证件与基础物品", items: ["身份证件", "充电宝", "纸巾", "防晒用品"] },
      { title: "拍照辅助", items: ["发饰", "耳饰", "便携补妆镜", "小包"] },
      { title: "穿搭备份", items: ["舒适鞋", "袜子", "外搭", "防晒或防风单品"] }
    ],
    owned: ownedItems.map((item) => item.name),
    toBuy: toBuyItems.map((item) => item.name)
  };
}

function buildCaseCompat(storedAnalysis: StoredAnalysis): TravelCaseCompat {
  const demoCaseId: DemoCaseId =
    storedAnalysis.analysis.source.title.includes("苏州")
      ? "suzhou-lanes"
      : storedAnalysis.analysis.source.title.includes("上海")
        ? "shanghai-night"
        : "dali-lake";
  const demoCase = getDemoCaseById(demoCaseId);

  return {
    id: frontendCaseIdByDemoCaseId[demoCaseId],
    title: storedAnalysis.analysis.source.title,
    source: "抖音旅行灵感案例",
    coverImage: storedAnalysis.analysis.source.coverUrl,
    coverAlt: `${storedAnalysis.analysis.destination}旅行灵感封面`,
    location: storedAnalysis.analysis.destination,
    description: demoCase?.description ?? "Mock旅行灵感案例"
  };
}

function buildSceneCompat(scene: SceneAnalysis) {
  return {
    name: scene.name,
    image: scene.imageUrl,
    imageAlt: scene.name,
    moodKeywords: scene.keywords,
    palette: scene.palette,
    bestTime: scene.bestTime,
    cameraSpots: [scene.shotPosition],
    compositionTips: [scene.composition]
  };
}

function buildActionCards(scenes: SceneAnalysis[]): ActionItem[] {
  return scenes.slice(0, 3).map((scene, index) => ({
    id: `action_${index + 1}`,
    scene: scene.name,
    time: scene.bestTime,
    cameraSpot: scene.shotPosition,
    composition: scene.composition,
    pose: scene.poses[0] ?? "自然站立，看向画面外光源。",
    notes: [scene.lighting, `推荐色：${scene.recommendedColors.join(" / ")}`, "当前内容为Mock生成，可替换真实AI Provider"]
  }));
}

export class MockPlanGenerator implements PlanGenerator {
  public async generate(input: GeneratePlanInput): Promise<TravelPlan> {
    const { planId, storedAnalysis, userProfile } = input;
    const destination = storedAnalysis.analysis.destination;
    const styles = stylePresets[destination] ?? stylePresets["云南大理"];

    const outfits = styles.map((style, index) => {
      const scene = storedAnalysis.analysis.scenes[index % storedAnalysis.analysis.scenes.length];
      const items = buildItems(destination, index);
      const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
      const reason = [
        `${style.palette.join("、")}能呼应${scene.name}的光线和背景。`,
        `结合你的${userProfile.preferredStyle}偏好、${userProfile.shoePreference}和${userProfile.photoGoal}目标，保留舒适活动空间与清晰比例。`
      ].join("");

      return {
        id: `outfit_${index + 1}`,
        title: style.title,
        sceneId: scene.id,
        previewImageUrl: `${imageBaseByDestination[destination] ?? "/demo/outfit"}-${index + 1}.jpg`,
        style: style.style,
        palette: style.palette,
        reason,
        totalPrice,
        pose: style.pose,
        items,
        previewImage: `${imageBaseByDestination[destination] ?? "/demo/outfit"}-${index + 1}.jpg`,
        previewAlt: style.title,
        name: style.title,
        scene: scene.name,
        cameraSpot: scene.shotPosition,
        colorScheme: style.palette.join(" + ")
      };
    });

    return {
      planId,
      destination,
      sourceVideo: storedAnalysis.analysis.source,
      scenes: storedAnalysis.analysis.scenes,
      outfits,
      packingList: buildPackingList(outfits),
      id: planId,
      case: buildCaseCompat(storedAnalysis),
      sceneAnalysis: buildSceneCompat(storedAnalysis.analysis.scenes[0]),
      actionCards: buildActionCards(storedAnalysis.analysis.scenes)
    };
  }
}
