import { MVC } from "../framework/MVC";
import { Manager } from "../manager/Manager";
import { GameVoManager } from "../manager/GameVoManager";
import { Common_UIPath, ShareCode } from "./Common_Define";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { NotifyID } from "../framework/NotifyID";
import { WXSDK } from "../sdk/WXSDK";
import { Cfg } from "../config/Cfg";
import { WeaponCfg } from "../config/WeaponCfg";
import { BarrierCfg } from "../config/BarrierCfg";
import { AlertManager } from "../alert/AlertManager";
import { Const } from "../config/Const";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetFreeWeapon_IOS extends MVC.BaseView {

    @property(cc.Node)
    icon_share: cc.Node = null;

    @property(cc.Node)
    icon_video: cc.Node = null;

    @property(cc.Sprite)
    weaponIcon: cc.Sprite = null;

    @property(cc.Label)
    lb_name: cc.Label = null;

    @property(cc.Label)
    lb_percent: cc.Label = null;

    @property(cc.Node)
    btn_close: cc.Node = null;

    _args: any = {};
    _barrier: BarrierCfg = null;

    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, NotifyID.SDK_Banner_Resize, this.bannerResize, this);
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Manager.audio.playAudio(501);
        if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost) {
            AlertManager.showNormalTips(`体力不足，无法挑战`);
        } else {
            Notifier.send(ListenID.Close_FreeWeapon, 1);
        }
        Notifier.send(ListenID.HideBanner);
        if (this._args.type == 1) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'free_weapon_start_close', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "free_weapon_start_close" });
        } else if (this._args.type == 2) {
            // HD_MODULE.getNet().postGameEvent({ event_name: 'preview_weapon_close', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "preview_weapon_close" });
        }
    }

    /**
     * 
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        this._args = args;
        let weapon: WeaponCfg
        if (args.type == 1) {         //1 表示开始按钮进入
            let barrier: BarrierCfg = Cfg.Barrier.get(GameVoManager.getInstance.myUserVo.topLevel + 1);
            this._barrier = barrier;
        } else if (args.type == 2) {   // 武器预告进入
            weapon = Cfg.Weapon.get(args.id);
        }
        this.icon_share.active = false;
        this.icon_video.active = true;
        this.lb_percent.string = Number((Math.random() * 10).toFixed(0)) + 80 + "";
        this.lb_name.string = weapon.name;
        Manager.spAtlas.getWeaponIcon(weapon.id).then((res) => {
            this.weaponIcon.spriteFrame = res;
        })
        Notifier.send(ListenID.ShowBanner, 3);
    }

    openCallBack() {
        this.initIOS_UI();
    }

    initIOS_UI() {
        this.btn_close.active = false;
        this.scheduleOnce(() => {
            this.btn_close.active = true;
        }, 1.5);
    }

    bannerResize() {
        this.btn_close.active = true;
        this.btn_close.position = cc.v2(0, WXSDK.bannerY);
    }

    callFunc() {
        super.onClose();
        Notifier.send(ListenID.HideBanner);
        if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost) {
            AlertManager.showNormalTips(`体力不足，无法挑战`);
            return;
        }
        Notifier.send(ListenID.Close_FreeWeapon);
        if (this._args.type == 1) {
            GameVoManager.getInstance.myUserVo.freeWeaponId = this._args.id;
            // HD_MODULE.getNet().postGameEvent({ event_name: 'free_weapon_start_success', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "free_weapon_start_success" });
        } else {
            GameVoManager.getInstance.myUserVo.freeWeaponId = this._args.id;
            // HD_MODULE.getNet().postGameEvent({ event_name: 'preview_weapon_success', counter: 1 });
            Notifier.send(ListenID.Log_Event, { event_name: "preview_weapon_success" });
        }
    }

    public btnGetClick() {
        if (this.icon_video.active) {
            this.callFunc();
            Notifier.send(ListenID.Free_Weapon_Video_Success);
        } else {
            if (this._args.type == 2) {
                if (GameVoManager.getInstance.myUserVo.shareTimes < GameVoManager.getInstance.myUserVo.totalShareTimes) {
                    GameVoManager.getInstance.myUserVo.shareTimes++;
                }
            }
            this.callFunc();
        }
    }
}
