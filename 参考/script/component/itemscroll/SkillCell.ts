import BaseCell, { BaseCellData } from "./BaseCell";
import { Manager } from "../../manager/Manager";
import { Cfg } from "../../config/Cfg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SkillCell extends BaseCell {
    /** 技能图标 */
    @property(cc.Sprite)
    imgIcon: cc.Sprite = null;

    /** 技能名字 */
    @property(cc.Label)
    lblSkillName: cc.Label = null;

    /** 动态加载方法 */
    private getItemSpriteFrame = Manager.spAtlas.getSkillIcon.bind(Manager.spAtlas);

    setItemInfo(data: BaseCellData){
        super.setItemInfo(data);
        this._ID = 0;
        if (data.info){
            this._ID = data.info.id;
            if (data.info.clickHandler)
                this.setClickHandler(data.info.clickHandler);
        }
        this.onFlush();
    }

    onFlush(type: string = `all`) {
        switch (type) {
            case `all`: {
                this._updateSkillIcon();
                this._updateLblSkillName();
                break;
            }
        }
    }

    private _updateSkillIcon() {
        this.getItemSpriteFrame(this._ID).then((spframe: cc.SpriteFrame) => {
            this.imgIcon.spriteFrame = spframe;
        });
    }

    private _updateLblSkillName(){
        let skillCfg = Cfg.Skill.get(this._ID);
        if(skillCfg){
            this.lblSkillName.string = skillCfg.skillName;
        }
    }
}
