import { TConfig } from "./TConfig";


export interface GuideCfg extends IConfig {guideId:number;guideType:number;condition:object;nodeTag:number;tipsContent:string;tipsPos:number[];nextId:number;type:number;clickAnyClose:number;eventId:number;shape:number;rectSize:number[];lightSize:number[];arrowPos:number[];arrowDir:number;}



export class GuideCfgReader extends TConfig<GuideCfg> {
    protected _name : string = "Guide";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "guideId": 1,
        "guideType": 1,
        "condition": {
            "2": 1
        },
        "nodeTag": 10000,
        "tipsContent": "有新装备可佩带",
        "tipsPos": [
            -30,
            0
        ],
        "nextId": 2,
        "type": 0,
        "clickAnyClose": 0,
        "eventId": 0,
        "shape": 0,
        "rectSize": [
            0,
            0,
            0,
            0
        ],
        "lightSize": [
            0,
            0,
            0,
            0
        ],
        "arrowPos": [
            0,
            0
        ],
        "arrowDir": 1
    },
    "2": {
        "guideId": 2,
        "guideType": 1,
        "condition": {
            "2": 1
        },
        "nodeTag": 10001,
        "tipsContent": "点击新装备",
        "tipsPos": [
            0,
            0
        ],
        "nextId": 3,
        "type": 0,
        "clickAnyClose": 0,
        "eventId": 0,
        "shape": 0,
        "rectSize": [
            0,
            0,
            0,
            0
        ],
        "lightSize": [
            0,
            0,
            0,
            0
        ],
        "arrowPos": [
            0,
            0
        ],
        "arrowDir": 2
    },
    "3": {
        "guideId": 3,
        "guideType": 1,
        "condition": {
            "2": 1
        },
        "nodeTag": 10002,
        "tipsContent": "点击更换装备",
        "tipsPos": [
            0,
            0
        ],
        "nextId": 21,
        "type": 0,
        "clickAnyClose": 0,
        "eventId": 0,
        "shape": 0,
        "rectSize": [
            0,
            0,
            0,
            0
        ],
        "lightSize": [
            0,
            0,
            0,
            0
        ],
        "arrowPos": [
            0,
            0
        ],
        "arrowDir": 2
    },
    "21": {
        "guideId": 21,
        "guideType": 9,
        "condition": {
            "0": 0
        },
        "nodeTag": 10800,
        "tipsContent": "点击返回主页",
        "tipsPos": [
            0,
            0
        ],
        "nextId": 0,
        "type": 0,
        "clickAnyClose": 0,
        "eventId": 0,
        "shape": 0,
        "rectSize": [
            0,
            0,
            0,
            0
        ],
        "lightSize": [
            0,
            0,
            0,
            0
        ],
        "arrowPos": [
            0,
            0
        ],
        "arrowDir": 2
    }
});
    }
}