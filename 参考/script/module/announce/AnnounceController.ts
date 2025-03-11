import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import AnnounceModel from "./AnnounceModel";
import NetAdapter from "../../adpapter/NetAdapter";
import { GameVoManager } from "../../manager/GameVoManager";
import { GameFunID } from "../../common/Common_Define";
import { Cfg } from "../../config/Cfg";

/*
 * desc
 */
export class AnnounceController extends MVC.BaseController {
    private _model: AnnounceModel;
    public constructor() {
        super("AnnounceController");
        this._model = AnnounceModel.getInstance;
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, ListenID.On_Open_Menu, this.onOpenMenu, this);
        Notifier.changeListener(enable, ListenID.MainDrawClose, this.onOpenMenu, this);
        Notifier.changeListener(enable, ListenID.Announce_LogStartNum, this.logStartNum, this);
        Notifier.changeListener(enable, ListenID.Announce_AddMessage, this.addAnnounce, this);
        //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
    }

    public onOpenMenu() {
        if (GameVoManager.getInstance.myUserVo.topLevel < 10) return;
        let str = this._model.popAnnounce();
        if (str) {
            Notifier.send(ListenID.Menu_ShowAnnounce, str)
        } else {
            if (this._model.startNum >= 2) {
                this._model.startNum = 0;
                this.getAnnounceAsync((annstr) => {
                    Notifier.send(ListenID.Menu_ShowAnnounce, annstr);
                });
            }
        }
    }

    public logStartNum(num) {
        this._model.startNum += num;
    }

    public getAnnounceAsync(callback) {
        let name = GameVoManager.getInstance.myUserVo.nickName;
        NetAdapter.getRandomNickName().then(res => {
            name = res && res.data && res.data.nick_name;
            let funid = this._model.getFunIDRandom();
            let equipname = "";
            if (funid == GameFunID.MainDraw) {
                let equipdata = Cfg.Equip.get(99999);
                if (equipdata) {
                    equipname = equipdata.name;
                }
            } else {
                equipname = this._model.getpureEquipNameRandom();
            }
            let str = this._model.serializeMessage(name, funid, equipname, true);
            callback && callback(str);
        });
    }

    public addAnnounce(name, funid, equipname) {
        let str = this._model.serializeMessage(name, funid, equipname);
        this._model.addAnnounce(str);
    }
}