export const APPLE_EPOCH_UTC_MS = Date.UTC(2001, 0, 1)

export const NANOSECOND_DETECTION_THRESHOLD = 100_000_000_000

/**
 * Converts a millisecond offset from the Apple reference date (2001-01-01 UTC) to a Unix epoch millisecond timestamp.
 */
export const appleEpochMsToUtcMs = (msSinceAppleEpoch: number) => msSinceAppleEpoch + APPLE_EPOCH_UTC_MS
