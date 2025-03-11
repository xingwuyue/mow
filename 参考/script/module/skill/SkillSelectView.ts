import { MVC } from "../../framework/MVC";
import { AlertManager } from "../../alert/AlertManager";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import SkillModel from "./SkillModel";
import { Cfg } from "../../config/Cfg";
import { Manager } from "../../manager/Manager";
const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillSelectView extends MVC.BaseView {

    @property([cc.Node])
    skillItems: cc.Node[] = [];

    @property(cc.Node)
    btnRechoose: cc.Node = null;

    @property(cc.Node)
    btnAll: cc.Node = null;

    public isSelected: boolean = false;
    public isfirst: boolean = false;
    public skillIds: number[] = [];

    public changeListener(boo) {

    }

    public onOpen(args) {
        super.onOpen(args);
        this.isfirst = args && args.isfirst;
        Notifier.send(ListenID.Fight_Pause, true);
        this.isSelected = false;
        this.setInfo(args);
    }

    public setInfo(args) {
        this.randomSkill();
        this.btnAll.active = this.isfirst;
        this.btnRechoose.active = !this.isfirst;
    }

    public onClose() {
        super.onClose();
    }

    public randomSkill() {
        this.skillIds = SkillModel.getInstance.randomSkill(3, this.isfirst);
        for (let i = 0; i < this.skillItems.length; i++) {
            this.skillItems[i].active = !!this.skillIds[i];
            this.updateSkill(i, this.skillIds[i] || 0);
        }
    }

    public updateSkill(index, id) {
        let data = Cfg.Skill.get(id);
        if (!data) return;
        let node = this.skillItems[index];
        let skillName = node.getChildByName("skillName").getComponent(cc.Label);
        skillName.string = data && data.skillName || "";
        let skillDesc = node.getChildByName("skillDesc").getComponent(cc.Label);
        skillDesc.string = data && data.skillDesc || "";
        let skillIcon = node.getChildByName("skillicon").getComponent(cc.Sprite)
        Manager.spAtlas.getSkillIcon(id).then(res => {
            skillIcon && (skillIcon.spriteFrame = res);
        });
    }

    public onReChoose() {
        this.btnRechoose.active = false;
        this.randomSkill();
        Notifier.send(ListenID.Log_Event, { event_name: "skill_reelect_video" });
        AlertManager.showNormalTips("筛选成功");
    }

    public onChooseAll() {
        this.btnRechoose.active = false;
        Notifier.send(ListenID.Fight_Pause, false);
        for (let i = 0; i < this.skillIds.length; i++) {
            Notifier.send(ListenID.Fight_AddSkill, this.skillIds[i], false);
            let skillname = Cfg.Skill.get(this.skillIds[i]).skillName;
            setTimeout(() => {
                AlertManager.showNormalTips(`学会了 ${skillname}`, MVC.eUILayer.Tips, 0.5);
            }, i * 500);
        }
        Notifier.send(ListenID.Log_Event, { event_name: "skill_checkAll_video" });
        this.onClose(); this.btnRechoose.active = false;
        Notifier.send(ListenID.Fight_Pause, false);
        for (let i = 0; i < this.skillIds.length; i++) {
            Notifier.send(ListenID.Fight_AddSkill, this.skillIds[i], false);
            let skillname = Cfg.Skill.get(this.skillIds[i]).skillName;
            setTimeout(() => {
                AlertManager.showNormalTips(`学会了 ${skillname}`, MVC.eUILayer.Tips, 0.5);
            }, i * 500);
        }
        Notifier.send(ListenID.Log_Event, { event_name: "skill_checkAll_video" });
        this.onClose();
    }


    public touchEnd(event, index: number) {
        if (this.isSelected) return;
        this.isSelected = true;
        let skillId = this.skillIds[index];
        let isDouble = false;
        let skilldata = Cfg.Skill.get(skillId);
        if (skilldata) {
            isDouble = !!skilldata.isDouble;
        }
        Manager.audio.playAudio(501);
        this.onClose();
        if (!isDouble) {
            Notifier.send(ListenID.Fight_AddSkill, skillId, false);
            let skillname = Cfg.Skill.get(skillId).skillName;
            AlertManager.showNormalTips(`学会了 ${skillname}`, MVC.eUILayer.Tips, 0.5);
            Notifier.send(ListenID.Fight_Pause, false);
        } else {
            Notifier.send(ListenID.Skill_OpenConfirmView, { skillId, isDouble });
        }
    }
}
