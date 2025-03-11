import { TConfig } from "./TConfig";


export interface SoundCfg extends IConfig {id:number;name:string;path:string;volume:number;loop:boolean;}



export class SoundCfgReader extends TConfig<SoundCfg> {
    protected _name : string = "Sound";

    public constructor() {
        super();
        this.initByMap({
    "101": {
        "id": 101,
        "name": "武器101",
        "path": "audio/fire101",
        "volume": 1,
        "loop": false
    },
    "102": {
        "id": 102,
        "name": "武器102",
        "path": "audio/fire102",
        "volume": 1,
        "loop": false
    },
    "103": {
        "id": 103,
        "name": "武器103",
        "path": "audio/fire103",
        "volume": 1,
        "loop": false
    },
    "104": {
        "id": 104,
        "name": "回旋镖",
        "path": "audio/fire104",
        "volume": 1,
        "loop": false
    },
    "105": {
        "id": 105,
        "name": "武器105",
        "path": "audio/fire105",
        "volume": 1,
        "loop": false
    },
    "106": {
        "id": 106,
        "name": "火箭筒音效",
        "path": "audio/fire106",
        "volume": 1,
        "loop": false
    },
    "107": {
        "id": 107,
        "name": "黄金AK音效",
        "path": "audio/fire107",
        "volume": 1,
        "loop": false
    },
    "109": {
        "id": 109,
        "name": "武器109",
        "path": "audio/fire109",
        "volume": 1,
        "loop": false
    },
    "111": {
        "id": 111,
        "name": "武器111",
        "path": "audio/fire111",
        "volume": 1,
        "loop": false
    },
    "112": {
        "id": 112,
        "name": "武器112",
        "path": "audio/fire112",
        "volume": 0.5,
        "loop": false
    },
    "117": {
        "id": 117,
        "name": "武器117",
        "path": "audio/fire117",
        "volume": 1,
        "loop": false
    },
    "120": {
        "id": 120,
        "name": "武器120",
        "path": "audio/fire120",
        "volume": 1,
        "loop": false
    },
    "121": {
        "id": 121,
        "name": "火力十足武器121",
        "path": "audio/fire121",
        "volume": 1,
        "loop": false
    },
    "122": {
        "id": 122,
        "name": "火焰散弹武器122",
        "path": "audio/fire122",
        "volume": 1,
        "loop": false
    },
    "123": {
        "id": 123,
        "name": "弹弹乐武器开火",
        "path": "audio/fire123",
        "volume": 0.8,
        "loop": false
    },
    "124": {
        "id": 124,
        "name": "黑洞开火",
        "path": "audio/fire124",
        "volume": 1,
        "loop": false
    },
    "202": {
        "id": 202,
        "name": "通用子弹爆炸受击2",
        "path": "audio/hit202",
        "volume": 0.5,
        "loop": false
    },
    "203": {
        "id": 203,
        "name": "通用子弹爆炸受击3",
        "path": "audio/hit203",
        "volume": 0.5,
        "loop": false
    },
    "204": {
        "id": 204,
        "name": "通用子弹爆炸受击4",
        "path": "audio/hit204",
        "volume": 0.5,
        "loop": false
    },
    "205": {
        "id": 205,
        "name": "飞镖受击",
        "path": "audio/hit205",
        "volume": 1,
        "loop": false
    },
    "206": {
        "id": 206,
        "name": "火箭筒受击",
        "path": "audio/hit206",
        "volume": 1,
        "loop": false
    },
    "207": {
        "id": 207,
        "name": "火球枪子弹爆炸",
        "path": "audio/hit207",
        "volume": 1,
        "loop": false
    },
    "208": {
        "id": 208,
        "name": "光能枪持续伤害",
        "path": "audio/hit208",
        "volume": 1,
        "loop": false
    },
    "209": {
        "id": 209,
        "name": "黑洞枪子弹音效3秒",
        "path": "audio/hit209",
        "volume": 1,
        "loop": false
    },
    "210": {
        "id": 210,
        "name": "弹弹乐武器受击",
        "path": "audio/hit210",
        "volume": 1,
        "loop": false
    },
    "308": {
        "id": 308,
        "name": "统一怪物死亡音效",
        "path": "audio/death308",
        "volume": 1,
        "loop": false
    },
    "501": {
        "id": 501,
        "name": "按钮",
        "path": "audio/button",
        "volume": 1,
        "loop": false
    },
    "502": {
        "id": 502,
        "name": "复活后音效",
        "path": "audio/resurrection",
        "volume": 1,
        "loop": false
    },
    "506": {
        "id": 506,
        "name": "人物死亡",
        "path": "audio/die",
        "volume": 1,
        "loop": false
    },
    "507": {
        "id": 507,
        "name": "胜利通关",
        "path": "audio/victory",
        "volume": 1,
        "loop": false
    },
    "508": {
        "id": 508,
        "name": "背景音乐",
        "path": "audio/bgm",
        "volume": 1,
        "loop": true
    },
    "509": {
        "id": 509,
        "name": "获得解锁",
        "path": "audio/get",
        "volume": 1,
        "loop": false
    },
    "510": {
        "id": 510,
        "name": "升级按钮",
        "path": "audio/lvbutton",
        "volume": 1,
        "loop": false
    },
    "511": {
        "id": 511,
        "name": "多个金币音效",
        "path": "audio/gold",
        "volume": 1,
        "loop": false
    },
    "512": {
        "id": 512,
        "name": "转盘音效",
        "path": "audio/turntable",
        "volume": 1,
        "loop": false
    },
    "513": {
        "id": 513,
        "name": "转盘获得金币音效",
        "path": "audio/turntablegold",
        "volume": 1,
        "loop": false
    },
    "514": {
        "id": 514,
        "name": "新手引导1",
        "path": "audio/guide",
        "volume": 1,
        "loop": false
    },
    "515": {
        "id": 515,
        "name": "boss出现音效",
        "path": "audio/boss",
        "volume": 1,
        "loop": false
    },
    "516": {
        "id": 516,
        "name": "强化升级",
        "path": "audio/intensify",
        "volume": 1,
        "loop": false
    },
    "517": {
        "id": 517,
        "name": "熔炼得金币",
        "path": "audio/smelt",
        "volume": 1,
        "loop": false
    },
    "518": {
        "id": 518,
        "name": "换子弹音效",
        "path": "audio/reload",
        "volume": 1,
        "loop": false
    },
    "3001": {
        "id": 3001,
        "name": "道具3001炸弹",
        "path": "audio/boom",
        "volume": 1,
        "loop": false
    },
    "3002": {
        "id": 3002,
        "name": "道具3002冰",
        "path": "audio/ice",
        "volume": 1,
        "loop": false
    },
    "3003": {
        "id": 3003,
        "name": "道具3003火",
        "path": "audio/fireball",
        "volume": 1,
        "loop": false
    },
    "3006": {
        "id": 3006,
        "name": "道具3006闪电",
        "path": "audio/electric",
        "volume": 1,
        "loop": false
    },
    "4001": {
        "id": 4001,
        "name": "道具4001小子弹环",
        "path": "audio/zidanhuan",
        "volume": 1,
        "loop": false
    },
    "4002": {
        "id": 4002,
        "name": "道具4002大子弹环",
        "path": "audio/zidanhuan",
        "volume": 1,
        "loop": false
    },
    "4003": {
        "id": 4003,
        "name": "道具4003激光子弹环",
        "path": "audio/zidanhuan",
        "volume": 1,
        "loop": false
    },
    "5001": {
        "id": 5001,
        "name": "凝时时刻",
        "path": "audio/tongyibuff",
        "volume": 1,
        "loop": false
    },
    "5002": {
        "id": 5002,
        "name": "人物无敌",
        "path": "audio/tongyibuff",
        "volume": 1,
        "loop": false
    },
    "5003": {
        "id": 5003,
        "name": "人物加血",
        "path": "audio/tongyibuff",
        "volume": 1,
        "loop": false
    },
    "5004": {
        "id": 5004,
        "name": "冰冻怪物",
        "path": "audio/tongyibuff",
        "volume": 1,
        "loop": false
    },
    "5005": {
        "id": 5005,
        "name": "十字伤害",
        "path": "audio/flame",
        "volume": 1,
        "loop": false
    },
    "5006": {
        "id": 5006,
        "name": "双倍伤害",
        "path": "audio/tongyibuff",
        "volume": 1,
        "loop": false
    },
    "5007": {
        "id": 5007,
        "name": "多倍奖励",
        "path": "audio/tongyibuff",
        "volume": 1,
        "loop": false
    },
    "5008": {
        "id": 5008,
        "name": "满射速",
        "path": "audio/tongyibuff",
        "volume": 1,
        "loop": false
    }
});
    }
}