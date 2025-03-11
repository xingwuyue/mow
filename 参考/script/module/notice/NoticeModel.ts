import { MVC } from "../../framework/MVC";
import NoticeVO from "./NoticeVO";

export default class NoticeModel extends MVC.BaseModel {
    private static _instance = null;

    private _vo: NoticeVO = new NoticeVO();

    static getInstance(){
        if(!this._instance){
            this._instance = new NoticeModel();
        }
        return this._instance;
    }
    reset(){

    }

    getText(){
        return this._vo.text;
    }

    setText(text: string){
        this._vo.text = text;
    }

    getVersion(){
        return this._vo.version;
    }

    setVersion(version: string){
        this._vo.version = version;
    }
}
