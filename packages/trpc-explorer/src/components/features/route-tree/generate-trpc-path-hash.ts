import { createHash } from "crypto";

/**
 * Generates an MD5 hash for a given tRPC path.
 * @param path - The tRPC path string to hash.
 * @returns A unique MD5 hash string.
 */
export function generateTrpcPathHash(path: string): string {
  return createHash("md5").update(path).digest("hex");
}
