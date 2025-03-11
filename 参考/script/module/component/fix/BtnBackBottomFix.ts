import { Notifier } from "../../../framework/Notifier";
import { CallID } from "../../../CallID";

/**
 * 2.2.0版本屏幕底下返回按钮适配
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class BtnBackBottomFix extends cc.Component {
    @property(Number)
    offSetY: number = 42;

    start () {
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.node.y = -size.height * 0.5 + this.offSetY;
    }
}
