import ItemCell from "../itemscroll/ItemCell";
import { EquipCfg } from "../../config/EquipCfg";
import { Cfg } from "../../config/Cfg";
import { Const } from "../../config/Const";
import { PropertyDefine, PropertyVO } from "../../module/equip/Property";
import PropertyItemCom from "../propertyitem/PropertyItemCom";
import { EquipTipsItemData, ItemData } from "../../common/Common_Define";
import EquipModel from "../../module/equip/EquipModel";
import { Notifier } from "../../framework/Notifier";
import { CallID } from "../../CallID";
import { Manager } from "../../manager/Manager";
import { GameVoManager } from "../../manager/GameVoManager";
import { MVC } from "../../framework/MVC";

const { ccclass, property } = cc._decorator;

/**
 * 通用装备提示框
 */
@ccclass
export default class EquipTipsCom extends MVC.BaseView {
    /** 通用道具格子预制件 */
    @property(cc.Prefab)
    itemCellPrefab: cc.Prefab = null;

    /** 通用属性条预制件 */
    @property(cc.Prefab)
    propertyItemPrefab: cc.Prefab = null;

    /** 顶部格子 */
    @property(cc.Node)
    topContent: cc.Node = null;

    /** 中部属性 */
    @property(cc.Node)
    midContent: cc.Node = null;

    /** 底部按钮 */
    @property(cc.Node)
    botContent: cc.Node = null;

    /** 基础属性layout */
    @property(cc.Node)
    baseLayout: cc.Node = null;

    /** 附加属性layout */
    @property(cc.Node)
    attachLayout = null;

    /** 装备名字 */
    @property(cc.Label)
    lblName: cc.Label = null;

    /** 装备中 */
    @property(cc.Sprite)
    imgPuted: cc.Sprite = null;

    /** 种类 */
    @property(cc.Label)
    lblItemType: cc.Label = null;

    /** 品质 */
    @property(cc.Label)
    lblItemQuality: cc.Label = null;

    /** 战力 */
    @property(cc.Label)
    lblCapability: cc.Label = null;

    @property([cc.SpriteFrame])
    locksp: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    lockIcon: cc.Sprite = null;

    /** 道具格子 */
    private _itemCell: ItemCell = null;
    /** 是否装备中 */
    private _isPuted: boolean = false;
    /** 装备ID */
    private _itemID: number = 0;
    /** 装备实例ID */
    private _itemInstanceID: number = -1;
    /** 作比较的装备ID */
    private _compareID: number = 0;
    /** 装备名字 */
    private _itemName: string = "";
    /** 装备种类 */
    private _itemTypeStr: string = "";
    /** 装备品质 */
    private _itemQuality: number = 0;
    /** 装备品质字符 */
    private _itemQualityStr: string = "";
    /** 战力 */
    private _capability: number = 0;
    /** 显示底部按钮 */
    private _showButton: boolean = false;
    /** 装备等级 */
    private _equipLevel: number = 0;
    /** 是否隐藏附加属性 */
    private _hideAttachProperty: boolean = false;

    /** 通用基础属性条列表实例 */
    private _basePropertyList: PropertyItemCom[] = [];
    /** 通用附加属性条列表实例 */
    private _attachPropertyList: PropertyItemCom[] = [];

    /** 获取物品表方法 */
    private getItemInfo: (id: number | string) => EquipCfg = Cfg.Equip.get.bind(Cfg.Equip);

    /** 装备按钮回调 */
    private _clickEquipButtonHandler: (itemData?: ItemData) => any = () => { };
    /** 锁定按钮回调 */
    private _clickLockButtonHandler: (itemData?: ItemData) => any = () => { };

    onLoad() {
        this.initItemCell();
        this.initPropertyItemCom();
    }

    start() {
        // this.initItemData({ itemID: 20428});
    }

    changeListener(){}

    initPropertyItemCom() {
        for (let i = 0; i < 5; ++i) {
            if (!this._basePropertyList[i]) {
                this._basePropertyList[i] = cc.instantiate(this.propertyItemPrefab).getComponent(PropertyItemCom);
                this._basePropertyList[i].node.parent = this.baseLayout;
            }
        }
        for (let i = 0; i < 6; ++i) {
            if (!this._attachPropertyList[i]) {
                this._attachPropertyList[i] = cc.instantiate(this.propertyItemPrefab).getComponent(PropertyItemCom);
                this._attachPropertyList[i].node.parent = this.attachLayout;
            }
        }
    }

    initItemData(param: EquipTipsItemData) {
        this._itemID = param.itemID;
        this._compareID = param.compareID;
        this._showButton = param.showButton;
        this._itemInstanceID = param.itemInstanceID;
        this._clickEquipButtonHandler = param.btnEquipHandler || this._clickEquipButtonHandler;
        this._clickLockButtonHandler = param.btnLockHandler || this._clickLockButtonHandler;
        this._isPuted = param.isPuted;
        this._hideAttachProperty = param.hideAttachProperty;
        let itemInfo = this.getItemInfo(this._itemID);
        if (itemInfo) {
            this._itemCell.initItem({ itemID: this._itemID, index: 0 });
            this._itemName = itemInfo.name;
            let itemType = itemInfo.part - 1;
            let itemQuality = itemInfo.quality;
            let propertyArr = itemInfo.property;
            let propertyVo = new PropertyVO(propertyArr);
            this._equipLevel = GameVoManager.getInstance.getEquipPartLevel(itemType);;
            propertyVo.setPartAndLevel(itemType, this._equipLevel);
            this._capability = propertyVo.getBattle();
            this._itemQuality = itemQuality;
            this._itemTypeStr = Const.ItemType[itemType];
            this._itemQualityStr = Const.ItemQuality[itemQuality - 1];
            let attachCount = 0;
            let compareItemInfo: EquipCfg = null;
            if (this._compareID) {
                compareItemInfo = this.getItemInfo(this._compareID);
            }
            for (let i = 0; i < propertyArr.length; ++i) {
                let property = propertyArr[i];
                if (property) {
                    let name = PropertyDefine.equipIndexToName[i + 1];
                    let curLvProp = propertyVo[PropertyDefine.equipIndexToKey[i + 1]];
                    let delta = 0;
                    let isNew = false;
                    if (compareItemInfo) {
                        let comparePropertyArr = compareItemInfo.property;
                        delta = property - comparePropertyArr[i];
                        isNew = Number(comparePropertyArr[i]) == 0;
                    }
                    if (i < 5) {//基础属性
                        this._basePropertyList[i].setColor(Const.Color.blue);
                        this._basePropertyList[i].initPropertyItem({
                            name: name,
                            value: curLvProp + "",
                            delta: delta,
                            isNew: isNew
                        });
                    } else {//附加属性
                        this._attachPropertyList[i - 5].setColor(Const.Color.green);
                        let propertyNameStr = this._hideAttachProperty ? "" : name;
                        let propertyValueStr = this._hideAttachProperty ? "???" : property + "%";
                        this._attachPropertyList[i - 5].initPropertyItem({
                            name: propertyNameStr,
                            value: propertyValueStr,
                            delta: delta,
                            isNew: isNew
                        });
                        attachCount++;
                    }
                } else {
                    if (this._basePropertyList[i])
                        this._basePropertyList[i].setActive(false);
                    if (this._attachPropertyList[i - 5])
                        this._attachPropertyList[i - 5].setActive(false);
                }
            }
            this.attachLayout.active = attachCount > 0;
            this.onFlush();
        }
    }

    initItemCell() {
        if (!this._itemCell) {
            this._itemCell = cc.instantiate(this.itemCellPrefab).getComponent(ItemCell);
            this._itemCell.node.parent = this.topContent;
            this._itemCell.node.position = cc.v2(-83, -5);
        }
    }

    /** 装备中 */
    setImgPutedIsShow(active: boolean) {
        this._isPuted = active;
        this.onFlush(`isPuted`);
    }


    /** 设置格子装备按钮回调 */
    setClickItemEquipButtonHandler(cb: (itemData: ItemData) => any) {
        this._clickEquipButtonHandler = cb;
    }

    /** 设置格子锁定按钮回调 */
    setClickItemLockButtonHandler(cb: (itemData: ItemData) => any) {
        this._clickLockButtonHandler = cb;
    }

    /** 获取装备按钮 */
    getBtnHolds(): cc.Button {
        return cc.find("btnPut", this.botContent).getComponent(cc.Button);
    }

    /** 点击装备按钮 */
    public onBtnPutClick() {
        Manager.audio.playAudio(501);
        this._clickEquipButtonHandler({ itemID: this._itemID, itemInstanceID: this._itemInstanceID });
    }

    /** 点击锁定按钮 */
    public onBtnLockClick() {
        Manager.audio.playAudio(501);
        this._clickLockButtonHandler({ itemID: this._itemID, itemInstanceID: this._itemInstanceID });
    }

    onFlush(type: string = `all`) {
        switch (type) {
            case `all`: {
                this._updateImgName();
                this._updateImgPuted();
                this._updateLblItemType();
                this._updateLblItemQuality();
                this._updateLblCapability();
                this._updateBotButton();
                this._updatebtnLockState();
                break;
            }
            case `isPuted`: {
                this._updateImgPuted();
                break;
            }
        }
    }

    private _updateImgName() {
        // this.lblName.string = "聚变·轨道光能";
        this.lblName.string = this._itemName;
    }

    private _updateImgPuted() {
        this.imgPuted.node.active = this._isPuted;
    }

    private _updateLblItemType() {
        this.lblItemType.string = this._itemTypeStr;
    }

    private _updateLblItemQuality() {
        this.lblItemQuality.string = this._itemQualityStr;
        this.lblItemQuality.node.color = new cc.Color().fromHEX(Const.ItemQualityColor[this._itemQuality - 1]);
    }

    private _updateLblCapability() {
        this.lblCapability.string = this._capability + "";
    }

    private _updateBotButton() {
        this.botContent.active = this._showButton;
    }

    private _updatebtnLockState() {
        let boo = Notifier.call(CallID.Equip_GetEquipIsLock, this._itemInstanceID);
        this.lockIcon.spriteFrame = boo ? this.locksp[1] : this.locksp[0];
    }
}
