import { TConfig } from "./TConfig";


export interface TaskCfg extends IConfig {id:number;type:number;desc:string;definition:number;task:number[];father:number;nextTask:number;weight:number;goldAward:number[];diamondAward:number[];powerAward:number[];equipAward:number[];url:number[];}



export class TaskCfgReader extends TConfig<TaskCfg> {
    protected _name : string = "Task";

}//weixin ： vip-v66666