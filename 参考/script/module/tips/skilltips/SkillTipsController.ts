import { MVC } from "../../../framework/MVC";
import { Notifier } from "../../../framework/Notifier";
import { ListenID } from "../../../ListenID";
import { UIManager } from "../../../framework/UIManager";
import { SkillTipsData } from "./SkillTipsView";
import { Common_UIPath } from "../../../common/Common_Define";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillTipsController extends MVC.BaseController {
    constructor(){
        super(`SkillTipsController`);
        this.rigisterEventListener(true);
    }
    rigisterEventListener(bool: boolean){
        Notifier.changeListener(bool, ListenID.SKillTips_Open, this.onSkillTipsOpen, this);
    }

    onSkillTipsOpen(data: SkillTipsData){
        UIManager.Open(Common_UIPath.SkillTipsView, null, MVC.eUILayer.Tips, data);
    }
}
