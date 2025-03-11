import { MVC } from "../../framework/MVC";
import TipsLoadingModel from "./TipsLoadingModel";
import TipsLoadingController from "./TipsLoadingController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TipsLoadingView extends MVC.BaseView {
    @property(cc.Label)
    lblText: cc.Label = null;

    private _timeCount: number = 0;
    private _pNum: number = 1;
    private _data: TipsLoadingModel = null;

    onLoad(){
        // super.onLoad();
        // this._data = TipsLoadingController.getInstance().getData();
    }
    onOpen(){
        this._data = TipsLoadingController.getInstance().getData();
        this.onFlush();
    }

    setInfo(){
        this.onFlush();
    }

    changeListener(){}

    onFlush(type: string = `all`){
        switch(type){
            case `all`: {
                this._updateLblText();
                break;
            }
            case `text`: {
                this._updateLblText();
                break;
            }
        }
    }
    private _updateLblText(){
        if(this.lblText){
            let strP = this._data.getText();
            let isShowPoint = this._data.getIsShowPoint();
            if(isShowPoint){
                for(let i = 0; i < this._pNum; ++i){
                    strP += ".";
                }
            }
            this.lblText.string = strP;
        }
    }
    
    update(dt: number){
        this._timeCount += dt;
        if(this._timeCount >= 0.5){
            this.onFlush(`text`);
            this._timeCount = 0;
            this._pNum ++;
            if(this._pNum >= 4){
                this._pNum = 1;
            }
        }
    }
}
