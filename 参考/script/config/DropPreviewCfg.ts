import { TConfig } from "./TConfig";


export interface DropPreviewCfg extends IConfig {id:number;unlockPreview:number[];dropPreview:number[];}



export class DropPreviewCfgReader extends TConfig<DropPreviewCfg> {
    protected _name : string = "DropPreview";

}