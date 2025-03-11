import { TConfig } from "./TConfig";


export interface BattleLevelCfg extends IConfig {battleLv:number;battleExp:number;}



export class BattleLevelCfgReader extends TConfig<BattleLevelCfg> {
    protected _name : string = "BattleLevel";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "battleLv": 1,
        "battleExp": 0
    },
    "2": {
        "battleLv": 2,
        "battleExp": 100
    },
    "3": {
        "battleLv": 3,
        "battleExp": 200
    },
    "4": {
        "battleLv": 4,
        "battleExp": 300
    },
    "5": {
        "battleLv": 5,
        "battleExp": 400
    },
    "6": {
        "battleLv": 6,
        "battleExp": 500
    },
    "7": {
        "battleLv": 7,
        "battleExp": 600
    },
    "8": {
        "battleLv": 8,
        "battleExp": 700
    },
    "9": {
        "battleLv": 9,
        "battleExp": 800
    },
    "10": {
        "battleLv": 10,
        "battleExp": 900
    },
    "11": {
        "battleLv": 11,
        "battleExp": 1000
    },
    "12": {
        "battleLv": 12,
        "battleExp": 1100
    },
    "13": {
        "battleLv": 13,
        "battleExp": 1200
    },
    "14": {
        "battleLv": 14,
        "battleExp": 1300
    },
    "15": {
        "battleLv": 15,
        "battleExp": 1400
    },
    "16": {
        "battleLv": 16,
        "battleExp": 1500
    },
    "17": {
        "battleLv": 17,
        "battleExp": 1600
    },
    "18": {
        "battleLv": 18,
        "battleExp": 1700
    },
    "19": {
        "battleLv": 19,
        "battleExp": 1800
    },
    "20": {
        "battleLv": 20,
        "battleExp": 1900
    }
});
    }
}//weixin ： vip-v66666