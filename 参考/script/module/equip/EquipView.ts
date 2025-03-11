import { MVC } from "../../framework/MVC";
import EquipModel from "./EquipModel";
import ItemScrollCom from "../../component/itemscroll/ItemScrollCom";
import MenuItem from "../../component/menuitem/MenuItem";
import { EquipController } from "./EquipController";
import ItemCell from "../../component/itemscroll/ItemCell";
import { UIRoleManager, UIRole } from "../../component/UIRole";
import { GameVoManager } from "../../manager/GameVoManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Cfg } from "../../config/Cfg";
import { CallID } from "../../CallID";
import { ItemData, EquipTipsData, RemindData, GameFunID, Guide, Common_UIPath } from "../../common/Common_Define";
import { Const } from "../../config/Const";
import { AlertManager, AlertType } from "../../alert/AlertManager";
import { Util } from "../../utils/Util";
import { Manager } from "../../manager/Manager";
import FunOpen from "../funopen/FunOpen";
import GuideNewController from "../guide/GuideNewController";
import { UIManager } from "../../framework/UIManager";

const { ccclass, property } = cc._decorator;

/**
 * 装备系统
 */
@ccclass
export default class EquipView extends MVC.BaseView {
    /** 背包滑动面板 */
    @property(cc.Prefab)
    itemScrollCom: cc.Prefab = null;

    /** 背包菜单 */
    @property(cc.Prefab)
    tabMenu: cc.Prefab = null;

    /** 装备格子 */
    @property(cc.Prefab)
    itemCell: cc.Prefab = null;

    /** 角色展示 */
    @property(cc.Node)
    roleDisplay: cc.Node = null;

    /** 页签 */
    @property(cc.Sprite)
    imgTabText: cc.Sprite = null;

    /** 战力 */
    @property(cc.Label)
    lblBattle: cc.Label = null;

    /** 熔炼x关后解锁 */
    @property(cc.Label)
    lblUnlockRecover: cc.Label = null

    /** 强化x关后解锁 */
    @property(cc.Label)
    lblUnlockUpgrade: cc.Label = null

    @property(cc.Button)
    btnUpgrade: cc.Button = null;

    @property(cc.Button)
    btnSmelt: cc.Button = null;

    @property(cc.Button)
    btnClose: cc.Button = null;

    /** 菜单精灵帧 */
    @property(cc.SpriteFrame)
    menuSpFrameArr: cc.SpriteFrame[] = [];

    /** 装备类型精灵帧 */
    @property(cc.SpriteFrame)
    equipTypeSpFrameArr: cc.SpriteFrame[] = [];

    /** EquipCtrl */
    private _ctrl: EquipController = null;
    /** EquipModel */
    private _model: EquipModel = null;
    /** 背包滑动面板 */
    private _itemScrollComView: ItemScrollCom = null;
    /** 装备菜单view */
    private _tabMenuView: MenuItem = null;
    /** 装备格子 */
    private _equipCellList: ItemCell[] = [];
    /** 角色展示 */
    private _roleDisplay: UIRole = null;
    /** 当前页签 */
    private _curPageIndex: number = 0;
    /** 熔炼是否已解锁 */
    private _smeltFunIsOpen: boolean = false;
    /** 强化是否已解锁 */
    private _upgradeFunIsOpen: boolean = false;

    /** GameVoManager */
    private _gameVO: GameVoManager = GameVoManager.getInstance;

    private scrollbg: cc.Node = null;
    protected changeListener(enable: boolean): void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
    }

    public onLoad() {
        this._ctrl = EquipController.getInstance;
        this._model = EquipModel.getInstance;
    }

    /** 打开界面回调，每次打开只调用一次 */
    public onOpen(args: any): void {
        super.onOpen(args);

        let size = Notifier.call(CallID.Setting_GetRealDesignSize);
        let close = this.node.getChildByName("btnBack");
        close.y = -size.height * 0.5 + 42;
        this.fixUI();
        // this.initItemScrollCom();
        this.initTabMenu();
        this.initEquipCell();
        this.initRoleDisplay();
        this.initRemind();
        this.checkFunIsOpen();
        // this.test();
        this.onFlush();
        let num = Notifier.call(CallID.Equip_GetEquipBagNum);
        if (num >= Const.EquipMaxToTips) {
            AlertManager.showAlert(AlertType.SELECT, {
                reasonDesc: `背包中装备数量已满${Const.EquipMaxToTips}个`,
                wayDesc: "是否前往熔炼装备获取金币？",
                confirmText: "熔炼装备",
                cancelText: "否",
                confirm: () => {
                    this.onBtnRecover();
                },
            })
        }
    }

    openCallBack() {
        this._rigisterGuideCheck();
        if (GameVoManager.getInstance.stateVo.viewIndex == Const.ViewMap.MainView) {
            if (UIManager.getNodeByName(Common_UIPath.MenuUI)) {
                Notifier.send(ListenID.Menu_CloseMainView);
            }
        }
        GameVoManager.getInstance.stateVo.viewIndex = Const.ViewMap.EquipView;
    }

    /**
     * test
     */
    public test() {
        let userVO = GameVoManager.getInstance.getBag();
        cc.log(userVO);
    }

    public initRemind() {
        let updradeRemind: RemindData = {
            name: "Equip_Upgrade",
            node: cc.find("btnbottom/btnUpgrade", this.node),
            offsetX: -10,
            hideNum: true,
            type: 1,
            checkFunc: () => {
                let bool = EquipModel.getInstance.getEquipcanUpgrade();
                return Number(bool);
            }
        }
        Notifier.send(ListenID.Rigister_Remind, updradeRemind);
    }

    public fixUI() {
        let btnbottom = this.node.getChildByName("btnbottom");
        let roleDisplay = this.node.getChildByName("imgRoleDisplay");
        this.scrollbg = this.node.getChildByName("scrollbg");
        Util.adapterNodeY(roleDisplay);
        Util.adapterNodeY(btnbottom);
    }

    /** 初始化物品滑动面板 */
    public initItemScrollCom() {
        if (!this._itemScrollComView) {
            let itemScroll = cc.instantiate(this.itemScrollCom);
            itemScroll.parent = this.scrollbg;
            itemScroll.y = 0;
            this._itemScrollComView = itemScroll.getComponent(ItemScrollCom);
            this._itemScrollComView.setClickItemHandler((itemCell: ItemCell) => {
                let touchItemID = itemCell.getItemID()
                let touchItemInfo = Cfg.Equip.get(touchItemID);
                let part = touchItemInfo.part;
                let playerItemID = this._gameVO.getEquipID(part - 1);
                let equipTipsData: EquipTipsData = {
                    itemLeftID: playerItemID,
                    itemRightID: touchItemID,
                    itemLeftInstanceID: -1,
                    itemRightInstanceID: itemCell.getItemInstanceID(),
                    checkGuide: true,
                    btnEquipHandler: (itemData: ItemData) => {
                        let level = EquipModel.getInstance.checkPartUnLock(touchItemInfo.part);
                        if (level) {
                            // let chapterlist = Util.levelToChapterId(level);
                            // AlertManager.showNormalTips(`请通关${chapterlist[0]}章${chapterlist[1]}关解锁部位佩戴`);
                            AlertManager.showNormalTips(`等级达${level}级可佩戴`);
                        } else {
                            this.onHoldsEquip(itemData);
                        }
                        Notifier.send(ListenID.Equip_CloseTipsView);
                        GuideNewController.getInstance().setGuideIsFinish(Guide.GuideModuleNum["Equip_" + part], true);
                        // let flag = this._gameVO.myUserVo.guideFlag;
                        // cc.log("***** guide flag", flag, flag.toString(2));
                    },
                    btnLockHandler: (itemData: ItemData) => {
                        let cellIndex = itemCell.getIndex();
                        let insId = itemData.itemInstanceID;
                        let bool = this._model.getItemIsLock(insId);
                        bool = !bool;
                        this._model.setItemIsLock(insId, bool);
                        this.setCellLockState(cellIndex, bool);
                        Notifier.send(ListenID.Equip_CloseTipsView);
                    }
                }
                Notifier.send(ListenID.Equip_OpenTipsView, equipTipsData);
            });
        }
        this.updateItemScroll();
    }

    /** 更新ItemScroll */
    public updateItemScroll() {
        let itemList = this._model.getCurSelPartItemList();
        this._itemScrollComView.setItemList(itemList, this._model.getCurPageLockStateList(), 1);
    }

    /** 初始化装备Tab */
    public initTabMenu() {
        if (!this._tabMenuView) {
            let equipMenu = cc.instantiate(this.tabMenu);
            equipMenu.parent = this.node;
            this._tabMenuView = equipMenu.getComponent(MenuItem);
            this._tabMenuView.setMenuPosition(cc.v2(-225, 53));
            for (let i = 0; i < 5; ++i) {
                this._tabMenuView.addMenuItem({ index: i, spFrame: this.menuSpFrameArr[i] });
            }
            this._tabMenuView.hideView();
            this._tabMenuView.setClickCallBack((clickIndex: number) => {
                this._ctrl.setCurSelPartIndex(clickIndex);
                this.initItemScrollCom();
                this._curPageIndex = clickIndex;
                Manager.audio.playAudio(501);
                this.onFlush(`tab`);
                this._tabMenuView.hideView();
            });
            this._tabMenuView.node.zIndex = 1;
        }
        this._tabMenuView.setClickIndex(this._model.getCurSelPartIndex());
    }

    /** 初始化人物装备格子 */
    public initEquipCell() {
        if (this._equipCellList.length == 0) {
            let cellPos = EquipModel.cellPos;
            for (let i = 0; i < EquipModel.partNum; ++i) {
                let cell = cc.instantiate(this.itemCell);
                cell.parent = this.node;
                cell.position = cellPos[i];
                Util.adapterNodeY(cell);
                let cellInstance = cell.getComponent(ItemCell);
                cellInstance.setClickHandler((itemCell: ItemCell) => {
                    Manager.audio.playAudio(501);
                    let level = EquipModel.getInstance.checkPartUnLock(i + 1);
                    if (level) {
                        // let chapterlist = Util.levelToChapterId(level);
                        AlertManager.showNormalTips(`等级达${level}级可佩戴`);
                        // AlertManager.showNormalTips(`请通关${chapterlist[0]}章${chapterlist[1]}关解锁部位佩戴`);
                        return;
                    }
                    Notifier.send(ListenID.Equip_OpenTipsView, { itemLeftID: itemCell.getItemID() });
                });
                let level = EquipModel.getInstance.checkPartUnLock(i + 1);
                if (level) {
                    // let chapterlist = Util.levelToChapterId(level);
                    cellInstance.setUnLockDesc(`角色${level}级解锁`);
                } else cellInstance.setUnLockDesc(null);
                this._equipCellList[i] = cellInstance;
                this.updateEquipCell(i);
            }
        }
    }

    /** 刷新人物装备格子 */
    public updateEquipCell(index: number) {
        let cellInstance = this._equipCellList[index];
        if (cellInstance) {
            let equipID = this._gameVO.getEquipID(index);
            let equipLv = this._gameVO.getEquipPartLevel(index);
            cellInstance.initItem({
                index: index,
                itemID: equipID,
                level: equipLv,
                showItemBG: true,
                itemTypeSpFrame: this.equipTypeSpFrameArr[index],
            });
        }
    }

    /** 初始化角色展示 */
    public initRoleDisplay() {
        UIRoleManager.getUIRole((node) => {
            if (this.roleDisplay && cc.isValid(this.roleDisplay)) {
                this._roleDisplay = new UIRole();
                this._roleDisplay.init(node);
                node.scale = 1;
                this.roleDisplay.addChild(node);
            }
        })
    }

    public setCellLockState(index: number, lock: boolean) {
        this._itemScrollComView.setCellLockState(index, lock);
    }

    public checkFunIsOpen() {
        this._smeltFunIsOpen = FunOpen.getInstance().getFunIsOpen("Smelt");
        this._upgradeFunIsOpen = FunOpen.getInstance().getFunIsOpen("Upgrade");
    }

    /** 关闭界面回调，每次打开只调用一次 */
    public onClose(closeGuide?: boolean): void {
        UIRoleManager.recycleUIRole(this._roleDisplay);
        super.onClose({ closeGuide: closeGuide });
        Notifier.send(ListenID.Log_Event, { event_name: "equipPage_leave" });
    }

    /** 关闭按钮点击 */
    public onBtnBack(closeGuide: boolean = true) {
        this.onClose(closeGuide);
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Menu_OpenMainView);
    }

    /** 页签 */
    public onBtnTab() {
        if (this._tabMenuView) {
            this._tabMenuView.showView();
        }
    }

    /** 装备物品 */
    public onHoldsEquip(itemData: ItemData) {
        this._ctrl.holdsEquip(itemData);
    }

    /** 熔炼 */
    public onBtnRecover() {
        // Manager.audio.playAudio(501);
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Equip_OpenEquipSmeltView);
        Notifier.send(ListenID.Log_Event, { event_name: "smeltPage_access" });
    }

    /** 强化 */
    public onBtnUpgrade() {
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Equip_OpenIntensifyView);
        Notifier.send(ListenID.Log_Event, { event_name: "intensifyPage_access" });
    }

    private _rigisterGuideCheck() {
        /** 背包装备格子指引 */
        for (let i = 0; i < 4; ++i) {
            let maxBattleEquipIndex = this._model.getMaxBattleEquipIndex(i);
            if (maxBattleEquipIndex === 0 || maxBattleEquipIndex) {
                let cell = this._itemScrollComView.getCellByIndex(maxBattleEquipIndex);
                let guideData: Guide.GuideItemData = {
                    node: cell.node,
                    tag: 10001 + i * 100,
                    tagLayer: this.uiLayer,
                    callBack: () => {
                        cell.onClickCell();
                    }
                }
                Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);
            }
        }

        let maxBattleEquipIndex = 0;
        if (maxBattleEquipIndex === 0 || maxBattleEquipIndex) {
            let cell = this._itemScrollComView.getCellByIndex(maxBattleEquipIndex);
            let guideData: Guide.GuideItemData = {
                node: cell.node,
                tag: 10201,
                tagLayer: this.uiLayer,
                callBack: () => {
                    cell.onClickCell();
                }
            }
            Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);
        }

        // /** 强化按钮指引 */
        let guideData: Guide.GuideItemData = {
            node: this.btnUpgrade.node,
            tag: 10401,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onBtnUpgrade();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, guideData);

        /** 强化按钮指引 */
        let guideData2: Guide.GuideItemData = {
            node: this.btnUpgrade.node,
            tag: 10301,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onBtnUpgrade();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, guideData2);

        /** 熔炼按钮指引 */
        let smeltGuideData: Guide.GuideItemData = {
            node: this.btnSmelt.node,
            tag: 10501,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onBtnRecover();
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, smeltGuideData);

        /** 离开按钮指引 */
        let closeData: Guide.GuideItemData = {
            node: this.btnClose.node,
            tag: 10800,
            tagLayer: this.uiLayer,
            callBack: () => {
                this.onBtnBack(false);
            }
        }
        Notifier.send(ListenID.Guide_RigisterNodeTag, closeData);

        Notifier.send(ListenID.Guide_Check_Condition);
    }

    public onFlush(type: string = `all`) {
        switch (type) {
            case `all`: {
                this._updateImgMenuTab();
                this._updateLblBattle();
                this._updateLblUnlockRecover();
                this._updateLblUnlockUpgrade();
                break;
            }
            case `tab`: {
                this._updateImgMenuTab();
                break;
            }
            case `battle`: {
                this._updateLblBattle();
                break;
            }
        }
    }

    private _updateImgMenuTab() {
        this.imgTabText.spriteFrame = this.menuSpFrameArr[this._curPageIndex];
    }

    private _updateLblBattle() {
        this.lblBattle.string = this._gameVO.getBattle() + "";
    }

    private openPropertyView() {
        Notifier.send(ListenID.Equip_OpenPropertyView);
    }

    private _updateLblUnlockRecover() {
        let funIsOpen = this._smeltFunIsOpen;
        if (!funIsOpen) {
            let unlockLevel = Cfg.UnlockSystem.get(GameFunID.EquipSmelt).unlockLevel;
            // let chapter = Math.floor(unlockLevel / 50) + 1;
            // let chapter = Math.floor(unlockLevel / 50) + 1;
            // let level = unlockLevel % 50;
            // this.lblUnlockRecover.string = chapter + "章" + level + "关后解锁";
            this.lblUnlockRecover.string = `通过第` + unlockLevel + "章解锁";
        }
        this.lblUnlockRecover.node.active = !funIsOpen;
    }

    private _updateLblUnlockUpgrade() {
        let funIsOpen = this._upgradeFunIsOpen;
        if (!funIsOpen) {
            let unlockLevel = Cfg.UnlockSystem.get(GameFunID.EquipUpgrade).unlockLevel;
            // let chapter = Math.floor(unlockLevel / 50) + 1;
            // let level = unlockLevel % 50;
            // this.lblUnlockUpgrade.string = chapter + "章" + level + "关后解锁";
            this.lblUnlockUpgrade.string = `通过第` + unlockLevel + "章解锁";
        }
        this.lblUnlockUpgrade.node.active = !funIsOpen;
    }
}
