import { MVC } from "../../framework/MVC";
import DrawVO from "./DrawVO";
import { Cfg } from "../../config/Cfg";

declare interface Map<T> {
    [key:string]: T;
}

export default class DrawModel extends MVC.BaseModel {
    private static _instance = null;

    private _vo: DrawVO = new DrawVO();

    private _rewardInfo: any;

    constructor(){
        super();
        DrawModel._instance = this;
    }

    static getInstance(){
        if(null == DrawModel._instance){
            new DrawModel();
        }
        return DrawModel._instance;
    }

    reset(){

    }

    getMultNum(){
        return this._vo.mult;
    }

    setMultNum(value: number){
        this._vo.mult = value;
    }

    getAngle(){
        return this._vo.angle;
    }

    setAngle(value: number){
        this._vo.angle = value;
    }

    getRewardConfig(){
        return Cfg.Dial.getAll();
    }

    getRewardInfo(){
        return this._rewardInfo;
    }

    setRewardInfo(info: any){
        this._rewardInfo = info;
    }

    getDrawType(){
        return this._vo.drawType;
    }

    setDrawType(value: number){
        this._vo.drawType = value;
    }
}
