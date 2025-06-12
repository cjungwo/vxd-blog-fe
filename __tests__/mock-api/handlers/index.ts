import { delayMiddleware } from "../middleware/delay-middleware";
import { contentHandler } from "./content-handler";

export const mswHandler = [delayMiddleware, ...contentHandler];
