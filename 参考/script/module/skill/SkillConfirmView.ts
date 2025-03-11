import { MVC } from "../../framework/MVC";
import { AlertManager } from "../../alert/AlertManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Cfg } from "../../config/Cfg";
import { Manager } from "../../manager/Manager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillSelectView extends MVC.BaseView {

    @property(cc.Node)
    skillItems: cc.Node = null;

    @property(cc.Node)
    doubleChoose: cc.Node = null;

    public isSelected: boolean = false;
    public skillId: number;

    public changeListener(boo) {

    }

    public onOpen(args) {
        super.onOpen(args);
        this.isSelected = false;
        this.setInfo(args);
    }

    public setInfo(args) {
        this.skillId = args.skillId;
        this.doubleChoose.active = !!args.isDouble;
        this.updateSkill(args.skillId);
    }

    public onClose() {
        super.onClose();
        Manager.audio.playAudio(501);
        Notifier.send(ListenID.Fight_Pause, false);
    }

    public updateSkill(id) {
        let data = Cfg.Skill.get(id);
        let node = this.skillItems;
        let skillName = node.getChildByName("skillName").getComponent(cc.Label);
        skillName.string = data && data.skillName || "";
        let skillDesc = node.getChildByName("skillDesc").getComponent(cc.Label);
        skillDesc.string = data && data.skillDesc || "";
        let skillIcon = node.getChildByName("skillicon").getComponent(cc.Sprite)
        Manager.spAtlas.getSkillIcon(id).then(res => {
            skillIcon && (skillIcon.spriteFrame = res);
        });
    }

    public onDoubleChoose() {
        if (this.isSelected) return;
        this.isSelected = true;
        Notifier.send(ListenID.Fight_AddSkill, this.skillId, true);
        let skillname = Cfg.Skill.get(this.skillId).skillName;
        AlertManager.showNormalTips(`学会了 ${skillname} (双倍)`, MVC.eUILayer.Tips, 0.5);
        this.onClose();
        Notifier.send(ListenID.Log_Event, { event_name: `skill_${this.skillId}_double` });

    }


    public normalChoose(event, index: number) {
        if (this.isSelected) return;
        this.isSelected = true;
        Notifier.send(ListenID.Fight_AddSkill, this.skillId, false);
        let skillname = Cfg.Skill.get(this.skillId).skillName;
        AlertManager.showNormalTips(`学会了 ${skillname}`, MVC.eUILayer.Tips, 0.5);
        this.onClose();
    }
}
