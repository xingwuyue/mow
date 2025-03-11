import { MVC } from "../../framework/MVC";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { Manager } from "../../manager/Manager";
import { AudioType } from "../../manager/AudioManager";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath } from "../../common/Common_Define";
import ResultNewModel from "./ResultNewModel";

/**
 * @description 新结算界面控制层
 * @author CaiLeSi
 * @data 2019-04-26
 */
export default class ResultNewController extends MVC.BaseController {
    private static _instance: ResultNewController = null;
    private _data: ResultNewModel = null;

    constructor() {
        super('ResultNewController');
        ResultNewController._instance = this;
        this._data = ResultNewModel.getInstance();
        this.changeListener(true);
    }

    static getInstance() {
        if (!this._instance) {
            new ResultNewController();
        }
        return this._instance;
    }

    protected changeListener(enable: boolean): void {
        Notifier.changeListener(enable, ListenID.Fight_Result, this.onOpenResultView, this);
        Notifier.changeListener(enable, ListenID.Result_BackHome, this.onBackHome, this);
    }

    public onOpenResultView(args: ResultData) {
        UIManager.Open(Common_UIPath.ResultNewUI, MVC.eTransition.Default, MVC.eUILayer.Panel, args);
    }

    public onCloseResultView() {
        UIManager.Close(Common_UIPath.ResultNewUI);
    }

    public onBackHome() {
        Notifier.send(ListenID.Game_FightBackToHome);
        Manager.audio.playAudio(501, AudioType.UI);
        UIManager.Close(Common_UIPath.ResultNewUI);
    }

}

export interface ResultData {
    isFirst: boolean,
    isNew: boolean,
    levelUp: boolean,
    coin: number,
    killNum: number,
    rewardList: number[],
    curLevel: number,
    chapterId: number,
}
