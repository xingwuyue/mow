import { MVC } from "../framework/MVC";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import { Util } from "../utils/Util";
import { GameVoManager } from "../manager/GameVoManager";
import { Time } from "../framework/Time";
import { Const } from "../config/Const";
import { UIManager } from "../framework/UIManager";
import { Common_UIPath, FunUnlockTipsData, GameFunID, GameFunUnlockType } from "./Common_Define";
import { AudioType } from "../manager/AudioManager";
import { Manager } from "../manager/Manager";
import { MenuController } from "../module/menu/MenuController";
import { CallID } from "../CallID";
import { Cfg } from "../config/Cfg";
import FunOpen from "../module/funopen/FunOpen";

const { ccclass, property } = cc._decorator;
@ccclass
export default class CurrencyView extends MVC.BaseView {

    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Label)
    power: cc.Label = null;

    @property(cc.Label)
    powerTime: cc.Label = null;

    @property(cc.Label)
    diamond: cc.Label = null;

    @property(cc.Node)
    menuPanel: cc.Node = null;

    @property(cc.Button)
    btnMenu: cc.Button = null;

    @property(cc.Button)
    btnWelfare: cc.Button = null;

    @property(cc.Node)
    btnServer: cc.Node = null;

    _scheduleCallBack: Function = null;
    _powerTempTime: number = 0;
    _switchMenuPanel = false;

    public changeListener(enable) {
        Notifier.changeListener(enable, ListenID.Game_UpdateGold, this.updateGold, this);
        Notifier.changeListener(enable, ListenID.Game_UpdateDiamond, this.updateDiamond, this);
        Notifier.changeListener(enable, ListenID.Game_UpdatePower, this.updatePower, this);
        Notifier.changeListener(enable, ListenID.Life_On_Show, this.lifeOnShow, this);
        Notifier.changeListener(enable, ListenID.Game_SetCurrencyVis, this.setVisible, this);
        Notifier.changeListener(enable, ListenID.Game_UpdateCurrencyEffect, this.updateCurrencyEffect, this);
    }
    private offsety = 0;
    public updateCurrencyEffect(type: number, num: string) {
        if (type == 1) {
            Util.showGoldEffect(UIManager.layerRoots(MVC.eUILayer.Tips), num, cc.v2(0, 0), cc.v2(-337, this.offsety), 0.1, 0, type);
        } else if (type == 2) {
            Util.showGoldEffect(UIManager.layerRoots(MVC.eUILayer.Tips), num, cc.v2(0, 0), cc.v2(-133, this.offsety), 0.1, 0, type);
        } else if (type == 3) {
            Util.showGoldEffect(UIManager.layerRoots(MVC.eUILayer.Tips), num, cc.v2(0, 0), cc.v2(63, this.offsety), 0.1, 0, type);
        }
    }

    // 红点提示注册
    rigisterRemind() {
        MenuController.getInstance().rigisterRemind({
            name: "MenuPanel",
            node: this.btnMenu.node,
            checkFunc: () => {
                let num = 0;
                // if (new Date(Time.serverTimeMs).getDate() != GameVoManager.getInstance.myUserVo.lastSignDay) {
                //     num++;
                // }
                if (!Manager.storage.getBool(Const.STORAGE_MENU_FULI, false)) {
                    num++;
                }
                return num;
            }
        });
        MenuController.getInstance().rigisterRemind({
            name: "MenuWelfare",
            node: this.btnWelfare.node,
            scale: 0.5,
            offsetX: 10,
            offsetY: 10,
            checkFunc: () => {
                return new Date(Time.serverTimeMs).getDate() != GameVoManager.getInstance.myUserVo.lastSignDay ? 1 : 0;
            }
        });

        MenuController.getInstance().rigisterRemind({
            name: "MenuServer",
            node: this.btnServer,
            scale: 0.5,
            offsetX: 10,
            offsetY: 10,
            checkFunc: () => {
                return Manager.storage.getBool(Const.STORAGE_MENU_FULI, false) ? 0 : 1;
            }
        })
	
    }
    private _args: any;
    public onOpen(args) {
        super.onOpen(args);
        this.rigisterRemind();
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        let toppanel = this.node.getChildByName("topPanel");
        if (size.height > Const.designHeight + 50) {
            toppanel.y = size.height * 0.5 - 90;
        } else {
            toppanel.y = size.height * 0.5 - 35;
        }
        this.offsety = toppanel.y;
        this.setInfo(args);
        // this.rigisterFunUnlockTipsCheck();
    }

    public setInfo(args) {
        this._args = args;
        let goldFormat = Util.goldFormat(GameVoManager.getInstance.myUserVo.gold);
        this.gold.string = goldFormat;
        this.diamond.string = `${GameVoManager.getInstance.myUserVo.diamond}`;
        this.power.string = `${GameVoManager.getInstance.myUserVo.power}`;
        this.initPower();
        this.updateGold();
        this.updateDiamond();
        this.updatePower();
        this.rigisterFunUnlockTipsCheck();
    }

    public onClose() {
        super.onClose();
    }

    public updateGold() {
        let goldFormat = Util.goldFormat(GameVoManager.getInstance.myUserVo.gold);
        this.gold.string = goldFormat;
    }

    public updateDiamond() {
        this.diamond.string = `${GameVoManager.getInstance.myUserVo.diamond}`;
    }

    initPower() {
        if (GameVoManager.getInstance.myUserVo.power >= Const.MaxPower) {
            this.powerTime.node.active = false;
            GameVoManager.getInstance.myUserVo.powerTime = 0;
            GameVoManager.getInstance.myUserVo.powerRecoverTime = 0;
            return
        }
        this.powerTime.node.active = true;
        if (GameVoManager.getInstance.myUserVo.powerRecoverTime == 0) {           //第一次进入
            this._powerTempTime = GameVoManager.getInstance.myUserVo.powerTime > 0 ? GameVoManager.getInstance.myUserVo.powerTime : Const.PowerRecoverTime;
            if (GameVoManager.getInstance.myUserVo.tempLevelTime != 0 && GameVoManager.getInstance.myUserVo.tempEnterTime - GameVoManager.getInstance.myUserVo.tempLevelTime > 0) {
                let _d = Math.floor((GameVoManager.getInstance.myUserVo.tempEnterTime - GameVoManager.getInstance.myUserVo.tempLevelTime) / 1000);
                this._powerTempTime -= _d;
            }
        } else {
            //一直在游戏中
            this._powerTempTime = GameVoManager.getInstance.myUserVo.powerTime > 0 ? GameVoManager.getInstance.myUserVo.powerTime : Const.PowerRecoverTime;
            if (GameVoManager.getInstance.myUserVo.tempLevelTime != 0 && GameVoManager.getInstance.myUserVo.tempEnterTime - GameVoManager.getInstance.myUserVo.tempLevelTime > 0) {
                let _d = Math.floor((GameVoManager.getInstance.myUserVo.tempEnterTime - GameVoManager.getInstance.myUserVo.tempLevelTime) / 1000);
                this._powerTempTime -= _d;
            } else {
                this.onlinePower();
            }
        }
        this.updatePowerInfo();
        this.powerTime.string = Util.timeFormat(this._powerTempTime, 2);

        this.unschedule(this._scheduleCallBack);
        this._scheduleCallBack = () => {
            this._powerTempTime--;
            GameVoManager.getInstance.myUserVo.powerTime = this._powerTempTime;
            GameVoManager.getInstance.myUserVo.powerRecoverTime = Time.serverTimeMs;
            this.updatePowerInfo();
            this.powerTime.string = Util.timeFormat(this._powerTempTime, 2);
        }
        this.schedule(this._scheduleCallBack, 1, 9999, 1);
    }

    //重新登录之后刷新体力
    public onlinePower() {
        let _r = Math.floor((Time.serverTimeMs - GameVoManager.getInstance.myUserVo.powerRecoverTime) / 1000 / Const.PowerRecoverTime);
        if (_r > 0) {
            GameVoManager.getInstance.setPower(_r, 1);
        }
        if (GameVoManager.getInstance.myUserVo.powerTime > 0) {
            this._powerTempTime = GameVoManager.getInstance.myUserVo.powerTime - Math.floor((Time.serverTimeMs - GameVoManager.getInstance.myUserVo.powerRecoverTime) / 1000 % Const.PowerRecoverTime);
            // console.log("=================power---", this._powerTempTime, GameVoManager.getInstance.myUserVo.powerTime, Time.serverTimeMs, GameVoManager.getInstance.myUserVo.powerRecoverTime, Time.serverTimeMs)
        } else {
            this._powerTempTime = Const.PowerRecoverTime - Math.floor((Time.serverTimeMs - GameVoManager.getInstance.myUserVo.powerRecoverTime) / 1000 % Const.PowerRecoverTime);
        }
        GameVoManager.getInstance.myUserVo.powerRecoverTime = 0;
        GameVoManager.getInstance.myUserVo.powerTime = this._powerTempTime;
    }

    public updatePowerInfo() {
        if (this._powerTempTime <= 0) {
            this._powerTempTime = Const.PowerRecoverTime + this._powerTempTime;
            GameVoManager.getInstance.setPower(1, 1);
            if (GameVoManager.getInstance.myUserVo.power >= Const.MaxPower) {
                if (this._scheduleCallBack) {
                    this.unschedule(this._scheduleCallBack);
                }
                this.powerTime.node.active = false;
                GameVoManager.getInstance.myUserVo.powerTime = 0;
                GameVoManager.getInstance.myUserVo.powerRecoverTime = 0;
                return
            }
        }
    }

    public updatePower() {
        this.power.string = `${GameVoManager.getInstance.myUserVo.power}`;
        if (GameVoManager.getInstance.myUserVo.power >= 80) {
            if (this._scheduleCallBack) {
                this.unschedule(this._scheduleCallBack);
            }
            this.powerTime.node.active = false;
            GameVoManager.getInstance.myUserVo.powerTime = 0;
            GameVoManager.getInstance.myUserVo.powerRecoverTime = 0;
        }
    }

    //退后台之后进入刷新体力时间
    lifeOnShow() {
        GameVoManager.getInstance.myUserVo.tempLevelTime = 0;
        GameVoManager.getInstance.myUserVo.tempLevelTime_Gold = 0;
        this.onlinePower();
    }

    public setVisible(boo) {
        this.node.children[0].active = boo;
    }

    public onAddGold() {
        Manager.audio.playAudio(501, AudioType.UI);
        let isstart = Notifier.call(CallID.Game_IsStart);
        if (isstart) return;
        this.goToBoxView();
        Notifier.send(ListenID.Log_Event, { event_name: "home_gold" });
        // UIManager.Open(Common_UIPath.ExchangeDiamondUI);
    }

    public onOpenAddDiamond(target, customdata: number) {
        Manager.audio.playAudio(501, AudioType.UI);
        let isstart = Notifier.call(CallID.Game_IsStart);
        if (isstart) return;
        let isIos = false;//HD_MODULE.getPlatform().isIOS();
        if (isIos) {
            UIManager.Open(Common_UIPath.MemberUI, MVC.eTransition.Scale, MVC.eUILayer.Popup);
        } else {
            if (GameVoManager.getInstance.stateVo.viewIndex != Const.ViewMap.BoxView) {
                Notifier.send(ListenID.Box_OpenDirectPayView);
            }
        }
    }
    public onExchangePower() {

        Manager.audio.playAudio(501, AudioType.UI);
        let isstart = Notifier.call(CallID.Game_IsStart);
        if (isstart) return;
        this.goToBoxView();
        Notifier.send(ListenID.Log_Event, { event_name: "exchange_power", counter: 1 });
        // UIManager.Open(Common_UIPath.ExchangePowerUI);
    }


    public onOpenSettingView() {
        // Notifier.send(ListenID.Setting_Open);
        Manager.audio.playAudio(501, AudioType.UI)
        let isstart = Notifier.call(CallID.Game_IsStart);
        if (isstart) return;
        UIManager.Open(Common_UIPath.SettingView_IOS, MVC.eTransition.Scale, MVC.eUILayer.Tips);

    }

    public onOpenService() {
        Manager.audio.playAudio(501, AudioType.UI);
        let isstart = Notifier.call(CallID.Game_IsStart);
        if (isstart) return;
        UIManager.Open(Common_UIPath.InviteAndServiceUI, MVC.eTransition.Default, MVC.eUILayer.Tips, 0);
        // UIManager.Open(Common_UIPath.GetExtraReward);
    }

    public onOpenMoreGold(target, customdata: number) {
        Manager.audio.playAudio(501, AudioType.UI);
        let isstart = Notifier.call(CallID.Game_IsStart);
        if (isstart) return;
        UIManager.Open(Common_UIPath.MoreGoldUI, MVC.eTransition.Scale, MVC.eUILayer.Tips, customdata, null, 1);
    }

    public onOpenMenuPanel() {
        let isstart = Notifier.call(CallID.Game_IsStart);
        if (isstart) return;
        Manager.audio.playAudio(501, AudioType.UI, 0);
        if (this.menuPanel) {
            this.menuPanel.getComponent(cc.Animation).stop();
            let animName = "menuPanelClose";
            if (!this._switchMenuPanel) {
                animName = "menuPanelOpen";
            }
            this.menuPanel.getComponent(cc.Animation).play(animName);
            this._switchMenuPanel = !this._switchMenuPanel;
        }
    }

    public goToBoxView() {
        if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.MainView) {
            Notifier.send(ListenID.Menu_CloseMainView);
            Notifier.send(ListenID.Box_OpenBoxView);
        } else if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.EquipView) {
            Notifier.send(ListenID.Equip_CloseEquipView);
            Notifier.send(ListenID.Box_OpenBoxView);
        } else if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.BoxView) {

        } else if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.EquipIntenView) {
            Notifier.send(ListenID.Equip_CloseEquipIntenView);
            Notifier.send(ListenID.Box_OpenBoxView);
        } else if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.EquipSmeltView) {
            Notifier.send(ListenID.Equip_CloseEquipSmeltView);
            Notifier.send(ListenID.Box_OpenBoxView);
        } else if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.BossView) {
            Notifier.send(ListenID.Boss_CloseBossRank);
            Notifier.send(ListenID.Box_OpenBoxView);
        } else if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.RankView) {
            Notifier.send(ListenID.Rank_closeRank);
            Notifier.send(ListenID.Box_OpenBoxView);
        } else if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.EcologicalView) {
            Notifier.send(ListenID.Close_EcologicalView);
            Notifier.send(ListenID.Box_OpenBoxView);
        } else if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.TechnologyView) {
            Notifier.send(ListenID.Technoloty_CloseView);
            Notifier.send(ListenID.Box_OpenBoxView);
        }
    }

    /** 功能解锁检查 */
    public rigisterFunUnlockTipsCheck() {
        let generateTipsData = (funID: number, node: cc.Node, type: number, value: number): FunUnlockTipsData => {
            return {
                funID: funID,
                node: node,
                unlockType: type,
                value: value,
            }
        }

        /** 签到解锁检测 */
        let signTipsData: FunUnlockTipsData = generateTipsData(GameFunID.Sign, this.btnMenu.node, GameFunUnlockType.Level, Cfg.UnlockSystem.get(GameFunID.Sign).unlockLevel);
        Notifier.send(ListenID.Rigister_FunUnlock, signTipsData);
        // this.btnMenu.node.active = FunOpen.getInstance().getFunIsOpen("Sign");
    }
}
