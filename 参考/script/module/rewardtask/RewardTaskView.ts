import { MVC } from "../../framework/MVC";
import DailyView from "./subview/DailyView";
import { Manager } from "../../manager/Manager";
import RewardTaskModel from "./RewardTaskModel";
import { TaskType } from "../../common/Common_Define";
import StageView from "./subview/StageView";
import BattleView from "./subview/BattleView";
import { Notifier } from "../../framework/Notifier";
import { ListenID } from "../../ListenID";
import { GameVoManager } from "../../manager/GameVoManager";
import { Time } from "../../framework/Time";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardTaskView extends MVC.BaseView {

    @property(DailyView)
    dailyView: DailyView = null;

    @property(StageView)
    stageView: StageView = null;

    @property(BattleView)
    battleView: BattleView = null;

    @property(cc.Node)
    itemCell: cc.Node = null;

    @property(cc.Prefab)
    taskItem: cc.Prefab = null;

    @property([cc.Node])
    togglelist: cc.Node[] = [];

    protected changeListener(enable: boolean): void {
        //Notifier.changeListener(enable, NotifyID.Game_Update, this.onUpdate, this);
        Notifier.changeListener(enable, ListenID.RewardTask_OnReward, this.onReward, this);
    }

    /*
     * 打开界面回调，每次打开只调用一次
     */
    public onOpen(args: any): void {
        super.onOpen(args);
        GameVoManager.getInstance.myUserVo.openDailyView = true;
        RewardTaskModel.getInstance.setRewardCell(this.itemCell);
        RewardTaskModel.getInstance.sortTask(TaskType.Daily);
        RewardTaskModel.getInstance.sortTask(TaskType.Stage);
        RewardTaskModel.getInstance.sortTask(TaskType.Battle);
        this.checkNewDay();
        this.registerRemind();
        this.onSelectToggle(null, 2);
    }

    checkNewDay() {
        let date = new Date(Time.serverTimeMs);
        let curday = date.getDate();
        if (curday != GameVoManager.getInstance.myUserVo.day) {
            GameVoManager.getInstance.myUserVo.day = curday;
            GameVoManager.getInstance.myUserVo.dailyTaskTimes = 0;
            Notifier.send(ListenID.SecondDay);
        }
    }

    /*
     * 关闭界面回调，每次打开只调用一次
     */
    public onClose(): void {
        super.onClose();
        Notifier.send(ListenID.Log_Event, { event_name: "taskPage_leave" });
        Manager.audio.playAudio(501);
    }

    public registerRemind() {
        // let updradeRemind = {
        //     name: "toggle1",
        //     node: this.togglelist[0],
        //     hideNum: true,
        //     offsetX: -15,
        //     type: 1,
        //     checkFunc: () => {
        //         return RewardTaskModel.getInstance.dailyRewardNum;
        //     }
        // }
        // Notifier.send(ListenID.Rigister_Remind, updradeRemind);

        let updradeRemind1 = {
            name: "toggle2",
            node: this.togglelist[1],
            hideNum: true,
            offsetX: -15,
            type: 1,
            checkFunc: () => {
                return RewardTaskModel.getInstance.stageRewardNum;
            }
        }
        Notifier.send(ListenID.Rigister_Remind, updradeRemind1);

        let updradeRemind2 = {
            name: "toggle3",
            node: this.togglelist[2],
            hideNum: true,
            offsetX: -15,
            type: 1,
            checkFunc: () => {
                return RewardTaskModel.getInstance.battleRewardNum;
            }
        }
        Notifier.send(ListenID.Rigister_Remind, updradeRemind2);
    }

    private selectType: number = 0;
    onSelectToggle(event, viewtype) {
        viewtype = Number(viewtype);
        if (event) {
            Manager.audio.playAudio(501);
            if (viewtype == 2) {
                Notifier.send(ListenID.Log_Event, { event_name: "taskPage_level" });
            } else if (viewtype == 3) {
                Notifier.send(ListenID.Log_Event, { event_name: "taskPage_fighting" });
            }
        }
        this.selectType = viewtype;
        this.dailyView.node.active = viewtype == 1;
        this.stageView.node.active = viewtype == 2;
        this.battleView.node.active = viewtype == 3;
        if (viewtype == 1) {
            this.dailyView.updateView();
        } else if (viewtype == 2) {
            this.stageView.updateView(this.taskItem);
        } else if (viewtype == 3) {
            this.battleView.updateView(this.taskItem);
        }
    }

    onRewardAll() {
        Manager.audio.playAudio(501);
        if (this.selectType == 1) {
            this.dailyView.onRewardAll();
        } else if (this.selectType == 2) {
            this.stageView.onRewardAll();
        } else if (this.selectType == 3) {
            this.battleView.onRewardAll();
        }
    }

    onReward(taskType: TaskType, id) {
        if (taskType == TaskType.Daily) {
            this.dailyView.onReward(taskType, id);
        } else if (taskType == TaskType.Stage) {
            this.stageView.onReward(taskType, id);
        } else if (taskType == TaskType.Battle) {
            this.battleView.onReward(taskType, id);
        }
    }
}
