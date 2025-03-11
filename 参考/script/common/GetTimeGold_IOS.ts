import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Manager } from "../manager/Manager";
import { Cfg } from "../config/Cfg";
import BtnRewardMultView from "../module/component/button/BtnRewardMultView";
import { GameVoManager } from "../manager/GameVoManager";
import { AudioType } from "../manager/AudioManager";
import { Util } from "../utils/Util";
import NetAdapter from "../adpapter/NetAdapter";
import { Time } from "../framework/Time";
import { WXSDK } from "../sdk/WXSDK";
import { NotifyID } from "../framework/NotifyID";
import { CallID } from "../CallID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetTimeGold_IOS extends MVC.BaseView {

    @property(cc.Label)
    lb_coin: cc.Label = null;

    @property(cc.Node)
    btn_triple: cc.Node = null;

    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, ListenID.Update_GoldRewardNum, this.updateCoin, this);
        // Notifier.changeListener(enable, ListenID.Refresh_ShareTimes, this.refreshBtnStatus, this);
        Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.resizeBtnPos, this);
    }

    resizeBtnPos() {
        let closeNode = cc.find("know", this.node);
        closeNode.position = cc.v2(closeNode.x, WXSDK.bannerY);
        closeNode.active = true;
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        this.onGetRewardClick();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.HideBanner);
    }

    public refreshBtnStatus() {
        this.btn_triple.getComponent(BtnRewardMultView).refreshBtnStatus({ gold: this.reward, callBack: this.onTripleCallFunc.bind(this) })
    }

    /**
     * 
     */
    public reward: number = 0;
    public onOpen(args: any): void {
        super.onOpen(args);
        Notifier.send(ListenID.ShowBanner, 0);
        this.reward = Notifier.call(CallID.Offline_GetReward);
        let goldFormat = Util.goldFormat(this.reward);
        this.lb_coin.string = goldFormat;
        console.log("***** time gold *****");
        this.btn_triple.getComponent(BtnRewardMultView).init({ gold: this.reward, callBack: this.onTripleCallFunc.bind(this) })
    }

    onGetRewardClick() {
        // HD_MODULE.getNet().postGameEvent({ event_name: 'time_gold_normal', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "time_gold_normal" });
        Manager.audio.playAudio(509, AudioType.UI);
        // GameVoManager.getInstance.myUserVo.lastGetGoldTime = Time.serverTimeMs;
        GameVoManager.getInstance.myUserVo.offlineTime = Time.serverTimeMs;
        GameVoManager.getInstance.setGold(this.reward)
        // this.reward = 0;
        this.lb_coin.string = `${this.reward}`;
        // GameVoManager.getInstance.myUserVo.goldRewardTime = Time.serverTimeMs;
        super.onClose();
        Notifier.send(ListenID.HideBanner);
        // Notifier.send(ListenID.GoldEffect_Show);
        Notifier.send(ListenID.Offline_RecoverDown);
        Notifier.send(ListenID.Game_UpdateCurrencyEffect, 1, this.reward);
        GameVoManager.getInstance.saveData();
        setTimeout(() => {
            Notifier.send(ListenID.Game_OpenUIList);
        }, 200);
    }

    onTripleCallFunc() {
        Manager.audio.playAudio(509, AudioType.UI);
        // GameVoManager.getInstance.myUserVo.lastGetGoldTime = Time.serverTimeMs;
        GameVoManager.getInstance.myUserVo.offlineTime = Time.serverTimeMs;
        let isMember = GameVoManager.getInstance.getIsMember();
        let mult = isMember ? 6 : 3;
        GameVoManager.getInstance.setGold(this.reward * mult)
        // this.reward = 0;
        this.lb_coin.string = `${this.reward}`;
        // GameVoManager.getInstance.myUserVo.goldRewardTime = Time.serverTimeMs;
        super.onClose();
        Notifier.send(ListenID.HideBanner);
        Notifier.send(ListenID.Offline_RecoverDown);
        Notifier.send(ListenID.Game_UpdateCurrencyEffect, 1, this.reward);
        GameVoManager.getInstance.saveData();
        setTimeout(() => {
            Notifier.send(ListenID.Game_OpenUIList);
        }, 200);
    }

    updateCoin() {
        let goldFormat = Util.goldFormat(this.reward);
        this.lb_coin.string = goldFormat;
        this.btn_triple.getComponent(BtnRewardMultView).init({ gold: this.reward, callBack: this.onTripleCallFunc.bind(this) })
    }
}
