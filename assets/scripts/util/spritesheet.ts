export function getSpriteFrameKey(
  textureKey: string,
  frameKey?: number | string
) {
  if (frameKey !== undefined) {
    return `${textureKey}_${frameKey}`;
  }
  return textureKey;
}
