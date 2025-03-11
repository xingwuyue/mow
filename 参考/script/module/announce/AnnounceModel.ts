import { MVC } from "../../framework/MVC";
import { GameFunID } from "../../common/Common_Define";
import { Cfg } from "../../config/Cfg";
import { EquipCfg } from "../../config/EquipCfg";
import { Util } from "../../utils/Util";
declare interface Map<T> {
    [key: string]: T;
}
let funIDToName = {
    [GameFunID.Box]: { type: "<color=#9a41ff>紫金宝箱</c>", way: "<u>我也要抽取</u>", wayId: 10 },
    [GameFunID.MainDraw]: { type: "<color=#ff6446>幸运转盘</c>", way: "<u>我也要抽取</u>", wayId: 3 },
    [GameFunID.Boss]: { type: "<color=#4cff46>头目战</c>", way: "<u>我也要挑战</u>", wayId: 6 },
}
let funidindex = [GameFunID.Box, GameFunID.Boss, GameFunID.MainDraw];

export default class AnnounceModel extends MVC.BaseModel {

    private static _instance: AnnounceModel = null;
    private announceList: string[] = [];
    public constructor() {
        super();
        if (AnnounceModel._instance == null) {
            AnnounceModel._instance = this;
        }
        this.startNum = 0;
        this.announceList = [];
        this.initPureEquip();
    }
    public reset(): void {

    }
    public startNum: number = 0;
    public static get getInstance(): AnnounceModel {
        if (AnnounceModel._instance == null) {
            AnnounceModel._instance = new AnnounceModel();
        }
        return AnnounceModel._instance;
    }

    public popAnnounce(): string {
        return this.announceList.shift();
    }

    public addAnnounce(str) {
        this.announceList[0] = str;
    }

    /**
     * 
     * @param name 玩家昵称
     * @param funid 功能id
     * @param equipname 装备名称
     * @param addWay 是否添加跳转链接
     */
    public serializeMessage(name, funid, equipname, addWay: boolean = false) {
        let str = "";
        str += `[系统]:<color=#ff8d22>${name}</c> 通过 `;
        str += `${funIDToName[funid].type} 获得了 `;
        str += `<color=#9a41ff>${equipname}</c>！`;
        if (addWay) {
            str += ` ${funIDToName[funid].way}`;
            str = `<on click='clickme' param = '${funIDToName[funid].wayId}'>${str}</on>`
        }

        return str;
    }

    public getpureEquipNameRandom() {
        let radio = Util.random(1, 1001);
        let index = 0;
        if (radio < 300) {
            index = 0;
        } else if (radio < 550) {
            index = 1;
        } else if (radio < 800) {
            index = 2;
        } else if (radio < 950) {
            index = 3;
        } else if (radio < 980) {
            index = 4;
        } else if (radio < 1000) {
            index = 5;
        }

        let realindex = Util.random(0, this.equipList[index].length);
        return this.equipList[index][realindex] && this.equipList[index][realindex].name || "超能·无用护甲";
    }

    public getFunIDRandom() {
        let radio = Util.random(1, 1001);
        let index = 0;
        if (radio < 300) {
            index = 0;
        } else if (radio < 700) {
            index = 1;
        } else if (radio < 1001) {
            index = 2;
        }
        return funidindex[index] || GameFunID.Box;
    }

    public equipList: EquipCfg[][] = [];
    public initPureEquip() {
        let map: Map<EquipCfg> = Cfg.Equip.getAll();
        for (const key in map) {
            const element = map[key];
            if (element.id >= 10000 && element.id < 99999) {
                if (element.quality >= 4) {
                    if (!this.equipList[element.level - 1]) {
                        this.equipList[element.level - 1] = [];
                    }
                    this.equipList[element.level - 1].push(element);
                }
            }
        }
    }
}