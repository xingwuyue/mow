import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";

/*
 * desc
 */
export class RankController extends MVC.BaseController {
    public constructor() {
        super("RankController");
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Rank_showRank, this.showRank, this);
        Notifier.changeListener(enable, ListenID.Rank_closeRank, this.closeRank, this);
        //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
    }

    public showRank() {
        UIManager.Open(Common_UIPath.RankUI, MVC.eTransition.Default, MVC.eUILayer.Panel);
    }
    public closeRank() {
        UIManager.Close(Common_UIPath.RankUI);
    }
}