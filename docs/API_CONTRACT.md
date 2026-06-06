# Douyin Travel Action API Contract

This contract describes the current backend MVP. The backend uses mock providers only: it does not download Douyin videos, crawl web pages, call real AI APIs, use a database, or execute shell commands with user input.

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
