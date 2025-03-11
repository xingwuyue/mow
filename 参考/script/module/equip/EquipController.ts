import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import EquipModel from "./EquipModel";
import { CallID } from "../../CallID";
import { UIManager } from "../../framework/UIManager";
import { AlertManager } from "../../alert/AlertManager";
import { Common_UIPath, ItemData, TaskSubType } from "../../common/Common_Define";
import EquipView from "./EquipView";
import { GameVoManager } from "../../manager/GameVoManager";
import { Cfg } from "../../config/Cfg";
import { PropertyVO } from "./Property";
import FunOpen from "../funopen/FunOpen";

/*
 * desc
 */
export class EquipController extends MVC.BaseController {
    private static _instance: EquipController = null;
    private _model: EquipModel;
    private _gameVO: GameVoManager = null;
    public constructor() {
        super("EquipController");
        this.changeListener(true);
        this._model = EquipModel.getInstance;
        if (EquipController._instance == null) {
            EquipController._instance = this;
        }
        this._gameVO = GameVoManager.getInstance;
    }
    public static get getInstance(): EquipController {
        if (EquipController._instance == null) {
            EquipController._instance = new EquipController();
        }
        return EquipController._instance;
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Login_User, this.updateEquipData, this);
        Notifier.changeCall(enable, CallID.Equip_GetBodyEquipPro, this.getBodyEquipPro, this);
        Notifier.changeCall(enable, CallID.Equip_GetEquipBagNum, this.getEquipBagNum, this);
        Notifier.changeCall(enable, CallID.Equip_GetEquipIsLock, this.getEquipIsLock, this);
        Notifier.changeCall(enable, CallID.Equip_GetUnLockPart, this.getUnLockPart, this);
        Notifier.changeListener(enable, ListenID.Equip_OpenDropPreView, this.onOpenDropPreView, this);
        Notifier.changeListener(enable, ListenID.Equip_OpenEquipView, this.onOpenEquipView, this);
        Notifier.changeListener(enable, ListenID.Equip_OpenIntensifyView, this.onOpenIntersifyView, this);
        Notifier.changeListener(enable, ListenID.Equip_StrengthUpdate, this.updateStrength, this);
        Notifier.changeListener(enable, ListenID.Equip_ShowBattleTips, this.showBattleTips, this);
        Notifier.changeListener(enable, ListenID.Bag_AddItem, this.onBagAddItem, this);
        Notifier.changeListener(enable, ListenID.Bag_RemoveItem, this.onBagRemoveItem, this);
        Notifier.changeListener(enable, ListenID.Role_HoldsEquip, this.onRoleHoldsEiuip, this);
        Notifier.changeListener(enable, ListenID.Role_BattleChange, this.onRoleBattleChange, this);
        Notifier.changeListener(enable, ListenID.Equip_CloseEquipView, this.onCloseEquipView, this);
        Notifier.changeListener(enable, ListenID.Equip_CloseEquipIntenView, this.onCloseEquipIntenView, this);
        Notifier.changeListener(enable, ListenID.Equip_CloseEquipSmeltView, this.onCloseEquipSmeltView, this);
        Notifier.changeListener(enable, ListenID.Equip_OpenEquipSmeltView, this.onOpenEquipSmeltView, this);
        Notifier.changeListener(enable, ListenID.Equip_SetEquipIsLock, this.setEquipLockState, this);
        Notifier.changeListener(enable, ListenID.Equip_OpenUnLockPartView, this.onOpenUnLockPartView, this);
        Notifier.changeListener(enable, ListenID.Game_UpdateGold, this.onGoldUpdate, this);
        Notifier.changeListener(enable, ListenID.Equip_OpenPropertyView, this.onOpenPropertyView, this);
    }

    public updateStrength(index: number, level: number) {
        this._model.updateEquipProByIndex(index, level);
    }

    public showBattleTips(oldBattle, newBattle) {
        AlertManager.showBattleTips(oldBattle, newBattle);
    }

    public getView(): EquipView {
        let node = UIManager.getNodeByName(Common_UIPath.EquipView);
        if (node && cc.isValid(node)) {
            return node.getComponent(EquipView);
        }
        return null;
    }

    public setCurSelPartIndex(partIndex: number, type: number = 1) {
        this._model.setCurSelPartIndex(partIndex, type);
    }

    public getBodyEquipPro(partIndex) {
        return this._model.getBodyEquipPro(partIndex);
    }

    public updateEquipData() {
        this.updateEquipPro();
        this._model.resetItemList();
        this._model.updateCanUpgradeEquip();
        this._model.updateHaveStrongEquip();
    }
    public updateEquipPro(showTips: boolean = false) {
        this._model.updateBodyEquipPro(showTips);
    }

    public holdsEquip(itemData: ItemData) {
        let data = Cfg.Equip.get(itemData.itemID);
        if (data) {
            Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.SuitUpTarget, [data.part, data.quality, data.level, 1]);
        }
        this._gameVO.holdsEquip(itemData);
        this.updateEquipPro(true);
    }

    public onOpenDropPreView(chapterId: number) {
        UIManager.Open(Common_UIPath.DropPreviewUI, MVC.eTransition.Default, MVC.eUILayer.Popup, chapterId);
    }

    public onOpenEquipView() {
        UIManager.Open(Common_UIPath.EquipView, MVC.eTransition.Default, MVC.eUILayer.Panel);
    }

    public onCloseEquipView() {
        UIManager.Close(Common_UIPath.EquipView);
    }

    public onOpenIntersifyView() {
        let funIsOpen = FunOpen.getInstance().getFunIsOpen("Upgrade");
        if (funIsOpen) {
            this.onCloseEquipView();
            this.onClosePropertyDetailView();
            UIManager.Open(Common_UIPath.EquipIntensifyView, MVC.eTransition.Default, MVC.eUILayer.Panel);
        } else {
            let unlockLevel = FunOpen.getInstance().getFunIsOpenValue();
            AlertManager.showNormalTips("通过第" + unlockLevel + "章解锁!");
        }
    }

    public onCloseEquipIntenView() {
        UIManager.Close(Common_UIPath.EquipIntensifyView);
    }

    public onCloseEquipSmeltView() {
        UIManager.Close(Common_UIPath.EquipSmeltView);
    }
    public onClosePropertyDetailView() {
        UIManager.Close(Common_UIPath.PropertyView);
    }
    public onOpenEquipSmeltView() {
        let funIsOpen = FunOpen.getInstance().getFunIsOpen("Smelt");
        if (funIsOpen) {
            this.onCloseEquipView();
            UIManager.Open(Common_UIPath.EquipSmeltView, MVC.eTransition.Default, MVC.eUILayer.Panel);
        } else {
            let unlockLevel = FunOpen.getInstance().getFunIsOpenValue();
            AlertManager.showNormalTips("通过第" + unlockLevel + "章解锁!");
        }
    }

    public onOpenPropertyView() {
        UIManager.Open(Common_UIPath.PropertyView, MVC.eTransition.Scale, MVC.eUILayer.Tips);
    }

    /** 背包增加物品 */
    public onBagAddItem(data: { itemInfo: ItemData }) {
        if (!data) return;
        let itemInfo = data.itemInfo;
        if (!itemInfo) return;
        this._model.addItem(itemInfo);
        let view = this.getView();
        view && view.updateItemScroll();
        this._model.updateHaveStrongEquip();
    }

    /** 背包移除物品 */
    public onBagRemoveItem(data: { itemInfo: ItemData }) {
        if (!data) return;
        let itemInfo = data.itemInfo;
        if (!itemInfo) return;
        this._model.removeItem(itemInfo);
        let view = this.getView();
        view && view.updateItemScroll();
        this._model.updateHaveStrongEquip();
    }

    public onGoldUpdate() {
        this._model.updateCanUpgradeEquip();
    }

    /** 角色装备物品 */
    public onRoleHoldsEiuip(data: { part: number, itemID: number }) {
        let view = this.getView();
        view && view.updateEquipCell(data.part);
    }

    public onRoleBattleChange() {
        let view = this.getView();
        view && view.onFlush(`battle`);
    }

    public getEquipIsLock(insId: number) {
        return this._model.getItemIsLock(insId);
    }

    public setEquipLockState(insId: number, boo) {
        this._model.setItemIsLock(insId, boo);
    }

    public getEquipBagNum() {
        return this._model.getBagLength();
    }

    public getUnLockPart() {
        return this._model.getPartUnLock();
    }

    public onOpenUnLockPartView(partIndex) {
        setTimeout(() => {
            UIManager.Open("ui/common/UnLockRewardUI", MVC.eTransition.Default, MVC.eUILayer.Tips, partIndex);
        }, 50);
    }
}