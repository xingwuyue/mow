import { MVC } from "../../framework/MVC";
import { GameVoManager } from "../../manager/GameVoManager";
import { PropertyVO, PropertyDefine } from "./Property";
import { Cfg } from "../../config/Cfg";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { ItemData } from "../../common/Common_Define";
import { Manager } from "../../manager/Manager";
import { Const } from "../../config/Const";
import TechnologyModel from "../technology/TechnologyModel";
declare interface lockMap {
    [key: number]: number,
}

export default class EquipModel extends MVC.BaseModel {

    private static _instance: EquipModel = null;
    public static partNum: number = 4;

    public myPro: PropertyVO[] = [];
    public myAllPro: PropertyVO;
    public lastBattle: number = 0;//记录上一个变化的战斗力
    private lockList: lockMap = {};
    private _itemList: ItemData[] = [

    ];
    private _gameVO: GameVoManager = null;
    /** 是否有更强装备或者能强化 */
    private _haveStrongEquip: boolean = false;
    /** 是否有能强化装备 */
    private _canUpgrade: boolean = false;

    public static cellPos = [
        cc.v2(-258, 435),
        cc.v2(260, 435),
        cc.v2(-258, 255),
        cc.v2(260, 255),
    ]

    public static cellUpgradePos = [
        cc.v2(-258, 386),
        cc.v2(260, 386),
        cc.v2(-258, 165),
        cc.v2(260, 165),
    ]
    // private _lockList: boolean[] = [];

    private _curSelPart: number = 0;
    private _curSelSmeltPart: number = 0;

    public constructor() {
        super();
        if (EquipModel._instance == null) {
            EquipModel._instance = this;
        }
        for (let i = 0; i < EquipModel.partNum; i++) {
            this.myPro[i] = new PropertyVO();
        }
        this.myAllPro = new PropertyVO();

        this._gameVO = GameVoManager.getInstance;
        this.lockList = Manager.storage.getObject<lockMap>(Const.STORAGE_STORE_LOCKLIST, {});
    }
    public reset(): void {

    }

    public static get getInstance(): EquipModel {
        if (EquipModel._instance == null) {
            EquipModel._instance = new EquipModel();
        }
        return EquipModel._instance;
    }

    public resetItemList() {
        this._itemList = [];
        for (let key in GameVoManager.getInstance.myUserVo.bag) {
            let num: number = Number(key);
            this._itemList.push({ itemInstanceID: num, itemID: GameVoManager.getInstance.myUserVo.bag[key] });
        }
    }

    public getBagLength() {
        return this._itemList.length;
    }

    /**更新自身数据 */
    public updateBodyEquipPro(showTips: boolean = false) {
        const parts = GameVoManager.getInstance.myUserVo.equipPart;
        this.myAllPro.resetZero();
        for (let i = 0; i < parts.length; i++) {
            this.myPro[i].resetZero();
            const partlevel = GameVoManager.getInstance.getEquipPartLevel(i);
            if (parts[i]) {
                let prodata = Cfg.Equip.get(parts[i]);
                if (prodata) {
                    let len = prodata.property.length;
                    for (let k = 0; k < len; k++) {
                        let key = PropertyDefine.equipIndexToKey[k + 1];
                        let value = prodata.property[k];
                        this.myPro[i][key] = value;
                    }
                    this.myPro[i].setPartAndLevel(i, partlevel);
                }
                for (let key in PropertyDefine.equipKeyToIndex) {
                    this.myAllPro[key] += this.myPro[i][key];
                }
            }
        }
        // Notifier.send(ListenID.Equip_PropertyChange);
        let newNum = this.myAllPro.getBattle() + TechnologyModel.getInstance().getAllProperty().getBattle();
        this._gameVO.setBattle(newNum, showTips);
    }

    public updateEquipProByIndex(part, level) {
        for (let key in PropertyDefine.equipKeyToIndex) {
            this.myAllPro[key] -= this.myPro[part][key];
        }
        this.myPro[part].setPartAndLevel(part, level);
        for (let key in PropertyDefine.equipKeyToIndex) {
            this.myAllPro[key] += this.myPro[part][key];
        }
        let newNum = this.myAllPro.getBattle();
        // Notifier.send(ListenID.Equip_PropertyChange);
        this._gameVO.setBattle(newNum, true);
    }


    public getBodyEquipPro(partIndex) {
        if (partIndex == 0) {
            return this.myAllPro
        } else {
            return this.myPro[partIndex - 1];
        }
    }

    // public getBattleByProperty(pro: PropertyVO) {
    //     let battle = 0;
    //     for (let key in pro) {
    //         let value = PropertyDefine.equipKeyToPower[key];
    //         if (value) {
    //             battle += value * pro[key];
    //         }
    //     }
    //     return battle;
    // }

    /** 
     * 获取装备列表 
     * @param part 装备部位
     */
    private tempPropertyVo: PropertyVO;
    public getItemList(part: number, type: number = 1) {
        let list = this._itemList;
        let this1 = this;
        function sortEquip(a: ItemData, b: ItemData) {
            let acfg = Cfg.Equip.get(a.itemID);
            let bcfg = Cfg.Equip.get(b.itemID);
            if (bcfg.quality != acfg.quality) {
                return bcfg.quality - acfg.quality;
            } else {
                if (acfg.part == bcfg.part) {
                    if (acfg.quality == bcfg.quality) {
                        if (!this1.tempPropertyVo) {
                            this1.tempPropertyVo = new PropertyVO(acfg.property);
                        }
                        this1.tempPropertyVo.resetProperty(acfg.property);
                        let abattle = this1.tempPropertyVo.getBattle();
                        this1.tempPropertyVo.resetProperty(bcfg.property);
                        let bbattle = this1.tempPropertyVo.getBattle();
                        return bbattle - abattle;
                    };
                } else {
                    return acfg.part - bcfg.part;
                }
            }
        }
        if (part != 0) {
            list = list.filter((itemInfo: ItemData) => {
                let itemCfg = Cfg.Equip.get(itemInfo.itemID);
                let boo = false;
                if (type == 2) {
                    boo = this.getItemIsLock(itemInfo.itemInstanceID);
                }
                return itemCfg.part == part && !boo;
            });
        } else {
            list = list.filter((itemInfo: ItemData) => {
                let boo = false;
                if (type == 2) {
                    boo = !this.getItemIsLock(itemInfo.itemInstanceID);
                } else {
                    boo = true;
                }
                return boo;
            });
        }
        list.sort(sortEquip);
        return list;
    }

    public setCurSelPartIndex(partIndex: number, type: number = 1) {
        if (type == 2) {
            this._curSelSmeltPart = partIndex;
        } else {
            this._curSelPart = partIndex;
        }
    }

    public getCurSelPartIndex(type: number = 1) {
        if (type == 2) return this._curSelSmeltPart;
        return this._curSelPart;
    }

    public getCurSelPartItemList(type: number = 1) {
        return this.getItemList(type == 1 ? this._curSelPart : this._curSelSmeltPart, type);
    }

    public getItemIsLock(instanceId: number) {
        return !!this.lockList[instanceId];
    }

    /**
     * 本地缓存装备锁定
     * @param partIndex 装备类型
     * @param itemIndex 格子回调
     * @param isLock 是否锁定
     */
    public setItemIsLock(instanId: number, isLock: boolean) {
        if (isLock) {
            if (!this.lockList[instanId]) {
                this.lockList[instanId] = 1;
                Manager.storage.setObject(Const.STORAGE_STORE_LOCKLIST, this.lockList);
            }
        } else {
            if (this.lockList[instanId]) {
                delete this.lockList[instanId];
                Manager.storage.setObject(Const.STORAGE_STORE_LOCKLIST, this.lockList);
            }
        }
    }

    /** 获取当前页签格子的锁定状态 */
    public getCurPageCellLockState(instanId: number) {
        return this.getItemIsLock(instanId);
    }

    /** 获取某一页的锁定状态 */
    public getCurPageLockStateList() {
        let list = [];
        for (let i = 0; i < this._itemList.length; ++i) {
            list[i] = this.getItemIsLock(this._itemList[i].itemInstanceID);
        }
        return list;
    }

    /**
     * 获取对应部位升级消耗
     * @param level 
     * @param index 
     */
    public getUpgradeCost(level, index) {
        let reallevel = level > this._gameVO.myUserVo.equipUpgradeMaxLevel ? this._gameVO.myUserVo.equipUpgradeMaxLevel : level;
        let data = Cfg.Intensify.get(reallevel);
        let cost = 999;
        if (data) {
            cost = data[PropertyDefine.partIndexToCostName[index]];
        }
        return cost;
    }

    /**
     * 获取对应部位升级属性下标
     * @param level 
     * @param index 
     */
    public getShowPropertyIndexs(level, index) {
        let reallevel = level > this._gameVO.myUserVo.equipUpgradeMaxLevel ? this._gameVO.myUserVo.equipUpgradeMaxLevel : level;
        let data = Cfg.Intensify.get(reallevel);
        let pro = data[PropertyDefine.partIndexToKeyName[index]];
        let proIndex = [];
        let prolen = pro.length / 2;
        for (let i = 0; i < prolen; i++) {
            proIndex.push(pro[2 * i]);
        }
        return proIndex;
    }

    /**
     * 获取index部位可以升级的等级
     * @param index 
     */
    public getCanUpgradeLevelAndCost(index) {
        let curLevel = this._gameVO.getEquipPartLevel(index);
        let costName = PropertyDefine.partIndexToCostName[index];
        let unLock = PropertyDefine.partIndexToLockName[index];
        let cost = 0;
        let maxlevel = this._gameVO.myUserVo.equipUpgradeMaxLevel;
        let level = 0;
        for (let i = curLevel + 1; i <= maxlevel; i++) {
            let data = Cfg.Intensify.get(i);
            if (this._gameVO.myUserVo.gold >= data[costName] + cost && this._gameVO.myUserVo.roleLv >= data[unLock]) {
                level += 1;
                cost += data[costName];
            } else {
                break;
            }
        }
        return [level + curLevel, cost];
    }

    public getCanUpgradeLevel(part, level) {
        let unLock = PropertyDefine.partIndexToLockName[part];
        let nolevel = 0;
        let data = Cfg.Intensify.get(level);
        if (data) {
            if (data[unLock] > this._gameVO.myUserVo.roleLv) {
                nolevel = data[unLock];
            }
        }
        return nolevel;
    }

    /** 增加物品 */
    public addItem(itemData: ItemData) {
        let itemInstanceID = itemData.itemInstanceID;
        let haveItem = false;
        for (let i = 0; i < this._itemList.length; ++i) {
            if (this._itemList[i].itemInstanceID == itemInstanceID) {
                haveItem = true;
                break;
            }
        }
        if (!haveItem)
            this._itemList.push(itemData);
    }

    /** 移除物品 */
    public removeItem(itemData: ItemData) {
        if (!itemData) return;
        this.setItemIsLock(itemData.itemInstanceID, false);
        for (let i = 0; i < this._itemList.length; ++i) {
            let itemInfo = this._itemList[i];
            if (itemData.itemInstanceID == itemInfo.itemInstanceID) {
                this._itemList.splice(i, 1);
                break;
            }
        }
    }

    public checkPartUnLock(partIndex) {
        let data = Cfg.EquipUnlock.get(partIndex);
        if (data && data.unlock > GameVoManager.getInstance.myUserVo.roleLv) {
            return data.unlock;
        } else {
            return 0;
        }
    }

    public getPartUnLock() {
        let partIndex = 0;
        for (let i = 2; i <= 4; i++) {
            let data = Cfg.EquipUnlock.get(i);
            if (data.unlock == GameVoManager.getInstance.myUserVo.roleLv) {
                partIndex = i;
                break;
            }
        }
        return partIndex;
    }

    /** 对比装备中的物品，是否有提升 */
    public checkBattleCanUp(itemID: number) {
        let bool = false;
        if (!itemID) return bool;
        let itemCfg = Cfg.Equip.get(itemID);
        if (itemCfg) {
            let level = GameVoManager.getInstance.getEquipPartLevel(itemCfg.part - 1);
            let prop = new PropertyVO();
            prop.resetProperty(itemCfg.property);
            prop.setPartAndLevel(itemCfg.part-1, level);
            let thisbattle = prop.getBattle();
            let id = GameVoManager.getInstance.getEquipID(itemCfg.part - 1);
            let artitemInfo = Cfg.Equip.get(id);
            if (artitemInfo) {
                prop.resetProperty(artitemInfo.property);
                prop.setPartAndLevel(itemCfg.part-1, level);
                let battle = prop.getBattle();
                bool = battle < thisbattle;
            } else {
                bool = true;
            }
        }
        return bool;
    }

    /** 是否显示红点 */
    public getEquipRemind() {
        // cc.log("***** this._haveStrongEquip", this._haveStrongEquip, this._canUpgrade);
        return this._haveStrongEquip || this._canUpgrade;
    }

    public getEquipcanUpgrade(){
        return this._canUpgrade;
    }

    /** 刷新是否有更强的装备或者能强化 */
    public updateHaveStrongEquip() {
        this._haveStrongEquip = false;
        for (let i = 0; i < this._itemList.length; ++i) {
            let itemInfo = this._itemList[i];
            let itemID = itemInfo.itemID;
            this._haveStrongEquip = this.checkBattleCanUp(itemID);
            if (this._haveStrongEquip)
                break;
        }
    }

    /** 更新是否有强化的装备 */
    public updateCanUpgradeEquip() {
        this._canUpgrade = this.getCanUpgrade();
    }

    public getHaveStringEquip() {
        return this._haveStrongEquip;
    }

    /** 获取是否存在能强化的部位 */
    public getCanUpgrade() {
        this._canUpgrade = false;
        for (let i = 0; i < 4; ++i) {
            let canUpgrade = this.getCanUpgradeByPart(i);
            if (canUpgrade) {
                this._canUpgrade = true;
                break;
            }
        }
        return this._canUpgrade;
    }

    /** 判断单部位是否能强化 */
    public getCanUpgradeByPart(partIndex: number) {
        let bool = false;
        let equipPartLevel = GameVoManager.getInstance.getEquipPartLevel(partIndex);
        let curLevel = equipPartLevel;
        let nextLevel = curLevel + 1;
        let curCostNum = EquipModel.getInstance.getUpgradeCost(nextLevel, partIndex);
        let unLockLevel = this.getCanUpgradeLevel(partIndex, nextLevel);
        let isLock = this.checkPartUnLock(partIndex + 1) || unLockLevel > 0;
        let goldEnought = GameVoManager.getInstance.myUserVo.gold >= curCostNum;
        bool = !isLock && goldEnought
        return bool;
    }

    public getMaxBattleEquipIndex(part: number){
        let index = 0;
        let battle = 0;
        let itemList = this.getItemList(0);
        for (let i = 0; i < itemList.length; ++i){
            let item = itemList[i];
            let itemInfo = Cfg.Equip.get(item.itemID);
            if (itemInfo){
                if(itemInfo.part - 1 == part){
                    let propertyArr = itemInfo.property;
                    let propertyVo = new PropertyVO(propertyArr);
                    let proBattle = propertyVo.getBattle();
                    if (proBattle > battle) {
                        index = i;
                        battle = proBattle;
                    }
                }
            }
        }
        return index;
    }

    public getMaxEquipBattleBuyPart(part: number){
        let battle = 0;
        let itemList = this.getItemList(part);
        for (let i = 0; i < itemList.length; ++i) {
            let item = itemList[i];
            let itemInfo = Cfg.Equip.get(item.itemID);
            if (itemInfo) {
                let propertyArr = itemInfo.property;
                let propertyVo = new PropertyVO(propertyArr);
                let proBattle = propertyVo.getBattle();
                if (proBattle > battle) {
                    battle = proBattle;
                }
            }
        }
        return battle;
    }
}