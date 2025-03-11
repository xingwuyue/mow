import { MVC } from "../../framework/MVC";
import DrawModel from "./DrawModel";
import { UIManager } from "../../framework/UIManager";
import { Common_UIPath, ShareCode, TaskSubType } from "../../common/Common_Define";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { GameVoManager } from "../../manager/GameVoManager";
import DrawView_IOS from "./DrawView_IOS";

/**
 * @description 抽奖模块
 * @author CaiLeSi
 */
let RewardType = {
    share: 1,
    video: 2
}
export default class DrawController extends MVC.BaseController {
    private static _instance: DrawController = null;
    private _data: DrawModel = DrawModel.getInstance();

    constructor() {
        super('DrawController');
        DrawController._instance = this;
    }

    static getInstance() {
        if (null == DrawController._instance) {
            new DrawController();
        }
        return DrawController._instance;
    }

    getView(): DrawView_IOS {
        let node = UIManager.getNodeByName(Common_UIPath.DrawUI);
        if (node && cc.isValid(node)) {
            return node.getComponent(DrawView_IOS);
        }
        return null;
    }

    init() {
        this._data.setDrawType(2);
        let view = this.getView()
        view && view.onFlush();
    }

    onDraw(): Promise<any> {
        return new Promise((resolve, reject) => {
            let config = this._data.getRewardConfig();
            let drawType = this._data.getDrawType();
            let userData = GameVoManager.getInstance.myUserVo;
            if (config) {
                let r = Math.random();
                let count = 0;
                let info = null;
                for (let i = 0; i < Object.keys(config).length; ++i) {
                    count += config[i].weight;
                    if (r < count || i == Object.keys(config).length) {
                        info = config[i];
                        break;
                    }
                }
                if (info) {
                    let ra = info.sector;
                    let mult = info.multNum;

                    this._data.setAngle(ra);
                    this._data.setRewardInfo(info);
                    this._data.setMultNum(mult);
                }
                let suc = () => {
                    console.log("***** 抽奖成功 *****");
                    let view = this.getView()
                    view && view.runDiscAction();
                    if (drawType == RewardType.share) {
                        Notifier.send(ListenID.Log_Event, { event_name: "draw_finish_share" });
                    } else if (drawType == RewardType.video) {
                        Notifier.send(ListenID.Log_Event, { event_name: "draw_finish" });
                    }
                    resolve();
                }

                if (info) {
                    let ra = info.sector;
                    let mult = info.multNum;

                    this._data.setAngle(ra);
                    this._data.setRewardInfo(info);
                    this._data.setMultNum(mult);
                }
                if (drawType == RewardType.share) {
                    userData.drawShare++;
                    suc();
                } else {
                    // if(!HD_MODULE.getPlatform().getIsHaveVideo()){
                    //     AlertManager.showNormalTips("今日视频已观看完！");
                    //     return
                    // }
                    userData.drawVideo++;
                    // if(HD_MODULE.getPlatform().isTest()){
                    //     suc();
                    // }else{
                    suc();
                    Notifier.send(ListenID.Result_Draw_Video_Success);
                    // }
                }
            };
        });

    }

    onDrawAnimEnd() {
        let multNum = this._data.getMultNum();
        console.log("***** 抽奖结束 *****", multNum);
        let isMember = GameVoManager.getInstance.getIsMember();
        multNum = isMember ? multNum * 2 : multNum;
        GameVoManager.getInstance.myUserVo.drawKill = 0;
        Notifier.send(ListenID.Draw_AnimEnd, multNum);
        Notifier.send(ListenID.RewardTask_UpdateTaskProgress, TaskSubType.DrawTarget, [1, 1]);
    }
}
