import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import TechnologyModel from "./TechnologyModel";
import { CallID } from "../../CallID";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TechnologyController extends MVC.BaseController {
    private _techModel: TechnologyModel = TechnologyModel.getInstance();
    constructor(){
        super(`TechnologyController`);
        this.changeListener(true);
    }

    changeListener(bool: boolean){
        Notifier.changeListener(bool, ListenID.Technoloty_OpenView, this.onOpenTechnologyView, this);
        Notifier.changeListener(bool, ListenID.Technoloty_CloseView, this.onCloseTechnologyView, this);
        Notifier.changeListener(bool, ListenID.Login_User, this.onUserLogin, this);
        Notifier.changeListener(bool, ListenID.TechnologyPoint_Change, this.onChangePoint, this);
        Notifier.changeListener(bool, ListenID.Game_UpdateGold, this.onChangeGold, this);
        Notifier.changeCall(bool, CallID.Techonlogy_GetAllProperty, this.getAllProperty, this);
    }

    onOpenTechnologyView(){
        UIManager.Open(Common_UIPath.TechnologyView, MVC.eTransition.Default, MVC.eUILayer.Panel);
        TechnologyModel.getInstance().notFirstOpenView = true;
    }

    onCloseTechnologyView(){
        UIManager.Close(Common_UIPath.TechnologyView);
    }

    onUserLogin(){
        this._techModel.updateCanUpgradeNum();
    }

    onChangePoint(){
        this._techModel.updateCanUpgradeNum();
    }

    onChangeGold(){
        this._techModel.updateCanUpgradeNum();
    }

    getAllProperty(){
        return this._techModel.getAllProperty();
    }
}
