import {
  _decorator,
  Component,
  Node,
  Button,
  director,
  game,
  find,
  instantiate,
  Director,
} from "cc";
import { BackgroundSoundtrack } from "../audio/backgroundSoundtrack";
import { BUTTON_EVENT } from "../enum/button";
import { SCENE_KEY } from "../enum/scene";
import { TRANSITION_SCREEN_EVENT } from "../enum/transitionScreen";
import { BaseButton } from "../object/baseButton";
import { TransitionScreen } from "../sprite/transitionScreen";
const { ccclass, property } = _decorator;

@ccclass("TitleScene")
export class TitleScene extends Component {
  @property(Button)
  public readonly playButton?: BaseButton;

  @property(BackgroundSoundtrack)
  public readonly backgroundSoundtrack?: BackgroundSoundtrack;

  start() {
    this.spawnBackgroundSoundtrackIfNotExist();

    this.setupPlayButtonClick();
  }

  private spawnBackgroundSoundtrackIfNotExist() {
    const { backgroundSoundtrack } = this;

    if (!backgroundSoundtrack) return;

    if (!find(backgroundSoundtrackPersistNodeName)) {
      const node = instantiate(backgroundSoundtrack.node);
      node.name = backgroundSoundtrackPersistNodeName;
      node.getComponent(BackgroundSoundtrack)?.play();
      director.on(Director.EVENT_AFTER_SCENE_LAUNCH, () => {
        node.getComponent(BackgroundSoundtrack)?.play();
      });
      game.addPersistRootNode(node);
    }
  }

  private setupPlayButtonClick() {
    this.playButton?.node.on(BUTTON_EVENT.TOUCH_END, () => {
      this.playButton?.unregisterTouchEvent();
      this.goToGameScene();
    });
  }

  private goToGameScene() {
    director.loadScene(SCENE_KEY.GAME);
  }
}
