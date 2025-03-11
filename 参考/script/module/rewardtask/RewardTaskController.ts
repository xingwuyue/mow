import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, TaskSubType, TaskType } from "../../common/Common_Define";
import RewardTaskModel from "./RewardTaskModel";
import FunOpen from "../funopen/FunOpen";
import { AlertManager } from "../../alert/AlertManager";
import { CallID } from "../../CallID";

/*
 * desc
 */
export class RewardTaskController extends MVC.BaseController {
    private _model: RewardTaskModel;
    public constructor() {
        super("RewardTaskController");
        this._model = RewardTaskModel.getInstance;
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.RewardTask_OpenMainView, this.onOpenMainView, this);
        Notifier.changeListener(enable, ListenID.SecondDay, this.refreshDailyTask, this);
        Notifier.changeListener(enable, ListenID.RewardTask_RefreshDailyTask, this.refreshDailyTask, this);
        Notifier.changeListener(enable, ListenID.RewardTask_CloseMainView, this.onCloseMainView, this);
        Notifier.changeListener(enable, ListenID.RewardTask_UpdateTaskProgress, this.updateTaskProgress, this);
        Notifier.changeListener(enable, ListenID.RewardTask_ToGetReward, this.toGetReward, this);
        Notifier.changeListener(enable, ListenID.Login_Finish, this.initTaskInfo, this);
        Notifier.changeCall(enable, CallID.RewardTask_GetAllNumberReward, this.getAllNumberReward, this);
        //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
    }

    public onOpenMainView() {
        UIManager.Open(Common_UIPath.RewardTaskView, MVC.eTransition.Default, MVC.eUILayer.Popup);
    }
    public onCloseMainView() {
        UIManager.Close(Common_UIPath.RewardTaskView);
    }

    public initTaskInfo() {
        this._model.initTaskInfo();
    }

    public refreshDailyTask() {
        this._model.refreshDailyTask();
    }

    public updateTaskProgress(subType: TaskSubType, param: any) {
        this._model.updateTaskProgress(subType, param);
    }
    public toGetReward(id: number) {
        let waylist = this._model.getRewardWayById(id);
        if (!waylist || waylist.length <= 0) return;
        if (waylist[0] == 1) {
            this.onCloseMainView();
            if (waylist[1]) {
                Notifier.send(ListenID.Menu_SelectChapter, waylist[1]);
            }
        } else if (waylist[0] == 2) {
            this.onCloseMainView();
            Notifier.send(ListenID.Equip_OpenEquipView);
        } else if (waylist[0] == 3) {
            this.onCloseMainView();
            Notifier.send(ListenID.Box_OpenBoxView);
        } else if (waylist[0] == 4) {
            this.onCloseMainView();
            UIManager.Open(Common_UIPath.MainDrawUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, null, false, 3);
            Notifier.send(ListenID.Log_Event, { event_name: "home_draw" });
        } else if (waylist[0] == 5) {
            let bossFunIsOpen = FunOpen.getInstance().getFunIsOpen("Boss");
            if (bossFunIsOpen) {
                this.onCloseMainView();
                Notifier.send(ListenID.ShowBossRank);
            } else {
                AlertManager.showNormalTips("头目战功能尚未开启");
            }
        } else if (waylist[0] == 6) {//熔炼
            this.onCloseMainView();
            Notifier.send(ListenID.Equip_OpenEquipSmeltView);
        } else if (waylist[0] == 7) {//强化
            this.onCloseMainView();
            Notifier.send(ListenID.Equip_OpenIntensifyView);
        }
    }

    public getAllNumberReward() {
        return this._model.allRewardNum;
    }
}