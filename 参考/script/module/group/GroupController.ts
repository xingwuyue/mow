import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";

/*
 * desc
 */
export class GroupController extends MVC.BaseController {
    public constructor() {
        super("GroupController");
        this.changeListener(true);
    }

    public reset() : void {

    }

    protected changeListener(enable : boolean) : void {
    //    Notifier.changeListener(enable, ListenID.Scene_AskSwitch, this.onAskSwitch, this);
    //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
    }
}