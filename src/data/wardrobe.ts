export interface WardrobeStyle {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
  heroItem: string;
  scene: string;
  tags: string[];
}

export const wardrobeStyles: WardrobeStyle[] = [
  {
    id: "french-relaxed",
    label: "法式松弛",
    image: "/wardrobe/french-relaxed.jpg",
    imageAlt: "法式松弛风针织开衫与半身裙示例",
    heroItem: "针织开衫 + 中长半身裙",
    scene: "湖边、咖啡馆、古城街角",
    tags: ["柔软针织", "浅色系", "低跟鞋"]
  },
  {
    id: "modern-chinese",
    label: "新中式",
    image: "/wardrobe/modern-chinese.jpg",
    imageAlt: "新中式盘扣上衣与墨灰半裙示例",
    heroItem: "盘扣短衫 + 墨灰半裙",
    scene: "园林、古镇、白墙灰瓦",
    tags: ["盘扣", "月白", "竹青"]
  },
  {
    id: "sweet-cool",
    label: "甜酷",
    image: "/wardrobe/sweet-cool.jpg",
    imageAlt: "甜酷短外套与百褶裙示例",
    heroItem: "短外套 + 百褶裙",
    scene: "街区、夜市、城市快闪",
    tags: ["短外套", "金属点缀", "层次感"]
  },
  {
    id: "urban-sharp",
    label: "都市利落",
    image: "/wardrobe/urban-sharp.jpg",
    imageAlt: "都市利落西装与直筒裤示例",
    heroItem: "短西装 + 直筒裤",
    scene: "外滩、天台、玻璃幕墙",
    tags: ["高腰线", "冷色调", "利落剪裁"]
  },
  {
    id: "japanese-minimal",
    label: "日系简约",
    image: "/wardrobe/japanese-minimal.jpg",
    imageAlt: "日系简约棉衬衫与宽松长裤示例",
    heroItem: "棉质衬衫 + 宽松长裤",
    scene: "书店、海边步道、慢旅行",
    tags: ["棉麻", "宽松", "干净线条"]
  },
  {
    id: "seaside-vacation",
    label: "海边度假",
    image: "/wardrobe/seaside-vacation.jpg",
    imageAlt: "海边度假轻薄连衣裙与草编包示例",
    heroItem: "轻薄连衣裙 + 草编包",
    scene: "海岛、湖畔、日落草坪",
    tags: ["轻盈", "草编", "防晒外搭"]
  },
  {
    id: "gentle-commute",
    label: "温柔通勤",
    image: "/wardrobe/gentle-commute.jpg",
    imageAlt: "温柔通勤衬衫与利落半裙示例",
    heroItem: "柔软衬衫 + 利落半裙",
    scene: "美术馆、城市公园、短途旅行",
    tags: ["柔和色", "好走动", "可复穿"]
  },
  {
    id: "vintage-literary",
    label: "复古文艺",
    image: "/wardrobe/vintage-literary.jpg",
    imageAlt: "复古文艺马甲衬衫与格纹裙示例",
    heroItem: "马甲衬衫 + 格纹裙",
    scene: "老街、书店、秋日公园",
    tags: ["格纹", "棕调", "故事感"]
  }
];
