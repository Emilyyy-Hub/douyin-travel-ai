import cors from "cors";
import express from "express";

import { env } from "./config/env";
import { analysisRouter } from "./routes/analysis.routes";
import { demoCasesRouter } from "./routes/demo-cases.routes";
import { healthRouter } from "./routes/health.routes";
import { imagePlansRouter } from "./routes/image-plans.routes";
import { plansRouter } from "./routes/plans.routes";
import { refinementRouter } from "./routes/refinement.routes";
import { resultsRouter } from "./routes/results.routes";
import { errorHandler } from "./middleware/error-handler";
import { notFoundHandler } from "./middleware/not-found";

export function createApp(): express.Express {
  const app = express();

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || origin === env.FRONTEND_ORIGIN) {
          callback(null, true);
          return;
        }

        callback(new Error("CORS origin not allowed"));
      }
    })
  );
  app.use(express.json({ limit: "1mb" }));

  app.use("/health", healthRouter);
  app.use("/api/demo-cases", demoCasesRouter);
  app.use("/api/analyze-video", analysisRouter);
  app.use("/api/generate-plan", plansRouter);
  app.use("/api/result", resultsRouter);
  app.use("/api/refine-plan", refinementRouter);
  app.use("/api", imagePlansRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
