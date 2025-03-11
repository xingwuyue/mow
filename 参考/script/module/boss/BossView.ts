import { MVC } from "../../framework/MVC";
import BossModel from "./BossModel";
import BossRankItem from "./BossRankItem";
import { GameVoManager } from "../../manager/GameVoManager";
import { Const } from "../../config/Const";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, EquipTipsData, EquipTipsType } from "../../common/Common_Define";
import { AlertManager, AlertType } from "../../alert/AlertManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Util } from "../../utils/Util";
import { Time } from "../../framework/Time";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";
import { Cfg } from "../../config/Cfg";
import ItemCell from "../../component/itemscroll/ItemCell";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BossView extends MVC.BaseView {

    @property(cc.Node)
    rankItem: cc.Node = null;

    @property(cc.Node)
    rankContent: cc.Node = null;

    @property(cc.Node)
    lastNode: cc.Node = null;

    @property(cc.Node)
    goodsItem: cc.Node = null;

    public lastLevel: cc.Label = null;
    public lastRank: cc.Label = null;
    public goldRewardNode: cc.Node = null;
    // public boxRewardNode: cc.Node = null;
    public rankList: cc.Node[] = [];
    public myRank: cc.Node = null;
    public btnStartGame: cc.Node = null;
    totalCount: number = 0; // how many items we need for the whole list
    spawnCount: number = 6;
    spacing: number = 10; // space between each item
    bufferZone: number = 250;
    lastContentPosY = 0;
    _powerTempTime: number = 0;

    public rewardNode: cc.Node = null;
    protected changeListener(enable: boolean): void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
    }

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
        GameVoManager.getInstance.stateVo.viewIndex = Const.ViewMap.BossView;
        Notifier.send(ListenID.Game_SetCurrencyVis, true);
        this.setInfo(args);
        // this.getUserInfo();
    }

    // public getUserInfo() {
    //     let pWorld = this.btnStartGame.parent.convertToWorldSpaceAR(this.btnStartGame.position);
    //     if (!HD_MODULE.getPlatform().getAuthorizeInfo() || !GameVoManager.getInstance.myUserVo.isAuthorize) {
    //         HD_MODULE.getPlatform().getUserInfo((res) => {
    //             this.onStartBossGame();
    //         }, () => {
    //             this.onStartBossGame();
    //         }, { width: this.btnStartGame.width, height: this.btnStartGame.height, worldPos: pWorld });
    //     }
    // }

    public setInfo(args) {
        this.totalCount = BossModel.getInstance.rankList.length;
        if (this.totalCount < this.spawnCount) {
            this.totalCount = this.spawnCount;
        }
        this.rankContent.height = this.totalCount * (this.rankItem.height + this.spacing) + this.spacing;
        let bg = this.node.getChildByName("bg");
        if (bg) {
            Util.resizeNode(bg);
        }
        this.btnStartGame = this.node.getChildByName("btnStart");
        this.myRank = this.node.getChildByName("myRankItem");
        let levelnode = this.lastNode.getChildByName('levelLayout');
        this.rewardNode = this.lastNode.getChildByName("rewardLayout");
        let goldRewardNode = this.rewardNode.getChildByName('goldReward');
        let diamondRewardNode = this.rewardNode.getChildByName('diamondReward');
        let goldnum = goldRewardNode.getChildByName('num').getComponent(cc.Label);
        let diamondnum = diamondRewardNode.getChildByName('num').getComponent(cc.Label);
        goldnum && (goldnum.string = `x${Util.goldFormat(GameVoManager.getInstance.myUserVo.bossGold)}`);
        diamondnum && (diamondnum.string = `x${Util.goldFormat(GameVoManager.getInstance.myUserVo.bossDiamond)}`);
        this.lastLevel = levelnode.getChildByName('levelText').getComponent(cc.Label);
        this.lastLevel.string = `${GameVoManager.getInstance.myUserVo.lastBossRank}`;
        for (let i = 0; i < this.spawnCount; ++i) {
            let item = cc.instantiate(this.rankItem);
            item.active = true;
            this.rankContent.addChild(item);
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            let data = BossModel.getInstance.rankList[i];
            item.getComponent(BossRankItem).init(i, data, (i + 1) + "");
            this.rankList.push(item);
        }
        for (let i = 0; i < 8; i++) {
            let id = GameVoManager.getInstance.myUserVo.bossReward[i];
            if (id) {
                let node = cc.instantiate(this.goodsItem);
                node.active = true;
                node.getComponent(ItemCell).initItem({
                    itemID: id,
                    index: -1,
                    clickHandler: () => {
                        let equipTipsData: EquipTipsData = {
                            type: EquipTipsType.Normal,
                            itemLeftID: id,
                            comparePosNode: node,
                            compareID: 0,
                        }
                        Notifier.send(ListenID.Equip_OpenTipsView, equipTipsData);
                    },
                });
                this.rewardNode.addChild(node);
            }
        }
        this.initMyRank();

        if (!Manager.storage.getBool(Const.STORAGE_BOSS_HELP, false)) {
            this.onAskOpen();
            Manager.storage.setBool(Const.STORAGE_BOSS_HELP, true);
        }
    }

    initMyRank() {
        this.myRank.getComponent(BossRankItem).init(-1, { avatarUrl: GameVoManager.getInstance.myUserVo.avatarUrl, nickName: "nickName", score: BossModel.getInstance.myScore, open_id: "" }, BossModel.getInstance.myRank <= 0 ? '=' : `${BossModel.getInstance.myRank}`);
    }

    refresh() {
        this.initMyRank();
        this.adjustScrollData();
    }

    getPositionInView(item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.rankContent.parent.parent.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }
    /**
     * 调整滚动物品位置
     */
    adjustScrollData() {
        let items = this.rankList;
        let buffer = this.bufferZone;
        let isDown = this.rankContent.y < this.lastContentPosY; // scrolling direction
        let offset = (this.rankItem.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    let item = items[i].getComponent(BossRankItem);
                    let itemId = item.itemID - items.length;
                    let data = BossModel.getInstance.rankList[itemId];
                    item.init(itemId, data, `${itemId + 1}`);
                }
            } else {
                if (viewPos.y > buffer && items[i].y - offset > -this.rankContent.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent(BossRankItem);
                    let itemId = item.itemID + items.length;
                    let data = BossModel.getInstance.rankList[itemId];
                    item.init(itemId, data, `${itemId + 1}`);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.rankContent.y;
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        GameVoManager.getInstance.myUserVo.tempLevelTime = Time.serverTimeMs;
        this.unscheduleAllCallbacks();
    }

    public onRetrunClick() {
        this.onClose();
        UIManager.Open(Common_UIPath.MenuUI);
        setTimeout(() => {
            Notifier.send(ListenID.Game_OpenUIList);
        }, 200);
    }

    public onStartBossGame() {
        if (GameVoManager.getInstance.myUserVo.power < Const.PowerCost * 2) {
            AlertManager.showAlert(AlertType.SELECT, {
                reasonDesc: `体力不足，无法挑战`,
                wayDesc: "是否前往购买体力？",
                confirmText: "是",
                cancelText: "否",
                confirm: () => {
                    Notifier.send(ListenID.Box_OpenBoxView);
                    Notifier.send(ListenID.Log_Event, { event_name: "storePage_access" });
                    this.onClose();
                },
            });
            return;
        }
        let targetLv = GameVoManager.getInstance.myUserVo.topBossRank + 1;
        let bossdata = Cfg.Boss.get(targetLv);
        if (bossdata) {
            if (bossdata.openLevel > GameVoManager.getInstance.myUserVo.topLevel) {
                let chapids = Util.levelToChapterId(bossdata.openLevel);
                AlertManager.showNormalTips(`需通过第${chapids[0]}章${chapids[1]}关才能开启下一阶段挑战`);
                return;
            }
        } else {
            AlertManager.showNormalTips("已达最大上限关卡");
            return;
        }
        this.onClose();
        GameVoManager.getInstance.setPower(Const.PowerCost * 2, 3);
        Notifier.send(ListenID.Fight_Start, 1, targetLv);
        // HD_MODULE.getNet().postGameEvent({ event_name: 'boss_rank_p', counter: 1 });
        Notifier.send(ListenID.Log_Event, { event_name: "boss_rank_p" });
        Notifier.send(ListenID.Log_Event, { event_name: "bossCombat" });

    }

    private updateRankTime = 0.1;
    update(dt) {
        this.updateRankTime -= dt;
        if (this.isOpened && this.updateRankTime <= 0) {
            this.adjustScrollData();
            this.updateRankTime = 0.1;
        }
    }
    _scheduleCallBack: Function = null;

    public onAskOpen() {
        UIManager.Open(Common_UIPath.BossHelpUI, null, MVC.eUILayer.Popup);
    }

    public onExchangePower() {
        Manager.audio.playAudio(501, AudioType.UI);
        UIManager.Open(Common_UIPath.ExchangePowerUI);
    }
}
