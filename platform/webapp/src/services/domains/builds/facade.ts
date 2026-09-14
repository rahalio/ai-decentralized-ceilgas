/**
 * Builds facade — thin re-export of hand-maintained service.
 */
import { buildsService } from "./builds.service";

export const buildsFacade = buildsService;
