import { TConfig } from "./TConfig";


export interface TreasureCfg extends IConfig {
	id:number;
	type:number;
	awardCardinal:number;
	weight:number;
	icon:string;
	text:string;
	shine:number;
	next:number;
	roll:number;
}



export class TreasureCfgReader extends TConfig<TreasureCfg> {
    protected _name : string = "Treasure";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "type": 1,
        "awardCardinal": 2,
        "weight": 220,
        "icon": "gold_small",
        "text": "金币",
        "shine": 0,
        "next": 0,
        "roll": 0
    },
    "2": {
        "id": 2,
        "type": 1,
        "awardCardinal": 5,
        "weight": 50,
        "icon": "gold_small",
        "text": "金币",
        "shine": 0,
        "next": 0,
        "roll": 0
    },
    "3": {
        "id": 3,
        "type": 1,
        "awardCardinal": 8,
        "weight": 15,
        "icon": "gold_mid",
        "text": "金币",
        "shine": 0,
        "next": 0,
        "roll": 1
    },
    "4": {
        "id": 4,
        "type": 1,
        "awardCardinal": 10,
        "weight": 10,
        "icon": "gold_mid",
        "text": "金币",
        "shine": 0,
        "next": 0,
        "roll": 0
    },
    "5": {
        "id": 5,
        "type": 1,
        "awardCardinal": 15,
        "weight": 5,
        "icon": "gold_big",
        "text": "金币",
        "shine": 1,
        "next": 0,
        "roll": 1
    },
    "6": {
        "id": 6,
        "type": 5,
        "awardCardinal": 104,
        "weight": 0,
        "icon": "weapon104",
        "text": "回旋镖",
        "shine": 1,
        "next": 0,
        "roll": 1
    },
    "7": {
        "id": 7,
        "type": 2,
        "awardCardinal": 5,
        "weight": 200,
        "icon": "diamond_small",
        "text": "钻石",
        "shine": 0,
        "next": 0,
        "roll": 0
    },
    "8": {
        "id": 8,
        "type": 2,
        "awardCardinal": 15,
        "weight": 40,
        "icon": "diamond_small",
        "text": "钻石",
        "shine": 0,
        "next": 0,
        "roll": 0
    },
    "9": {
        "id": 9,
        "type": 2,
        "awardCardinal": 20,
        "weight": 15,
        "icon": "diamond_mid",
        "text": "钻石",
        "shine": 0,
        "next": 0,
        "roll": 1
    },
    "10": {
        "id": 10,
        "type": 2,
        "awardCardinal": 30,
        "weight": 10,
        "icon": "diamond_mid",
        "text": "钻石",
        "shine": 0,
        "next": 0,
        "roll": 0
    },
    "11": {
        "id": 11,
        "type": 2,
        "awardCardinal": 50,
        "weight": 5,
        "icon": "diamond_big",
        "text": "钻石",
        "shine": 1,
        "next": 0,
        "roll": 1
    },
    "12": {
        "id": 12,
        "type": 5,
        "awardCardinal": 106,
        "weight": 0,
        "icon": "weapon106",
        "text": "火箭筒",
        "shine": 1,
        "next": 0,
        "roll": 1
    },
    "13": {
        "id": 13,
        "type": 4,
        "awardCardinal": 2,
        "weight": 300,
        "icon": "chip",
        "text": "武器碎片",
        "shine": 0,
        "next": 0,
        "roll": 1
    },
    "14": {
        "id": 14,
        "type": 4,
        "awardCardinal": 3,
        "weight": 95,
        "icon": "chip",
        "text": "武器碎片",
        "shine": 0,
        "next": 0,
        "roll": 0
    },
    "15": {
        "id": 15,
        "type": 4,
        "awardCardinal": 5,
        "weight": 20,
        "icon": "chip",
        "text": "武器碎片",
        "shine": 0,
        "next": 0,
        "roll": 0
    },
    "16": {
        "id": 16,
        "type": 4,
        "awardCardinal": 10,
        "weight": 10,
        "icon": "chip",
        "text": "武器碎片",
        "shine": 0,
        "next": 0,
        "roll": 0
    },
    "17": {
        "id": 17,
        "type": 4,
        "awardCardinal": 15,
        "weight": 5,
        "icon": "chip",
        "text": "武器碎片",
        "shine": 1,
        "next": 0,
        "roll": 0
    },
    "18": {
        "id": 18,
        "type": 5,
        "awardCardinal": 107,
        "weight": 0,
        "icon": "weapon107",
        "text": "黄金ak47",
        "shine": 1,
        "next": 0,
        "roll": 1
    }
});
    }
}