import { MVC } from "../../framework/MVC";
import MemberVO from "./MemberVO";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MemberModel extends MVC.BaseModel {

    private _vo: MemberVO = new MemberVO();

    reset(){}

    getDiamondNum(){
        return this._vo.diamond;
    }

    setDiamondNum(value: number){
        this._vo.diamond = value;
    }

    getVideoDoubleNum(){
        return this._vo.videoDoubleNum;
    }

    setVideoDoubleNum(value: number){
        this._vo.videoDoubleNum = value;
    }

    getReliveNoAdventNum(){
        return this._vo.reliveNoAdventNum;
    }

    setReliveNoAdventNum(value: number){
        this._vo.reliveNoAdventNum = value;
    }

    getIsMember(){
        return this._vo.isMember;
    }

    setIsMember(value: boolean){
        this._vo.isMember = value;
    }

    getMemberStartTime(){
        return this._vo.memberStartTime;
    }

    setMemberStartTime(value: number){
        this._vo.memberStartTime = value;
    }
    getMemberEndTime(){
        return this._vo.memberEndTime;
    }

    setMemberEndTime(value: number){
        this._vo.memberEndTime = value;
    }
}
