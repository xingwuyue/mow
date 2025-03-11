import { MVC } from "../../framework/MVC";
import { GameVoManager } from "../../manager/GameVoManager";
import { Time } from "../../framework/Time";
import { Util } from "../../utils/Util";
import { Cfg } from "../../config/Cfg";

let rewardTimeMax = 28800
export default class OffLineModel extends MVC.BaseModel {

    private static _instance: OffLineModel = null;
    private offlineReward: number = 0;
    private startCountDelta: number = 0;
    public constructor() {
        super();
        if (OffLineModel._instance == null) {
            OffLineModel._instance = this;
        }

        this.startCountDelta = 0;
        this.offlineReward = 0;
    }
    public reset(): void {

    }

    public static get getInstance(): OffLineModel {
        if (OffLineModel._instance == null) {
            OffLineModel._instance = new OffLineModel();
        }
        return OffLineModel._instance;
    }
    private showGetView: boolean = false;
    public callOfflineReward(time) {
        let realtime = time;
        if (time > rewardTimeMax) {
            realtime = rewardTimeMax;
        }
        let idlist = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let data;// = Cfg.OffLine.get(idlist[0]);
        let reward = data && data.award || 1;
        this.offlineReward = Math.ceil(realtime * reward * 0.5);
        this.showGetView = realtime >= 600;
    }

    public getOfflineReward() {
        return this.offlineReward;
    }

    public updateModel(dt) {
        if (this.offlineReward == 0) {
            this.startCountDelta += dt;
            if (this.startCountDelta >= 2) {
                this.startCountDelta = 0;
                GameVoManager.getInstance.myUserVo.offlineTime = Time.serverTimeMs;
            }
        }
    }

    public recoverOffTime() {
        this.offlineReward = Time.serverTimeMs;
        this.showGetView = false;
    }

    public getShouldShow() {
        return this.showGetView;
    }

    public getRewardByTime(time) {
        let idlist = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let data;//=Cfg.OffLine.get(idlist[0]);
        let reward = data && data.award || 1;
        return Math.ceil(reward * time * 0.5);
    }
}