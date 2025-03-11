import { TConfig } from "./TConfig";


export interface SignCfg extends IConfig {id:number;day:string;awardType:number;awardCount:number;awardID:number;extraType:number;extraCount:number;extraTips:string;}



export class SignCfgReader extends TConfig<SignCfg> {
    protected _name : string = "Sign";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "day": "第1天",
        "awardType": 0,
        "awardCount": 300,
        "awardID": 0,
        "extraType": 0,
        "extraCount": 300,
        "extraTips": "300金币"
    },
    "2": {
        "id": 2,
        "day": "第2天",
        "awardType": 0,
        "awardCount": 500,
        "awardID": 0,
        "extraType": 0,
        "extraCount": 500,
        "extraTips": "500金币"
    },
    "3": {
        "id": 3,
        "day": "第3天",
        "awardType": 0,
        "awardCount": 1000,
        "awardID": 0,
        "extraType": 0,
        "extraCount": 1000,
        "extraTips": "1k金币"
    },
    "4": {
        "id": 4,
        "day": "第4天",
        "awardType": 0,
        "awardCount": 1500,
        "awardID": 0,
        "extraType": 0,
        "extraCount": 1500,
        "extraTips": "1.5k金币"
    },
    "5": {
        "id": 5,
        "day": "第5天",
        "awardType": 0,
        "awardCount": 2000,
        "awardID": 0,
        "extraType": 0,
        "extraCount": 2000,
        "extraTips": "2k金币"
    },
    "6": {
        "id": 6,
        "day": "第6天",
        "awardType": 0,
        "awardCount": 2500,
        "awardID": 0,
        "extraType": 0,
        "extraCount": 2500,
        "extraTips": "1k金币"
    },
    "7": {
        "id": 7,
        "day": "第7天",
        "awardType": 0,
        "awardCount": 3000,
        "awardID": 0,
        "extraType": 0,
        "extraCount": 3000,
        "extraTips": "3k金币"
    },
    "8": {
        "id": 8,
        "day": "第8天",
        "awardType": 3,
        "awardCount": 20,
        "awardID": 0,
        "extraType": 3,
        "extraCount": 20,
        "extraTips": "20钻石"
    },
    "9": {
        "id": 9,
        "day": "第9天",
        "awardType": 3,
        "awardCount": 20,
        "awardID": 0,
        "extraType": 3,
        "extraCount": 20,
        "extraTips": "20钻石"
    },
    "10": {
        "id": 10,
        "day": "第10天",
        "awardType": 3,
        "awardCount": 30,
        "awardID": 0,
        "extraType": 3,
        "extraCount": 30,
        "extraTips": "30钻石"
    },
    "11": {
        "id": 11,
        "day": "第11天",
        "awardType": 3,
        "awardCount": 30,
        "awardID": 0,
        "extraType": 3,
        "extraCount": 30,
        "extraTips": "30钻石"
    },
    "12": {
        "id": 12,
        "day": "第12天",
        "awardType": 3,
        "awardCount": 50,
        "awardID": 0,
        "extraType": 3,
        "extraCount": 50,
        "extraTips": "50钻石"
    },
    "13": {
        "id": 13,
        "day": "第13天",
        "awardType": 3,
        "awardCount": 50,
        "awardID": 0,
        "extraType": 3,
        "extraCount": 50,
        "extraTips": "50钻石"
    },
    "14": {
        "id": 14,
        "day": "第14天",
        "awardType": 3,
        "awardCount": 100,
        "awardID": 0,
        "extraType": 3,
        "extraCount": 100,
        "extraTips": "100钻石"
    }
});
    }
}