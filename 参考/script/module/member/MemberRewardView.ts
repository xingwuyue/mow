import { MVC } from "../../framework/MVC";
import { UIManager } from "../../framework/UIManager";
import { AlertManager } from "../../alert/AlertManager";
import { GameVoManager } from "../../manager/GameVoManager";
import { Common_UIPath } from "../../common/Common_Define";
import MemberModel from "./MemberModel";
import MemberController from "./MemberController";
import { Time } from "../../framework/Time";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MemberRewardView extends MVC.BaseView {
    @property(cc.Label)
    lblNum: cc.Label = null;

    private _data: MemberModel = null;
    changeListener(){}
    
    onLoad(){
        this._data = MemberController.getInstance().getData();
    }
    onEnable(){
        this.onFlush();
    }

    setInfo(){
        this.onFlush();
    }

    onBtnReward(){
        MemberController.getInstance().onReward();
    }

    onFlush(type: string = `all`){
        switch(type){
            case `all`: {
                this._updateLblNum();
                break;
            }
        }
    }

    private _updateLblNum(){
        let diamond = this._data.getDiamondNum();
        if(this.lblNum){
            this.lblNum.string = "x" + diamond;
        }
    }
}
