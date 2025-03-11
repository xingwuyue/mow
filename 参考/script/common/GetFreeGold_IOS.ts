import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Manager } from "../manager/Manager";
import { GameVoManager } from "../manager/GameVoManager";
import { Util } from "../utils/Util";
import { WXSDK } from "../sdk/WXSDK";
import { NotifyID } from "../framework/NotifyID";
import { Common_UIPath, ShareCode } from "./Common_Define";

const { ccclass, property } = cc._decorator;

const share = 2;
const video = 3;

@ccclass
export default class GetFreeGold extends MVC.BaseView {

    @property(cc.Node)
    iocn_share: cc.Node = null;

    @property(cc.Node)
    iocn_video: cc.Node = null;

    @property(cc.Label)
    lb_num: cc.Label = null;

    @property(cc.Node)
    btn_close: cc.Node = null;

    _args = null;
    _gold: number = 0;


    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.bannerResize, this);
    }

    bannerResize() {
        this.btn_close.position = cc.v2(0, WXSDK.bannerY);
        this.btn_close.active = true;
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.HideBanner);
        // HD_MODULE.getNet().postGameEvent({ event_name: 'free_gold_close', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "free_gold_close" });
    }

    /**
     * 
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        // HD_MODULE.getNet().postGameEvent({ event_name: 'free_gold', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "free_gold" });
        this._args = args;
        Notifier.send(ListenID.ShowBanner, 3);
        this.iocn_share.active = GameVoManager.getInstance.myUserVo.shareTimes >= GameVoManager.getInstance.myUserVo.totalShareTimes ? false : true;
        this.iocn_video.active = !this.iocn_share.active;
        let _r = Math.random() * 0.5 + 1;
        this._gold = Number((this._args * _r).toFixed(0));
        let goldFormat = Util.goldFormat(this._gold);
        this.lb_num.string = goldFormat;
        // console.log("=======免费金币========", this._gold, _r);
    }

    callFunc() {
        // HD_MODULE.getNet().postGameEvent({ event_name: 'free_gold_success', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "free_gold_success" });
        GameVoManager.getInstance.setGold(this._gold);
        GameVoManager.getInstance.saveData();
        GameVoManager.getInstance.myUserVo.useFreeGoldTimes++;
        Notifier.send(ListenID.GoldEffect_Show, 1);
        super.onClose();
        Notifier.send(ListenID.HideBanner);
    }

    public btnGetClick() {
        if (this.iocn_video.active) {
            GameVoManager.getInstance.myUserVo.shareTimes++;
            this.callFunc();
        } else {
            GameVoManager.getInstance.myUserVo.shareTimes++;
            this.callFunc();
        }
    }
}
