import {
  _decorator,
  Component,
  Node,
  RichText,
  assetManager,
  TTFFont,
  Color,
} from "cc";
import { getTextWithColor } from "../util/richText";
const { ccclass, property } = _decorator;

@ccclass("BaseText")
export class BaseText extends Component {
  @property(Color)
  public textColor = new Color(255, 255, 255);

  protected richText?: RichText | null;

  constructor(name: string, protected fontKey: string) {
    super(name);
  }

  onLoad() {
    this.richText = this.getComponent(RichText);

    this.reload();
  }

  protected reload() {
    this.setupFont();
    this.reloadTextWithAssignedColor();
  }

  protected reloadTextWithAssignedColor() {
    const { string } = this.richText || { string: "" };
    this.setText(string);
  }

  protected setupFont() {
    const { richText } = this;
    if (richText) {
      richText.font = this.getFont();
    }
  }

  protected getFont() {
    return assetManager.assets.get(this.fontKey) as TTFFont;
  }

  protected isFontLoaded() {
    return this.richText?.useSystemFont;
  }

  public setText(text: string) {
    const { richText, textColor } = this;
    if (richText) {
      richText.string = getTextWithColor(text, textColor);
    }
  }

  update() {
    if (this.isFontLoaded()) {
      this.reload();
    }
  }
}
