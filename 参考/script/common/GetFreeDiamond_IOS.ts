import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Manager } from "../manager/Manager";
import { GameVoManager } from "../manager/GameVoManager";
import { WXSDK } from "../sdk/WXSDK";
import { NotifyID } from "../framework/NotifyID";
import { Common_UIPath, ShareCode } from "./Common_Define";
import { Const } from "../config/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetFreeDiamond extends MVC.BaseView {

    @property(cc.Label)
    lb_num: cc.Label = null;

    @property(cc.Label)
    lb_times: cc.Label = null;

    @property(cc.Node)
    tips: cc.Node = null;

    @property(cc.Node)
    btn_close: cc.Node = null;

    @property(cc.Node)
    icon_share: cc.Node = null;

    @property(cc.Node)
    icon_video: cc.Node = null;

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
        // HD_MODULE.getNet().postGameEvent({ event_name: 'home_free_diamond_close', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "home_free_diamond_close" });

    }

    /**
     * 
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        Notifier.send(ListenID.ShowBanner, 3);
        this.lb_num.string = `${Const.FreeDiamondCount}`;
        this.lb_times.string = `${GameVoManager.getInstance.myUserVo.useFreeDiamondTimes}/${Const.FreeDiamondTimes}`;
        this.tips.active = GameVoManager.getInstance.myUserVo.useFreeDiamondTimes == 0 ? true : false;
        this.icon_share.active = GameVoManager.getInstance.myUserVo.shareTimes >= GameVoManager.getInstance.myUserVo.totalShareTimes ? false : true;
        this.icon_video.active = !this.icon_share.active;
	
    }

    callFunc() {
        // HD_MODULE.getNet().postGameEvent({ event_name: 'home_free_diamond_success', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "home_free_diamond_success" });

        if (GameVoManager.getInstance.myUserVo.useFreeDiamondTimes == 0) {
            GameVoManager.getInstance.setDiamond(Const.FreeDiamondCount * 2);
        } else {
            GameVoManager.getInstance.setDiamond(Const.FreeDiamondCount);
        }
        GameVoManager.getInstance.myUserVo.useFreeDiamondTimes++;
        GameVoManager.getInstance.saveData();
        Notifier.send(ListenID.GoldEffect_Show, 2);
        super.onClose();
        Notifier.send(ListenID.HideBanner);
    }

    public btnGetClick() {
        if (this.icon_share.active) {
            if (GameVoManager.getInstance.myUserVo.shareTimes < GameVoManager.getInstance.myUserVo.totalShareTimes) {
                GameVoManager.getInstance.myUserVo.shareTimes++;
            }
            this.callFunc();
        } else {
            if (GameVoManager.getInstance.myUserVo.shareTimes < GameVoManager.getInstance.myUserVo.totalShareTimes) {
                GameVoManager.getInstance.myUserVo.shareTimes++;
            }
            this.callFunc();
        }
    }
}
