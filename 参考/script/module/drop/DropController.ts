import { MVC } from "../../framework/MVC";
import { DropModel } from "./DropModel";
import { Notifier } from "../../framework/Notifier";
import { CallID } from "../../CallID";
import { ListenID } from "../../ListenID";

export default class DropController extends MVC.BaseController {
    private _model: DropModel;
    public constructor() {
        super("DropController");
        this._model = DropModel.getInstance;
        this.changeListener(true);
    }

    protected changeListener(enable: boolean): void {
        Notifier.changeCall(enable, CallID.Drop_GetDropPoolRewardById, this.getDropPoolRewardById, this);
        Notifier.changeListener(enable, ListenID.Drop_InitDropPoolById, this.initDropPoolById, this);
    }

    public reset(): void {

    }

    public getDropPoolRewardById(id: number) {
        return this._model.getRewardByDropPoolId(id);
    }

    public initDropPoolById(id) {
        this._model.initDropPool(id);
    }
}
