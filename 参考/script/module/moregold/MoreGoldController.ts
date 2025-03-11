import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";

/*
 * desc
 */
export class MoreGoldController extends MVC.BaseController {
    public constructor() {
        super("MoreGoldController");
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        //    Notifier.changeListener(enable, ListenID.Scene_AskSwitch, this.onAskSwitch, this);
        //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
        Notifier.changeListener(enable, ListenID.MoreGold_Open, this.openMoreGoldView, this);
    }

    public openMoreGoldView(type: number = 0) {
        UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, type, null, 1);
    }
}