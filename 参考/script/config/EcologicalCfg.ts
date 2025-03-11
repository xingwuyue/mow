import { TConfig } from "./TConfig";


export interface EcologicalCfg extends IConfig {ID:number;name:string;desc:string;unlockChapters:number;specialTimePrice:number[];timePrice:number;goldAward:number[];diamondAward:number[];powerAward:number[];scienceAward:number[];expAward:number[];}



export class EcologicalCfgReader extends TConfig<EcologicalCfg> {
    protected _name : string = "Ecological";
}