import { ASSET_EXTENSION, ASSET_TYPE } from "../enum/asset";

export interface AssetTypeConfig {
  /**
   * Used for spritesheet
   */
  frameWidth?: number;
  /**
   * Used for spritesheet
   */
  frameHeight?: number;
  /**
   * Used for spritesheet
   */
  paddingX?: number;
  /**
   * Used for spritesheet
   */
  paddingY?: number;
}

export interface AssetConfig {
  /**
   * Asset key used to retrieve loaded assets in game
   */
  key: string;
  /**
   * Asset type used for extra handling after it's loaded (if any)
   */
  type: ASSET_TYPE;
  /**
   * Remote url, suchs as ones from cf.shopee
   */
  url: string;
  /**
   * File extension, only provide if file url does not provide extension
   *
   * (e.g. https://cf.shopee.co.id/file/e52dd426de5d3231a7a2dff8cbaaf8ca)
   */
  ext?: ASSET_EXTENSION;
  /**
   * localUrl is only used for loading assets from resources folder
   */
  localUrl?: string;
  /**
   * Optional config used for extra handling after it's loaded (if any)
   */
  config?: AssetTypeConfig;
}
