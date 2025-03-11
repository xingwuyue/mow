import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import { NotifyID } from "../../framework/NotifyID";
import { GameVoManager } from "../../manager/GameVoManager";
import { Time } from "../../framework/Time";
import { CallID } from "../../CallID";

/*
 * desc
 */
export class EcologicalController extends MVC.BaseController {
    public constructor() {
        super("EcologicalController");
        this.changeListener(true);
    }

    public reset(): void {

    }

    private isclose: boolean = false;
    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Open_EcologicalView, this.onOpenEcologicalView, this);
        Notifier.changeListener(enable, ListenID.Close_EcologicalView, this.onCloseEcologicalView, this);
        Notifier.changeListener(enable, ListenID.Open_EcologicalRewardView, this.onOpenEcologicalRewardView, this);
        Notifier.changeListener(enable, NotifyID.Game_Update, this.updateTime, this);
        Notifier.changeCall(enable, CallID.Get_EcologicalPoint, this.getEcologicalPoint, this);
    }

    public onOpenEcologicalView() {
        this.isclose = false;
        UIManager.Open(Common_UIPath.EcologicalView, MVC.eTransition.Default, MVC.eUILayer.Panel);
    }

    public onCloseEcologicalView() {
        this.isclose = true;
        UIManager.Close(Common_UIPath.EcologicalView);
    }

    public onOpenEcologicalRewardView(args) {
        UIManager.Open(Common_UIPath.EcologicalRewardView, MVC.eTransition.Default, MVC.eUILayer.Popup, args);
    }

    public getEcologicalPoint(): number {
        let num = 0;
        Object.keys(this.userVo.ecologicalStudyList).forEach(key => {
            if (this.userVo.ecologicalStudyList[key][3] == 2) {
                num++;
            }
        })
        return num;
    }

    private time: number = 0;
    private userVo = GameVoManager.getInstance.myUserVo;
    public updateTime(dt) {
        if (!this.isclose) return
        if (JSON.stringify(this.userVo.ecologicalStudyList) == "{}") return
        this.time += dt;
        if (this.time < 1) return
        this.time = 0;
        Object.keys(this.userVo.ecologicalStudyList).forEach(key => {
            if (this.userVo.ecologicalStudyList[key][3] == 1) {
                if ((Time.serverTimeMs - this.userVo.ecologicalStudyList[key][0]) / 1000 >= this.userVo.ecologicalStudyList[key][1]) {     // 完成
                    this.userVo.ecologicalStudyList[key][3] = 2;
                }
            }
        })
    }
}
