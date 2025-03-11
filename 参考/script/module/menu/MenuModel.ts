import { MVC } from "../../framework/MVC";
import { GameVoManager } from "../../manager/GameVoManager";
import { Util } from "../../utils/Util";
import { Const } from "../../config/Const";
import { Cfg } from "../../config/Cfg";

export default class MenuModel extends MVC.BaseModel {

    private static _instance: MenuModel = null;

    public constructor() {
        super();
        if (MenuModel._instance == null) {
            MenuModel._instance = this;
        }
    }
    public reset(): void {

    }

    public static get getInstance(): MenuModel {
        if (MenuModel._instance == null) {
            MenuModel._instance = new MenuModel();
        }
        return MenuModel._instance;
    }

    /**
     * 章节id
     * 
     */
    public getCurChapterInfo() {
        let chapterData = Cfg.Chapter.filter({});
        let chapterlist = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let unLock = true;
        let startStage = chapterlist[1];
        if (startStage >= chapterlist[2] && chapterlist[0] < chapterData.length) {//超过了
            startStage = 1;
            return { chapterId: chapterlist[0] + 1, unLock, startStage, passStage: 0, chapterNum: chapterData[chapterlist[0]].attackCount };
        }
        // startStage = cc.misc.clampf(startStage - 3, 1, chapterlist[2] - 4);
        let passStage = this.getChatperStageRate(chapterlist[0]);
        return { chapterId: chapterlist[0], unLock, startStage, passStage, chapterNum: chapterlist[2] };
    }

    public getChapterInfoById(id: number) {
        let chapterlist = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        let unLock = false;
        let startStage = 0;
        let passStage = 0;
        let chapterid = 0;
        let chapternum = 0;
        if (chapterlist[0] > id) {
            let data = Cfg.Chapter.get(id);
            startStage = data.attackCount - 4;
            passStage = data.attackCount;
            chapterid = id;
            chapternum = data.attackCount;
            unLock = true;
        } else if (chapterlist[0] == id) {
            startStage = chapterlist[1] + 1;
            startStage = cc.misc.clampf(startStage - 4, 1, chapterlist[2] - 4);
            unLock = true;
            passStage = chapterlist[1];
            chapternum = chapterlist[2];
        } else {
            let chapterData = Cfg.Chapter.filter({});
            if (chapterlist[1] >= chapterlist[2] && id == chapterlist[0] + 1 && chapterlist[0] < chapterData.length) {//超过了)
                unLock = true;
            } else {
                unLock = false;
            }
            startStage = 1;
            passStage = 0;
            let data = Cfg.Chapter.get(id);
            chapterid = id;
            chapternum = data.attackCount;
        }
        return { chapterId: chapterid, unLock, startStage, passStage, chapterNum: chapternum };
    }

    /**
     * 获取章节的进度
     */
    public getChatperStageRate(id: number) {
        let chapterIdlist = Util.levelToChapterId(GameVoManager.getInstance.myUserVo.topLevel);
        if (chapterIdlist[0] > id) {//已经通过该章节
            return chapterIdlist[2];
        } else if (chapterIdlist[0] == id) {//当前章节
            return chapterIdlist[1];
        } else {
            return 0;
        }
    }
}