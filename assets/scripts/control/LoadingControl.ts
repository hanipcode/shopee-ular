import { _decorator, Component, Node } from "cc";
import { LoadingControlEvent } from "../enum/LoadingControl";
const { ccclass, property } = _decorator;

@ccclass("LoadingControl")
export class LoadingControl extends Component {
  public registerTouchEvent() {
    this.node.on(Node.EventType.TOUCH_END, () => {
      this.node.emit(LoadingControlEvent.TOUCH_END);
    });
  }
}
