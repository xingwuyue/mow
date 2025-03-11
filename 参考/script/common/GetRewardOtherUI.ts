import { MVC } from "../framework/MVC";
import { Cfg } from "../config/Cfg";
import { GameVoManager } from "../manager/GameVoManager";
import { AlertManager } from "../alert/AlertManager";
import { Manager } from "../manager/Manager";
import { ShareCode } from "./Common_Define";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GetRewardOtherUI extends MVC.BaseView {

    @property(cc.Node)
    diamondBtn: cc.Node = null;

    @property(cc.Node)
    shareBtn: cc.Node = null;


    // 设置事件监听
    protected changeListener(enable: boolean): void {

    }

    public onOpen(args: any = null): void {
        super.onOpen(args);
        this.setInfo(args);
    }

    public sucClose() {
        super.onClose();
    }

    public onClose(): void {
        super.onClose();
        if (this._btnType == 5) {
            Notifier.send(ListenID.Resume_CountDown);
        }
    }
    private callback: Function = null;
    private _multRewardType: number = 0;
    private _btnType: number = 0;
    public setInfo(args: any) {
        if (!args) return;
        if (args.btnType == -1) {
            this.callback = args.callBack;
            this.diamondBtn.active = false;
            this.shareBtn.active = true;
            this._multRewardType = 1;
        } else {
            let cfg = Cfg.Strike.getAll();
            let curCfg = cfg[args.btnType];
            this.callback = args.callBack;
            this._btnType = args.btnType;
            if (!curCfg) return;
            if (curCfg.shareCount <= 0) {//钻石复活 ps：钻石，分享互斥

            } else {//分享复活

            }
            this.diamondBtn.active = curCfg.shareCount <= 0;
            this.shareBtn.active = curCfg.shareCount > 0;
            this._multRewardType = curCfg.shareCount > 0 ? 1 : 3;
            let lbdiamond = this.diamondBtn.getChildByName("lbdiamond");
            lbdiamond.getComponent(cc.Label).string = `${curCfg.diamondCount[1]}`;
            lbdiamond.color = (curCfg.diamondCount[1] < GameVoManager.getInstance.myUserVo.diamond) ? cc.Color.WHITE.fromHEX("#FFFFFF") : cc.Color.WHITE.fromHEX("#FF0000");
        }
    }

    public onReward() {
        let drawType = this._multRewardType;
        let suc = () => {
            this.callback && this.callback(drawType);
            this.setData();

            if (this._btnType == 5 && drawType == 1) {
                // HD_MODULE.getNet().postGameEvent({ event_name: 'share_relive', counter: 1 });
                Notifier.send(ListenID.Log_Event, { event_name: "share_relive" });
            } else if (this._btnType == 5 && drawType == 2) {
                // HD_MODULE.getNet().postGameEvent({ event_name: 'video_relive', counter: 1 });
                Notifier.send(ListenID.Log_Event, { event_name: "video_relive" });
            } else if (this._btnType == 5 && drawType == 3) {
                // HD_MODULE.getNet().postGameEvent({ event_name: 'diamond_relive', counter: 1 });
                Notifier.send(ListenID.Log_Event, { event_name: "diamond_relive" });
            }
            this.sucClose();
        }

        if (this._multRewardType == 3) {
            let diamond = 50;
            if (GameVoManager.getInstance.myUserVo.diamond < diamond) {
                AlertManager.showNormalTips("钻石不足！");
                return
            } else {
                GameVoManager.getInstance.setDiamond(-diamond);
            }
            suc();
        } else if (this._multRewardType == 1) {
            suc();
        }
    }

    setData() {
        if (this._btnType == 5) {
            if (!Manager.storage.getNumber("reliveVideo")) {
                Manager.storage.setNumber("reliveVideo", 1)
            } else {
                let a: number = Manager.storage.getNumber("reliveVideo");
                a++;
                Manager.storage.setNumber("reliveVideo", a);
            }
        } else if (this._btnType == 3) {
            if (!Manager.storage.getNumber("menuVideo")) {
                Manager.storage.setNumber("menuVideo", 1)
            } else {
                let a: number = Manager.storage.getNumber("menuVideo");
                a++;
                Manager.storage.setNumber("menuVideo", a);
            }
        }
    }
}
