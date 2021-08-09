import { UITransform, view } from "cc";

export function getScaleToScreenWidth(refWidth: number, ratio: number) {
  const { width } = view.getDesignResolutionSize();
  return (width * ratio) / refWidth;
}

export function getScaleToScreenHeight(refHeight: number, ratio: number) {
  const { height } = view.getDesignResolutionSize();
  return (height * ratio) / refHeight;
}

export function getScaleToNewDimension(
  currentWidth: number,
  currentHeight: number,
  targetWidth: number,
  targetHeight: number
) {
  return {
    x: targetWidth / currentWidth,
    y: targetHeight / currentHeight,
  };
}
