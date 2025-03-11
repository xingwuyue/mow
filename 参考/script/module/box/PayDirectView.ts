import { MVC } from "../../framework/MVC";
import { Manager } from "../../manager/Manager";
import { Cfg } from "../../config/Cfg";
import BoxModel from "./BoxModel";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import NetAdapter from "../../adpapter/NetAdapter";
import { AlertManager } from "../../alert/AlertManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PayDirectView extends MVC.BaseView {
    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Pay_Finish, this.updateView, this);
    }
    @property([cc.Node])
    public diamonNode: cc.Node[] = [];

    public onOpen(args) {
        super.onOpen(args);
        Notifier.send(ListenID.Log_Event, { event_name: "shortcut_diamond_access" });
        this.setInfo(args);
    }
    public diamoncost: cc.Label[] = [];
    public diamonReward: cc.Label[] = [];
    public diamonfirstReward: cc.Label[] = [];
    public setInfo(args) {
        for (let i = 0; i < 6; i++) {
            this.diamoncost[i] = this.diamonNode[i].getChildByName("diamoncost").getComponent(cc.Label);
            this.diamonReward[i] = this.diamonNode[i].getChildByName("diamon").getComponent(cc.Label);
            this.diamonfirstReward[i] = this.diamonNode[i].getChildByName("firstreward").getComponent(cc.Label);
        }
        let shopid = 9;
        for (let i = 0; i < 6; i++) {
            let id = shopid + i;
            let paydata = Cfg.Store.get(id);
            this.diamoncost[i].string = `￥${paydata.cashPrice}`;
            this.diamonReward[i].string = `${paydata.commodity[0]}`;
            if (BoxModel.getInstance.isFirstReward(id)) {
                this.diamonfirstReward[i].node.active = true;
                this.diamonfirstReward[i].string = `首次购买+${paydata.firstAward}钻`
            } else {
                this.diamonfirstReward[i].node.active = false;
            }
        }
    }
//weixin ： vip-v66666
    public updateView() {
        let shopid = 9;
        for (let i = 0; i < 6; i++) {
            let id = shopid + i;
            let paydata = Cfg.Store.get(id);
            this.diamoncost[i].string = `￥${paydata.cashPrice}`;
            this.diamonReward[i].string = `${paydata.commodity[0]}`;
            if (BoxModel.getInstance.isFirstReward(id)) {
                this.diamonfirstReward[i].node.active = true;
                this.diamonfirstReward[i].string = `首次购买+${paydata.firstAward}钻`
            } else {
                this.diamonfirstReward[i].node.active = false;
            }
        }
    }

    public onClose() {
        super.onClose();
        Notifier.send(ListenID.Log_Event, { event_name: "shortcut_diamond_leave" });
        Manager.audio.playAudio(501);
    }

    public onBuyClick(event, customdata) {
        Manager.audio.playAudio(501);
        let num = Number(customdata);
        let data = BoxModel.getInstance.getCostById(num);
        if (data[0] == 3) {
            Notifier.send(ListenID.Pay_CallBack, 2, "", "", num, "支付成功");
        }
    }

    // update (dt) {}
}
