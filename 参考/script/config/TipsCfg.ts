import { TConfig } from "./TConfig";


export interface TipsCfg extends IConfig {
	id:number;
	tips:string;
}



export class TipsCfgReader extends TConfig<TipsCfg> {
    protected _name : string = "Tips";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "tips": "钻石!解锁武器!"
    },
    "2": {
        "id": 2,
        "tips": "找客服!领钻石!"
    },
    "3": {
        "id": 3,
        "tips": "走位要妙~回首掏!"
    },
    "4": {
        "id": 4,
        "tips": "走位!走位!"
    },
    "5": {
        "id": 5,
        "tips": "绕圈!绕圈!"
    },
    "6": {
        "id": 6,
        "tips": "升级!火力暴涨!"
    },
    "7": {
        "id": 7,
        "tips": "生命!存活更久!"
    },
    "8": {
        "id": 8,
        "tips": "南瓜头!受死!"
    }
});
    }
}