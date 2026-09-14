/**
 * Recommendations facade — thin re-export of hand-maintained service.
 */
import { recommendationsService } from "./recommendations.service";

export const recommendationsFacade = recommendationsService;
