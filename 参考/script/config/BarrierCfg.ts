import { TConfig } from "./TConfig";


export interface BarrierCfg extends IConfig {id:number;bronRule:number[];firstDropId?:number;normalDropId:number;monCapaticy:number;attackExp:number[];eventID:number[];}



export class BarrierCfgReader extends TConfig<BarrierCfg> {
    protected _name : string = "Barrier";

}