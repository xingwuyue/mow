import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import SkillModel from "./SkillModel";
import { UIManager } from "../../framework/UIManager";

/*
 * desc
 */
export class SkillController extends MVC.BaseController {
    private _model: SkillModel;
    public constructor() {
        super("SkillController");
        this._model = SkillModel.getInstance;
        this.changeListener(true);
    }

    public reset(): void {

    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Skill_OpenSelectView, this.onOpenSelectView, this);
        Notifier.changeListener(enable, ListenID.Skill_OpenConfirmView, this.onOpenConfirmView, this);
        //    Notifier.changeCall(enable, CallID.Scene_IsEnter, this.isEnter, this);
    }

    public onOpenSelectView(args) {
        UIManager.Open('ui/skill/SkillSelectView', MVC.eTransition.Scale, MVC.eUILayer.SubPopup,args);
    }

    public onOpenConfirmView(args) {
        UIManager.Open('ui/skill/SkillConfirmView', MVC.eTransition.Default, MVC.eUILayer.SubPopup, args);
    }
}