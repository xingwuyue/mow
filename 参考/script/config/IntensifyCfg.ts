import { TConfig } from "./TConfig";


export interface IntensifyCfg extends IConfig {id:number;weaponNerve:number[];weaponIntensifyGold:number;weaponIntensifyUnlock:number;armorNerve:number[];armorIntensifyGold:number;armorIntensifyUnlock:number;muzzleNerve:number[];muzzleIntensifyGold:number;muzzleIntensifyUnlock:number;pendantNerve:number[];pendantIntensifyGold:number;pendantIntensifyUnlock:number;}



export class IntensifyCfgReader extends TConfig<IntensifyCfg> {
    protected _name : string = "Intensify";
}