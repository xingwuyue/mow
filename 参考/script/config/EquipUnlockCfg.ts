import { TConfig } from "./TConfig";


export interface EquipUnlockCfg extends IConfig {id:number;unlock:number;unlockAward:number[];name:string;}



export class EquipUnlockCfgReader extends TConfig<EquipUnlockCfg> {
    protected _name : string = "EquipUnlock";


}