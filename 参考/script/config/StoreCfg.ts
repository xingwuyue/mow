import { TConfig } from "./TConfig";


export interface StoreCfg extends IConfig {id:number;name:string;type:number;commodity:number[];pay:number;advPrice:number;advDiscount:number;diamondPrice:number;diamondDiscount:number;frequency:number;freeTime:number;firstAward:number;cashPrice:number;}



export class StoreCfgReader extends TConfig<StoreCfg> {
    protected _name : string = "Store";

}