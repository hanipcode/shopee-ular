import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../enum/asset";
import { BaseText } from "../lib/text/baseText.ts";
const { ccclass, property } = _decorator;

@ccclass("Shopee2021Bold")
export class Shopee2021Bold extends BaseText {
  constructor() {
    super("Shopee2021Bold", ASSET_KEY.SHOPEE_BOLD);
  }
}
