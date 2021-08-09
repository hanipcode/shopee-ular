import { Color } from "cc";

export function getTextWithColor(text: string, color: Color) {
  const colorCode = `#${color.toHEX("#rrggbbaa")}`;

  if (text.includes("</color>")) {
    return text.replace(/(?<=<color=)(.[^>]*)/, colorCode);
  } else {
    return `<color=${colorCode}>${text}</color>`;
  }
}
