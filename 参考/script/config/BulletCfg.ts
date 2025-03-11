import { TConfig } from "./TConfig";


export interface BulletCfg extends IConfig {id:number;name:string;bulletPath:string;}



export class BulletCfgReader extends TConfig<BulletCfg> {
    protected _name : string = "Bullet";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "name": "火箭筒子弹",
        "bulletPath": "bullet/bullet1"
    },
    "2": {
        "id": 2,
        "name": "子弹",
        "bulletPath": "bullet/bullet2"
    },
    "3": {
        "id": 3,
        "name": "103子弹",
        "bulletPath": "bullet/bullet3"
    },
    "4": {
        "id": 4,
        "name": "104回旋镖武器",
        "bulletPath": "bullet/bullet4"
    },
    "5": {
        "id": 5,
        "name": "子弹",
        "bulletPath": "bullet/bullet5"
    },
    "6": {
        "id": 6,
        "name": "怪物旋转子弹",
        "bulletPath": "bullet/bullet6"
    },
    "7": {
        "id": 7,
        "name": "怪物多发子弹",
        "bulletPath": "bullet/bullet7"
    },
    "8": {
        "id": 8,
        "name": "黄金ak子弹",
        "bulletPath": "bullet/bullet8"
    },
    "9": {
        "id": 9,
        "name": "子弹",
        "bulletPath": "bullet/bullet9"
    },
    "11": {
        "id": 11,
        "name": "子弹",
        "bulletPath": "bullet/bullet11"
    },
    "12": {
        "id": 12,
        "name": "子弹",
        "bulletPath": "bullet/bullet12"
    },
    "17": {
        "id": 17,
        "name": "子弹",
        "bulletPath": "bullet/bullet17"
    },
    "20": {
        "id": 20,
        "name": "子弹",
        "bulletPath": "bullet/bullet20"
    },
    "21": {
        "id": 21,
        "name": "螺旋子弹",
        "bulletPath": "bullet/bullet21"
    },
    "22": {
        "id": 22,
        "name": "跟踪子弹",
        "bulletPath": "bullet/bullet22"
    },
    "23": {
        "id": 23,
        "name": "小怪蝙蝠子弹",
        "bulletPath": "bullet/bullet23"
    },
    "25": {
        "id": 25,
        "name": "大子弹",
        "bulletPath": "bullet/bullet25"
    },
    "26": {
        "id": 26,
        "name": "激光子弹",
        "bulletPath": "bullet/bullet26"
    },
    "27": {
        "id": 27,
        "name": "boss树叶子弹",
        "bulletPath": "bullet/bullet27"
    },
    "28": {
        "id": 28,
        "name": "石头怪物子弹",
        "bulletPath": "bullet/bullet28"
    },
    "29": {
        "id": 29,
        "name": "boss仙人掌子弹",
        "bulletPath": "bullet/bullet29"
    },
    "30": {
        "id": 30,
        "name": "武器子弹环",
        "bulletPath": "bullet/bullet30"
    },
    "31": {
        "id": 31,
        "name": "弹弹乐子弹",
        "bulletPath": "bullet/bullet31"
    },
    "32": {
        "id": 32,
        "name": "黑洞子弹",
        "bulletPath": "bullet/bullet32"
    },
    "33": {
        "id": 33,
        "name": "微型冲锋枪大招",
        "bulletPath": "bullet/bullet33"
    },
    "34": {
        "id": 34,
        "name": "冲锋枪大招",
        "bulletPath": "bullet/bullet34"
    },
    "35": {
        "id": 35,
        "name": "光环",
        "bulletPath": "bullet/bullet35"
    },
    "36": {
        "id": 36,
        "name": "阵列枪",
        "bulletPath": "bullet/bullet36"
    },
    "37": {
        "id": 37,
        "name": "烟火枪",
        "bulletPath": "bullet/bullet37"
    },
    "38": {
        "id": 38,
        "name": "弹弹乐",
        "bulletPath": "bullet/bullet38"
    },
    "39": {
        "id": 39,
        "name": "黑洞大招",
        "bulletPath": "bullet/bullet39"
    },
    "40": {
        "id": 40,
        "name": "火球",
        "bulletPath": "bullet/bullet40"
    },
    "43": {
        "id": 43,
        "name": "紫色子弹",
        "bulletPath": "bullet/bullet43"
    },
    "44": {
        "id": 44,
        "name": "小拖尾子弹",
        "bulletPath": "bullet/bullet44"
    },
    "45": {
        "id": 45,
        "name": "激光子弹",
        "bulletPath": "bullet/bullet45"
    },
    "47": {
        "id": 47,
        "name": "激光枪子弹",
        "bulletPath": "bullet/bullet47"
    }
});
    }
}