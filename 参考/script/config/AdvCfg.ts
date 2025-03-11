import { TConfig } from "./TConfig";


export interface AdvCfg extends IConfig {
	id:number;
	advType:string;
	advID:string;
	adAppID:string;
	aid:string;
}



export class AdvCfgReader extends TConfig<AdvCfg> {
    protected _name : string = "Adv";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "advType": "1001",
        "advID": "925954392",
        "adAppID": "5025954",
        "aid": "163454"
    }
});
    }
}