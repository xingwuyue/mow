import { MVC } from "../../framework/MVC";
import { Cfg } from "../../config/Cfg";
import { Util } from "../../utils/Util";

export default class PersonModel extends MVC.BaseModel {

    private static _instance: PersonModel = null;
    public static cellPos = [
        cc.v2(-228, 95),
        cc.v2(230, 95),
        cc.v2(-228, -105),
        cc.v2(230, -105),
    ]
    public constructor() {
        super();
        if (PersonModel._instance == null) {
            PersonModel._instance = this;
        }
    }
    public reset(): void {

    }

    public static get getInstance(): PersonModel {
        if (PersonModel._instance == null) {
            PersonModel._instance = new PersonModel();
        }
        return PersonModel._instance;
    }

    private nickLen: number = 0;
    public getRandomNickName() {
        if (!this.nickLen) {
            Cfg.NickName.forEach(() => {
                this.nickLen++;
            })
        }
        let id = Util.random(1, this.nickLen);
        let data = Cfg.NickName.get(id);
        return data && data.nickName || "昵称";
    }

    public isSensitive(str:string) {
        let info = {isok:true, shieldName:""};
        let data = Cfg.Shield.getAll();
        for(let k in data){
            if(str.indexOf(data[k].shieldWord) != -1){
                data[k].shieldWord
                info.isok = false;
                info.shieldName = data[k].shieldWord;
                break;
            }
        }
        return info;
    }
}