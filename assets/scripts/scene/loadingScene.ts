import { _decorator, Component, Node, director } from "cc";
import { ASSET_LOADER_EVENT } from "../enum/assetLoader";
import { SCENE_KEY } from "../enum/scene";
import { AssetLoader } from "../assetLoader";
import { AssetLoadingUI } from "../assetLoading.ts";
import { LoadingControlEvent } from "../enum/LoadingControl";
import { LoadingControl } from "../control/LoadingControl";
const { ccclass, property } = _decorator;

@ccclass("LoadingScene")
export class LoadingScene extends Component {
  @property(AssetLoader)
  public readonly assetLoader?: AssetLoader;

  @property(AssetLoadingUI)
  public readonly assetLoadingUI?: AssetLoadingUI;

  @property(LoadingControl)
  public readonly loadingControl?: LoadingControl;

  start() {
    this.startAssetsLoad();
  }

  private startAssetsLoad() {
    const { assetLoader, assetLoadingUI } = this;

    if (!assetLoader || !assetLoadingUI) return;

    assetLoader.node.on(ASSET_LOADER_EVENT.START, (progress: number) => {
      assetLoadingUI.updateText(progress);
    });

    assetLoader.node.on(
      ASSET_LOADER_EVENT.ASSET_LOAD_SUCCESS,
      (progress: number, key: string) => {
        assetLoadingUI.updateText(progress, key);
      }
    );

    assetLoader.node.on(ASSET_LOADER_EVENT.COMPLETE, (progress: number) => {
      assetLoadingUI.updateText(progress);
      this.onComplete();
    });

    assetLoader.startAssetsLoad();
  }

  private onComplete() {
    this.loadingControl?.registerTouchEvent();
    this.loadingControl?.node.once(LoadingControlEvent.TOUCH_END, () => {
      this.goToTitleScene();
    });
  }

  private goToTitleScene() {
    director.loadScene(SCENE_KEY.TITLE);
  }
}
