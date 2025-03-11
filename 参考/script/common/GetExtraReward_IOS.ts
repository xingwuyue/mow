import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Manager } from "../manager/Manager";
import { GameVoManager } from "../manager/GameVoManager";
import { Util } from "../utils/Util";
import { ShareCode } from "./Common_Define";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetExtraReward_IOS extends MVC.BaseView {

    @property(cc.Label)
    lb_num: cc.Label = null;

    @property(cc.Node)
    icon_gold: cc.Node = null;

    @property(cc.Node)
    icon_diamond: cc.Node = null;

    @property(cc.Node)
    icon_video: cc.Node = null;

    @property(cc.Node)
    icon_share: cc.Node = null;

    @property(cc.Node)
    btn_close: cc.Node = null;

    _extraAward: number[] = [];
    _goldEffect: boolean = false;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.GoldEffect_End, this.effectEnd, this);
    }


    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Close_GetDiamondPanel);
        // HD_MODULE.getNet().postGameEvent({ event_name: 'extra_reward_close', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "extra_reward_close" });
    }

    /**
     * 
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        // this.btn_close.position = cc.v2(0, WXSDK.bannerY);
        this._extraAward = [0, 0];//Cfg.Barrier.get(GameVoManager.getInstance.myUserVo.topLevel).extraAward;
        this.icon_gold.active = this._extraAward[0] == 1 ? true : false;
        this.icon_diamond.active = this._extraAward[0] == 2 ? true : false;
        this.icon_share.active = GameVoManager.getInstance.myUserVo.shareTimes >= GameVoManager.getInstance.myUserVo.totalShareTimes ? false : true;
        this.icon_video.active = !this.icon_share.active;
        if (this._extraAward[0] == 1) {
            let goldFormat = Util.goldFormat(this._extraAward[1]);
            this.lb_num.string = goldFormat;
        } else {
            this.lb_num.string = this._extraAward[1] + "";
        }
    }

    callFunc() {
        // HD_MODULE.getNet().postGameEvent({ event_name: 'extra_reward_success', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "extra_reward_success" });
        this._goldEffect = true;
        if (this._extraAward[0] == 1) {
            GameVoManager.getInstance.setGold(this._extraAward[1]);
            Util.showGoldEffect(this.node, 10, cc.v2(0, 0), cc.v2(-317, 594), 0.1, 0, 1);
        } else {
            GameVoManager.getInstance.setDiamond(this._extraAward[1]);
            Util.showGoldEffect(this.node, 10, cc.v2(0, 0), cc.v2(0, 594), 0.1, 0, 2);
        }
        GameVoManager.getInstance.saveData();
    }

    effectEnd() {
        super.onClose();
        Notifier.send(ListenID.Close_GetDiamondPanel);
    }

    public btnGetClick() {
        if (this._goldEffect) return
        if (this.icon_share.active) {
            GameVoManager.getInstance.myUserVo.shareTimes++;
            this.callFunc();
        } else {
            this.callFunc();
        }
    }
}
