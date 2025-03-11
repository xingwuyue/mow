import { TConfig } from "./TConfig";


export interface StrikeCfg extends IConfig {
	id:number;
	button:string;
	rewardType:number;
	shareCount:number;
	videoCount:number;
	diamondCount:number[];
	vipCount:number;
}



export class StrikeCfgReader extends TConfig<StrikeCfg> {
    protected _name : string = "Strike";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "button": "转盘按钮",
        "rewardType": 2,
        "shareCount": 9999,
        "videoCount": 2,
        "diamondCount": [
            0,
            0
        ],
        "vipCount": 0
    },
    "2": {
        "id": 2,
        "button": "结算三倍",
        "rewardType": 2,
        "shareCount": 9999,
        "videoCount": 2,
        "diamondCount": [
            0,
            0
        ],
        "vipCount": 0
    },
    "3": {
        "id": 3,
        "button": "计时三倍",
        "rewardType": 1,
        "shareCount": 2,
        "videoCount": 9999,
        "diamondCount": [
            0,
            0
        ],
        "vipCount": 0
    },
    "4": {
        "id": 4,
        "button": "签到",
        "rewardType": 2,
        "shareCount": 0,
        "videoCount": 1,
        "diamondCount": [
            0,
            0
        ],
        "vipCount": 0
    },
    "5": {
        "id": 5,
        "button": "复活",
        "rewardType": 5,
        "shareCount": 0,
        "videoCount": 999999999,
        "diamondCount": [
            9999,
            50
        ],
        "vipCount": 3
    }
});
    }
}