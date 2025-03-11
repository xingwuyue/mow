import { MVC } from "../../framework/MVC";
export default class CheatController extends MVC.BaseController {
    public constructor() {
        super("CheatController");
        this.changeListener(true);
    }

    protected changeListener(enable: boolean): void {
        // Notifier.changeListener(enable, NotifyID.Bag_RequestUpgrade, this.handlerGoodsUpdate, this);
    }
}
