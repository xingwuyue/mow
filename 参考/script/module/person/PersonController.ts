import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";

/*
 * desc
 */
export class PersonController extends MVC.BaseController {
    public constructor() {
        super("PersonController");
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Person_OpenCreateView, this.onOpenCreateView, this);
        Notifier.changeListener(enable, ListenID.Person_OpenView, this.onOpenPersonView, this);
        Notifier.changeListener(enable, ListenID.Person_OpenOtherInfoView, this.onOpenOtherInfoView, this);
        //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
    }

    public onOpenCreateView(callFunction) {
        UIManager.Open(Common_UIPath.PersonCreateView, MVC.eTransition.Default, MVC.eUILayer.Panel,callFunction);
    }

    public onOpenPersonView(){
        UIManager.Open(Common_UIPath.PersonView, MVC.eTransition.Default, MVC.eUILayer.Tips);
    }

    public onOpenOtherInfoView(args){
        UIManager.Open(Common_UIPath.PersonOtherInfo, MVC.eTransition.Default, MVC.eUILayer.Popup, args);
    }
}