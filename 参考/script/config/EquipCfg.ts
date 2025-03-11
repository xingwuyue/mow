import { TConfig } from "./TConfig";


export interface EquipCfg extends IConfig {id:number;name:string;weaponId:number;part:number;level:number;quality:number;property:number[];recycleGold:number;resIcon:string;}



export class EquipCfgReader extends TConfig<EquipCfg> {
    protected _name : string = "Equip";

}