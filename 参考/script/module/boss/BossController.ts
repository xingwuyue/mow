import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import NetAdapter from "../../adpapter/NetAdapter";
import { Common_UIPath } from "../../common/Common_Define";
import { UIManager } from "../../framework/UIManager";
import BossModel from "./BossModel";
import { AlertType, AlertManager } from "../../alert/AlertManager";

/*
 * desc
 */
export class BossController extends MVC.BaseController {
    public constructor() {
        super("BossController");
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.ShowBossRank, this.openRank, this);
        Notifier.changeListener(enable, ListenID.Boss_CloseBossRank, this.closeRank, this);
        Notifier.changeListener(enable, ListenID.Boss_OpenAlert, this.onOpenBossAlert, this);
    }

    public openRank() {
        BossModel.getInstance.setRankList(1, 1, 1, 2);
        UIManager.Open(Common_UIPath.BossRankUI);
    }

    public closeRank() {
        UIManager.Close(Common_UIPath.BossRankUI);
    }

    public onOpenBossAlert(args) {
        UIManager.Open(Common_UIPath.BossAlertUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, args);
    }
}