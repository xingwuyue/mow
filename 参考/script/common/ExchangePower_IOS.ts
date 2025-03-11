import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Manager } from "../manager/Manager";
import { Cfg } from "../config/Cfg";
import { GameVoManager } from "../manager/GameVoManager";
import { Util } from "../utils/Util";
import { AlertManager } from "../alert/AlertManager";
import { AudioType } from "../manager/AudioManager";
import NetAdapter from "../adpapter/NetAdapter";
import { Common_UIPath } from "./Common_Define";
import { UIManager } from "../framework/UIManager";
import { NotifyID } from "../framework/NotifyID";
import { WXSDK } from "../sdk/WXSDK";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ExchangePower_IOS extends MVC.BaseView {

    @property(cc.Label)
    diamondNum: cc.Label = null;

    @property(cc.Label)
    powerNum: cc.Label = null;

    @property(cc.Node)
    getDiamondBtn: cc.Node = null;

    @property(cc.Node)
    btn_close: cc.Node = null;

    _exchangeNum = 10;

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.GetInviteReward, this.initInfo, this);
        Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.bannerResize, this);

    }

    bannerResize() {
        this.btn_close.position = cc.v2(0, WXSDK.bannerY);
        this.btn_close.active = true;
    }

    public onOpen(args: any): void {
        super.onOpen(args);
        this.initInfo();
        Notifier.send(ListenID.ShowBanner, 0);
        // HD_MODULE.getNet().postGameEvent({ event_name: 'home_power', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "home_power" });
    }

    public initInfo() {
        this.getDiamondBtn.active = false;
        if (GameVoManager.getInstance.myUserVo.diamond >= 10) {
            this._exchangeNum = 10;
            this.diamondNum.string = "10";
            this.powerNum.string = "5";
        } else {
            this.diamondNum.string = "0";
            this.powerNum.string = "0";
            this._exchangeNum = 0;
        }
    }

    public onAdd() {
        Manager.audio.playAudio(501, AudioType.UI);
        let _max = Math.floor(GameVoManager.getInstance.myUserVo.diamond / 10);
        let _cur = Math.floor(this._exchangeNum / 10);
        if (_max - _cur >= 1) {
            if (GameVoManager.getInstance.myUserVo.power + this._exchangeNum / 10 * 5 < 80) {
                this._exchangeNum += 10;
                this.diamondNum.string = `${this._exchangeNum}`;
                this.powerNum.string = `${this._exchangeNum / 10 * 5}`;
            } else {
                AlertManager.showNormalTips("兑换体力已达上限！");
            }
        } else {
            UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Default, MVC.eUILayer.Popup, 2);
        }
    }

    public onSub() {
        Manager.audio.playAudio(501, AudioType.UI);
        let _cur = Math.floor(this._exchangeNum / 10);
        if (GameVoManager.getInstance.myUserVo.diamond >= 10) {
            this._exchangeNum -= 10;
            if (_cur <= 1) {
                this._exchangeNum = 10;
            }
        } else {
            this._exchangeNum -= 10;
            if (_cur <= 0) {
                this._exchangeNum = 0;
            }
        }
        this.diamondNum.string = `${this._exchangeNum}`;
        this.powerNum.string = `${this._exchangeNum / 10 * 5}`;
    }

    public onExchange() {
        Manager.audio.playAudio(501, AudioType.UI);
        if (GameVoManager.getInstance.myUserVo.diamond <= 9) {
            UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Default, MVC.eUILayer.Popup, 2);
            return
        }
        if (GameVoManager.getInstance.myUserVo.power < 80) {
            GameVoManager.getInstance.setDiamond(-this._exchangeNum);
            GameVoManager.getInstance.setPower(this._exchangeNum / 10 * 5, 1);
            Notifier.send(ListenID.Log_Event, { event_name: "exchange_power", counter: this._exchangeNum / 10 });
            this.initInfo();
            // HD_MODULE.getNet().postGameEvent({ event_name: `exchange_power`, counter: 1 });

            AlertManager.showNormalTips("体力兑换成功！");
        } else {
            AlertManager.showNormalTips("兑换体力已达上限！");
        }
    }

    public onGetDiamond() {
        // if(!HD_MODULE.getPlatform().getIsHaveVideo()){
        //     AlertManager.showNormalTips("暂无视频！");
        //     return
        // }
        Manager.audio.playAudio(501, AudioType.UI);
        GameVoManager.getInstance.myUserVo.exchangeVideo = 1;
        this.getDiamondBtn.active = false;
        Util.showGoldEffect(this.node, 10, cc.v2(0, 0), cc.v2(0, 594), 0.1, 0, 2);
        GameVoManager.getInstance.setDiamond(50);
        GameVoManager.getInstance.saveData();
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        Manager.audio.playAudio(501, AudioType.UI);
        super.onClose();
        Notifier.send(ListenID.HideBanner);
    }
}
