/**
 * Returns the cache key for the corresponding key's asset
 * @param key string
 * @returns assetKey (string)
 */
export function getAssetKey(key: string) {
  return `${key}_ASSET`;
}
