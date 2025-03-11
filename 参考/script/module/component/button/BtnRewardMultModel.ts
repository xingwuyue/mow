import { MVC } from "../../../framework/MVC";
import BtnRewardMultVO from "./BtnRewardMultVO";

export default class BtnRewardMultModel extends MVC.BaseModel {
    private static _instance: BtnRewardMultModel = null;

    private _vo: BtnRewardMultVO = new BtnRewardMultVO();

    static getInstance(){
        if(!this._instance){
            this._instance = new BtnRewardMultModel();
        }
        return this._instance;
    }

    reset(){

    }

    getRewardType(){
        return this._vo.rewardType;
    }

    setRewardType(value: number){
        this._vo.rewardType = value;
    }

    getGold(){
        return this._vo.gold;
    }

    setGold(value: number){
        this._vo.gold = value;
    }

    getMultNum(){
        return this._vo.multNum;
    }

    setMultNum(value: number){
        this._vo.multNum = value;
    }

    getIsOpenDrawView(){
        return this._vo.isOpenDrawView;
    }

    setIsOpenDrawView(value: boolean){
        this._vo.isOpenDrawView = value;
    }

    getIsRewardState(){
        return this._vo.isRewardState;
    }

    setIsRewardState(value: boolean){
        this._vo.isRewardState = value;
    }

    getCurConfig(){
        return this._vo.curConfig;
    }

    setCurConfig(config: any){
        this._vo.curConfig = config;
    }

    getVipCount(){
        return this._vo.vipCount;
    }

    setVipCount(value: number){
        this._vo.vipCount = value;
    }
}
