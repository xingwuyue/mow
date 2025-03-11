import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { CallID } from "../../CallID";
import { ListenID } from "../../ListenID";
import { Util } from "../../utils/Util";
import BoxModel from "./BoxModel";
import { AlertManager, AlertType } from "../../alert/AlertManager";
import { GameVoManager } from "../../manager/GameVoManager";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, RemindData, TaskSubType } from "../../common/Common_Define";
import { Const } from "../../config/Const";
import { Cfg } from "../../config/Cfg";
import { Time } from "../../framework/Time";
import { Manager } from "../../manager/Manager";
import NetAdapter from "../../adpapter/NetAdapter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxView extends MVC.BaseView {
    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Box_UpdateBoxView, this.onUpdateViewById, this);
        Notifier.changeListener(enable, ListenID.Box_RefreshFreeTime, this.refreshFreeTime, this);
        Notifier.changeListener(enable, ListenID.Box_OpenBoxOpenView, this.openBoxOpenView, this);
        Notifier.changeListener(enable, ListenID.Box_BoxOpenViewIsClose, this.closeBoxOpenView, this);
        Notifier.changeListener(enable, ListenID.Pay_Finish, this.updateDiamondView, this);

    }

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    btnclose: cc.Node = null;

    @property(cc.SpriteFrame)
    diamondSp: cc.SpriteFrame = null;

    @property(cc.Node)
    panel4: cc.Node = null;

    @property([cc.Node])
    btngets: cc.Node[] = [];

    @property([cc.Node])
    btnfreegets: cc.Node[] = [];

    @property([cc.Node])
    notuseIcon: cc.Node[] = [];

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.MainView) {
            if (UIManager.getNodeByName(Common_UIPath.MenuUI)) {
                Notifier.send(ListenID.Menu_CloseMainView);
            }
        }
        let date = true ? new Date() : new Date(Time.serverTimeMs);
        let curday = date.getDate();
        if (curday != GameVoManager.getInstance.myUserVo.day) {
            GameVoManager.getInstance.myUserVo.day = curday;
            Manager.storage.setString(Const.STORAGE_STORE_GOLD, "");
            Manager.storage.setString(Const.STORAGE_STORE_POWER, "");
            Manager.storage.setString(Const.STORAGE_STORE_BOX, "")
            Notifier.send(ListenID.SecondDay);
            BoxModel.getInstance.resetVideoTime();
        }
        GameVoManager.getInstance.stateVo.viewIndex = Const.ViewMap.BoxView;

        Notifier.send(ListenID.Menu_CloseMainView);
        this.initNode();
        this.initView();
        this.fixUI();
    }

    public view: cc.Node = null;

    public fixUI() {
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.bg.y = -size.height * 0.5;
        this.bg.width = size.width;
        this.bg.height = size.height;
        this.btnclose.y = -size.height * 0.5;
        let height = size.height * 0.5 - 70;
        if (size.height > Const.designHeight + 50) {
            height -= 70;
        }
        this.view.y = height;
        this.view.height = height * 2 > 1600 ? 1600 : height * 2;
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();

    }

    public onBack() {
        this.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Menu_OpenMainView);
        Notifier.send(ListenID.Log_Event, { event_name: "storePage_leave" });
    }

    public boxstep: cc.Label[] = [];
    public gettimes: cc.Label[] = [];
    public timelabel: cc.Label[] = [];

    @property([cc.Label])
    public goldlabel: cc.Label[] = [];

    @property([cc.Label])
    public powerlabel: cc.Label[] = [];

    @property([cc.Node])
    public maskgold: cc.Node[] = [];

    @property([cc.Node])
    public maskpower: cc.Node[] = [];

    @property([cc.Sprite])
    public goldsignicon: cc.Sprite[] = [];

    @property([cc.Sprite])
    public powersignicon: cc.Sprite[] = [];

    @property([cc.Label])
    public goldcost: cc.Label[] = [];

    @property([cc.Label])
    public powercost: cc.Label[] = [];

    @property([cc.Node])
    public diamonNode: cc.Node[] = [];

    public chouquIcon: cc.Node[] = [];

    public diamoncost: cc.Label[] = [];
    public diamonReward: cc.Label[] = [];
    public diamonfirstReward: cc.Label[] = [];
    public initNode() {
        this.view = this.panel4.parent.parent;
        for (let i = 0; i < 2; i++) {//宝箱
            this.boxstep[i] = this.panel4.getChildByName(`step${i + 1}`).getComponent(cc.Label);
            this.gettimes[i] = this.btngets[i].getChildByName(`gettime${i + 1}`).getComponent(cc.Label);
            this.chouquIcon[i] = this.btngets[i].getChildByName("chouqu");
            this.timelabel[i * 3] = this.panel4.getChildByName(`daylabel${i + 1}`).getComponent(cc.Label);
            this.timelabel[i * 3 + 1] = this.panel4.getChildByName(`hourlabel${i + 1}`).getComponent(cc.Label);
            this.timelabel[i * 3 + 2] = this.panel4.getChildByName(`minlabel${i + 1}`).getComponent(cc.Label);
        }
        for (let i = 0; i < 6; i++) {
            this.diamoncost[i] = this.diamonNode[i].getChildByName("diamoncost").getComponent(cc.Label);
            this.diamonReward[i] = this.diamonNode[i].getChildByName("diamon").getComponent(cc.Label);
            this.diamonfirstReward[i] = this.diamonNode[i].getChildByName("firstreward").getComponent(cc.Label);
        }
    }

    public initView() {
        let step = BoxModel.getInstance.getCurStep();
        for (let i = 0; i < 2; i++) {//宝箱
            let state = BoxModel.getInstance.getBoxState(i + 1);
            this.btngets[i].parent.active = state == 2;
            this.btnfreegets[i].active = state == 1;
            this.notuseIcon[i].active = state == 3;

            let data = BoxModel.getInstance.getCostById(i + 1);
            let icon = this.btngets[i].getChildByName("videoicon").getComponent(cc.Sprite);
            let label = this.btngets[i].getChildByName("Label").getComponent(cc.Label);
            if (data[0] == 2) {
                icon.spriteFrame = this.diamondSp;
                label.string = data[1] + "";
            }
            else {
                label.string = `${data[2]}/${data[1]}`;
            }
            this.boxstep[i].string = `${step}`;
            let progressdata = BoxModel.getInstance.getProgress(i + 1);
            this.gettimes[i].node.active = progressdata[1] != -1;
            this.gettimes[i].string = `${progressdata[0]}/${progressdata[1]}`;
            this.chouquIcon[i].active = progressdata[1] != -1;
            let timearray = BoxModel.getInstance.getFreeTime(i + 1);
            for (let j = 0; j < timearray.length; j++) {
                this.timelabel[i * 3 + j].string = `${timearray[j]}`;
            }
        }

        for (let i = 0; i < 3; i++) {
            this.goldlabel[i].string = Util.goldFormat(BoxModel.getInstance.getCurGoldRewardById(i + 3));
            this.powerlabel[i].string = `${BoxModel.getInstance.getCurPowerRewardById(i + 6)}`;
            let golddata = BoxModel.getInstance.getCostById(i + 3);
            if (golddata[0] == 2) {
                this.goldsignicon[i].spriteFrame = this.diamondSp;
                this.goldcost[i].string = golddata[1] + "";
            } else {
                this.goldcost[i].string = `${golddata[2]}/${golddata[1]}`;
            }
            let powerdata = BoxModel.getInstance.getCostById(i + 6);
            if (powerdata[0] == 2) {
                this.powersignicon[i].spriteFrame = this.diamondSp;
                this.powercost[i].string = powerdata[1] + "";
            } else {
                this.powercost[i].string = `${powerdata[2]}/${powerdata[1]}`;
            }
            this.maskgold[i].active = BoxModel.getInstance.checkFinishById(i + 3);
            this.maskpower[i].active = BoxModel.getInstance.checkFinishById(i + 6);
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

    public updateView() {
        for (let i = 0; i < 3; i++) {
            let golddata = BoxModel.getInstance.getCostById(i + 3);
            if (golddata[0] == 2) {
                this.goldcost[i].string = golddata[1] + "";
            } else {
                this.goldcost[i].string = `${golddata[2]}/${golddata[1]}`;
            }
            let powerdata = BoxModel.getInstance.getCostById(i + 6);
            if (powerdata[0] == 2) {
                this.powercost[i].string = powerdata[1] + "";
            } else {
                this.powercost[i].string = `${powerdata[2]}/${powerdata[1]}`;
            }
            this.maskgold[i].active = BoxModel.getInstance.checkFinishById(i + 3);
            this.maskpower[i].active = BoxModel.getInstance.checkFinishById(i + 6);
        }
    }

    public onUpdateViewById(id: number, type: number) {
        let i = id;
        if (type == 2) {
            i = id - 3;
            let golddata = BoxModel.getInstance.getCostById(id);
            if (golddata[0] == 2) {
                // this.goldcost[i].string = golddata[1] + "";
            } else {
                this.goldcost[i].string = `${golddata[2]}/${golddata[1]}`;
            }
            this.maskgold[i].active = BoxModel.getInstance.checkFinishById(id);
        } else if (type == 3) {
            i = id - 6;
            let powerdata = BoxModel.getInstance.getCostById(id);
            if (powerdata[0] == 2) {
                // this.powercost[i].string = powerdata[1] + "";
            } else {
                this.powercost[i].string = `${powerdata[2]}/${powerdata[1]}`;
            }
            this.maskpower[i].active = BoxModel.getInstance.checkFinishById(id);
        } else if (type == 1) {
            i = id - 1;
            let state = BoxModel.getInstance.getBoxState(id);
            this.btngets[i].parent.active = state == 2;
            this.btnfreegets[i].active = state == 1;
            this.notuseIcon[i].active = state == 3;

            let data = BoxModel.getInstance.getCostById(id);
            let label = this.btngets[i].getChildByName("Label").getComponent(cc.Label);
            if (data[0] == 2) {
            }
            else {
                label.string = `${data[2]}/${data[1]}`;
            }
            let progressdata = BoxModel.getInstance.getProgress(id);
            this.gettimes[i].node.active = progressdata[1] != -1;
            this.gettimes[i].string = `${progressdata[0]}/${progressdata[1]}`;
        }
    }

    public refreshFreeTime() {
        for (let i = 0; i < 2; i++) {
            let timearray = BoxModel.getInstance.getFreeTime(i + 1);
            for (let j = 0; j < timearray.length; j++) {
                this.timelabel[i * 3 + j].string = `${timearray[j]}`;
            }
        }
    }

    public openBoxOpenView() {
        this.btnclose.parent.active = false;
    }

    public closeBoxOpenView() {
        this.btnclose.parent.active = true;
    }

    public updateDiamondView() {
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


    public onBuyClick(event, customdata) {
        Manager.audio.playAudio(501);
        let num = Number(customdata);
        if (BoxModel.getInstance.checkFinishById(num)) {
            AlertManager.showNormalTips("今日已无法获取");
            return;
        }
        let data = BoxModel.getInstance.getCostById(num);
        if (data[0] == 2) {
            if (GameVoManager.getInstance.myUserVo.diamond >= data[1]) {
                GameVoManager.getInstance.setDiamond(-data[1]);
                BoxModel.getInstance.buySuccess(num);
                if (num <= 2) {
                    Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BoxTarget, [num, 1]);
                } else if (num <= 5) {
                    Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BoxBuy, [1, 1]);
                } else if (num <= 8) {
                    Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BoxBuy, [2, 1]);
                }
                if (num == 2)
                    Notifier.send(ListenID.Log_Event, { event_name: "storePage_violetbox_diamond" });
                else if (num == 3) {
                    Notifier.send(ListenID.Log_Event, { event_name: "storePage_minGold_diamond" });
                } else if (num == 4) {
                    Notifier.send(ListenID.Log_Event, { event_name: "storePage_midGold_diamond" });
                } else if (num == 5) {
                    Notifier.send(ListenID.Log_Event, { event_name: "storePage_maxGold_diamond" });
                } else if (num == 6) {
                    Notifier.send(ListenID.Log_Event, { event_name: "storePage_minPower_diamond" });
                } else if (num == 7) {
                    Notifier.send(ListenID.Log_Event, { event_name: "storePage_midPower_diamond" });
                } else if (num == 8) {
                    Notifier.send(ListenID.Log_Event, { event_name: "storePage_maxPower_diamond" });
                }
            } else {

                AlertManager.showNormalTips("钻石不足，无法购买");

            }
        } else if (data[0] == 1) {
            let eventName = "event_6";
            if (num == 3) {
                eventName = "event_8";
            } else if (num == 4) {
                eventName = "event_9";
            } else if (num == 6) {
                eventName = "event_10";
            } else if (num == 7) {
                eventName = "event_11";
            }
            BoxModel.getInstance.addVideos(num);
            if (num == 1) {
                Notifier.send(ListenID.Log_Event, { event_name: "storePage_silverbox_video" });
            } else if (num == 3) {
                Notifier.send(ListenID.Log_Event, { event_name: "storePage_minGold_video" });
            } else if (num == 4) {
                Notifier.send(ListenID.Log_Event, { event_name: "storePage_midGold_video" });
            } else if (num == 6) {
                Notifier.send(ListenID.Log_Event, { event_name: "storePage_minPower_video" });
            } else if (num == 7) {
                Notifier.send(ListenID.Log_Event, { event_name: "storePage_midPower_video" });
            }
            if (num <= 2) {
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BoxTarget, [num, 1]);
            } else if (num <= 5) {
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BoxBuy, [1, 1]);
            } else if (num <= 8) {
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BoxBuy, [2, 1]);
            }
        } else if (data[0] == 3) {//支付
            Notifier.send(ListenID.Log_Event, { event_name: "storePage_diamond_" + (num - 8) });
            Notifier.send(ListenID.Pay_CallBack, 2, "", "", num, "支付成功");
        }
    }

    public onFreeClick(event, customdata) {
        Manager.audio.playAudio(501);
        let num = Number(customdata);
        BoxModel.getInstance.buySuccess(num, 2);
        let data = Cfg.Store.get(num);
        if (num == 1) {
            GameVoManager.getInstance.myUserVo.boxfreeTimes[0] = Time.serverTimeMs + data.freeTime * 1000;
            Notifier.send(ListenID.Log_Event, { event_name: "storePage_silverbox_free" });
        } else {
            GameVoManager.getInstance.myUserVo.boxfreeTimes[1] = Time.serverTimeMs + data.freeTime * 1000;
            Notifier.send(ListenID.Log_Event, { event_name: "storePage_violetbox_free" });
        }
        this.onUpdateViewById(num, data.type);
    }
}
