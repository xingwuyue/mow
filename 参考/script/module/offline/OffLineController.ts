import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { CallID } from "../../CallID";
import OffLineModel from "./OffLineModel";
import { NotifyID } from "../../framework/NotifyID";
import { GameVoManager } from "../../manager/GameVoManager";
import { Time } from "../../framework/Time";

/*
 * desc
 */
export class OffLineController extends MVC.BaseController {
    private _model: OffLineModel;
    private isActive: boolean = false;
    public constructor() {
        super("OffLineController");
        this._model = OffLineModel.getInstance;
        this.changeListener(true);
        this.isActive = false;
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Login_User, this.userlogin, this);
        Notifier.changeCall(enable, CallID.Offline_GetReward, this.getOfflineReward, this);
        Notifier.changeListener(enable, NotifyID.Game_Update, this.updateModel, this);
        Notifier.changeListener(enable, ListenID.Offline_RecoverDown, this.recover, this);
        Notifier.changeCall(enable, CallID.Offline_CanShow, this.canshowView, this);
        Notifier.changeCall(enable, CallID.Offline_GetRewardByTime, this.getRewardByTime, this);
    }

    public getOfflineReward(time: number): number {
        return this._model.getOfflineReward();
    }

    public userlogin() {
        if (GameVoManager.getInstance.myUserVo.offlineTime == 0) {
            GameVoManager.getInstance.myUserVo.offlineTime = Time.serverTimeMs;
        } else {
            let time = (Time.serverTimeMs - GameVoManager.getInstance.myUserVo.offlineTime) / 1000;
            this._model.callOfflineReward(time);
        }
        this.isActive = true;
    }

    public updateModel(dt) {
        if (this.isActive) {
            this._model.updateModel(dt);
        }
    }

    public recover() {
        this._model.recoverOffTime();
    }

    public canshowView() {
        return this._model.getShouldShow();
    }

    public getRewardByTime(time){
        return this._model.getRewardByTime(time);
    }
}