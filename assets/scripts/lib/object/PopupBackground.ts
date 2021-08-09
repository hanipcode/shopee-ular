import { _decorator, Component, Node, Graphics, Color, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PopUpBackground")
export class PopUpBackground extends Component {
  @property(Graphics)
  public readonly outerGraphics?: Graphics;

  @property(Color)
  public readonly outerGraphicsColor?: Color = new Color(255, 255, 255);

  @property(Graphics)
  public readonly innerGraphics?: Graphics;

  @property(Color)
  public readonly innerGraphicsColor?: Color = new Color(255, 255, 255);

  private uiTransform?: UITransform | null;

  onLoad() {
    this.uiTransform = this.getComponent(UITransform);

    this.draw();
  }

  private getOuterGraphicsConfig() {
    const { uiTransform, outerGraphicsColor } = this;

    if (!uiTransform || !outerGraphicsColor) return undefined;

    const { width, height } = uiTransform;

    return {
      color: outerGraphicsColor,
      x: width * -0.5,
      y: height * -0.5,
      width,
      height,
      r: Math.min(width, height) * 0.1,
    };
  }

  private getInnerGraphicsConfig() {
    const { uiTransform, innerGraphicsColor } = this;

    if (!uiTransform || !innerGraphicsColor) return undefined;

    const { width, height } = uiTransform;
    const innerWidth = width - 10;
    const innerHeight = height - 10;

    return {
      color: innerGraphicsColor,
      x: innerWidth * -0.5,
      y: innerHeight * -0.5,
      width: innerWidth,
      height: innerHeight,
      r: Math.min(innerWidth, innerHeight) * 0.1,
    };
  }

  private draw() {
    this.drawOuterGraphics();
    this.drawInnerGraphics();
  }

  private drawOuterGraphics() {
    const { outerGraphics } = this;
    const config = this.getOuterGraphicsConfig();

    if (!outerGraphics || !config) return;

    const { color, x, y, width, height, r } = config;

    outerGraphics.fillColor = color;
    outerGraphics.roundRect(x, y, width, height, r);
    outerGraphics.fill();
  }

  private drawInnerGraphics() {
    const { innerGraphics } = this;
    const config = this.getInnerGraphicsConfig();

    if (!innerGraphics || !config) return;

    const { color, x, y, width, height, r } = config;

    innerGraphics.fillColor = color;
    innerGraphics.roundRect(x, y, width, height, r);
    innerGraphics.fill();
  }
}
