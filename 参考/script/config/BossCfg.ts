import { TConfig } from "./TConfig";


export interface BossCfg extends IConfig {id:number;bronRule:number[];bosstime:number;monCapaticy:number;normalDropId:number;openLevel:number;}



export class BossCfgReader extends TConfig<BossCfg> {
    protected _name : string = "Boss";

}