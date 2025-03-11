import { TConfig } from "./TConfig";


export interface EventCfg extends IConfig {eventID:number;eventType:number;eventText:string;optionA:string;resultTextA:string;resultA:number[];resultATips:string;resultIconA:number[];advEffectA:number;EffectATips:string;optionB:string;resultTextB:string;resultB:number[];resultBTips:string;resultIconB:number[];advEffectB:number;EffectBTips:string;}



export class EventCfgReader extends TConfig<EventCfg> {
    protected _name : string = "Event";

}