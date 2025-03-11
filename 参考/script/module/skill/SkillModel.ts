import { MVC } from "../../framework/MVC";
import FightModel from "../fight/FightModel";
import { Cfg } from "../../config/Cfg";
import { Util } from "../../utils/Util";
import { RoleManager } from "../../manager/RoleManager";
import { Notifier } from "../../framework/Notifier";
import { CallID } from "../../CallID";

export default class SkillModel extends MVC.BaseModel {

    private static _instance: SkillModel = null;

    public constructor() {
        super();
        if (SkillModel._instance == null) {
            SkillModel._instance = this;
        }
    }
    public reset(): void {

    }

    public static get getInstance(): SkillModel {
        if (SkillModel._instance == null) {
            SkillModel._instance = new SkillModel();
        }
        return SkillModel._instance;
    }

    /**
     * 根据当前章节等级，随机num个技能
     * @param num 数量
     */
    public randomSkill(num: number, isfirst: boolean = false) {
        let skillids = [];
        let chapter = FightModel.getInstance.chapterId;
        let level = FightModel.getInstance.curFightLevel;
        let skillpool = Cfg.SkillPool.get(level);
        if (!skillpool) return skillids;
        let skilldata: any = skillpool.chapterSkillPool[chapter - 1];
        if (!skilldata) return skillids;
        let arr1 = [];//skilldata.concat();
        let allweight = 0;

        let len = Math.abs(skilldata.length / 2);
        for (let i = 0; i < len; i++) {
            let islimited = RoleManager.getInstance.mainRole.isSkillLimited(skilldata[2 * i + 1]);
            if (!islimited) {
                let skillitem = Cfg.Skill.get(skilldata[2 * i + 1]);
                if (skillitem.unLock > 0) {
                    let chapterinfo = Notifier.call(CallID.Menu_GetChapterInfo, skillitem.unLock);
                    if (chapterinfo.unLock) {
                        allweight += skilldata[2 * i];
                        arr1.push(skilldata[2 * i]);
                        arr1.push(skilldata[2 * i + 1]);
                    }
                } else {
                    allweight += skilldata[2 * i];
                    arr1.push(skilldata[2 * i]);
                    arr1.push(skilldata[2 * i + 1]);
                }
            }
        }
        if (isfirst) {
            let numarr = Cfg.Chapter.get(chapter).extraSkillCount;
            num = Util.random(numarr[0], numarr[1] + 1);
        }
        for (let k = 0; k < num; k++) {
            let len = Math.abs(arr1.length / 2);
            let _random = Util.random(1, allweight);
            let isfind = false;
            for (let i = 0; i < len; i++) {
                let weight = arr1[2 * i];
                if (_random <= weight) {
                    skillids.push(arr1[2 * i + 1]);
                    isfind = true;
                    arr1.splice(2 * i, 2);
                    allweight -= weight;
                    break;
                }
                _random -= weight;
            }
            if (!isfind) skillids.push(arr1[1]);
        }
        // console.log("skillids = ", skillids);
        return skillids;
    }
}