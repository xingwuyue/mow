import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { CallID } from "../../CallID";
import { ListenID } from "../../ListenID";
import { Const } from "../../config/Const";
import { GameVoManager } from "../../manager/GameVoManager";
import ItemCell from "../../component/itemscroll/ItemCell";
import { Cfg } from "../../config/Cfg";
import { Util } from "../../utils/Util";
import BoxModel from "./BoxModel";
import { AlertManager, AlertType } from "../../alert/AlertManager";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, GameFunID, TaskSubType } from "../../common/Common_Define";
import { Manager } from "../../manager/Manager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxOpenView extends MVC.BaseView {

    @property(cc.Node)
    btnclose: cc.Node = null;

    @property(cc.Animation)
    boxaction: cc.Animation = null;

    @property(cc.Prefab)
    goodsItem: cc.Prefab = null;

    @property([cc.Label])
    videonums: cc.Label[] = [];

    @property([cc.Label])
    diamondnums: cc.Label[] = [];



    public changeListener(enable) {
        Notifier.changeListener(enable, ListenID.Box_UpdateBoxView, this.onUpdateViewById, this);
    }
    private goodslist: cc.Node[] = [];
    private goodsName: cc.Label[] = [];
    public onOpen(args) {
        super.onOpen(args);
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        this.btnclose.y = -size.height * 0.5;
        this.initNode();
        this.setInfo(args);
        this.node.colliderComponent = this;
    }

    private goodsNode: cc.Node = null;
    private light: cc.Node = null;
    private goodsNamePrefab: cc.Node = null;
    private btnagain: cc.Node = null;
    private videoway: cc.Node = null;
    private diamonway: cc.Node = null;
    public initNode() {
        this.goodsNode = this.node.getChildByName("goodsNode");
        this.light = this.node.getChildByName("light");
        this.goodsNamePrefab = this.node.getChildByName("goodsName");
        this.btnagain = this.node.getChildByName("btnAgain");
        let background = this.btnagain.getChildByName("Background");
        this.videoway = background.getChildByName("videoway");
        this.diamonway = background.getChildByName("diamondway");
    }
    private storeId: number = 0;
    public setInfo(args) {
        this.light.opacity = 0;
        this.light.scale = 0;
        this.btnclose.active = false;
        this.btnagain.active = false;
        if (!args || !args.goodsList) return;
        this.storeId = args.type;
        let goodslist = args.goodsList;
        let goodsLen = goodslist.length;
        let gold = 0;
        let diamond = 0;
        this.goodsIndex = 0;
        this.updateBtn();
        for (let i = 0; i < goodsLen; i++) {
            let goodsType: Const.dropType = goodslist[i][0];
            let goodsNum = goodslist[i][2];
            let goodsTypeId = goodslist[i][1];
            if (goodsType == Const.dropType.Gold) {
                if (goodsTypeId == 1) {
                    gold += goodsNum;
                } else if (goodsTypeId == 2) {
                    diamond += goodsNum;
                }
            } else if (goodsType == Const.dropType.Equip) {
                for (let k = 0; k < goodsNum; k++) {
                    GameVoManager.getInstance.addEquip(goodsTypeId);
                    let equipdata = Cfg.Equip.get(goodsTypeId);
                    if (equipdata && equipdata.quality >= 4) {
                        Notifier.send(ListenID.Announce_AddMessage, GameVoManager.getInstance.myUserVo.nickName, GameFunID.Box, equipdata.name);
                    }
                    this.addGoodsItem(goodsTypeId);
                }
            }
        }
        if (gold) {
            GameVoManager.getInstance.setGold(gold);
            this.addGoodsItem(1);
        }
        if (diamond) {
            GameVoManager.getInstance.setDiamond(diamond);
            this.addGoodsItem(2);
        }

        for (let j = this.goodsIndex; j < this.goodslist.length; j++) {
            this.goodslist[j].active = false;
        }
        GameVoManager.getInstance.saveData();
        this.playAction(args.type);
    }

    public onClose() {
        super.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Box_BoxOpenViewIsClose);
    }

    public onUpdateViewById(id: number) {
        if (id == this.storeId) {
            this.updateBtn();
        }
    }

    public playAction(index) {
        this.unscheduleAllCallbacks();
        let state = this.boxaction.getAnimationState("openbox" + index);
        this.boxaction.play("openbox" + index);
        this.scheduleOnce(() => {
            this.boxaction.play("openboxloop" + index);
            this.light.runAction(cc.spawn(cc.fadeIn(0.5), cc.scaleTo(0.5, 1)));
            for (let i = 0; i < this.goodslist.length; i++) {
                this.goodslist[i].runAction(cc.scaleTo(0.5, 1));
            }
        }, state.duration);
        this.scheduleOnce(() => {
            let boo = BoxModel.getInstance.checkFinishById(this.storeId)
            this.btnagain.active = !boo;
            if (!boo) {
                this.updateBtn();
            }
        }, state.duration + 0.5);

        this.scheduleOnce(() => {
            this.btnclose.active = true;
        }, state.duration + 1);
    }

    public updateBtn() {
        let data = BoxModel.getInstance.getCostById(this.storeId);
        this.videoway.active = data[0] == 1;
        this.diamonway.active = data[0] == 2;
        if (data[0] == 1) {//视频
            this.videonums[0].node.parent.active = data[3] > 0;
            this.videonums[0].string = `${data[2]}/${data[1]}`;
            this.videonums[1].string = data[3] > 0 ? `${data[2]}/${data[3]}` : `${data[2]}/${data[1]}`;
        } else if (data[0] == 2) {
            this.diamondnums[0].node.parent.active = data[2] > 0;
            this.diamondnums[0].string = `${data[2]}`;
            this.diamondnums[1].string = data[2] > 0 ? `${data[2]}` : `${data[1]}`;
        }
    }

    private goodsIndex: number = 0;
    public addGoodsItem(id: number, num?: number) {
        if (!this.goodslist[this.goodsIndex]) {
            this.goodslist[this.goodsIndex] = cc.instantiate(this.goodsItem);
            this.goodsNode.addChild(this.goodslist[this.goodsIndex]);
            this.goodsName[this.goodsIndex] = cc.instantiate(this.goodsNamePrefab).getComponent(cc.Label);
            this.goodsName[this.goodsIndex].node.parent = this.goodslist[this.goodsIndex];
            this.goodsName[this.goodsIndex].node.position = cc.v2(0, -110);
        }
        if (id >= 10000) {//装备
            if (!this.goodslist[this.goodsIndex]) {
                this.goodslist[this.goodsIndex] = cc.instantiate(this.goodsItem);
                this.goodsNode.addChild(this.goodslist[this.goodsIndex]);
                this.goodsName[this.goodsIndex] = cc.instantiate(this.goodsNamePrefab).getComponent(cc.Label);
                this.goodsName[this.goodsIndex].node.parent = this.goodslist[this.goodsIndex];
                this.goodsName[this.goodsIndex].node.position = cc.v2(0, -110);
            }
            let equipdata = Cfg.Equip.get(id);
            if (equipdata) {
                let data = { index: -1, itemID: id, quality: equipdata.quality, step: equipdata.level, showEquipBG: false };
                this.goodslist[this.goodsIndex].getComponent(ItemCell).initItem(data);
                this.goodsName[this.goodsIndex].node.active = true;
                this.goodsName[this.goodsIndex].string = equipdata.name;
            }
        } else {
            let data = { index: -1, itemID: id, quality: 4, step: 0, showEquipBG: false };
            this.goodslist[this.goodsIndex].getComponent(ItemCell).initItem(data);
            this.goodsName[this.goodsIndex].node.active = true;
            this.goodsName[this.goodsIndex].string = Util.goldFormat(num);
        }
        this.goodslist[this.goodsIndex].active = true;
        this.goodslist[this.goodsIndex].scale = 0;

        this.goodsIndex++;
    }

    public onOpenAgain(event, customdata) {
        Manager.audio.playAudio(501);
        let num = this.storeId;
        if (BoxModel.getInstance.checkFinishById(num)) {
            AlertManager.showNormalTips("今日已无法获取");
            return;
        }
        let data = BoxModel.getInstance.getCostById(num);
        if (data[0] == 2) {
            let diamond = data[2] > 0 ? data[2] : data[1];
            if (GameVoManager.getInstance.myUserVo.diamond >= diamond) {
                GameVoManager.getInstance.setDiamond(-diamond);
                if (num == 1) {
                    Notifier.send(ListenID.Log_Event, { event_name: "again_silverbox_video" });
                } else {
                    Notifier.send(ListenID.Log_Event, { event_name: "again_violetbox_video" });
                }
                BoxModel.getInstance.buySuccess(num);
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BoxTarget, [num, 1]);
            } else {

                AlertManager.showNormalTips("钻石不足，无法购买");

            }
        } else {
            let eventName = "event_6";
            if (num == 2) {
                eventName = "event_7";
            }
            BoxModel.getInstance.addVideos(num);
            Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BoxTarget, [num, 1]);
            if (num == 1) {
                Notifier.send(ListenID.Log_Event, { event_name: "again_silverbox_video" });
            } else {
                Notifier.send(ListenID.Log_Event, { event_name: "again_violetbox_video" });
            }
        }
    }

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionEnter(other, self) {

    }
}
