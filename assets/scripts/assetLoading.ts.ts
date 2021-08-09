import { _decorator, Component, Node, RichText, ProgressBar } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AssetLoadingUI")
export class AssetLoadingUI extends Component {
  @property(RichText)
  public percentLoadText?: RichText;

  @property(RichText)
  public urlLoadText?: RichText;

  @property(ProgressBar)
  public progressBar?: ProgressBar;

  public updateText(progress: number, key?: string) {
    const { percentLoadText, urlLoadText, progressBar } = this;
    const progressPercent = Math.floor(progress * 100);
    if (percentLoadText) {
      percentLoadText.string = `${progressPercent}%`;
    }

    if (progressBar) {
      progressBar.progress = progress;
    }

    if (urlLoadText) {
      switch (progressPercent) {
        case 100: {
          urlLoadText.string = "CLICK TO ENTER";
          break;
        }

        case 0: {
          urlLoadText.string = "LOADING...";
          break;
        }

        default: {
          urlLoadText.string = `LOADED ${key}`;
          break;
        }
      }
    }
  }
}
