import { TConfig } from "./TConfig";


export interface HandbookCfg extends IConfig {id:number;name:string;icon:string;desc:string;skipPage:number[];skipDesc:string;}



export class HandbookCfgReader extends TConfig<HandbookCfg> {
    protected _name : string = "Handbook";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "name": "指挥官",
        "icon": "equip105",
        "desc": "作为一把新手武器，表现虽平凡无华，但仍是最可靠的伙伴，她将与你一起成长！",
        "skipPage": [
            1,
            1
        ],
        "skipDesc": "掉落：第1章"
    },
    "2": {
        "id": 2,
        "name": "AK-47",
        "icon": "equip107",
        "desc": "为了致敬经典枪械而被开发的，继承了经典枪械的射速、火力及容易上手特点。",
        "skipPage": [
            1,
            2
        ],
        "skipDesc": "掉落：第4章"
    },
    "3": {
        "id": 3,
        "name": "高斯步枪",
        "icon": "equip112",
        "desc": "高斯步枪，或者说线圈枪，用电磁感应推动磁性弹药造成伤害的武器，推力强大到岛上的怪物都会被推后数米。",
        "skipPage": [
            1,
            3
        ],
        "skipDesc": "掉落：第3章"
    },
    "4": {
        "id": 4,
        "name": "切割者",
        "icon": "equip104",
        "desc": "寒光！锋利！是对这把武器最高的赞誉！特殊的发射角度使得子弹可以被回收,合理利用可让敌人受到更多的伤害！",
        "skipPage": [
            1,
            5
        ],
        "skipDesc": "掉落：第2章"
    }
});
    }
}