import { TConfig } from "./TConfig";


export interface OffLineCfg extends IConfig {
	id:number;
	award:number;
}



export class OffLineCfgReader extends TConfig<OffLineCfg> {
    protected _name : string = "OffLine";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "award": 1
    },
    "2": {
        "id": 2,
        "award": 2
    },
    "3": {
        "id": 3,
        "award": 3
    },
    "4": {
        "id": 4,
        "award": 4
    },
    "5": {
        "id": 5,
        "award": 5
    },
    "6": {
        "id": 6,
        "award": 6
    }
});
    }
}