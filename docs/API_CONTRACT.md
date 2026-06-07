# Douyin Travel Action API Contract

This contract describes the current backend MVP. Video understanding and legacy plan generation still use mock providers. Image generation uses the configured Doubao Seedream-compatible API and does not fall back to local demo images when the provider fails. The backend does not download Douyin videos, crawl web pages, use a database, or execute shell commands with user input.

## Error Format

All API errors return:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数不合法",
    "details": []
  }
}
```

## GET /health

Response `200`:

```json
{
  "status": "ok",
  "service": "douyin-travel-action-api",
  "timestamp": "2026-06-06T00:00:00.000Z"
}
```

## GET /api/demo-cases

Response `200`: exactly three cases.

```json
[
  {
    "id": "dali-lake",
    "title": "大理洱海日落",
    "destination": "云南大理",
    "coverUrl": "/demo/dali.jpg",
    "description": "湖风、落日、浅色长裙和松弛感照片。",
    "keywords": ["洱海", "日落", "湖风"]
  }
]
```

Case ids:

- `dali-lake`
- `suzhou-lanes`
- `shanghai-night`

## POST /api/analyze-video

Demo request:

```json
{
  "sourceType": "demo",
  "demoCaseId": "dali-lake"
}
```

Douyin URL request:

```json
{
  "sourceType": "douyin_url",
  "videoUrl": "https://v.douyin.com/example"
}
```

Manual keywords request:

```json
{
  "sourceType": "manual_keywords",
  "destination": "云南大理",
  "styleKeywords": "清新松弛",
  "sceneKeywords": "湖边 日落"
}
```

Response `200`:

```json
{
  "analysisId": "analysis_xxx",
  "status": "completed",
  "analysis": {
    "destination": "云南大理",
    "source": {
      "sourceType": "demo",
      "title": "大理洱海日落",
      "coverUrl": "/demo/dali.jpg",
      "isMock": true
    },
    "scenes": [
      {
        "id": "scene_dali_lake_walk",
        "name": "洱海西岸日落步道",
        "imageUrl": "/demo/dali-scene-lake.jpg",
        "keywords": ["湖风", "柔光"],
        "palette": ["奶白", "雾蓝"],
        "lighting": "日落前低角度暖光",
        "bestTime": "日落前45分钟至蓝调时刻",
        "shotPosition": "湖边低机位回头",
        "composition": "人物放在右三分之一，保留湖面和天空留白",
        "recommendedStyles": ["法式松弛"],
        "recommendedColors": ["奶白"],
        "avoidColors": ["荧光绿"],
        "poses": ["慢走两步自然回头"],
        "sourceEvidence": "模拟从湖面、夕阳、浅色穿搭和步道运镜中提取",
        "inferenceType": "extracted"
      }
    ]
  }
}
```

`inferenceType` is either `extracted` or `inferred`.

## POST /api/generate-plan

Request:

```json
{
  "analysisId": "analysis_xxx",
  "userProfile": {
    "heightCm": 163,
    "usualSize": "M",
    "preferredStyle": "法式松弛",
    "budget": 800,
    "photoGoal": "显高且有松弛感",
    "shoePreference": "平底鞋",
    "coveragePreference": "适度露肤",
    "skinTone": "中性偏暖"
  }
}
```

Response `202`:

```json
{
  "planId": "plan_xxx",
  "status": "processing",
  "resultUrl": "/api/result/plan_xxx"
}
```

## GET /api/result/:id

Processing response `200`:

```json
{
  "id": "plan_xxx",
  "status": "processing",
  "progress": 60,
  "currentStep": "正在匹配目的地穿搭"
}
```

Completed response `200`:

```json
{
  "id": "plan_xxx",
  "status": "completed",
  "progress": 100,
  "plan": {
    "planId": "plan_xxx",
    "destination": "云南大理",
    "sourceVideo": {
      "sourceType": "demo",
      "title": "大理洱海日落",
      "coverUrl": "/demo/dali.jpg",
      "isMock": true
    },
    "scenes": [],
    "outfits": [],
    "packingList": {
      "items": [],
      "ownedItems": [],
      "toBuyItems": [],
      "estimatedBudget": 0,
      "mustBring": [],
      "owned": [],
      "toBuy": []
    },
    "id": "plan_xxx",
    "case": {
      "id": "dali-sunset",
      "title": "大理洱海日落",
      "source": "抖音旅行灵感案例",
      "coverImage": "/demo/dali.jpg",
      "coverAlt": "云南大理旅行灵感封面",
      "location": "云南大理",
      "description": "湖风、落日、浅色长裙和松弛感照片。"
    },
    "sceneAnalysis": {
      "name": "洱海西岸日落步道",
      "image": "/demo/dali-scene-lake.jpg",
      "imageAlt": "洱海西岸日落步道",
      "moodKeywords": ["湖风", "柔光"],
      "palette": ["奶白", "雾蓝"],
      "bestTime": "日落前45分钟至蓝调时刻",
      "cameraSpots": ["湖边低机位回头"],
      "compositionTips": ["人物放在右三分之一，保留湖面和天空留白"]
    },
    "actionCards": []
  }
}
```

The `plan` object includes the newer backend fields and frontend-compatible legacy fields from `frontend/src/types/plan.ts`.

## POST /api/refine-plan

Request:

```json
{
  "planId": "plan_xxx",
  "instruction": "更显高，不露肩，预算300"
}
```

Response `200`:

```json
{
  "planId": "plan_xxx",
  "status": "completed",
  "revision": {
    "id": "revision_xxx",
    "instruction": "更显高，不露肩，预算300",
    "summary": "已按你的要求优化比例、降低露肤度并收紧补购预算。",
    "appliedChanges": ["比例更利落", "规避露肩", "预算控制在300元以内"],
    "createdAt": "2026-06-06T00:00:00.000Z"
  },
  "plan": {}
}
```

Errors:

- `404 PLAN_NOT_FOUND`: `planId` does not exist.
- `409 PLAN_NOT_READY`: plan is still processing.
- `400 VALIDATION_ERROR`: instruction is empty or too long.

## POST /api/generate-image-plan

Creates a generated outfit image plan task. `IMAGE_PROVIDER` must be `doubao`; demo templates only select destination and landmark text for the prompt, and are not used as image sources.

Request:

```json
{
  "destination": "上海",
  "demoCaseId": "shanghai-night",
  "styleKeywords": "都市利落",
  "sceneKeywords": "外滩 蓝调时刻",
  "userProfile": {
    "heightCm": 163,
    "usualSize": "M",
    "preferredStyle": "都市利落",
    "budget": 800,
    "photoGoal": "显高且有镜头气场",
    "shoePreference": "平底鞋",
    "coveragePreference": "适度露肤",
    "skinTone": "中性偏暖",
    "tripDays": 3,
    "gender": "女"
  }
}
```

Response `202`:

```json
{
  "planId": "image_plan_xxx",
  "status": "processing",
  "resultUrl": "/api/image-plan-result/image_plan_xxx"
}
```

## GET /api/image-plan-result/:id

Processing response `200`:

```json
{
  "id": "image_plan_xxx",
  "status": "processing",
  "progress": 60,
  "currentStep": "正在调用豆包生图模型"
}
```

Completed response `200`:

```json
{
  "id": "image_plan_xxx",
  "status": "completed",
  "progress": 100,
  "plan": {
    "id": "image_plan_xxx",
    "destination": "上海",
    "landmark": "外滩与陆家嘴天际线",
    "imageUrl": "/demo/shanghai.jpg",
    "prompt": "为一位去上海旅行的年轻女性生成一张出片穿搭参考图...",
    "outfitSummary": {
      "style": "都市利落",
      "budget": 800,
      "items": ["短外套", "高腰直筒裤", "低跟鞋"],
      "reason": "利落线条适合城市地标与蓝调时刻。"
    },
    "wardrobeMatches": [],
    "mallActionLabel": "一键配衣",
    "provider": "doubao"
  }
}
```

Failed response `200`:

```json
{
  "id": "image_plan_xxx",
  "status": "failed",
  "progress": 0,
  "currentStep": "图片方案生成失败"
}
```
