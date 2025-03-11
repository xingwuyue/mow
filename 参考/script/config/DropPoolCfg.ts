import { TConfig } from "./TConfig";


export interface DropPoolCfg extends IConfig {id:number;poolId:number;packId:number;type:number;goodsId:number;goodsNum:number;weight:number;}



export class DropPoolCfgReader extends TConfig<DropPoolCfg> {
    protected _name : string = "DropPool";

}