import type { TravelCase, TravelPlan } from "@/types/plan";

export const travelCases: TravelCase[] = [
  {
    id: "dali-sunset",
    title: "大理洱海日落",
    source: "抖音旅行灵感案例",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "湖边日落与远处山影",
    location: "云南大理",
    description: "湖风、落日、浅色长裙和松弛感照片。"
  },
  {
    id: "suzhou-lanes",
    title: "苏州古镇街巷",
    source: "抖音旅行灵感案例",
    coverImage:
      "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "江南街巷与白墙屋檐",
    location: "江苏苏州",
    description: "青石路、灰瓦白墙、安静又有故事感。"
  },
  {
    id: "shanghai-night",
    title: "上海都市夜景",
    source: "抖音旅行灵感案例",
    coverImage:
      "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "城市夜景与灯光",
    location: "上海",
    description: "霓虹、玻璃幕墙、利落都市感。"
  }
];

export const demoPlan: TravelPlan = {
  id: "demo",
  case: travelCases[0],
  sceneAnalysis: {
    name: "洱海西岸日落步道",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "海边步道与柔和夕阳",
    moodKeywords: ["湖风", "松弛", "柔光", "浅色系", "自然感"],
    palette: ["奶白", "雾蓝", "落日橘", "浅燕麦"],
    bestTime: "日落前 45 分钟至蓝调时刻",
    cameraSpots: ["湖边低机位回头", "栏杆侧身远景", "树影下半身近景"],
    compositionTips: ["人物放在画面右三分之一", "保留湖面留白", "用裙摆或围巾制造动势"]
  },
  outfits: [
    {
      id: "soft-lake",
      previewImage:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      previewAlt: "浅色旅行穿搭预览",
      name: "湖风奶白松弛套装",
      scene: "洱海西岸日落步道",
      cameraSpot: "湖边低机位回头",
      style: "清透度假感",
      colorScheme: "奶白 + 雾蓝 + 银色点缀",
      reason: "浅色单品能接住夕阳柔光，宽松廓形适合走动和回头抓拍。",
      items: [
        { category: "头饰", name: "奶白发带", owned: false, price: 49 },
        { category: "耳饰", name: "小号珍珠耳钉", owned: true, price: 0 },
        { category: "上衣", name: "轻薄针织短开衫", owned: false, price: 189 },
        { category: "连衣裙", name: "雾蓝吊带长裙", owned: false, price: 329 },
        { category: "袜子", name: "低筒浅灰棉袜", owned: true, price: 0 },
        { category: "鞋子", name: "米色玛丽珍平底鞋", owned: false, price: 259 },
        { category: "包", name: "小号编织托特包", owned: false, price: 199 }
      ],
      totalPrice: 1025,
      pose: "一只手压住发带，身体朝湖面，回头看镜头。"
    },
    {
      id: "sunset-walk",
      previewImage:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
      previewAlt: "落日旅行穿搭预览",
      name: "落日步道轻法式",
      scene: "湖边栏杆与树影",
      cameraSpot: "栏杆侧身远景",
      style: "轻法式旅行",
      colorScheme: "燕麦色 + 牛仔蓝 + 暖金",
      reason: "牛仔蓝和木质栏杆、湖面都很合拍，短外套能优化比例且不挑身形。",
      items: [
        { category: "头饰", name: "细边草帽", owned: false, price: 89 },
        { category: "耳饰", name: "暖金小圆环耳饰", owned: false, price: 59 },
        { category: "上衣", name: "燕麦色短外套", owned: false, price: 269 },
        { category: "下装", name: "高腰直筒牛仔裙", owned: false, price: 219 },
        { category: "袜子", name: "奶油色中筒袜", owned: true, price: 0 },
        { category: "鞋子", name: "棕色低跟乐福鞋", owned: false, price: 299 },
        { category: "包", name: "焦糖色腋下包", owned: false, price: 239 }
      ],
      totalPrice: 1174,
      pose: "身体侧向栏杆，脚尖向前延伸，视线看向湖面远处。"
    },
    {
      id: "blue-hour",
      previewImage:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      previewAlt: "蓝调时刻穿搭预览",
      name: "蓝调时刻温柔层次",
      scene: "树影下近景",
      cameraSpot: "树影下半身近景",
      style: "温柔层次感",
      colorScheme: "米灰 + 浅驼 + 银灰",
      reason: "层次穿搭在蓝调时刻更有轮廓，近景能突出配饰和面料质感。",
      items: [
        { category: "头饰", name: "银灰抓夹", owned: true, price: 0 },
        { category: "耳饰", name: "水滴耳线", owned: false, price: 79 },
        { category: "上衣", name: "米灰衬衫叠穿背心", owned: false, price: 258 },
        { category: "下装", name: "浅驼半身伞裙", owned: false, price: 289 },
        { category: "袜子", name: "薄款灰色堆堆袜", owned: false, price: 39 },
        { category: "鞋子", name: "浅色运动休闲鞋", owned: true, price: 0 },
        { category: "包", name: "银灰斜挎小包", owned: false, price: 229 }
      ],
      totalPrice: 894,
      pose: "手扶包带微微低头，另一只手整理袖口，适合半身近景。"
    }
  ],
  actionCards: [
    {
      id: "lake-lookback",
      scene: "洱海西岸日落步道",
      time: "18:20-18:45",
      cameraSpot: "湖边低机位回头",
      composition: "镜头略低，人物占右侧三分之一，湖面作为背景留白。",
      pose: "慢走两步后自然回头，手轻压发带或整理头发。",
      notes: ["避开正午强光", "风大时用发带固定碎发", "浅色衣物准备防晒披肩"]
    },
    {
      id: "rail-side",
      scene: "栏杆与湖边树影",
      time: "17:50-18:20",
      cameraSpot: "栏杆侧身远景",
      composition: "让栏杆线条从画面左下延伸到人物，增加旅行叙事感。",
      pose: "侧身靠近栏杆，脚尖向前，视线看向远处。",
      notes: ["注意栏杆反光", "包放在靠镜头一侧", "裙摆不要完全贴腿"]
    },
    {
      id: "tree-close",
      scene: "树影下近景",
      time: "19:00-19:15",
      cameraSpot: "树影下半身近景",
      composition: "用树叶作前景，人物上半身居中，背景轻微虚化。",
      pose: "低头整理袖口或包带，表情放松。",
      notes: ["蓝调时刻光线较暗", "手机可开启人像模式", "配饰靠近脸侧更出片"]
    }
  ],
  packingList: {
    mustBring: [
      {
        title: "穿搭单品",
        items: ["连衣裙或半身裙", "浅色外套", "舒适鞋", "小包", "袜子"]
      },
      {
        title: "拍照辅助",
        items: ["发带或抓夹", "耳饰", "便携补妆镜", "防晒披肩"]
      },
      {
        title: "旅行基础",
        items: ["身份证件", "充电宝", "纸巾", "防晒霜", "轻便雨具"]
      }
    ],
    owned: ["珍珠耳钉", "浅灰棉袜", "银灰抓夹", "浅色运动休闲鞋"],
    toBuy: ["雾蓝吊带长裙", "米色玛丽珍平底鞋", "小号编织托特包", "水滴耳线"],
    estimatedBudget: 3093
  }
};
