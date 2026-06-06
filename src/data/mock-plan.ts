import type {
  TravelCase, TravelPlan, ProductItem, EnhancedPackingItem, PlanSummary
} from "@/types/plan";

export const travelCases: TravelCase[] = [
  {
    id: "dali-sunset",
    title: "大理洛海日落",
    source: "抖音旅行灵感案例",
    coverImage:
      "?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "湖边日落与远处山影",
    location: "云南大理",
    description: "湖风、落日、浅色长裙和松弛感照片。"
  },
  {
    id: "suzhou-lanes",
    title: "苏州古镇街巷",
    source: "抖音旅行灵感案例",
    coverImage:
      "?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "江南街巷与白墙屋檐",
    location: "江苏苏州",
    description: "青石路、灰瓦白墙、安静又有故事感。"
  },
  {
    id: "shanghai-night",
    title: "上海都市夜景",
    source: "抖音旅行灵感案例",
    coverImage:
      "?auto=format&fit=crop&w=1200&q=80",
    coverAlt: "城市夜景与灯光",
    location: "上海",
    description: "霓虹、玻璃幕墙、利落都市感。"
  }
];

export const productCatalog: ProductItem[] = [
  // 穿搭类
  { id: "p1", name: "奶白防风发带", category: "穿搭类", reason: "湖边风大，发带固定碎发且提升松弛感", priceRange: "50-80", priority: "推荐", imageUrl: "/demo/item-hairband.jpg" },
  { id: "p2", name: "雾蓝吊带长裙", category: "穿搭类", reason: "修身剪裁显腰线，浅色接住夕阳柔光非常上镜", priceRange: "280-380", priority: "必买" },
  { id: "p3", name: "米色玛丽珍平底鞋", category: "穿搭类", reason: "舒适好走且百搭，适合湖边步道长时间活动", priceRange: "200-300", priority: "必买" },
  { id: "p4", name: "小号编织托特包", category: "穿搭类", reason: "浅色编织包增加层次感，小号不抢镜头且能装手机", priceRange: "150-250", priority: "推荐" },
  { id: "p5", name: "硬质平顶草帽", category: "穿搭类", reason: "遮阳同时作为拍照道具，提升法式松弛感", priceRange: "80-120", priority: "推荐" },

  // 拍照类
  { id: "p6", name: "蓝牙自拍遥控器", category: "拍照类", reason: "没有陷伴也能拍全身照，配合手机三脚架轻松出片", priceRange: "30-60", priority: "必买" },
  { id: "p7", name: "便携手机三脚架", category: "拍照类", reason: "稳定低机位拍摄，可快速调整高度取景", priceRange: "40-80", priority: "必买" },
  { id: "p8", name: "便携补光灯", category: "拍照类", reason: "蓝调时刻光线较暗时补光，拍半身近景更通透", priceRange: "60-120", priority: "推荐" },
  { id: "p9", name: "纱巾/围巾小道具", category: "拍照类", reason: "拿在手上或搭在肩上，增加动感和层次，非常上镜", priceRange: "20-50", priority: "推荐" },

  // 旅行必备类
  { id: "p10", name: "高倍防晒霜", category: "旅行必备类", reason: "海拔较高UV强，浅色穿搭更需要防晒", priceRange: "80-150", priority: "必买" },
  { id: "p11", name: "充电宝10000mAh", category: "旅行必备类", reason: "拍摄一整天手机电量不够，必须带充电宝", priceRange: "80-120", priority: "必买" },
  { id: "p12", name: "便携收纳袋套装", category: "旅行必备类", reason: "分类收纳衣物、鞋子、拍照道具，打包更整洁", priceRange: "30-60", priority: "推荐" },
  { id: "p13", name: "紧急药品包（晕车药+创可贴）", category: "旅行必备类", reason: "备用内外伤药品，贴身携带不占空间", priceRange: "40-80", priority: "推荐" },
  { id: "p14", name: "便携雨伞（小号）", category: "旅行必备类", reason: "大理夏季午后可能突降雨，防晒又防雨", priceRange: "40-80", priority: "可选" },
];

export const enhancedPackingList: EnhancedPackingItem[] = [
  {
    category: "服装类",
    label: "必带",
    items: ["浅色连衣裙×1", "外套×1", "舒适平底鞋×1", "内衣×3套", "袜子×3双"]
  },
  {
    category: "服装类",
    label: "推荐",
    items: ["宽松短裤×1", "沙滩鞋×1", "披肩/丝巾×1"]
  },
  {
    category: "拍照类",
    label: "必带",
    items: ["手机三脚架", "蓝牙遥控器", "充电宝"]
  },
  {
    category: "拍照类",
    label: "拍照加分项",
    items: ["编织包", "草帽", "发带", "耳饰多副", "纱巾小道具"]
  },
  {
    category: "护肤防晒类",
    label: "必带",
    items: ["防晒霜SPF50+", "唇膏", "卸妆湿巾", "旅行装洗面奶"]
  },
  {
    category: "护肤防晒类",
    label: "推荐",
    items: ["保湿面膜×2片", "防晒喷雾（随身补涂）"]
  },
  {
    category: "电子设备类",
    label: "必带",
    items: ["手机+充电线", "充电宝", "多口充电头"]
  },
  {
    category: "电子设备类",
    label: "推荐",
    items: ["相机（若有）", "备用SD卡"]
  },
  {
    category: "证件生活类",
    label: "必带",
    items: ["身份证", "几百元现金", "纸巾", "金融卡/手机支付"]
  },
  {
    category: "应急药品类",
    label: "必带",
    items: ["晕车药", "创可贴", "感冒药"]
  },
  {
    category: "应急药品类",
    label: "可选",
    items: ["膛炙止痒膏", "肠胃药"]
  },
];

export const demoPlanSummary: PlanSummary = {
  destination: "云南大理",
  tripDays: 3,
  gender: "女",
  highlights: [
    "每天都有针对日落时段的穿搭方案",
    "包含湖边、栫栏、树影三个经典机位的拍照指导",
    "商品清单覆盖穿搭、拍照、旅行三大类，每件都有优先级",
    "打包清单分类细致，直接照着检查即可"
  ],
  checklist: [
    "确认三天气预报（大理夏季日落前后可能降温，带一件轻薄外套）",
    "提前充电：手机、充电宝、相机电池",
    "出发前确认自拍遥控器已配对",
    "提前下载离线地图，洛海西岸部分区域信号偏弱",
    "如果想拍蓝调时刻，建议带一件暖色调围巾披在肩上，既保暖又是拍照道具"
  ],
  totalBudget: 1344
};

export const demoPlan: TravelPlan = {
  id: "demo",
  case: travelCases[0],
  sceneAnalysis: {
    name: "洛海西岸日落步道",
    image:
      "?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "海边步道与柔和夕阳",
    moodKeywords: ["湖风", "松弛", "柔光", "浅色系", "自然感"],
    palette: ["奶白", "雾蓝", "落日橙", "浅燕麦"],
    bestTime: "日落前45分钟至蓝调时刻",
    cameraSpots: ["湖边低机位回头", "栏杆侧身远景", "树影下半身近景"],
    compositionTips: ["人物放在画面右三分之一", "保留湖面留白", "用裙摆或围巾制造动劲"]
  },
  outfits: [
    {
      id: "soft-lake",
      previewImage:
        "?auto=format&fit=crop&w=900&q=80",
      previewAlt: "浅色旅行穿搭预览",
      name: "湖风奶白松弛套装",
      scene: "洛海西岸日落步道",
      cameraSpot: "湖边低机位回头",
      style: "清透度假感",
      colorScheme: "奶白 + 雾蓝 + 银色点缀",
      reason: "浅色单品能接住夕阳柔光，宽松廈形适合走动和回头抓拍。",
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
      photoScore: true,
      comfortScore: true,
      slimScore: true,
      pose: "一只手压住发带，身体朝湖面，回头看镜头。"
    },
    {
      id: "sunset-walk",
      previewImage:
        "?auto=format&fit=crop&w=900&q=80",
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
        { category: "下装", name: "高腰直筒牛仔裤", owned: false, price: 219 },
        { category: "袜子", name: "奶油色中筒袜", owned: true, price: 0 },
        { category: "鞋子", name: "棕色低跟乐福鞋", owned: false, price: 299 },
        { category: "包", name: "焦糖色腋下包", owned: false, price: 239 }
      ],
      totalPrice: 1174,
      photoScore: true,
      comfortScore: true,
      slimScore: false,
      pose: "身体侧向栏杆，脚尖向前延伸，视线看向湖面远处。"
    },
    {
      id: "blue-hour",
      previewImage:
        "?auto=format&fit=crop&w=900&q=80",
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
      photoScore: true,
      comfortScore: false,
      slimScore: true,
      pose: "手扶包带微微低头，另一只手整理袖口，适合半身近景。"
    }
  ],
  actionCards: [
    {
      id: "lake-lookback",
      scene: "洛海西岸日落步道",
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
