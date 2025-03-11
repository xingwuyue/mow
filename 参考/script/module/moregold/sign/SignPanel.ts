import { GameVoManager } from "../../../manager/GameVoManager";
import { Time } from "../../../framework/Time";
import { AlertManager } from "../../../alert/AlertManager";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import SignItem from "./SignItem";
import { Cfg } from "../../../config/Cfg";
import { SignCfg } from "../../../config/SignCfg";
import BtnRewardMultView from "../../component/button/BtnRewardMultView";
import { Manager } from "../../../manager/Manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SignPanel extends cc.Component {

    @property([cc.Node])
    signItemList: cc.Node[] = [];

    @property(cc.Button)
    btnSign: cc.Button = null;

    @property(cc.Node)
    btn_extra: cc.Node = null;

    @property(cc.Node)
    isget: cc.Node = null;

    @property(cc.Node)
    point: cc.Node = null;

    public onEnable() {
        Notifier.changeListener(true, ListenID.Refresh_ShareTimes, this.refreshBtnStatus, this);
        Notifier.changeListener(true, ListenID.Sign_Double, this.onDoubleFunc, this);
    }

    public onDisable() {
        Notifier.changeListener(false, ListenID.Refresh_ShareTimes, this.refreshBtnStatus, this);
        Notifier.changeListener(false, ListenID.Sign_Double, this.onDoubleFunc, this);
    }

    public updateItemList() {
        for (let i = 0; i < this.signItemList.length; i++) {
            this.signItemList[i].getComponent(SignItem).updateState(GameVoManager.getInstance.myUserVo.signDay, i);
        }
        this.setSignState();
        this.btn_extra.getComponent(BtnRewardMultView).init({ gold: 0, callBack: this.onExtraCallFunc.bind(this), text: "" })
    }

    public setSignState() {

        let date = new Date(Time.serverTimeMs);
        if (date.getDate() != GameVoManager.getInstance.myUserVo.lastSignDay) {
            this.isget.active = false;
            this.btn_extra.active = true;
            this.btnSign.node.active = true;
            // this.point.active = true;
        } else {
            this.isget.active = true;
            this.btn_extra.active = false;
            this.btnSign.node.active = false;
            // this.point.active = false;
        }
    }

    public onSign(event: any, type: number = 0) {
        let signdata: SignCfg;
        if (GameVoManager.getInstance.myUserVo.signDay >= 7) {
            signdata = Cfg.Sign.get(GameVoManager.getInstance.myUserVo.signDay % 7 + 1 + 7);
        } else {
            signdata = Cfg.Sign.get(GameVoManager.getInstance.myUserVo.signDay + 1);
        }
        if (!signdata) {
            console.error("sign data error day = ", GameVoManager.getInstance.myUserVo.signDay);
            return
        }
        if (signdata.awardType == 0) { //金币
            GameVoManager.getInstance.setGold(signdata.awardCount);
        } else if (signdata.awardType == 1) {//武器
            if (!GameVoManager.getInstance.myUserVo.weaponList[signdata.awardID]) {
                GameVoManager.getInstance.myUserVo.weaponList[signdata.awardID] = [0, 0];
                Notifier.send(ListenID.Shop_UnLock, [], [signdata.awardID]);
                GameVoManager.getInstance.myUserVo.unlockNewWeapon = signdata.awardID;
                Notifier.send(ListenID.UnlockNewWeapon);
                let weapondata = Cfg.Weapon.get(signdata.awardID);
                if (weapondata) {
                    if (!GameVoManager.getInstance.myUserVo.dropList[weapondata.dropId]) {
                        GameVoManager.getInstance.myUserVo.dropList[weapondata.dropId] = 1;
                    }
                }
            }
        } else if (signdata.awardType == 2) {//道具
            if (!GameVoManager.getInstance.myUserVo.dropList[signdata.awardID]) {
                GameVoManager.getInstance.myUserVo.dropList[signdata.awardID] = 1;
                Notifier.send(ListenID.Shop_UnLock, [], []);
            }
        } else if (signdata.awardType == 3) {
            GameVoManager.getInstance.setDiamond(signdata.awardCount);
        }

        if (type == 2) {
            if (signdata.extraType == 0) {
                GameVoManager.getInstance.setGold(signdata.extraCount);
            } else if (signdata.extraType == 3) {
                GameVoManager.getInstance.setDiamond(signdata.extraCount);
            }
        }
        AlertManager.showNormalTips("奖励领取成功！");
        GameVoManager.getInstance.myUserVo.signDay += 1;
        let date = new Date(Time.serverTimeMs);
        GameVoManager.getInstance.myUserVo.lastSignDay = date.getDate();
        Notifier.send(ListenID.Refresh_Point);
        this.updateItemList();
        Notifier.send(ListenID.RewardWelfare);
        Notifier.send(ListenID.Log_Event, { event_name: "check" });
        let first_check = Manager.storage.getString("first_check");
        if (!first_check) {
            Notifier.send(ListenID.Log_Event, { event_name: "first_check" });
            Manager.storage.setString("first_check", "1");
        }
        if (type == 2) {
            Notifier.send(ListenID.GetSignReward);
        } else {
            Notifier.send(ListenID.Close_MoreGoldPanel);
        }
        GameVoManager.getInstance.saveData();
    }

    onExtraCallFunc() {
        this.onSign(null, 2);
    }

    onDoubleFunc() {
        this.onSign(null, 2);
    }

    public refreshBtnStatus() {
        this.btn_extra.getComponent(BtnRewardMultView).refreshBtnStatus({ gold: 0, callBack: this.onExtraCallFunc.bind(this), text: "" })
    }
}
