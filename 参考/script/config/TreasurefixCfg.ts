import { TConfig } from "./TConfig";


export interface TreasurefixCfg extends IConfig {
	id:number;
	type:number;
	awardCardinal:number;
	icon:string;
	text:string;
}



export class TreasurefixCfgReader extends TConfig<TreasurefixCfg> {
    protected _name : string = "Treasurefix";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "type": 4,
        "awardCardinal": 10,
        "icon": "chip",
        "text": "武器碎片"
    },
    "2": {
        "id": 2,
        "type": 1,
        "awardCardinal": 5,
        "icon": "gold_small",
        "text": "金币"
    },
    "3": {
        "id": 3,
        "type": 4,
        "awardCardinal": 5,
        "icon": "chip",
        "text": "武器碎片"
    },
    "4": {
        "id": 4,
        "type": 4,
        "awardCardinal": 2,
        "icon": "chip",
        "text": "武器碎片"
    },
    "5": {
        "id": 5,
        "type": 1,
        "awardCardinal": 5,
        "icon": "gold_small",
        "text": "金币"
    }
});
    }
}