import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { WXSDK } from "../sdk/WXSDK";
import { GameVoManager } from "../manager/GameVoManager";

/*
 * desc
 */
export class BtnController extends MVC.BaseController {
    public constructor() {
        super("BtnController");
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.GetShareTimes, this.getShareTimes, this);
    }

    // 定时刷新分享次数
    public getShareTimes() {
        if (!GameVoManager.getInstance.gameSwitchVo.shareContorller) return;
        GameVoManager.getInstance.myUserVo.totalShareTimes = 1;
        Notifier.send(ListenID.Refresh_ShareTimes);
    }
}
