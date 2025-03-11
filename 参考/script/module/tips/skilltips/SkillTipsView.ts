import { MVC } from "../../../framework/MVC";
import { Manager } from "../../../manager/Manager";
import { Cfg } from "../../../config/Cfg";

export interface SkillTipsData {
    id: number
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillTipsView extends MVC.BaseView {
    @property(cc.Label)
    lblSkillName: cc.Label = null;

    @property(cc.Label)
    lblDesc: cc.Label = null;

    @property(cc.Sprite)
    imgSkillIcon: cc.Sprite = null;

    private _skillName: string = ``;
    private _desc: string = ``;
    private _skillID: number = 0;

    changeListener(){}

    onOpen(data: SkillTipsData){
        this.setInfo(data);
    }

    setInfo(data: SkillTipsData){
        this._skillID = data.id;
        let skillCfg = Cfg.Skill.get(this._skillID);
        if(skillCfg){
            this._skillName = skillCfg.skillName;
            this._desc = skillCfg.skillDesc;
        }
        this.onFlush();
    }

    onFlush(type: string = `all`){
        switch(type){
            case `all`: {
                this._updateLblSkillName();
                this._updateLblSkillDesc();
                this._updateImgSkillIcon();
                break;
            }
        }
    }

    private _updateLblSkillName(){
        this.lblSkillName.string = this._skillName;
    }

    private _updateLblSkillDesc(){
        this.lblDesc.string = this._desc;
    }

    private _updateImgSkillIcon(){
        Manager.spAtlas.getSkillIcon(this._skillID + ``).then((spFrame: cc.SpriteFrame) => {
            this.imgSkillIcon.spriteFrame = spFrame;
        });
    }
}
