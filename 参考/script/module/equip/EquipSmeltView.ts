import { MVC } from "../../framework/MVC";
import EquipModel from "./EquipModel";
import ItemScrollCom from "../../component/itemscroll/ItemScrollCom";
import MenuItem from "../../component/menuitem/MenuItem";
import { Notifier } from "../../framework/Notifier";
import { CallID } from "../../CallID";
import { ListenID } from "../../ListenID";
import { EquipController } from "./EquipController";
import ItemCell from "../../component/itemscroll/ItemCell";
import { Cfg } from "../../config/Cfg";
import { ItemData, Guide, TaskSubType, Common_UIPath } from "../../common/Common_Define";
import { GameVoManager } from "../../manager/GameVoManager";
import { AlertManager, AlertType } from "../../alert/AlertManager";
import { Util } from "../../utils/Util";
import { Manager } from "../../manager/Manager";
import GuideNewController from "../guide/GuideNewController";
import { Const } from "../../config/Const";
import { UIManager } from "../../framework/UIManager";

const { ccclass, property } = cc._decorator;

declare interface selectMap {
    [key: number]: number
}
/**
 * 熔炼界面
 * @date 2019-09-28
 */
@ccclass
export default class EquipSmeltView extends MVC.BaseView {

    /** 背包滑动面板 */
    @property(cc.Prefab)
    itemScrollCom: cc.Prefab = null;

    /** 背包菜单 */
    @property(cc.Prefab)
    tabMenu: cc.Prefab = null;

    /** 装备格子 */
    @property(cc.Prefab)
    itemCell: cc.Prefab = null;

    /** 菜单精灵帧 */
    @property(cc.SpriteFrame)
    menuSpFrameArr: cc.SpriteFrame[] = [];

    /** 页签 */
    @property(cc.Sprite)
    imgTabText: cc.Sprite = null;

    @property(cc.Label)
    rewardGoldText: cc.Label = null;

    @property([cc.Toggle])
    qualityToggles: cc.Toggle[] = [];

    @property([cc.Toggle])
    stepToggles: cc.Toggle[] = [];

    @property(cc.Button)
    btnSmelt: cc.Button = null;

    /** 数据model */
    private _model: EquipModel = null;
    /** 物品滑动面板view */
    private _itemScrollComView: ItemScrollCom = null;
    /** 菜单面板view */
    private _tabMenuView: MenuItem = null;
    /** EquipCtrl */
    private _ctrl: EquipController = null;
    /** 当前页签 */
    private _curPageIndex: number = 0;

    public selectIdlist: selectMap = {};
    public onLoad() {
        this._ctrl = EquipController.getInstance;
        this._model = EquipModel.getInstance;
    }

    changeListener() { }
    private scrollNode: cc.Node;

    private isAutoSelect: boolean = true;
    onOpen(args: any) {
        super.onOpen(args);
        this._model = EquipModel.getInstance;
        if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.MainView) {
            if (UIManager.getNodeByName(Common_UIPath.MenuUI)) {
                Notifier.send(ListenID.Menu_CloseMainView);
            }
        }
        GameVoManager.getInstance.stateVo.viewIndex = Const.ViewMap.EquipSmeltView;
        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        let close = this.node.getChildByName("btnBack");
        this.scrollNode = this.node.getChildByName("scrollnode");
        close.y = -size.height * 0.5 + 42;
        let bg = this.node.getChildByName("bg");
        bg.width = size.width;
        bg.height = size.height;
        this.fixUI();
        this.setInfo(args);
    }

    onClose(closeGuide: boolean = true) {
        super.onClose({ closeGuide: closeGuide });
        Notifier.send(ListenID.On_Close_SmeltView);
    }

    openCallBack() {
        this._rigisterGuideCheck();
    }

    _rigisterGuideCheck() {
        /** 熔炼按钮指引 */
        let smeltGuideData: Guide.GuideItemData = {
            node: this.btnSmelt.node,
            tag: 10701,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onSell();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, smeltGuideData);

        let btnClose = this.node.getChildByName("btnBack");
        let closeData: Guide.GuideItemData = {
            node: btnClose,
            tag: 10801,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onBtnBack(false);
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, closeData);
    }

    public fixUI() {
        let btnbottom = this.node.getChildByName("bottom");
        // let btntab = this.node.getChildByName("btnTab");
        let scrollnode = this.node.getChildByName("scrollnode");
        Util.adapterNodeY(scrollnode);
        // Util.adapterNodeY(btntab);
        Util.adapterNodeY(btnbottom);
    }

    /** 关闭按钮点击 */
    public onBtnBack(closeGuide: boolean = true) {
        this.onClose(closeGuide);
        // Manager.audio.playAudio(501);
        Notifier.send(ListenID.Equip_OpenEquipView);
        Notifier.send(ListenID.Log_Event, { event_name: "smeltPage_leave" });
    }

    private rewardNum: number = 0;
    public setInfo(args) {
        this.initTabMenu();
        this.initItemScrollCom();
        this.initSelectInfo();
        Notifier.send(ListenID.On_Open_SmeltView);
    }

    public initSelectInfo() {
        if(GuideNewController.getInstance().getData().getIsGuideing()){
            this.selectQuality = [true, false, false];
            this.selectStep = [true, false, false, false];
            this.isAutoSelect = false;
            for (let i = 0; i < this.selectStep.length; i++) {
                this.stepToggles[i].isChecked = this.selectStep[i];
            }
            for (let i = 0; i < this.selectQuality.length; i++) {
                this.qualityToggles[i].isChecked = this.selectQuality[i];
            }
        } else {
            this.selectQuality = [true, true, false];
            this.selectStep = [true, true, false, false];
        }
        this.isSelectQuality = true;
        this.isSelectStep = true;
        this.isAutoSelect = true;
        this.updateAutoGoodsList();
    }

    initItemScrollCom() {
        if (!this._itemScrollComView) {
            let itemScroll = cc.instantiate(this.itemScrollCom);
            itemScroll.parent = this.scrollNode;
            this._itemScrollComView = itemScroll.getComponent(ItemScrollCom);
            this._itemScrollComView.setViewHeight(600);
            this._itemScrollComView.setViewBgOpacity(125);
            this._itemScrollComView.setClickItemHandler((itemCell: ItemCell) => {
                let touchItemID = itemCell.getItemID();
                Manager.audio.playAudio(501);
                this.resetCheckSelect();
                if (this.selectIdlist[itemCell.getItemInstanceID()]) {
                    this.updateManualGoodsList(touchItemID, itemCell.getItemInstanceID(), false)
                } else {
                    this.updateManualGoodsList(touchItemID, itemCell.getItemInstanceID(), true);
                }
            });
        }
        this.updateItemScroll();
    }
    private itemList: ItemData[];
    /** 更新ItemScroll */
    public updateItemScroll() {
        let itemList = this._model.getCurSelPartItemList(2);
        this.itemList = itemList;
        this._itemScrollComView.setItemList(itemList, this._model.getCurPageLockStateList(), 2);
    }

    public initTabMenu() {
        if (!this._tabMenuView) {
            let equipMenu = cc.instantiate(this.tabMenu);
            equipMenu.parent = this.node;
            this._tabMenuView = equipMenu.getComponent(MenuItem);
            this._tabMenuView.setMenuPosition(cc.v2(-225, 490));
            for (let i = 0; i < 5; ++i) {
                this._tabMenuView.addMenuItem({ index: i, spFrame: this.menuSpFrameArr[i] });
            }
            this._tabMenuView.hideView();
            this._tabMenuView.setClickCallBack((clickIndex: number) => {
                this._ctrl.setCurSelPartIndex(clickIndex, 2);
                this.initItemScrollCom();
                this._curPageIndex = clickIndex;
                // Manager.audio.playAudio(501);
                this.onFlush(`tab`);
                this._tabMenuView.hideView();
            });
            this._tabMenuView.node.zIndex = 1;
        }
        this._tabMenuView.setClickIndex(this._model.getCurSelPartIndex(2));
    }

    private _updateImgMenuTab() {
        this.imgTabText.spriteFrame = this.menuSpFrameArr[this._curPageIndex];
    }

    /** 页签 */
    public onBtnTab() {
        if (this._tabMenuView) {
            Manager.audio.playAudio(501);
            this._tabMenuView.showView();
        }
    }

    public onFlush(type: string = `all`) {
        switch (type) {
            case `all`: {
                this._updateImgMenuTab();
                break;
            }
            case `tab`: {
                this._updateImgMenuTab();
                break;
            }
        }
    }

    public resetCheckSelect() {
        this.selectQuality = [false, false, false];
        this.selectStep = [false, false, false, false];
        this.isSelectQuality = false;
        this.isSelectStep = false;
        this.isAutoSelect = false;
    }

    public selectQuality: boolean[] = [false, false, false];
    public isSelectQuality: boolean = false;
    public onCheckQuality(event: cc.Toggle, customdata) {
        let num = Number(customdata);
        if (this.isAutoSelect)
            this.selectGoodsQuality(num, event.isChecked);
    }
    public selectStep: boolean[] = [false, false, false, false];
    public isSelectStep: boolean = false;
    public onCheckStep(event: cc.Toggle, customdata) {
        let num = Number(customdata);
        if (this.isAutoSelect)
            this.selectGoodsStep(num, event.isChecked);
    }

    public selectGoodsQuality(index: number, isselect: boolean) {
        this.selectQuality[index - 1] = isselect;
        if (isselect) this.isSelectQuality = true;
        else {
            this.isSelectQuality = false;
            for (let i = 0; i < this.selectQuality.length; i++) {
                if (this.selectQuality[i]) {
                    this.isSelectQuality = true;
                    break;
                }
            }
        }
        this.updateAutoGoodsList();
    }
    public selectGoodsStep(index: number, isselect: boolean) {
        this.selectStep[index - 1] = isselect;
        if (isselect) this.isSelectStep = true;
        else {
            this.isSelectStep = false;
            for (let i = 0; i < this.selectStep.length; i++) {
                if (this.selectStep[i]) {
                    this.isSelectStep = true;
                    break;
                }
            }
        }
        this.updateAutoGoodsList();
    }
    private selectItemIdList = {};
    public updateAutoGoodsList() {
        let len = this.itemList.length;
        this.selectIdlist = {};
        this.selectItemIdList = {};
        this.rewardNum = 0;
        this.isAutoSelect = true;
        if (this.isSelectQuality && !this.isSelectStep) {
            for (let i = 0; i < len; i++) {
                let equipid = this.itemList[i].itemID;
                let data = Cfg.Equip.get(equipid);
                if (this.selectQuality[data.quality - 1]) {
                    this.selectIdlist[this.itemList[i].itemInstanceID] = 1;
                    this.updateSelecItemID(equipid, 1);
                    this.rewardNum += data.recycleGold;
                    this._itemScrollComView.setCellSelect(i, true);
                }
            }
        } else if (!this.isSelectQuality && this.isSelectStep) {
            for (let i = 0; i < len; i++) {
                let equipid = this.itemList[i].itemID;
                let data = Cfg.Equip.get(equipid);
                if (this.selectStep[data.level - 1]) {
                    this.selectIdlist[this.itemList[i].itemInstanceID] = 1;
                    this.updateSelecItemID(equipid, 1);
                    this.rewardNum += data.recycleGold;
                    this._itemScrollComView.setCellSelect(i, true);
                }
            }
        } else if (this.isSelectQuality && this.isSelectStep) {
            for (let i = 0; i < len; i++) {
                let equipid = this.itemList[i].itemID;
                let data = Cfg.Equip.get(equipid);
                if (this.selectStep[data.level - 1] && this.selectQuality[data.quality - 1]) {
                    this.selectIdlist[this.itemList[i].itemInstanceID] = 1;
                    this.updateSelecItemID(equipid, 1);
                    this.rewardNum += data.recycleGold;
                    this._itemScrollComView.setCellSelect(i, true);
                }
            }
        }
        this._itemScrollComView.setAllSelectState(this.selectIdlist);
        this.rewardGoldText.string = `${this.rewardNum}`;
    }

    public updateManualGoodsList(itemId, InsId, boo) {
        let equipdata = Cfg.Equip.get(itemId);
        if (boo) {
            this.selectIdlist[InsId] = 1;
            this.updateSelecItemID(itemId, 1);
            this.rewardNum += equipdata.recycleGold;
        } else {
            delete this.selectIdlist[InsId];
            this.updateSelecItemID(itemId, -1);
            this.rewardNum -= equipdata.recycleGold;
        }
        this.rewardGoldText.string = `${this.rewardNum}`;
        this._itemScrollComView.setAllSelectState(this.selectIdlist);
        for (let key in this.selectItemIdList) {
            let equipdata = Cfg.Equip.get(key);
            if (this.selectStep.length >= equipdata.level) {
                this.selectStep[equipdata.level - 1] = true;
                this.isSelectStep = true;
            }
            if (this.selectQuality.length >= equipdata.quality) {
                this.selectQuality[equipdata.quality - 1] = true;
                this.isSelectQuality = true;
            }
        }

        for (let i = 0; i < this.selectStep.length; i++) {
            this.stepToggles[i].isChecked = this.selectStep[i];
        }
        for (let i = 0; i < this.selectQuality.length; i++) {
            this.qualityToggles[i].isChecked = this.selectQuality[i];
        }
        this.isAutoSelect = true;
    }

    public onSell() {
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Log_Event, { event_name: "smeltPage_smelt" });
        if (this.rewardNum > 0) {
            let isHightQuality = false;
            for (let key in this.selectItemIdList) {
                let data = Cfg.Equip.get(key);
                if (data.quality >= 4) {
                    isHightQuality = true;
                    break;
                }
            }
            if (isHightQuality) {
                AlertManager.showAlert(AlertType.SELECT, {
                    reasonDesc: "熔炼中有 史诗 品质装备",
                    wayDesc: "是否确定熔炼？",
                    confirmText: "确定",
                    cancelText: "否",
                    confirm: () => {
                        this.sell();
                    },
                })
            } else {
                this.sell();
            }
        } else {
            AlertManager.showNormalTips("请选择需要熔炼的装备");
        }
        GuideNewController.getInstance().setGuideIsFinish(Guide.GuideModuleNum.Smelt, true);
    }

    public updateSelecItemID(id, num: number) {
        if (this.selectItemIdList[id]) {
            this.selectItemIdList[id] += num;
            if (this.selectItemIdList[id] <= 0)
                delete this.selectItemIdList[id];
        } else {
            if (num > 0) {
                this.selectItemIdList[id] = num;
            }
        }
    }

    public sell() {
        Notifier.send(ListenID.Log_Event, { event_name: "smelt_gainGold", counter: this.rewardNum });
        Notifier.send(ListenID.Log_Event, { event_name: "smelt_equip", counter: Object.keys(this.selectIdlist).length });
        GameVoManager.getInstance.setGold(this.rewardNum);
        Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.SmeltReward, this.rewardNum);
        Notifier.send(ListenID.Game_UpdateCurrencyEffect, 1, this.rewardNum);
        GameVoManager.getInstance.removeEquipList(this.selectIdlist);
        EquipModel.getInstance.resetItemList();
        this.updateItemScroll();
        this.updateAutoGoodsList();


    }
}
