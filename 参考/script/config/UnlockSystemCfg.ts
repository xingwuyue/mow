import { TConfig } from "./TConfig";


export interface UnlockSystemCfg extends IConfig {funId:number;unlockType:number;unlockLevel:number;name:string;}



export class UnlockSystemCfgReader extends TConfig<UnlockSystemCfg> {
    protected _name : string = "UnlockSystem";

}