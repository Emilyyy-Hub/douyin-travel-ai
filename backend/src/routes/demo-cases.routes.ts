import { Router } from "express";

import { demoCases } from "../data/demo-cases";

export const demoCasesRouter = Router();

demoCasesRouter.get("/", (_request, response) => {
  response.json(demoCases);
});
