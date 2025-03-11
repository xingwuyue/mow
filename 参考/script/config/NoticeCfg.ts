import { TConfig } from "./TConfig";


export interface NoticeCfg extends IConfig {
	id:number;
	ver:string;
	text:string;
}



export class NoticeCfgReader extends TConfig<NoticeCfg> {
    protected _name : string = "Notice";

    public constructor() {
        super();
        this.initByMap({
    "1": {
        "id": 1,
        "ver": "1.2.6",
        "text": "欢迎回来，猎手!"
    }
});
    }
}