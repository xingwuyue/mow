import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { CallID } from "../../CallID";
import EventModel from "./EventModel";
import { UIManager } from "../../framework/UIManager";

/*
 * desc
 */
export class EventController extends MVC.BaseController {
    public constructor() {
        super("EventController");
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        //    Notifier.changeListener(enable, ListenID.Scene_AskSwitch, this.onAskSwitch, this);
        //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
        Notifier.changeCall(enable, CallID.Event_GetNotiggerList, this.getNotiggerList, this);
        Notifier.changeListener(enable, ListenID.Fight_Start, this.gamestart, this);
        Notifier.changeListener(enable, ListenID.Fight_End, this.gamestart, this);
        Notifier.changeListener(enable, ListenID.Event_OpenView, this.onOpenEventView, this);
    }

    public getNotiggerList(list) {
        return EventModel.getInstance.getNoTiggerIdList(list);
    }
    public gamestart() {
        EventModel.getInstance.clearTiggerIdList();
    }

    public onOpenEventView(args) {
        UIManager.Open("ui/event/EventView", MVC.eTransition.Scale, MVC.eUILayer.SubPopup, args);
    }
}