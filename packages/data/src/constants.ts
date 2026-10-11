/**
 * Cache and stale time constants (in milliseconds)
 * These determine how long React Query keeps data as "fresh"
 * After staleTime, a refetch is triggered if the component remounts or window refocuses
 */
export const CACHE_TIMES = {
  // Activity feeds change frequently - check every 2 minutes
  ACTIVITY: 2 * 60 * 1000,

  // Albums rarely change - cache for 1 minute to balance freshness vs requests
  ALBUM_DETAILS: 1 * 60 * 1000,

  // Search results are relatively static - cache for 10 minutes
  SEARCH_RESULTS: 10 * 60 * 1000,

  // User search results - cache for 10 minutes
  USER_SEARCH: 10 * 60 * 1000,

  // Discovery data (new releases, popular) is fairly stable - cache for 1 hour
  DISCOVERY: 60 * 60 * 1000,
} as const;
