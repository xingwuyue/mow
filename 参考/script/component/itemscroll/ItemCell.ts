import { Manager } from "../../manager/Manager";
import { Cfg } from "../../config/Cfg";
import { EquipCfg } from "../../config/EquipCfg";
import { PropertyVO } from "../../module/equip/Property";
import { GameVoManager } from "../../manager/GameVoManager";

const { ccclass, property } = cc._decorator;

export interface ItemCellData {
    /** 格子编号 */
    index: number,
    /** 物品ID */
    itemID?: number,
    /** 装备实例ID */
    itemInstanceID?: number,
    /** 物品品质 */
    quality?: number,
    /** 物品阶级 */
    step?: number,
    /** 物品等级 */
    level?: number,
    /** 设置装备背景可见 */
    showItemBG?: boolean,
    /** 装备类型文字图片 */
    itemTypeSpFrame?: cc.SpriteFrame,
    /** 最强标志 */
    isStrongly?: boolean,
    /** 是否锁定 */
    isLock?: boolean,
    /** 是否可强化 */
    canUpgrade?: boolean,
    /**物品数量 */
    goodsNum?: number,
    /** 物品数量(带 x 号) */
    itemNum?: number,
    /** 点击回调 */
    clickHandler?: (itemCell?: ItemCell) => any,
}

/**
 * 物品格子
 */
@ccclass
export default class ItemCell extends cc.Component {
    /** 道具背景框 */
    @property(cc.Sprite)
    imgItemBG: cc.Sprite = null;

    /** 格子背景 */
    @property(cc.Sprite)
    imgCellBG: cc.Sprite = null;

    /** 阶级背景 */
    @property(cc.Sprite)
    imgStepBG: cc.Sprite = null;

    /** 物品图标 */
    @property(cc.Sprite)
    itemDisplay: cc.Sprite = null;

    /** 道具类型图片 */
    @property(cc.Sprite)
    imgItemType: cc.Sprite = null;

    /** 道具等级 */
    @property(cc.Label)
    imgItemLevel: cc.Label = null;

    /** 是否锁定 */
    @property(cc.Sprite)
    imgLock: cc.Sprite = null;

    /** 品质精灵帧 */
    @property(cc.SpriteFrame)
    qualitySpFrameArr: cc.SpriteFrame[] = [];

    /** 品阶精灵帧 */
    @property(cc.SpriteFrame)
    stepSpFrameArr: cc.SpriteFrame[] = [];

    @property(cc.Node)
    strongNode: cc.Node = null;

    @property(cc.Node)
    upSign: cc.Node = null;

    @property(cc.Node)
    downSign: cc.Node = null;

    @property(cc.Node)
    selectBg: cc.Node = null;

    @property(cc.Sprite)
    imgUpgrade: cc.Sprite = null;

    @property(cc.Label)
    lblNum: cc.Label = null;

    /** 格子编号 */
    private _index: number = 0;
    /** 物品ID */
    private _itemID: number = 0;
    /** 物品实例ID */
    private _itemInstanceID: number = -1;
    /** 品质 */
    private _quality: number = 3;
    /** 阶级 */
    private _stepNum: number = 1;
    /** 图标 */
    private _resIcon: string = "";
    /** 道具背景框可见 */
    private _showItemBG: boolean = false;
    /** 道具类型图片 */
    private _itemTypeSpFrame: cc.SpriteFrame = null;
    /** 道具等级 */
    private _itemLevel: number = 0;
    /**是否显示最强标志 */
    private _isStrongly: boolean = false;
    /** 是否锁定 */
    private _isLock: boolean = false;
    /** 是否能强化 */
    private _canUpgrade: boolean = false;
    /** 物品数量(显示数量时则不显示品阶) */
    private _itemNum: number = 0;

    /** 动态加载方法 */
    private getItemSpriteFrame = Manager.spAtlas.getItem.bind(Manager.spAtlas);
    /** 获取物品表方法 */
    private getItemInfo: (id: number | string) => EquipCfg = Cfg.Equip.get.bind(Cfg.Equip);

    /** 格子点击回调 */
    private _clickHandler: (itemCell?: ItemCell) => any = () => { };

    private static property: PropertyVO;

    private unLockDesc: cc.Label;

    onLoad() {
        let node = this.node.getChildByName("unLockDesc");
        if (node) {
            this.unLockDesc = node.getComponent(cc.Label);
            this.unLockDesc.node.active = false;
        }
    }

    initItem(param: ItemCellData) {
        if (param) {
            this._index = param.index;
            this._itemID = param.itemID ? param.itemID : this._itemID;
            // this._stepNum = param.step ? param.step : this._stepNum;
            this._itemLevel = param.level ? param.level : this._itemLevel;
            this._itemTypeSpFrame = param.itemTypeSpFrame ? param.itemTypeSpFrame : this._itemTypeSpFrame;
            this._showItemBG = param.showItemBG;
            this._isStrongly = !!param.isStrongly;
            this._isLock = param.isLock;
            this._canUpgrade = param.canUpgrade;
            this._itemInstanceID = param.itemInstanceID || this._itemInstanceID;
            this._clickHandler = param.clickHandler || this._clickHandler;
            this._itemNum = param.itemNum;
            let itemInfo = this.getItemInfo(this._itemID);
            if (itemInfo) {
                this._quality = itemInfo.quality;
                this._stepNum = itemInfo.level;
                this._resIcon = itemInfo.resIcon;
                this._stepNum = itemInfo.level;
            }
            this.setGoodsNum(param.goodsNum ? param.goodsNum : 1);
        }
        this.upSign && (this.upSign.active = false);
        this.downSign && (this.downSign.active = false);
        this.onFlush();
    }


    public setUnLockDesc(str) {
        if (str) {
            this.unLockDesc.node.active = true;
            this.unLockDesc.string = str;
        }
    }
    /**
     * 检测是否显示战力更强显示
     */
    checkUpSign() {
        if (!this.upSign) return;
        if (!ItemCell.property) {
            ItemCell.property = new PropertyVO();
        }
        let itemInfo = this.getItemInfo(this._itemID);
        if (itemInfo) {
            let artitemInfo = null;
            let thisbattle = null;
            let level = GameVoManager.getInstance.getEquipPartLevel(itemInfo.part - 1);
            ItemCell.property.resetProperty(itemInfo.property);
            ItemCell.property.setPartAndLevel(itemInfo.part - 1, level);
            thisbattle = ItemCell.property.getBattle();
            let id = GameVoManager.getInstance.getEquipID(itemInfo.part - 1);
            artitemInfo = this.getItemInfo(id);
            if (artitemInfo) {
                ItemCell.property.resetProperty(artitemInfo.property);
                ItemCell.property.setPartAndLevel(itemInfo.part - 1, level);
                let battle = ItemCell.property.getBattle();
                this.upSign && (this.upSign.active = battle < thisbattle);
                this.downSign && (this.downSign.active = false);
            } else {
                this.upSign && (this.upSign.active = true);
                this.downSign && (this.downSign.active = false);
            }
        }


    }

    checkDownSign() {
        if (!this.downSign) return;
        if (!ItemCell.property) {
            ItemCell.property = new PropertyVO();
        }
        let itemInfo = this.getItemInfo(this._itemID);
        if (itemInfo) {
            let level = GameVoManager.getInstance.getEquipPartLevel(itemInfo.part - 1)
            ItemCell.property.resetProperty(itemInfo.property);
            ItemCell.property.setPartAndLevel(itemInfo.part - 1, level);
            let thisbattle = ItemCell.property.getBattle();
            let id = GameVoManager.getInstance.getEquipID(itemInfo.part - 1);
            let artitemInfo = this.getItemInfo(id);
            if (artitemInfo) {
                ItemCell.property.resetProperty(artitemInfo.property);
                ItemCell.property.setPartAndLevel(itemInfo.part - 1, level);
                let battle = ItemCell.property.getBattle();
                this.downSign && (this.downSign.active = battle > thisbattle);
                this.upSign && (this.upSign.active = false);
            } else {
                this.downSign && (this.downSign.active = false);
                this.upSign && (this.upSign.active = false);
            }
        }
    }

    getCellBattle(level) {
        if (!ItemCell.property) {
            ItemCell.property = new PropertyVO();
        }
        let itemInfo = this.getItemInfo(this._itemID);
        ItemCell.property.resetProperty(itemInfo.property);
        ItemCell.property.setPartAndLevel(itemInfo.part - 1, level);
        return ItemCell.property.getBattle();
    }

    getItemNum() {
        return this._goodsNum;
    }

    /** 设置物品图标 */
    setIcon(itemID: string | number, param?: any) {
        this._itemID = Number(itemID);
        this.onFlush(`icon`);
    }

    /** 设置装备底框可见 */
    setEquipBGActive(active: boolean) {
        this._showItemBG = active;
        this.onFlush(`itemBG`);
    }

    /** 设置装备显示等级 */
    setLevel(lv: number) {
        this._itemLevel = lv;
        this._updateImgItemLevel();
    }

    /** 设置点击回调 */
    setClickHandler(cb: (itemCell?: ItemCell) => any) {
        this._clickHandler = cb;
    }

    /** 设置最强标识是否显示 */
    setStrongSignActive(active: boolean) {
        this._isStrongly = active;
        this.strongNode && (this.strongNode.active = this._isStrongly);
    }

    /** 设置可强化标志是否显示 */
    setCanUpgrade(bool: boolean) {
        this._canUpgrade = bool;
        this.onFlush(`upgrade`);
    }

    /**设置更强战力标记是否显示 */
    public setUpSignVisible(boo: boolean) {
        this.upSign && (this.upSign.active = boo);
    }

    public setSelectVisible(boo: boolean) {
        this.selectBg.active = boo;
    }

    public getSelectVisible() {
        return this.selectBg.active;
    }

    private _goodsNum: number = 1;
    private goodsNumNode: cc.Node = null;
    private _numnode: cc.Node = null;
    public setGoodsNum(num) {
        this._goodsNum = num;
        if (!this.goodsNumNode) {
            this.goodsNumNode = this.imgCellBG.node.getChildByName("goodsNumNode");
        }
        if (!this._numnode) {
            this._numnode = this.imgCellBG.node.getChildByName("numnode");
        }
        if (this._goodsNum <= 1) {
            this.goodsNumNode.active = false;
        } else {
            this.goodsNumNode.active = true;
            this.goodsNumNode.removeAllChildren(true);
            let strnum = num + "";
            let len = strnum.length;
            for (let i = 0; i < len; ++i) {
                let imgStepNum = cc.instantiate(this._numnode);
                if (imgStepNum) {
                    imgStepNum.parent = this.goodsNumNode;
                    imgStepNum.active = false;
                    let pernum = strnum[i];
                    this.getItemSpriteFrame(pernum).then((spFrame: cc.SpriteFrame) => {
                        if (imgStepNum) {
                            imgStepNum.getComponent(cc.Sprite).spriteFrame = spFrame;
                            imgStepNum.active = true;
                        }
                    });
                } else {
                    break;
                }
            }
        }
    }

    /** 获取格子编号 */
    getIndex() {
        return this._index;
    }

    /** 获取物品格子的物品ID */
    getItemID() {
        return this._itemID;
    }

    /** 获取物品实例ID */
    getItemInstanceID() {
        return this._itemInstanceID;
    }

    public setStepVisible(boo) {
        this.imgStepBG.node.active = boo;
    }

    onClickCell() {
        this._clickHandler(this);
    }

    onFlush(type: string = `all`) {
        switch (type) {
            case `all`: {//全部刷新
                this._updateItemDisplay();
                this._updateItemCellBG();
                this._updateItemStepBG();
                this._updateImgStepNum();
                this._updateItemBG();
                this._updateImgItemType();
                this._updateImgItemLevel();
                this.setStrongSignActive(this._isStrongly);
                this._updateItemIsLock();
                this._updateImgCanUpgrade();
                this._updateLblItemNum();
                break;
            }
            case `icon`: {//刷新图标
                this._updateItemDisplay();
                break;
            }
            case `quality`: {//刷新品质底图
                this._updateItemCellBG();
                break;
            }
            case `step`: {//刷新阶级数字
                this._updateItemStepBG();
                this._updateImgStepNum();
                break;
            }
            case `itemBG`: {//刷新装备底图
                this._updateItemBG();
                break;
            }
            case `itemType`: {
                this._updateImgItemType();
                break;
            }
            case `itemLevel`: {
                this._updateImgItemLevel();
                break;
            }
            case `upgrade`: {
                this._updateImgCanUpgrade();
                break;
            }
        }
    }

    /** 刷新品质底图 */
    private _updateItemCellBG() {
        if (this._quality) {
            let spFrame = this.qualitySpFrameArr[this._quality - 1];
            if (spFrame) {
                this.imgCellBG.spriteFrame = spFrame;
            }
            this.imgCellBG.node.active = !!this._itemID;
        }
    }

    /** 刷新物品图标 */
    private _updateItemDisplay() {
        if (this._resIcon) {
            this.getItemSpriteFrame(this._resIcon).then((spFrame: cc.SpriteFrame) => {
                this.itemDisplay.spriteFrame = spFrame;
            });
        }
    }

    /** 刷新品阶底图 */
    private _updateItemStepBG() {
        if (this._quality) {
            let spFrame = this.stepSpFrameArr[this._quality - 1];
            if (spFrame) {
                this.imgStepBG.spriteFrame = spFrame;
            }
        }
    }

    /** 刷新品阶数字 */
    private _updateImgStepNum() {
        if (this._stepNum) {
            let step = this._stepNum;
            this.imgStepBG.node.active = step > 0;
            for (let i = 1; ; ++i) {
                let imgStepNum = cc.find("stepLayout/imgStepNum" + i, this.imgStepBG.node);
                if (imgStepNum) {
                    imgStepNum.active = false;
                    if (step == 0) break;
                    let num = step % 10;
                    this.getItemSpriteFrame(num + "").then((spFrame: cc.SpriteFrame) => {
                        if (imgStepNum) {
                            imgStepNum.getComponent(cc.Sprite).spriteFrame = spFrame;
                            imgStepNum.active = true;
                        }
                    });
                    step = Math.floor(step / 10);
                } else {
                    break;
                }
            }
        } else {
            this.imgStepBG.node.active = false;
        }
    }

    /** 刷新装备框背景 */
    private _updateItemBG() {
        this.imgItemBG.node.active = this._showItemBG;
    }

    /** 刷新装备类型图片 */
    private _updateImgItemType() {
        if (this._itemTypeSpFrame) {
            this.imgItemType.spriteFrame = this._itemTypeSpFrame;
        }
    }

    /** 刷新物品等级 */
    private _updateImgItemLevel() {
        // this.getItemSpriteFrame(this._itemLevel + "").then((spFrame: cc.SpriteFrame) => {
        //     this.imgItemLevel.spriteFrame = spFrame;
        // });
        this.imgItemLevel.string = this._itemLevel + "";
    }

    /** 刷新物品是否锁定 */
    private _updateItemIsLock() {
        this.imgLock.node.active = this._isLock;
    }

    /** 是否能强化 */
    private _updateImgCanUpgrade() {
        this.imgUpgrade.node.active = this._canUpgrade;
    }

    private _updateLblItemNum() {
        // if (this.lblNum) {
        //     this.lblNum.string = `x` + this._itemNum;
        //     this.lblNum.node.active = this._itemNum > 0;
        //     this.imgStepBG.node.active = !this.lblNum.node.active;
        // }
    }

    // update (dt) {}
}
