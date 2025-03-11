import { UserVo } from "../shareData/UserVo";
import { GameSwitchVo } from "../shareData/GameSwitchVo";
import { Util } from "../utils/Util";
import { StateVo } from "../shareData/StateVo";
import { Const } from "../config/Const";
import { Manager } from "./Manager";
import { Notifier } from "../framework/Notifier";
import { ListenID } from "../ListenID";
import NetAdapter from "../adpapter/NetAdapter";
import { Time } from "../framework/Time";
import { Cfg } from "../config/Cfg";
import { ItemData, TaskSubType } from "../common/Common_Define";
import EquipModel from "../module/equip/EquipModel";
import { PropertyDefine } from "../module/equip/Property";

/**
 * 游戏相关vo管理类
 */
export class GameVoManager {
    private static _instance: GameVoManager = null;
    public myUserVo: UserVo;
    public localUserVo: UserVo;

    private _gameSwitchVo: GameSwitchVo;
    public get gameSwitchVo(): GameSwitchVo {
        return this._gameSwitchVo;
    }

    public stateVo: StateVo;

    public constructor() {
        this.myUserVo = new UserVo();
        this.localUserVo = new UserVo();
        this._gameSwitchVo = new GameSwitchVo();
        this.stateVo = new StateVo();
    }

    public static get getInstance(): GameVoManager {
        if (GameVoManager._instance == null) {
            GameVoManager._instance = new GameVoManager();
        }
        return GameVoManager._instance;
    }

    public updateSwitchVo(res) {
        this._gameSwitchVo.updateSwitchVo(res);
    }

    public saveData(): Promise<any> {
        // let data = GameVoManager.getInstance.myUserVo.serialize();
        // let putKVData = {
        //     exposed: data
        // }
        // return NetAdapter.patchKVData(putKVData);

        return new Promise((res, rej) => {
            if (!GameVoManager.getInstance.stateVo.isGetData) rej();
            else {
                GameVoManager.getInstance.myUserVo.saveId++;
                // let data = GameVoManager.getInstance.myUserVo.serialize();
                // let putKVData = {
                //     exposed: data
                // }
                // NetAdapter.patchKVData(putKVData).then(res).catch(rej);
                this.updateLocalUserVo(null);
            }
        });
    }

    public saveAllData(): Promise<any> {
        return new Promise((res, rej) => {
            if (!GameVoManager.getInstance.stateVo.isGetData) rej();
            else {
                GameVoManager.getInstance.myUserVo.saveId++;
                let data = GameVoManager.getInstance.myUserVo.serializeAll();
                let putKVData = {
                    type: 1,
                    custom_data: data
                }
                NetAdapter.putKVData(putKVData).then(res).catch(rej);
                this.updateLocalUserVo(null);
            }
        });
    }

    public saveDailyTaskData(): Promise<any> {
        GameVoManager.getInstance.myUserVo.saveId++;
        let data = GameVoManager.getInstance.myUserVo.serializeDaily();
        let putKVData = {
            exposed: data
        }
        this.updateLocalUserVo(null);
        return NetAdapter.patchKVData(putKVData);
    }

    public saveStageTaskData(): Promise<any> {
        GameVoManager.getInstance.myUserVo.saveId++;
        let data = GameVoManager.getInstance.myUserVo.serializeStage();
        let putKVData = {
            exposed: data
        }
        this.updateLocalUserVo(null);
        return NetAdapter.patchKVData(putKVData);
    }

    public saveBattleTaskData(): Promise<any> {
        GameVoManager.getInstance.myUserVo.saveId++;
        let data = GameVoManager.getInstance.myUserVo.serializeBattle();
        let putKVData = {
            exposed: data
        }
        this.updateLocalUserVo(null);
        return NetAdapter.patchKVData(putKVData);
    }

    public saveEcologicalData(): Promise<any> {
        GameVoManager.getInstance.myUserVo.saveId++;
        let data = GameVoManager.getInstance.myUserVo.serializeEcological();
        let putKVData = {
            exposed: data
        }
        this.updateLocalUserVo(null);
        return NetAdapter.patchKVData(putKVData);
    }

    public savePayData(): Promise<any> {
        GameVoManager.getInstance.myUserVo.saveId++;
        let data = GameVoManager.getInstance.myUserVo.serializePay();
        let putKVData = {
            exposed: data
        }
        this.updateLocalUserVo(null);
        return NetAdapter.patchKVData(putKVData);
    }

    public saveTechnologyData(): Promise<any> {
        GameVoManager.getInstance.myUserVo.saveId++;
        let data = GameVoManager.getInstance.myUserVo.serializeTechnology();
        let putKVData = {
            exposed: data
        }
        this.updateLocalUserVo(null);
        return NetAdapter.patchKVData(putKVData);
    }
    public setDiamond(num: number, type: number = 0) {
        this.myUserVo.diamond += num;
        Notifier.send(ListenID.Game_UpdateDiamond, num, type);
        if (num > 0) {
            Notifier.send(ListenID.Log_Event, { event_name: "total_of_diamond", counter: num });
        } else {
            Notifier.send(ListenID.Log_Event, { event_name: "consume_diamond", counter: Math.abs(num) });
        }
    }

    public setOrderSuccess(orderid: string, productid: string, time: number) {
        GameVoManager.getInstance.myUserVo.orderInfo[orderid] = { productId: productid, orderId: orderid, delivered_at: time };
        NetAdapter.CheckPayInfo();
    }

    public removeOrderInfo(orderid: string) {
        if (GameVoManager.getInstance.myUserVo.orderInfo[orderid]) {
            delete GameVoManager.getInstance.myUserVo.orderInfo[orderid];
        }
        this.savePayData();
    }

    public getOneRepairInfo() {
        let orderinfo = null;
        for (let key in GameVoManager.getInstance.myUserVo.orderInfo) {
            orderinfo = GameVoManager.getInstance.myUserVo.orderInfo[key];
            break;
        }
        return orderinfo;
    }

    public setGold(num: number, type: number = 0) {
        this.myUserVo.gold += num;
        Notifier.send(ListenID.Game_UpdateGold, num, type);
        if (num > 0 && type != 1) {
            Notifier.send(ListenID.Log_Event, { event_name: "total_of_gold", counter: Math.abs(num) });
        } else if (num < 0) {
            Notifier.send(ListenID.Log_Event, { event_name: "consume_gold", counter: Math.abs(num) });
        }
    }

    public addWeaponChip(num: number) {
        this.myUserVo.weaponChip += num;
        if (num > 0) {
            Notifier.send(ListenID.Log_Event, { event_name: "total_of_weaponDebris", counter: num });
        } else {
            Notifier.send(ListenID.Log_Event, { event_name: "consume_weaponDebris", counter: Math.abs(num) });
        }
    }

    public addEquip(goodsTypeId: number) {
        let itemInstanceID = this.getGoodsInstanceID();
        this.myUserVo.bag[itemInstanceID] = goodsTypeId;
        Notifier.send(ListenID.Bag_AddItem, {
            itemInfo: {
                itemInstanceID: itemInstanceID,
                itemID: goodsTypeId
            }
        });
        return itemInstanceID;
    }

    public removeEquip(itemInstanceID: number | string) {
        let itemID = this.myUserVo.bag[itemInstanceID];
        delete this.myUserVo.bag[itemInstanceID];
        Notifier.send(ListenID.Bag_RemoveItem, {
            itemInfo: {
                itemInstanceID: itemInstanceID,
                itemID: itemID
            }
        });
    }

    public removeEquipList(list) {
        for (let key in list) {
            if (this.myUserVo.bag[key])
                delete this.myUserVo.bag[key];
        }
    }

    public getEquipID(partIndex: number) {
        return this.myUserVo.equipPart[partIndex];
    }

    public getEquipPartLevel(partIndex: number) {
        return this.myUserVo.equipPartLevel[partIndex];
    }
    public addEquipPartLevel(partIndex: number, num) {
        this.myUserVo.equipPartLevel[partIndex] += num;
        let partStr = `weapon`;
        switch (partIndex) {
            case 1: {
                partStr = `muzzle`;
                break;
            }
            case 2: {
                partStr = `armor`;
                break;
            }
            case 3: {
                partStr = `pendant`;
                break;
            }
        }
        Notifier.send(ListenID.Log_Event, { event_name: "intensify_" + partStr + "_lv", counter: num });
    }

    public getBag() {
        return this.myUserVo.bag;
    }

    public getBagEquipTypeIdById(insId: number | string) {
        let id = this.myUserVo.bag[insId];
        if (!id) return 0;
        else return id;
    }

    //type 1 时间恢复 2 其他方式恢复  3 消耗
    public setPower(num: number, type: number = 0) {
        if (type == 1) {  //时间恢复
            if (this.myUserVo.power < Const.MaxPower) {
                this.myUserVo.power += num;
                if (this.myUserVo.power >= Const.MaxPower) {
                    this.myUserVo.power = Const.MaxPower;
                }
            }
        } else if (type == 2) {
            this.myUserVo.power += num;
        } else if (type == 3) {
            if (this.myUserVo.power >= num) {
                this.myUserVo.power -= num;
            }
            Notifier.send(ListenID.Role_CostPower, num);
        }
        Notifier.send(ListenID.Game_UpdatePower, num, type);
    }

    public updateLocalUserVo(data: string) {
        try {
            let newdata = data;
            if (data == "" || data == null) {
                newdata = GameVoManager.getInstance.myUserVo.serializeAll();
            }
            Manager.storage.setString("localUserVo", newdata);
        } catch (error) {
            console.error(error);
        }
    }

    public getLocalData(key?: string) {
        let a = Manager.storage.getString("localUserVo", "{}");
        return JSON.parse(a);
    }

    public readLocalUserVo() {
        if (!this.stateVo.isGetData) {

        }
    }

    /** 是否是会员 */
    public getIsMember() {
        let isMember = false;
        let serverTime = Time.serverTimeMs;
        // this.myUserVo.member.memberEndTime = serverTime - 1;
        isMember = serverTime < this.myUserVo.member.memberEndTime;
        return isMember;
    }

    /** 获取订单列表 */
    public getIAPOrderList() {
        return this.myUserVo.iapList;
    }

    public getGoodsInstanceID() {
        return this.myUserVo.instanceId++;
    }
    /** 是否新用户   用于切换广告id信息 */
    public isNewUser() {
        if (this.myUserVo.firstLoginTime > 0) {
            let date = new Date(Time.serverTimeMs);
            let curday = date.getDate();
            let curmonth = date.getMonth();
            let loginData = new Date(this.myUserVo.firstLoginTime);
            let loginday = loginData.getDate();
            let loginmonth = loginData.getMonth();
            return curday == loginday && curmonth == loginmonth; //同一天即为新用户
        }
        return true
    }

    public holdsEquip(itemData: ItemData) {
        if (!itemData) return;
        let instanceID = itemData.itemInstanceID;
        // let itemID = this.myUserVo.bag[instanceID];
        let itemID = itemData.itemID;
        if (itemID) {
            let itemInfo = Cfg.Equip.get(itemID);
            if (itemInfo) {
                let part = itemInfo.part - 1;
                if (part >= 0 && part < 4) {
                    let oldID = this.myUserVo.equipPart[part];
                    this.myUserVo.equipPart[part] = itemID;
                    if (itemInfo.weaponId) {
                        this.myUserVo.defaultGunId = itemInfo.weaponId;
                        Notifier.send(ListenID.Change_Weapon);
                    }
                    this.removeEquip(instanceID);
                    if (oldID > 0)
                        this.addEquip(oldID);
                    Notifier.send(ListenID.Role_HoldsEquip, { part: part, itemID: itemID });
                }
            }
        }
    }

    public setBattle(num: number, showTips: boolean = false) {
        let oldNum = this.myUserVo.battle;
        this.myUserVo.battle = num;
        if (num != oldNum) {
            Notifier.send(ListenID.Role_BattleChange, oldNum, num);
            Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BattleTarget, this.getBattle());
            if (showTips && num > oldNum) {
                Notifier.send(ListenID.Equip_ShowBattleTips, oldNum, num);
            }
            if (num >= oldNum) {
                let userinfo = {
                    nickName: GameVoManager.getInstance.myUserVo.nickName, topLevel: GameVoManager.getInstance.myUserVo.topLevel,
                    equipPart: GameVoManager.getInstance.myUserVo.equipPart, equipPartLevel: GameVoManager.getInstance.myUserVo.equipPartLevel,
                    battle: GameVoManager.getInstance.getBattle(),
                };
                let d = { type: "newbattle", cycle: "forever", score: num, data: JSON.stringify(userinfo) };
                NetAdapter.postRankData(d);
            }
        } else {
            if (this.myUserVo.isFirstUpBattle) {
                this.myUserVo.isFirstUpBattle = false;
                let userinfo = {
                    nickName: GameVoManager.getInstance.myUserVo.nickName, topLevel: GameVoManager.getInstance.myUserVo.topLevel,
                    equipPart: GameVoManager.getInstance.myUserVo.equipPart, equipPartLevel: GameVoManager.getInstance.myUserVo.equipPartLevel,
                    battle: GameVoManager.getInstance.getBattle(),
                };
                Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.BattleTarget, this.getBattle());
                let d = { type: "newbattle", cycle: "forever", score: num, data: JSON.stringify(userinfo) };
                NetAdapter.postRankData(d);
            }
        }
    }

    public getBattle() {
        return this.myUserVo.battle;
    }

    public resetGun() {
        let equipid = this.myUserVo.equipPart[0];
        let data = Cfg.Equip.get(equipid);
        this.myUserVo.defaultGunId = data.weaponId;
    }

    /** 根据属性下标获取属性 */
    public getPropertyNumByPropertyType(type: number) {
        let property = EquipModel.getInstance.getBodyEquipPro(0);
        return property[PropertyDefine.equipIndexToKey[type]] || 0;
    }

    /** 获取科技等级 */
    public getTechLevel(techId: number) {
        return this.myUserVo.tech[techId] || 0;
    }
    /** 升级科技 */
    public upgradeTechnology(techId: number) {
        let lv = this.myUserVo.tech[techId] || 0;
        lv++;
        this.myUserVo.tech[techId] = lv;
        Notifier.send(ListenID.TechnologyLevel_Change, { id: techId });
        this.saveTechnologyData();
    }

    /** 设置科技点 */
    public setTechPoint(num: number) {
        if (typeof (num) != `number`) return;
        let old = this.myUserVo.techP;
        this.myUserVo.techP = num;
        Notifier.send(ListenID.TechnologyPoint_Change, { old: old, new: num });
    }

    public addExp(num: number) {
        let roleVO = this.myUserVo;
        roleVO.curExp += num;
        roleVO.allExp += num;
        roleVO.roleLv;
        let levelUp = false;
        while (true) {
            let nextLvCfg = Cfg.RoleLevel.get(roleVO.roleLv + 1);
            if (nextLvCfg) {
                let cur = roleVO.curExp - nextLvCfg.exp;
                if (cur >= 0) {
                    roleVO.roleLv++;
                    roleVO.curExp = cur;
                    levelUp = true;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        Notifier.send(ListenID.Role_GetExp, num);
        return levelUp;
    }
}
