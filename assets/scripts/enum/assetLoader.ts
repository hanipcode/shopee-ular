/**
 * Events for AssetLoader
 */
export enum ASSET_LOADER_EVENT {
  /**
   * Emitted when the loader starts
   *
   * callback: (loaderProgress: number) => void;
   */
  START = "start",
  /**
   * Emitted whenever an asset is loaded successfully
   *
   * callback: (loaderProgress: number, key: string, url: string) => void;
   */
  ASSET_LOAD_SUCCESS = "asset_load_success",
  /**
   * Emitted whenever an asset fails to load
   *
   * callback: (loaderProgress: number, key: string, url: string) => void;
   */
  ASSET_LOAD_FAILURE = "asset_load_failure",
  /**
   * Emitted when all assets have been loaded successfully
   *
   * callback: (loaderProgress: number) => void;
   */
  COMPLETE = "complete",
}
