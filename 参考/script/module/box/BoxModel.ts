import { MVC } from "../../framework/MVC";
import { Cfg } from "../../config/Cfg";
import { Util } from "../../utils/Util";
import { GameVoManager } from "../../manager/GameVoManager";
import { Manager } from "../../manager/Manager";
import { Const } from "../../config/Const";
import { AlertManager } from "../../alert/AlertManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Time } from "../../framework/Time";
import { CallID } from "../../CallID";

declare interface infoMap {
    buytimes: number[],
    videotimes: number[],
}

export default class BoxModel extends MVC.BaseModel {

    private static _instance: BoxModel = null;
    private _goldInfo: infoMap;
    private _powerInfo: infoMap;
    private _boxInfo: infoMap;
    public constructor() {
        super();
        if (BoxModel._instance == null) {
            BoxModel._instance = this;
        }
        this.startCount = 0;
        this.resetVideoTime();
    }
    public reset(): void {

    }

    public resetVideoTime() {
        this._goldInfo = JSON.parse(Manager.storage.getString(Const.STORAGE_STORE_GOLD, "{\"buytimes\":[0,0,0],\"videotimes\":[0,0,0]}"));
        this._powerInfo = JSON.parse(Manager.storage.getString(Const.STORAGE_STORE_POWER, "{\"buytimes\":[0,0,0],\"videotimes\":[0,0,0]}"));
        this._boxInfo = JSON.parse(Manager.storage.getString(Const.STORAGE_STORE_BOX, "{\"buytimes\":[0,0],\"videotimes\":[0,0]}"));
    }

    public static get getInstance(): BoxModel {
        if (BoxModel._instance == null) {
            BoxModel._instance = new BoxModel();
        }
        return BoxModel._instance;
    }

    public getFreeTime(id: number) {
        let targettime = GameVoManager.getInstance.myUserVo.boxfreeTimes[id - 1];
        let time = Time.serverTimeMs;
        let lefttime = targettime - time;
        return Util.timeFormatToArray(lefttime);
    }//weixin ： ( vip-v66666 )

    public getCurGoldRewardById(id: number) {
        let chapterlist = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let data = Cfg.Store.get(id);
        let gold = 0;
        if (data) {
            gold = data.commodity[chapterlist[0] - 1] ? data.commodity[chapterlist[0] - 1] : data.commodity[0];
        }
        return gold;
    }

    public getCurPowerRewardById(id: number) {
        let chapterlist = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let data = Cfg.Store.get(id);
        let power = 0;
        if (data) {
            power = data.commodity[chapterlist[0] - 1] ? data.commodity[chapterlist[0] - 1] : data.commodity[0];
        }
        return power;
    }

    /**
     * type 1：宝箱 2：金币 3:体力
     * @param id 商品id
     */
    public getCostTypeById(id: number) {
        let data = Cfg.Store.get(id);
        return data.pay;
    }

    /**
     * type 1：宝箱 2：金币 3:体力
     * @param id 商品id
     */
    public getCostById(id: number) {
        let data = Cfg.Store.get(id);
        if (data.pay == 1) {
            let curtime = this.getCurVideoTimesById(id);
            return [1, data.advPrice, curtime, data.advDiscount];
        } else if (data.pay == 2) {
            return [2, data.diamondPrice, data.diamondDiscount];
        } else if (data.pay == 3) {
            return [3, data.cashPrice, data.firstAward];
        }
    }

    /**
     * type 1：宝箱 2：金币 3:体力
     * @param id 商品id
     */
    public getCurVideoTimesById(id: number) {
        let data = Cfg.Store.get(id);
        if (data.type == 2) {//金币
            return this._goldInfo.videotimes[id - 3];
        } else if (data.type == 3) {//体力
            return this._powerInfo.videotimes[id - 6];
        } else {//宝箱
            return this._boxInfo.videotimes[id - 1];
        }
    }

    /**
         * type 1：宝箱 2：金币 3:体力
         * @param id 商品id
         */
    public checkFinishById(id: number) {
        let data = Cfg.Store.get(id);
        if (data.type == 2) {
            return this._goldInfo.buytimes[id - 3] >= data.frequency && data.frequency > 0;
        } else if (data.type == 3) {
            return this._powerInfo.buytimes[id - 6] >= data.frequency && data.frequency > 0;
        } else if (data.type == 1) {
            return this._boxInfo.buytimes[id - 1] >= data.frequency && data.frequency > 0;
        } else if (data.type == 4) {
            return false;
        }
    }

    /**
     * type 1：宝箱 2：金币 3:体力
     * @param id 商品id
     */
    public getProgress(id: number) {
        let data = Cfg.Store.get(id);
        if (data.type == 2) {
            return [this._goldInfo.buytimes[id - 3], data.frequency];
        } else if (data.type == 3) {
            return [this._powerInfo.buytimes[id - 6], data.frequency];
        } else if (data.type == 1) {
            return [this._boxInfo.buytimes[id - 1], data.frequency];
        }
    }

    /**
     * buyway 1：需要消耗次数 2免费次数
     * @param id 商品id
     */
    public buySuccess(id: number, buyway: number = 1) {
        let data = Cfg.Store.get(id);
        if (data.type == 2) {//金币
            let gold = this.getCurGoldRewardById(id);
            GameVoManager.getInstance.setGold(gold);
            Notifier.send(ListenID.Game_UpdateCurrencyEffect, 1, gold);
            if (buyway == 1) {
                this._goldInfo.buytimes[id - 3]++;
            }
            Manager.storage.setString(Const.STORAGE_STORE_GOLD, JSON.stringify(this._goldInfo));
        } else if (data.type == 3) {//体力
            let power = this.getCurPowerRewardById(id);
            GameVoManager.getInstance.setPower(power, 2);
            if (buyway == 1) {
                this._powerInfo.buytimes[id - 6]++;
            }
            Manager.storage.setString(Const.STORAGE_STORE_POWER, JSON.stringify(this._powerInfo));
            Notifier.send(ListenID.Game_UpdateCurrencyEffect, 3, power);
        } else if (data.type == 1) {//宝箱
            if (buyway == 1) {
                this._boxInfo.buytimes[id - 1]++;
            }
            Manager.storage.setString(Const.STORAGE_STORE_BOX, JSON.stringify(this._boxInfo));
            let step = this.getCurStep();
            let droppoolid = data.commodity[step - 1];
            let goodsList = Notifier.call(CallID.Drop_GetDropPoolRewardById, droppoolid);
            Notifier.send(ListenID.Box_OpenBoxOpenView, { type: id, goodsList });
        }
        Notifier.send(ListenID.Box_UpdateBoxView, id, data.type);
    }

    public addVideos(id: number, times?: number) {
        let data = Cfg.Store.get(id);
        if (data.type == 2) {
            let index = id - 3;
            let price = times ? times : data.advPrice;
            this._goldInfo.videotimes[index]++;
            if (this._goldInfo.videotimes[index] >= price) {
                this._goldInfo.videotimes[index] = 0;
                this.buySuccess(id, 1);
            } else {
                Notifier.send(ListenID.Box_UpdateBoxView, id, data.type);
            }
        } else if (data.type == 3) {
            let index = id - 6;
            let price = times ? times : data.advPrice;
            this._powerInfo.videotimes[index]++;
            if (this._powerInfo.videotimes[index] >= price) {
                this._powerInfo.videotimes[index] = 0;
                this.buySuccess(id, 1);
            } else {
                Notifier.send(ListenID.Box_UpdateBoxView, id, data.type);
            }
        } else if (data.type == 1) {
            let index = id - 1;
            let price = times ? times : data.advPrice;
            this._boxInfo.videotimes[index]++;
            if (this._boxInfo.videotimes[index] >= price) {
                this._boxInfo.videotimes[index] = 0;
                this.buySuccess(id, 1);
            } else {
                Notifier.send(ListenID.Box_UpdateBoxView, id, data.type);
            }
        }
    }

    public getCurStep() {
        let chapterlist = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        return chapterlist[0];
    }

    /**
     * state 1可免费 2无免费，抽奖次数>0  3无免费，无抽奖次数
     * @param id 商品id
     */
    public getBoxState(id: number) {
        let prodata = this.getProgress(id);
        let index = id - 1;
        if (GameVoManager.getInstance.myUserVo.boxfreeTimes[index] <= Time.serverTimeMs) {
            return 1;
        } else {
            if (prodata[0] < prodata[1] || prodata[1] == -1) {
                return 2;
            } else {
                return 3;
            }
        }
    }

    private startCount: number = 0;

    public updateFreeTime(dt) {
        this.startCount += dt;
        if (this.startCount >= 2) {
            this.startCount = 0;
            Notifier.send(ListenID.Box_RefreshFreeTime);
        }
    }

    public isFirstReward(shopid) {
        let index = shopid - 9;
        let num = GameVoManager.getInstance.myUserVo.payfirst[index];
        return !num;
    }

    public setFirstRewardSign(shopid) {
        let index = Number(shopid) - 9;
        GameVoManager.getInstance.myUserVo.payfirst[index] = 1;
    }

    public getPayInfo(id: number, orderId: string) {
        let payinfo = ``;
        // let a = { amount: `${data.cashPrice * 100}`, productName: data.name, productID: `${id}`, roleID: `${HDDefaultUserInfo.open_id}`, roleName: GameVoManager.getInstance.myUserVo.nickName, cpOrderID: orderId };
        return payinfo;
    }
}