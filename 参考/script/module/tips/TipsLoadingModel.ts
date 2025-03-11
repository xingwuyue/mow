import { MVC } from "../../framework/MVC";
import TipsLoadingVo from "./TipsLoadingVo";

export default class TipsLoadingModel extends MVC.BaseModel {
    private _vo: TipsLoadingVo = new TipsLoadingVo();

    getText(){
        return this._vo.text;
    }

    setText(text: string){
        this._vo.text = text;
    }

    getIsShowPoint(){
        return this._vo.showPoint;
    }

    setIsShowPoint(bool: boolean = true){
        this._vo.showPoint = bool;
    }

    reset(){}
}
