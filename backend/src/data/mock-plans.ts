import type { DemoCaseId, SceneAnalysis } from "../types";

export const scenePresets: Record<DemoCaseId, SceneAnalysis[]> = {
  "dali-lake": [
    {
      id: "scene_dali_lake_walk",
      name: "洱海西岸日落步道",
      imageUrl: "/demo/dali-scene-lake.jpg",
      keywords: ["湖风", "柔光", "浅色系", "自然松弛"],
      palette: ["奶白", "雾蓝", "落日橘", "浅燕麦"],
      lighting: "日落前低角度暖光，湖面反射让脸部更柔和",
      bestTime: "日落前45分钟至蓝调时刻",
      shotPosition: "湖边低机位回头",
      composition: "人物放在右三分之一，保留湖面和天空留白",
      recommendedStyles: ["法式松弛", "清透度假", "轻户外层次"],
      recommendedColors: ["奶白", "雾蓝", "浅燕麦", "银色"],
      avoidColors: ["荧光绿", "高饱和玫红", "大面积纯黑"],
      poses: ["慢走两步自然回头", "手轻压发带", "侧身看向湖面"],
      sourceEvidence: "模拟从湖面、夕阳、浅色穿搭和步道运镜中提取",
      inferenceType: "extracted"
    },
    {
      id: "scene_dali_tree_shadow",
      name: "洱海树影半身近景",
      imageUrl: "/demo/dali-scene-tree.jpg",
      keywords: ["树影", "近景", "配饰", "蓝调时刻"],
      palette: ["米灰", "浅驼", "银灰", "雾蓝"],
      lighting: "蓝调时刻弱光，适合突出面料和配饰反光",
      bestTime: "日落后15分钟",
      shotPosition: "树影下半身近景",
      composition: "用树叶作前景，人物居中，背景轻微虚化",
      recommendedStyles: ["温柔层次", "针织叠穿", "浅色休闲"],
      recommendedColors: ["米灰", "浅驼", "银灰"],
      avoidColors: ["厚重深棕", "大面积荧光色"],
      poses: ["低头整理袖口", "单手扶包带", "轻靠树影边缘"],
      sourceEvidence: "模拟根据蓝调光线和树影环境进行穿搭推断",
      inferenceType: "inferred"
    }
  ],
  "suzhou-lanes": [
    {
      id: "scene_suzhou_old_lane",
      name: "苏州古镇青石街巷",
      imageUrl: "/demo/suzhou-scene-lane.jpg",
      keywords: ["青石路", "白墙黛瓦", "慢节奏", "新中式"],
      palette: ["月白", "墨灰", "竹青", "淡杏"],
      lighting: "窄巷漫反射柔光，色彩对比安静",
      bestTime: "上午9点至10点半",
      shotPosition: "巷口纵深中景",
      composition: "让屋檐线条引导视线，人物站在巷道三分线",
      recommendedStyles: ["新中式", "文艺通勤", "低饱和层次"],
      recommendedColors: ["月白", "竹青", "墨灰", "淡杏"],
      avoidColors: ["亮橙", "高饱和紫", "大Logo撞色"],
      poses: ["手扶墙边慢走", "回身看屋檐", "低头整理手包"],
      sourceEvidence: "模拟从白墙、灰瓦、青石路和街巷纵深中提取",
      inferenceType: "extracted"
    },
    {
      id: "scene_suzhou_bridge",
      name: "苏州小桥水巷侧影",
      imageUrl: "/demo/suzhou-scene-bridge.jpg",
      keywords: ["小桥", "水巷", "侧影", "含蓄"],
      palette: ["藕粉", "烟灰", "米白", "檀木色"],
      lighting: "桥下水面反光偏柔，适合侧脸和半身",
      bestTime: "下午3点至4点半",
      shotPosition: "桥侧低角度侧影",
      composition: "用桥栏形成前景，人物面向水面",
      recommendedStyles: ["温婉新中式", "轻复古", "文艺松弛"],
      recommendedColors: ["藕粉", "烟灰", "米白"],
      avoidColors: ["亮蓝运动风", "荧光黄"],
      poses: ["一手轻搭桥栏", "侧脸看向水面", "包放在镜头侧"],
      sourceEvidence: "模拟根据水巷、桥栏和侧影需求推断",
      inferenceType: "inferred"
    }
  ],
  "shanghai-night": [
    {
      id: "scene_shanghai_bund",
      name: "上海外滩都市夜景",
      imageUrl: "/demo/shanghai-scene-bund.jpg",
      keywords: ["外滩", "霓虹", "玻璃反光", "都市利落"],
      palette: ["炭黑", "银灰", "酒红", "冷白"],
      lighting: "霓虹和建筑灯形成高反差轮廓光",
      bestTime: "蓝调后至20点半",
      shotPosition: "外滩栏杆侧身远景",
      composition: "人物占画面左三分之一，保留城市天际线",
      recommendedStyles: ["都市利落", "轻熟通勤", "夜景高反差"],
      recommendedColors: ["炭黑", "银灰", "酒红", "冷白"],
      avoidColors: ["浅黄碎花", "低对比米色全套"],
      poses: ["侧身扶栏看向灯光", "单手插袋", "肩线打开站直"],
      sourceEvidence: "模拟从夜景灯牌、玻璃幕墙和城市远景中提取",
      inferenceType: "extracted"
    },
    {
      id: "scene_shanghai_street",
      name: "上海霓虹街角抓拍",
      imageUrl: "/demo/shanghai-scene-street.jpg",
      keywords: ["街角", "霓虹", "抓拍", "线条感"],
      palette: ["黑色", "电光蓝", "银色", "番茄红"],
      lighting: "店招侧光更强，适合利落轮廓和金属配饰",
      bestTime: "20点至22点",
      shotPosition: "街角斜侧低机位",
      composition: "利用斑马线和橱窗线条形成斜向动势",
      recommendedStyles: ["机能都市", "短外套高腰线", "金属点缀"],
      recommendedColors: ["黑色", "银色", "电光蓝"],
      avoidColors: ["全身浅棉麻", "低饱和碎花"],
      poses: ["走过街角回头", "手拿咖啡低头", "外套搭肩"],
      sourceEvidence: "模拟根据夜间街角光源和抓拍姿势推断",
      inferenceType: "inferred"
    }
  ]
};
