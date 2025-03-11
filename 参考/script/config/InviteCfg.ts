import { TConfig } from "./TConfig";


export interface InviteCfg extends IConfig {
	id:number;
	awardType:number;
	awardCount:number;
}



export class InviteCfgReader extends TConfig<InviteCfg> {
    protected _name : string = "Invite";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "awardType": 2,
        "awardCount": 200
    },
    "2": {
        "id": 2,
        "awardType": 2,
        "awardCount": 200
    },
    "3": {
        "id": 3,
        "awardType": 2,
        "awardCount": 200
    },
    "4": {
        "id": 4,
        "awardType": 2,
        "awardCount": 200
    },
    "5": {
        "id": 5,
        "awardType": 2,
        "awardCount": 200
    },
    "6": {
        "id": 6,
        "awardType": 2,
        "awardCount": 200
    },
    "7": {
        "id": 7,
        "awardType": 2,
        "awardCount": 200
    },
    "8": {
        "id": 8,
        "awardType": 2,
        "awardCount": 200
    },
    "9": {
        "id": 9,
        "awardType": 2,
        "awardCount": 200
    },
    "10": {
        "id": 10,
        "awardType": 2,
        "awardCount": 200
    },
    "11": {
        "id": 11,
        "awardType": 2,
        "awardCount": 200
    },
    "12": {
        "id": 12,
        "awardType": 2,
        "awardCount": 200
    },
    "13": {
        "id": 13,
        "awardType": 2,
        "awardCount": 200
    },
    "14": {
        "id": 14,
        "awardType": 2,
        "awardCount": 200
    },
    "15": {
        "id": 15,
        "awardType": 2,
        "awardCount": 200
    },
    "16": {
        "id": 16,
        "awardType": 2,
        "awardCount": 200
    },
    "17": {
        "id": 17,
        "awardType": 2,
        "awardCount": 200
    },
    "18": {
        "id": 18,
        "awardType": 2,
        "awardCount": 200
    },
    "19": {
        "id": 19,
        "awardType": 2,
        "awardCount": 200
    },
    "20": {
        "id": 20,
        "awardType": 2,
        "awardCount": 200
    },
    "21": {
        "id": 21,
        "awardType": 2,
        "awardCount": 200
    },
    "22": {
        "id": 22,
        "awardType": 2,
        "awardCount": 200
    },
    "23": {
        "id": 23,
        "awardType": 2,
        "awardCount": 200
    },
    "24": {
        "id": 24,
        "awardType": 2,
        "awardCount": 200
    },
    "25": {
        "id": 25,
        "awardType": 2,
        "awardCount": 200
    },
    "26": {
        "id": 26,
        "awardType": 2,
        "awardCount": 200
    },
    "27": {
        "id": 27,
        "awardType": 2,
        "awardCount": 200
    },
    "28": {
        "id": 28,
        "awardType": 2,
        "awardCount": 200
    },
    "29": {
        "id": 29,
        "awardType": 2,
        "awardCount": 200
    },
    "30": {
        "id": 30,
        "awardType": 2,
        "awardCount": 200
    },
    "31": {
        "id": 31,
        "awardType": 2,
        "awardCount": 200
    },
    "32": {
        "id": 32,
        "awardType": 2,
        "awardCount": 200
    },
    "33": {
        "id": 33,
        "awardType": 2,
        "awardCount": 200
    },
    "34": {
        "id": 34,
        "awardType": 2,
        "awardCount": 200
    },
    "35": {
        "id": 35,
        "awardType": 2,
        "awardCount": 200
    },
    "36": {
        "id": 36,
        "awardType": 2,
        "awardCount": 200
    },
    "37": {
        "id": 37,
        "awardType": 2,
        "awardCount": 200
    },
    "38": {
        "id": 38,
        "awardType": 2,
        "awardCount": 200
    },
    "39": {
        "id": 39,
        "awardType": 2,
        "awardCount": 200
    },
    "40": {
        "id": 40,
        "awardType": 2,
        "awardCount": 200
    },
    "41": {
        "id": 41,
        "awardType": 2,
        "awardCount": 200
    },
    "42": {
        "id": 42,
        "awardType": 2,
        "awardCount": 200
    },
    "43": {
        "id": 43,
        "awardType": 2,
        "awardCount": 200
    },
    "44": {
        "id": 44,
        "awardType": 2,
        "awardCount": 200
    },
    "45": {
        "id": 45,
        "awardType": 2,
        "awardCount": 200
    },
    "46": {
        "id": 46,
        "awardType": 2,
        "awardCount": 200
    },
    "47": {
        "id": 47,
        "awardType": 2,
        "awardCount": 200
    },
    "48": {
        "id": 48,
        "awardType": 2,
        "awardCount": 200
    },
    "49": {
        "id": 49,
        "awardType": 2,
        "awardCount": 200
    },
    "50": {
        "id": 50,
        "awardType": 2,
        "awardCount": 200
    }
});
    }
}