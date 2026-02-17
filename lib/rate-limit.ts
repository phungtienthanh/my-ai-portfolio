/**
 * SIMPLE IN-MEMORY RATE LIMITING
 * For single-instance deployment
 * For multi-instance: use Redis/Supabase instead
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitRecord>();

/**
 * Check if IP exceeded rate limit
 * @param ip Client IP address
 * @param maxRequests Max requests allowed
 * @param windowMs Time window in milliseconds (default: 60 seconds)
 * @returns true if rate limited, false if OK
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now > record.resetTime) {
    // New window
    store.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false; // OK
  }

  record.count++;
  return record.count > maxRequests; // true if exceeded
}

/**
 * Get client IP from headers
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Clear all rate limit records (for testing/reset)
 */
export function clearRateLimitStore(): void {
  store.clear();
}
